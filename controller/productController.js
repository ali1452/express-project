
const asyncHandler = require('express-async-handler')
const Products = require('../modals/productsModal')


const getAllProducts= asyncHandler(async (req, res, next) => {
        // console.log('get all products')
        const products = await Products.find()
        res.status(200).json(products)
    })

    const getProduct = asyncHandler(async (req,res)=>{
        
        const id = req.params.id
        const product = await Products.find({product_id:id})
        res.status(200).json(product)


    })

    module.exports  ={getAllProducts,getProduct}
