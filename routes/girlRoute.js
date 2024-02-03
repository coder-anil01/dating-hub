import express from "express";
import { createGirl, getOneProfile, getallProfile, oneProfileDelete } from "../controller/girlController.js";

const route = express.Router();

route.post('/create', createGirl);
route.get('/get', getallProfile);
route.get('/get/:id', getOneProfile);
route.delete('/delete/:id', oneProfileDelete);

export default route;