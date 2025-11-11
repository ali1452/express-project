
const express = require('express')
const router = require('./router/router')
const orderRouter = require('./router/orderRouter')
const productRouter = require('./router/productRouter')
const favoriteRouter = require('./router/favoriteRouter')
const connectDb = require('./config/dbConnection')
var cors = require('cors')

connectDb()

const PORT= process.env.PORT
const app = express()
app.use(cors())
const port = PORT  || 5000
console.log({PORT})
app.use(express.json())

app.use('/user',router)
app.use('/orders',orderRouter)
app.use('/products',productRouter)
app.use('/favorites',favoriteRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
