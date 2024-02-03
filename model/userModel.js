import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    role:{
        type: String,
        default: 0,
    }
},{timestamps:true});

export default mongoose.model('user', userSchema);