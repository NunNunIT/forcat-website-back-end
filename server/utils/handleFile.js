// import libs
import fs from "fs";

export const isPathExists = (path) => {
  return fs.existsSync(path);
}

export const createFolder = (path) => {
  if (isPathExists(path))
    fs.mkdir(path);
}

export const removeFile = (path) => {
  if (isPathExists(path)) {
    fs.unlinkSync(path, err => {
      if (err) console.error(">> Remove File with error:", err);
    })
  }
}

export default { isPathExists, createFolder, removeFile };