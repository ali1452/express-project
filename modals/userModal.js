const mongoose  = require('mongoose')

const userSchema = mongoose.Schema(
    {
        first_name:{
            type: String,
            require:[true,"please  add  first_name."]
        },
        last_name:{
            type: String,
            require:[true,"please add last_name"]
        }
        
    },
    {
        timeStamps:true
    }
)

module.exports = mongoose.model('user',userSchema)
