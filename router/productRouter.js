const express = require('express')
const { getAllProducts,  getProduct } = require('../controller/productController')

const app = express()
const route = express.Router()
express.json()


route.get('/',(req,res)=>getAllProducts(req,res))


module.exports = route