import mongoose from "mongoose";

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to db')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


export default connectToDB