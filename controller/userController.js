import userModel from "../model/userModel.js";
import JWT from 'jsonwebtoken';
import bcrypt from "bcrypt";

// =>  Create User
export const createUser = async(req, res) => {
    try {
        const {username, password} = req.body;
    // Existing User
        const existuser = await userModel.findOne({username});
        if(existuser){
            return res.status(200).send({success:false, message:"User Already Exist"})
        }
        const hasPassword = await bcrypt.hash(password, 10)
        const user = await new userModel({username, password: hasPassword}).save();
    // Token
        const token = JWT.sign({user}, "vfhgwefghbvffh");
        res.status(200).send({
            success: true,
            user,
            token,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}