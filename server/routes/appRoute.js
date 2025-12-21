import express from "express";
import { create, getUserApps } from "../controllers/appController.js";
import { authMiddleware } from "../middleware/auth.js";

const appRouter = express.Router();

appRouter.post("/create", authMiddleware, create);
appRouter.get("/me", authMiddleware, getUserApps);
export default appRouter;