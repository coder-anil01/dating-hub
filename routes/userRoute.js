import express from "express";
import { createUser, loginUser } from "../controller/userController.js";

const route = express.Router();

route.post('/create', createUser)

route.post('/login', loginUser)

export default route;