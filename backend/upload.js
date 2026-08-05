const multer = require("multer");
const path = require("path");
const fs = require("fs");

const carpetaUploads = path.join(__dirname, "uploads");

// Crear carpeta si no existe
if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads);
}

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, carpetaUploads);
  },

  filename: (req, file, cb) => {
    const nombre =
      Date.now() + path.extname(file.originalname);

    cb(null, nombre);
  }

});


const upload = multer({

  storage,

  fileFilter: (req, file, cb) => {

    if (
      path.extname(file.originalname).toLowerCase() === ".pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF"));
    }

  }

});


module.exports = upload;