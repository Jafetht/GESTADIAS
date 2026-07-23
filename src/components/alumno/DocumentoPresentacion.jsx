import { useState } from "react";

function DocumentoPresentacion({
  alumnoActual,
  subirCartaPresentacion
}) {



const [archivo, setArchivo] = useState(null);
const [error, setError] = useState("");

return (
<div className="documento-card">
  
<h3>Fase 2 - Entrega de Carta de Presentación</h3>
    
     

      <h4>Instrucciones para la Carta de Presentación</h4>

      <div className="instrucciones">
        <p>
          La Dirección de Vinculación te otorga la carta de presentación de
          estadía que te acredita como alumno de la universidad en su último
          cuatrimestre.
        </p>

        <p>
          Esta carta deberás entregarla a la organización donde realizarás tu
          estadía.
        </p>

        <ul>
          <li>Conserva el documento original.</li>
          <li>No entregues el original.</li>
          <li>Entregar solamente COPIA DE LA CARTA.</li>
          <li>Escanéalo en PDF a COLOR.</li>
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
  disabled={!archivo || error !== ""}
  onClick={() => subirCartaPresentacion(archivo)}
>
  Subir Carta de Presentación
</button>

      <p>
  Carta de Presentación:

  {alumnoActual.documentos.presentacion?.estado === "pendiente"
    ? " 🟡 Pendiente de revisión"
    : alumnoActual.documentos.presentacion?.estado === "aprobado"
    ? " 🟢 Aprobada"
    : alumnoActual.documentos.presentacion?.estado === "rechazado"
    ? " 🔴 Rechazada"
    : " ❌ No entregada"
  }

</p>
    </div>
  );
}

export default DocumentoPresentacion;