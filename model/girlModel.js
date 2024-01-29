import mongoose from 'mongoose';

const girlSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    image:{
        type: String,
    },
    images:[{
        type: String,
    },],
    price:{
        type: Number,
    }
},{timestamps:true});

export default mongoose.model('girl', girlSchema);