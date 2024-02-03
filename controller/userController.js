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
        const token = await JWT.sign({user}, "vfhgwefghbvffh");
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

// => Login
export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
    // Existing User
        const existuser = await userModel.findOne({username});
        if(existuser){
            const isMatch = await bcrypt.compare(password, existuser.password);
            if(isMatch){
            // Token
                const token = JWT.sign({existuser}, "vfhgwefghbvffh");
                res.status(200).send({
                    success: true,
                    existuser,
                    token,
                });
            }else{
                res.status(200).send({success: false, message :"Invalid Password"})
            }
        }else{
            res.status(200).send({success: false, message: "User Not Exist"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}