import express from "express";
import { create } from "../controllers/userController.js";

const route = express.Router();

route.post("/register", create);

export default route;