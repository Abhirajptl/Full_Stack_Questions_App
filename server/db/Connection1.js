import mongoose from 'mongoose'

const connectWithMongoDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo connection successfull!!...on host : " + connectionInstance.connection.host)
    } catch (error) {
        console.error("db :: connection :: error : " + error)
    }
}; 

export default connectWithMongoDB;