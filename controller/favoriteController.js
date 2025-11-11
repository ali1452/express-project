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

    const addRemoveFavourite = asyncHandler(async (req, res, next) => {
        const userId = req.user._id
        const { product_id, name, price, image_url, description, isFavourite } = req.body

        const existingFavorite = await Favorite.findOne({ user: userId, product_id })

        try {
            if(isFavourite){
                if(!existingFavorite){
                    const favorite = await Favorite.create({
                        user: userId,
                        product_id,
                        name,
                        price,
                        image_url,
                        description,
                        isFavourite
                    })
    
                    return res.status(201).json({
                        success: true,
                        data: favorite
                    })

                }
                else{
                    return res.status(409).json({
                        success: false,
                        message: 'product already added to favourites'
                    })
                }
                
            }else{
                if(!existingFavorite){
                    return res.status(404).json({
                        success: false,
                        message: 'favourite not found for this product'
                    })
                }
    
                await Favorite.deleteOne({ _id: existingFavorite._id })
    
                res.status(200).json({
                    success: true,
                    message: 'favourite removed successfully'
                })

            }

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message
            })
        }
    })

module.exports  = {getFavorites, addRemoveFavourite}