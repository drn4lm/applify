import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT;
const MURL = process.env.MONGODB_URL;

mongoose
        .connect(MURL)
        .then(() => {
            console.log("DB connection successful.")
            app.listen(PORT, () => {
                console.log(`Server running on port: ${PORT}.`)
            });
        })
        .catch((error) => console.log(error));