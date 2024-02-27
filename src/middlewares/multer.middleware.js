import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
  },
});

export const upload = multer({ 
    // storage: storage 
    // using es6 so same name can be written like this 
    storage,
});
