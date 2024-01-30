import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'girl',
    },
    price:{
        type: Number,
    },
    message:{
        type: String,
    },
    payscreenshot:{
        type:String,
    }
},{timestamps:true});

export default mongoose.model('order', orderSchema);