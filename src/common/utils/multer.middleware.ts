import multer from "multer";
import path from 'path' 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  //this below function just creates a unique name taki clashes na ho server pe
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext=path.extname(file.originalname) //this shit is imp
    callback(null, file.fieldname + '-' + uniqueSuffix+ext)
  }
})


const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowed = ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"]
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error("file type not supported"))
  }
}



const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024 *2 //2mb
    },
  fileFilter: fileFilter
    
})

export default upload

