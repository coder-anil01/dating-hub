import mongoose from "mongoose";
const mongouri = process.env.MONGODB_URL

const conectToDatabase = async () => {
    try {
        await mongoose.connect(mongouri)
        console.log("Database Connected Successfully on", mongouri)
    } catch (error) {
        console.log(error)
    }
}

export default conectToDatabase;