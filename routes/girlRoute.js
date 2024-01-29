import express from "express";
import { createGirl, getOneProfile, getallProfile } from "../controller/girlController.js";

const route = express.Router();

route.post('/create', createGirl);
route.get('/get', getallProfile);
route.get('/get/:id', getOneProfile);

export default route;