const express = require('express')
const { getAllProducts,  getProduct } = require('../controller/productController')

const app = express()
const route = express.Router()
express.json()


route.get('/',(req,res)=>getAllProducts(req,res))
route.get('/:id',(req,res)=>getProduct(req,res))


module.exports = route