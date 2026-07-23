import { useState } from "react";

function DocumentoAceptacion({
  alumnoActual,
  subirCartaAceptacion
}) {



const [archivo, setArchivo] = useState(null);
const [error, setError] = useState("");

  return (<div className="documento-card">
    <>
<a
  href="/documentos/FORMATO CARTA DE ACEPTACIÓN EDITABLE MAYO-AGOSTO 2026.docx"
  download
  className="btn-descargar"
>
  📥 Descargar formato de Carta de Aceptación
</a>
      <h3>Fase 4</h3>

      <h4>Instrucciones para la Carta de aceptación</h4>

<div className="instrucciones">

  <p>
    La Carta de Aceptación será entregada por la organización donde realizarás 
    tu estadía, una vez que haya sido aceptado tu ingreso.
  </p>

<ul>
  <li>Descarga el formato editable proporcionado.</li>

  <li>
    Completa los datos correspondientes de la organización.
  </li>

  <li>
    Solicita a tu asesor responsable que firme la carta con 
    <strong> TINTA AZUL</strong>, ya que este documento será la versión original.
  </li>

  <li>
    Al recibir la Carta de Aceptación firmada, escanéala correctamente en formato 
    <strong> PDF A COLOR</strong>.
  </li>

   <li>
      Nombralo de esta manera: <strong>MATRICULA_ACEPTACIÓN</strong>
    </li>

</ul>

  <ul>
    <li>
      <strong>{alumnoActual.matricula}_ACEPTACIÓN.pdf</strong>
    </li>
   
  </ul>

</div>
      
      <input
  type="file"
  accept=".pdf,application/pdf"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("❌ Solo se permiten archivos PDF.");
      setArchivo(null);
      return;
    }
if (file.size > 5 * 1024 * 1024) {
  setError("❌ El archivo no debe superar los 5 MB.");
  setArchivo(null);
  return;
}

if (file.size === 0) {
  setError("❌ El archivo está vacío.");
  setArchivo(null);
  return;
}
    

const nombreOriginal = file.name.toUpperCase();

const nombreEsperado1 =
`${alumnoActual.matricula}_ACEPTACIÓN.PDF`;

const nombreEsperado2 =
`${alumnoActual.matricula}_ACEPTACION.PDF`;

if (
  nombreOriginal !== nombreEsperado1 &&
  nombreOriginal.normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== nombreEsperado2
) {
  setError(
`❌ El archivo debe llamarse: ${alumnoActual.matricula}_ACEPTACIÓN.pdf`
  );
  setArchivo(null);
  return;
}

    setError("");
    setArchivo(file);
  }}
/>
{error && <p className="error-documento">{error}</p>}

{archivo && (
  <p className="archivo-correcto">
    ✅ Archivo seleccionado: {archivo.name}
  </p>
)}

      <button
  disabled={!archivo || error !== ""}
  onClick={() => subirCartaAceptacion(archivo)}
>
  Subir Carta de Aceptación
</button>

      <p>
        Carta de Aceptación:
        {alumnoActual.documentos.aceptacion ? " ✅" : " ❌"}
      </p>
    </></div>
  );
}

export default DocumentoAceptacion;