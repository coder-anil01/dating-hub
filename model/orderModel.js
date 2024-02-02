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
    payscreenshot:{
        type:String,
    },
    status:{
        type: String,
        default: 'Please Wait...',
    }
},{timestamps:true});

export default mongoose.model('order', orderSchema);