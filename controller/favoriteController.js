const asyncHandler = require('express-async-handler')
const Favorite = require('../modals/favoriteModal')


const getFavorites = asyncHandler(async (req, res, next) => {
        const userId = req.user._id
        const favorites = await Favorite.find({ user: userId }).select('-__v')
        res.status(200).json({
            success: true,
            data: favorites
        })
    })

    const addFavorite = asyncHandler(async (req, res, next) => {
        const userId = req.user._id
        const { product_id, name, price, url, description } = req.body

        if(!product_id || !name){
            console.log('product_id and name are required to add favourite')
            return res.status(400).json({
                success: false,
                message: 'product_id and name are required'
            })
        }

        try {
            const existingFavorite = await Favorite.findOne({ user: userId, product_id })

            if(existingFavorite){
                console.log('favourite already exists for product', product_id)
                return res.status(409).json({
                    success: false,
                    message: 'product already added to favourites'
                })
            }

            const favorite = await Favorite.create({
                user: userId,
                product_id,
                name,
                price,
                image_url,
                description
            })

            res.status(201).json({
                success: true,
                data: favorite
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    })

module.exports  = {getFavorites, addFavorite}