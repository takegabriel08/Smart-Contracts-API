import express from "express"
import nedb from "nedb"

const router = express.Router();

const db = new nedb('database.db')
// db.insert({
//     id: "03600f1e-d201-4804-a4a5-0f4269252874",
//     chainId: 1,
//     address: "0x23581767a106ae21c074b2276d25e5c3e136a68b",
//     name: "AvatarsMoonbirds",
//     symbol: "MOONBIRD",
//     icon: "MOONBIRD",
//     createdAtBlock: 14591056
// })
db.loadDatabase()

// get all contracts
router.get('/', (req, res) => {
    db.find({}, (err, data) => {
        res.json(data)
    })
})

// create contract
router.post('/', (req, res) => {
    const body = req.body
    db.insert(body, (err, element) => {
        console.log(`New element inserted in database: ${JSON.stringify(element)}`)
    }
    )
})



export default router;
