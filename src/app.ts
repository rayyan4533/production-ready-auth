import cookieParser from "cookie-parser";
import express, { type Application } from "express";
import authRoute from "./modules/auth/routes.js";


const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth',authRoute)

export default app;
