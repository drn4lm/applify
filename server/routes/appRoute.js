import express from "express";
import { create } from "../controllers/appController.js";

const appRoute = express.Router();

appRoute.post("/create", create);
export default appRoute;