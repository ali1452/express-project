
const asyncHandler = require('express-async-handler')
const Products = require('../modals/productsModal')


const getAllProducts= asyncHandler(async (req, res, next) => {
    const reqQuery = req.query
        // console.log('get request successfully',reqQuery.product_id)
        if(Object.keys(reqQuery).length >0){
            if(Object.keys(reqQuery).indexOf('product_id:')){
                console.log('jiyo')
                const product = await Products.find({product_id:reqQuery.product_id})
                res.status(200).json(product)
            }
            
        }else{
            const products = await Products.find()
            res.status(200).json(products)
        }
       
        
    })

    const getProduct = asyncHandler(async (req,res)=>{
        
        const id = req.params.id
        const product = await Products.find({product_id:id})
        res.status(200).json(product)


    })

    module.exports  ={getAllProducts,getProduct}
