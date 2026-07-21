const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const carpetaUploads = path.join(__dirname, "uploads");

if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaUploads);
  },

  filename: (req, file, cb) => {
    const nombreLimpio = Buffer
  .from(file.originalname, "latin1")
  .toString("utf8");

const nombreSeguro =
  Date.now() + "-" + nombreLimpio;

cb(null, nombreSeguro);
  }
});

const upload = multer({
  storage: storage
});

app.use(
  "/uploads",
  express.static(carpetaUploads)
);

app.post(
  "/api/documentos/subir",
  upload.single("documento"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        mensaje: "No se recibió ningún archivo"
      });
    }

    const urlDocumento =
      `http://localhost:5000/uploads/${req.file.filename}`;

    res.json({
      mensaje: "Documento guardado correctamente",
      archivo: {
        nombreOriginal: req.file.originalname,
        nombreServidor: req.file.filename,
        url: urlDocumento
      }
    });

  }
);

app.get("/", (req, res) => {
  res.send("Backend de GESTADIAS funcionando correctamente");
});

app.listen(5000, () => {
  console.log(
    "Servidor ejecutándose en http://localhost:5000"
  );
});