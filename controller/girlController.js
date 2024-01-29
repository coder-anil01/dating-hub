import GirlModel from "../model/GirlModel.js";

//=>  CREATE
export const createGirl = async (req, res) => {
    try {
        const {username, image, images, price} = req.body;
        const girl = await new GirlModel({username, image, images, price}).save();
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
        const girls = await GirlModel.find().select("-images");
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