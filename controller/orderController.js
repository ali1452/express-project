const asyncHandler = require('express-async-handler')
const Order = require('../modals/orderModal')


const getOrder= asyncHandler(async (req, res, next) => {
        const order = await Order.find()
        res.status(200).json({
            success: true,
            data: order
        })
    })

    const postOrder = asyncHandler(async (req, res, next) => {
        const { 
            first_name, 
            last_name, 
            email, 
            shopping_address, 
            mobile_number, 
            mode_of_payment, 
            amount, 
            items 
        } = req.body
        try {
            if(first_name && last_name && email && shopping_address && mobile_number && mode_of_payment && amount && items){
                const order = await Order.create({
                    first_name,
                    last_name,
                    email,
                    shopping_address,
                    mobile_number,
                    mode_of_payment,
                    amount,
                    items
                })
                res.status(201).json({
                    success: true,
                    data: order
                })        
            }else{
                console.log('first_name, last_name, email, shopping_address, mobile_number, mode_of_payment, amount and items are required')
                res.status(400).json({
                    success: false,
                    message: 'first_name, last_name, email, shopping_address, mobile_number, mode_of_payment, amount and items are required'
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

    module.exports  ={getOrder, postOrder}
