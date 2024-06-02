// import libs
import fs from "fs";
import multer from "multer";

const UPLOAD_PATH = "uploads/";

(() => {
  if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH);
  }
})()

const upload = multer({ dest: UPLOAD_PATH });
export default (attr) => {
  // console.log(">> multer - attr:", attr);
  return upload.single(attr);
}
