const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            require: [true, 'please add first name.']
        },
        last_name: {
            type: String,
            require: [true, 'please add last name.']
        },
        email: {
            type: String,
            require: [true, 'please add email.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            require: [true, 'please add password.'],
            minlength: 5
        }
    },
    {
        timeStamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('user', userSchema)