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
    const {user, product, price} = req.body;
    const payscreenshot = req?.body?.payscreenshot;
    try {
        const hostimage = await cloudinary.uploader.upload(payscreenshot,{folder: 'callmasti'})

        const order = await new orderModel({user, product, price, payscreenshot: hostimage?.url}).save();
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
        const orders = await orderModel.find({user: id}).populate('product user').sort({ createdAt: -1});
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

// => GET ALL
export const getAllOrder = async(req, res) => {
    try {
        const orders = await orderModel.find().sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            orders,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//=> UDATE
export const updateOrder = async(req, res) => {
    try {
        const {status} = req.body;
        const {id} = req.params;
        await orderModel.findByIdAndUpdate(id, {status}, {new: true});
        res.status(200).send({
            success: true,
            message: "Order Status Updated",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}