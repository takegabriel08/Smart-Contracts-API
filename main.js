import express from "express"
import contractsRouter from "./routes/contracts.js"

const app = express();
const port = process.env.PORT || 3333;

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    console.log('Get request from client!')
    res.send('Welcome to the server!')
})

app.use('/contracts', contractsRouter)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})