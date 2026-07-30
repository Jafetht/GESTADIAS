import { useState } from "react";

function DocumentoPresentacion({
  alumnoActual,
  subirCartaPresentacion
}) {



const [archivo, setArchivo] = useState(null);
const [error, setError] = useState("");

return (
<div className="documento-card">
  
<h3>Fase 2</h3>
    
     

      <h4>Instrucciones para la Carta de Presentación</h4>

      <div className="instrucciones">
        <p className="texto-carta">
          La Dirección de Vinculación te otorga la carta de presentación de
          estadía que te acredita como alumno de la universidad en su último
          cuatrimestre.
        </p>

        <p className="texto-carta">
          Esta carta deberás entregarla a la organización donde realizarás tu
          estadía.
        </p>

        <ul>
          <li>Conserva el documento original que te entregaron en la reunión.</li>
          <li>No entregues el original a la organización.</li>
          <li>Entregar solamente COPIA DE LA CARTA.</li>
          <li>Escanéalo en PDF a COLOR.</li>
          <li>Para subirlo aquí</li>
          <li>Nombra el archivo como:</li>

          <strong>
            {alumnoActual.matricula}_PRESENTACION.pdf
          </strong>
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

const nombre = file.name
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toUpperCase();

const nombreEsperado =
  `${alumnoActual.matricula}_PRESENTACION.PDF`;

if (nombre !== nombreEsperado) {
  setError(
    `❌ El archivo debe llamarse: ${alumnoActual.matricula}_PRESENTACIÓN.pdf`
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
  disabled={!archivo}
  onClick={() => subirCartaPresentacion(archivo)}
>
  Subir PDF
</button>

      <p>
  Carta de Presentación:

  {
    alumnoActual.documentos.presentacion.archivo
    ? " ✅"
    : " ❌"
  }

</p>
    </div>
  );
}

export default DocumentoPresentacion;