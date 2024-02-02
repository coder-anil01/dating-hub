import express from "express";
import { createOrder, getAllOrder, getOrder, updateOrder } from "../controller/orderController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const route = express.Router();

route.post('/create', upload.single('file'), createOrder);

route.get('/get/:id', getOrder);

route.get('/getall', getAllOrder);

route.put('/update/:id', updateOrder);

export default route;