const mongoose  = require('mongoose')

const productsSchema = mongoose.Schema(
    {
        product_id:{
            type: String,
            require:[true,"please  add  product Id."]
        },
        name:{
            type: String,
            require:[true,"please add product name."]
        },
        price:{
            type: String,
            require:[true,"please add product price."]
        },
        category:{
            type:String,
            require:[true,"please add category name."]
        },
        brand:{
            type:String,
            require:[true,"please add brand name."]
        },
        description:{
            type:String,
            require:[true,"please add product description."]
        },
        url:{
            type:String,
            require:[true,"please add product url."]
        },
        discount_price:{
            type:String,
            require:[true,"please add product discounted price."]
        },
        sku:{
            type:Array,
            require:[true,"please add product skus."]
        },
        qty:{
            type:Number,
            require:[true,"please add product quantity"]
        },
        edit:{
            type:Boolean,
            require:[true,"please add edit status"]
        }
        
    },
    {
        timeStamps:true
    }
)

module.exports = mongoose.model('products', productsSchema)
