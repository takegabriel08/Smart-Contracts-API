import express from "express"
import nedb from "nedb"

const app = express();
const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

app.use(express.static('public'))
app.use(express.json({ limit: "100kb" }))

const db = new nedb('database.db')

app.get('/', (req, res) => {
    console.log('Get request from client!')
    res.send('Welcome to the server!')
})