import express from "express";
import { makeUserApp, getUserApps, delUserApp, editUserApp } from "../controllers/appController.js";
import { authMiddleware } from "../middleware/auth.js";

const appRouter = express.Router();

appRouter.post("/make-application", authMiddleware, makeUserApp);
appRouter.get("/my-applications", authMiddleware, getUserApps);
appRouter.delete("/delete-application", authMiddleware, delUserApp);
appRouter.put("/edit-application", authMiddleware, editUserApp);

export default appRouter;