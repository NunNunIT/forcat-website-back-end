// import libs
import cloudinary from "cloudinary";

// import utils
import { isPathExists } from "./handleFile.js";

cloudinary.config({
  cloud_name: process.env.CLD_CLOUD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
})

export const CLD_SEO_FOLDER = "SEO_Images";
export const CLD_DEFAULT_UPLOAD_FOLDER = "(default)";

export default async function uploadIgToCld(path, options) {
  if (!isPathExists(path))
    throw Error("This path is not exists");

  try {
    const result = await cloudinary.v2.uploader.upload(path, options);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}