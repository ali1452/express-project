const mongoose  = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        shop_name:{
            type: String,
            require:[true,"please  add  shop_name."]
        },
        customer_name:{
            type: String,
            require:[true,"please add customer"]
        },
        amount:{
            type: Number,
            require:[true,"order amount require"]
        },
        orders:{
            type: Array,
            require:[true,"order item needed"]
        }
        
    },
    {
        timeStamps:true
    }
)

module.exports = mongoose.model('order', orderSchema)
