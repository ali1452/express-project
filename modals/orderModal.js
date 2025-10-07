const mongoose  = require('mongoose')

const orderSchema = mongoose.Schema(
    {
        first_name:{
            type: String,
            require:[true,"please add first_name."]
        },
        last_name:{
            type: String,
            require:[true,"please add last_name."]
        },
        email:{
            type: String,
            require:[true,"please add email."]
        },
        shopping_address:{
            street_address:{
                type: String,
                require:[true,"please add street address."]
            },
            country:{
                type: String,
                require:[true,"please add country."]
            },
            province:{
                type: String,
                require:[true,"please add province."]
            },
            city:{
                type: String,
                require:[true,"please add city."]
            },
            area:{
                type: String,
                require:[true,"please add area."]
            },
            zip_code:{
                type: String,
                require:[true,"please add zip code."]
            }
        },
        mobile_number:{
            type: String,
            require:[true,"please add mobile number."]
        },
        mode_of_payment:{
            type: String,
            enum: ['cash', 'credit card'],
            require:[true,"please add mode of payment."]
        },
        amount:{
            type: Number,
            require:[true,"order amount require"]
        },
        items:[{
            product_id:{
                type: String,
                require:[true,"please add product id."]
            },
            name:{
                type: String,
                require:[true,"please add product name."]
            },
            quantity:{
                type: Number,
                require:[true,"please add quantity."]
            },
            price:{
                type: Number,
                require:[true,"please add price."]
            },
            shipping_amount:{
                type: Number,
                require:[true,"please add shipping amount."]
            }
        }]
        
    },
    {
        timeStamps:true
    }
)

module.exports = mongoose.model('order', orderSchema)
