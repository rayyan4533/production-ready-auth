import cookieParser from "cookie-parser";
import express, {} from "express";
import authRoute from "./modules/auth/routes.js";
import multer from "multer";
import req from 'express';
import path from 'path';
import { ApiResponse } from "./common/utils/apiResponse.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoute);
// const upload = multer() ;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    //this below function just creates a unique name taki clashes na ho server pe
    filename: function (req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); //this shit is imp
        callback(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});
// const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2 //2mb
    },
    fileFilter: (req, file, cb) => {
        const allowed = ["image/png", "image/jpg", "image/jpeg"];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("file type not supported"), false);
        }
    }
});
//fields se we give array of key value pair
app.post("/upload", upload.fields([
    { name: "avatar", maxCount: 1 }
]), (req, res) => {
    console.log(req.file);
    ApiResponse.ok(res, "file uploaded");
});
export default app;
//# sourceMappingURL=app.js.map