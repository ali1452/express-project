const express = require('express')
const { getOrder } = require('../controller/orderController')

const app = express()
const route = express.Router()
express.json()


route.get('/',(req,res)=>getOrder(req,res))


module.exports = route