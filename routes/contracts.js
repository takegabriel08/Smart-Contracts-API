import express from "express"
import nedb from "nedb"

const router = express.Router();

const db = new nedb('database.db')
db.loadDatabase()

// get all contracts
router.get('/', (req, res) => {
    db.find({}, (err, data) => {
        res.json(data)
    })
})

// create contract
router.post('/', (req, res) => {
    const item = req.body

    //insert item 
    db.insert(item, (err, element) => {
        if (err) {
            res.send(err.message)
            return
        }
        res.send(`Contract ${element.symbol} was inserted into database!`)
    }
    )
})

// get one contract
router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findOne({ id: id }, (err, data) => {
        if (data) res.send(data)
        if (err) res.send(err)
        if (!data) res.send('404 item not found')
    })
})

//delete one contract
router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove({ id: id }, (err, numRemoved) => {
        if (numRemoved) res.send(`Items removed from database: ${numRemoved}/n Id of item deleted: ${id}`)
        if (err) res.send(err)
        if (!numRemoved) res.send('404 item not found')
    })
})

// update contract information
router.patch('/:id', (req, res) => {
    const { id } = req.params
    const query = req.body

    //unexpected logic:making the values of the object passed strings because 
    // if id is updated as number, the getOne route won't function anymore on that item
    // because the db query will also look for the type
    // this also has some setbacks because if in the update query we pass a new key to the item,
    // we would need to add another kind of query to remove it later({ $unset: { x: "y" } })

    const queryKeys = Object.keys(query)
    let newQueryObj = {}
    queryKeys.map(item => newQueryObj[`${item}`] = String(query[`${item}`]))

    db.update({ id: id }, { $set: { ...newQueryObj } },
        (err, numAffected, affectedDocuments, upsert) => {
            console.log(err, numAffected, affectedDocuments, upsert)
            if (err) res.send(err.message)
            res.send(`The item with the id: ${id}, has been updated`)
        });
})

export default router;
