
const asyncHandler = require('express-async-handler')
const Order = require('../modals/orderModal')


const getOrder= asyncHandler(async (req, res, next) => {
        console.log('get  order request')
        const order = await Order.find()
        res.status(200).json(order)
    })

    module.exports  ={getOrder}
