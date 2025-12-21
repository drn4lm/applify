import express from "express";
import { create } from "../controllers/appController.js";

const appRouter = express.Router();

appRouter.post("/create", create);
export default appRouter;