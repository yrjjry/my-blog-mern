// import multer from "multer";
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/");
//     },

//     filename:(req,file,cb)=>{
//         cb(
//             null,
//             Date.now()+"-"+file.originalname
//         );
//     }
// });

// const upload = multer({
//     storage
// });

// export default upload;

import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");

// 如果 uploads 不存在，就创建
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + "-" + file.originalname
        );
    }
});

const upload = multer({
    storage
});

export default upload;