import mongoose from "mongoose";

const conectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/datehub')
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}

export default conectToDatabase;