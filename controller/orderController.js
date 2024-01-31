import orderModel from "../model/orderModel.js"
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

export const createOrder = async(req, res) => {
    const {user, product, price, message} = req.body;
    const payscreenshot = req?.body?.payscreenshot;
    try {
        const hostimage = await cloudinary.uploader.upload(payscreenshot,{folder: 'dating'})

        const order = await new orderModel({user, product, price, message, payscreenshot: hostimage?.url}).save();
        res.status(200).send({
            success: true,
            order,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

// => Get Order
export const getOrder = async(req, res) => {
    const {id} = req.params
    try {
        const orders = await orderModel.find({user: id}).populate('product').select('-user')
        res.status(200).send({
            success: true,
            total: orders.length,
            orders
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}