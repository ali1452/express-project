const mongoose  = require('mongoose')

const favoriteSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            require:[true,"please add user reference."]
        },
        product_id:{
            type: String,
            require:[true,"please add product id."]
        },
        name:{
            type: String,
            require:[true,"please add product name."]
        },
        price:{
            type: String
        },
        image_url:{
            type: String
        },
        description:{
            type: String
        }
    },
    {
        timeStamps:true
    }
)

favoriteSchema.index({ user: 1, product_id: 1 }, { unique: true })

module.exports = mongoose.model('favorite', favoriteSchema)