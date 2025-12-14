
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const Products = require('../modals/productsModal')
const Favorite = require('../modals/favoriteModal')

const JWT_SECRET = process.env.JWT_SECRET || 'express-learning-secret'


const getAllProducts= asyncHandler(async (req, res, next) => {
        const reqQuery = req.query
        let favoriteIds = new Set()

        const authHeader = req.headers.authorization || req.headers.Authorization
        if(authHeader && authHeader.startsWith('Bearer ')){
            const token = authHeader.split(' ')[1]
            try {
                const decoded = jwt.verify(token, JWT_SECRET)
                const favorites = await Favorite.find({ user: decoded.id }).select('product_id').lean()
                favoriteIds = new Set(favorites.map(fav => fav.product_id))
            } catch (error) {
                console.log('failed to decode token for favourites', error.message)
            }
        }

        let filter = {}
        if(Object.keys(reqQuery).length > 0 && reqQuery.product_id){
            filter = { product_id: reqQuery.product_id }
        }

        const products = await Products.find(filter).lean()
        const productsWithFavourite = products.map(product => ({
            ...product,
            favourite: favoriteIds.has(product.product_id)
        }))

        res.status(200).json(productsWithFavourite)
    })

    const getProduct = asyncHandler(async (req,res)=>{
        
        const id = req.params.id
        const product = await Products.find({product_id:id})
        res.status(200).json(product)


    })

    module.exports  ={getAllProducts,getProduct}
