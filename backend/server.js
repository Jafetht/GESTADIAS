const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Hace públicos los PDF
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Subir PDF
app.post("/subir", upload.single("pdf"), (req, res) => {

  if (!req.file) {
    return res.status(400).json({
      error: "No se recibió ningún archivo."
    });
  }

  res.json({
    nombre: req.file.originalname,
    ruta: `uploads/${req.file.filename}`
  });

});

app.listen(3001, () => {
  console.log("Servidor iniciado en http://localhost:3001");
});
