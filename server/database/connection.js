const mongoose = require('mongoose')
const connectDB = async() => {
    try{
        //monogdb connection string.
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //These properties will stop unwanted error messages on the console.
        })

        console.log(`MongoDB connected: ${con.connection.host}`)
    }catch(err){
        console.log(err)
        process.exit(1);
    }
}

module.exports = connectDB