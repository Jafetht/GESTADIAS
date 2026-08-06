import MenuAlumno from "../MenuAlumno";
import Organizaciones from "./Organizaciones";
import DocumentoPresentacion from "./DocumentoPresentacion";
import DocumentoAceptacion from "./DocumentoAceptacion";
import DocumentoCompromiso from "./DocumentoCompromiso";
import MenuMisDocumentos from "./MenuMisDocumentos";


function DashboardAlumno({
  alumnoActual,
  avisosAlumno,
  cerrarSesion,
  setPantalla,
  organizacionesFiltradas,
  seleccionarOrganizacion,
  continuarSinOrganizacion,
  solicitarCambioOrganizacion,
  registrarSolicitudOrganizacion,
  subirCartaPresentacion,
  subirCartaAceptacion,
  subirCartaCompromiso
}) {

  return (
<div className="alumno">
      <MenuAlumno
        alumnoActual={alumnoActual}
        cerrarSesion={cerrarSesion}
        setPantalla={setPantalla}
      />
      <h1>HOLA {alumnoActual.nombre}</h1>

      <h3>Tu avance en GESTADIAS</h3>
      {avisosAlumno.length > 0 && (
        <div className="avisos-alumno">
          <h3>📢 Avisos importantes</h3>

          {avisosAlumno.map((aviso, index) => (
            <p key={index} className="aviso-item">
              {aviso}
            </p>
          ))}
        </div>
      )}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h2>{alumnoActual.fase}</h2>
          <p>Fase actual</p>
        </div>

        <div className="kpi-card">
          <p>{alumnoActual.estatus}</p>

          <p>Estatus</p>
        </div>

        <div className="kpi-card">
          <p>{alumnoActual.organizacion || 'Ninguna'}</p>

          <p>Organización</p>
        </div>
      </div>
      {alumnoActual.fase <= 1 && (
        <Organizaciones
          alumnoActual={alumnoActual}
          organizacionesFiltradas={organizacionesFiltradas}
          seleccionarOrganizacion={seleccionarOrganizacion}
          continuarSinOrganizacion={continuarSinOrganizacion}
          solicitarCambioOrganizacion={solicitarCambioOrganizacion}
          registrarSolicitudOrganizacion={registrarSolicitudOrganizacion}
        />
      )}
      {alumnoActual.fase === 2 && (
        <DocumentoPresentacion
          alumnoActual={alumnoActual}
          subirCartaPresentacion={subirCartaPresentacion}
        />
      )}
{alumnoActual.fase === 3 && (
  <DocumentoAceptacion
    alumnoActual={alumnoActual}
    subirCartaAceptacion={subirCartaAceptacion}
  />
)}
{alumnoActual.fase === 4 && (
 <DocumentoCompromiso
  alumnoActual={alumnoActual}
  subirCartaCompromiso={subirCartaCompromiso}
 />
)}
      {alumnoActual.fase === 5 && (
        <div className="fase-final">

          <h3>🎉 Fase 5 - Estadía Activa</h3>

          <h4>¡Felicidades continúa con éxito tu Estadía Profesional!</h4>

          <p className="frase-motivacional">
            "Todo lo que te viniere a la mano para hacer, hazlo según tus fuerzas."
            <br />
            <strong>— Eclesiastés 9:10</strong>
          </p>

          <p>
            Tu estadía profesional ha sido activada correctamente.
            A partir de este momento podrás desarrollar tus actividades dentro de la organización asignada.
            Recuerda mantener comunicación con tu asesor académico y con tu asesor empresarial durante todo el proceso.
          </p>

          <div className="aviso-estadia">
            📌 Próximamente aquí podrás subir tu Carta de Terminación de Estadía y concluir tu proceso en GESTADIAS.
          </div>

          <div className="resumen-fases">

            <h4>Resumen de fases concluidas</h4>

            <ul>
              <li>✅ Organización seleccionada</li>
              <li>✅ Carta de Presentación entregada</li>
              <li>✅ Carta de Aceptación entregada</li>
              <li>✅ Carta Compromiso entregada</li>
              <li>✅ Estadía Profesional activa</li>
            </ul>

          </div>

        </div>
      )}
    </div>
  );

}

export default DashboardAlumno;