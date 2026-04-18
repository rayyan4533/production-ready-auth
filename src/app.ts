import cookieParser from "cookie-parser";
import express, { type Application } from "express";
import authRoute from "./modules/auth/routes.js";
import upload from "./common/utils/multer.middleware.js";

import type{Response,Request} from 'express'
import { ApiResponse } from "./common/utils/apiResponse.js";


const app:Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/auth',authRoute);



//fields se we give array of key value pair
app.post("/upload",upload.fields([
    {name:"avatar",maxCount:1}
]),(req:Request,res:Response)=>{
    console.log(req.file)
    ApiResponse.ok(res,"file uploaded")
})

export default app;
