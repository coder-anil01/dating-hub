import GirlModel from "../model/girlModel.js";

//=>  CREATE
export const createGirl = async (req, res) => {
    try {
        const {username, image, images, videourl, price} = req.body;
        const girl = await new GirlModel({username, image, images, videourl, price}).save();
        res.status(200).send({
            success: true,
            message: "Profile Created Successfully",
            girl,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//=> GET ALL
export const getallProfile = async (req, res) => {
    try {
        const girls = await GirlModel.find().select("-images -videour").sort({ createdAt: -1});
        res.status(200).send({
            success: true,
            Total: girls.length,
            girls,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//=> GET ONE
export const getOneProfile = async (req, res) => {
    const {id} = req.params;
    try {
        const girl = await GirlModel.findById(id);
        res.status(200).send({
            success: true,
            girl,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//=> GET ONE
export const oneProfileDelete = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const girl = await GirlModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
        })
    }
}