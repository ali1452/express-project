const mongoose = require("mongoose")

const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(`mongodb+srv://aliabbas:sanofi1234$@cluster0.twmkftn.mongodb.net/test-backend?retryWrites=true&w=majority`)
        // console.log('Database connected',connect.connection.host,connect.connection.name)
        console.log('db connects successfully.')
    } catch (error) {
        console.log('db connections failed')
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb