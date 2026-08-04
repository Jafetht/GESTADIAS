const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());


// Carpeta pública de PDFs
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// Archivo donde se guardan los registros
const archivoDocumentos = path.join(
  __dirname,
  "documentos.json"
);


// Crear documentos.json si no existe
if (!fs.existsSync(archivoDocumentos)) {
  fs.writeFileSync(
    archivoDocumentos,
    JSON.stringify([])
  );
}


// Subir documento PDF
app.post(
  "/documentos/subir",
  upload.single("archivo"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        error: "No se recibió ningún archivo"
      });
    }


    const documentos = JSON.parse(
      fs.readFileSync(archivoDocumentos)
    );


const nuevoDocumento = {

  id: Date.now(),

  matricula: req.body.matricula,

  tipo: req.body.tipo,

  nombre:
    Buffer.from(req.file.originalname, "latin1").toString("utf8"),

  ruta:
    `uploads/${req.file.filename}`,

  estado: "pendiente",

  motivo: "",

  fecha:
    new Date().toISOString()

};
const documentosSinAnterior = documentos.filter(
  documento =>
    !(
      documento.matricula === req.body.matricula &&
      documento.tipo === req.body.tipo
    )
);

documentosSinAnterior.push(nuevoDocumento);

    


fs.writeFileSync(
  archivoDocumentos,
  JSON.stringify(documentosSinAnterior, null, 2)
);


    res.json(nuevoDocumento);

  }
);



// Obtener documentos de un alumno
app.get(
  "/documentos/alumno/:matricula",
  (req, res) => {

    const documentos = JSON.parse(
      fs.readFileSync(archivoDocumentos)
    );


    const resultado =
      documentos.filter(
        documento =>
          documento.matricula === req.params.matricula
      );


    res.json(resultado);

  }
);


app.put(
  "/documentos/:id",
  (req,res)=>{

    const documentos = JSON.parse(
      fs.readFileSync(archivoDocumentos)
    );


    const documento = documentos.find(
      d => d.id == req.params.id
    );


    if(!documento){

      return res.status(404).json({
        error:"Documento no encontrado"
      });

    }


    documento.estado =
      req.body.estado ?? documento.estado;


    documento.motivo =
      req.body.motivo ?? documento.motivo;


    fs.writeFileSync(
      archivoDocumentos,
      JSON.stringify(documentos,null,2)
    );


    res.json(documento);

  }
);


app.listen(3001, () => {

  console.log(
    "Servidor iniciado en http://localhost:3001"
  );

});