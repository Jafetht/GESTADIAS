import { useState } from "react";

function Organizaciones({
  organizaciones,
  setOrganizaciones
}) {

  const [organizacionEditando, setOrganizacionEditando] = useState(null);

  const [datosEditados, setDatosEditados] = useState({
    nombre: "",
    espaciosDisponibles: 0
  });


  const iniciarEdicion = (organizacion) => {

    setOrganizacionEditando(organizacion);

    setDatosEditados({
      nombre: organizacion.nombre,
      espaciosDisponibles: organizacion.espaciosDisponibles || 0
    });

  };


  const guardarCambios = () => {

    const actualizadas = organizaciones.map((organizacion) =>

      organizacion.id === organizacionEditando.id

        ? {
            ...organizacion,

            nombre: datosEditados.nombre,

            espaciosDisponibles:
              Number(datosEditados.espaciosDisponibles)
          }

        : organizacion

    );

    setOrganizaciones(actualizadas);

    setOrganizacionEditando(null);

  };


  return (

    <div className="modulo-organizaciones">

      <h2>🏢 Padrón de Organizaciones</h2>

      <p>
        Administra las organizaciones disponibles para las Estadías Profesionales.
      </p>


      <table className="tabla-organizaciones">

        <thead>

          <tr>

            <th>No.</th>

            <th>Organización</th>

            <th>Carreras relacionadas</th>

            <th>Espacios disponibles</th>

            <th>Acciones</th>

          </tr>

        </thead>


        <tbody>

          {organizaciones.map((organizacion, index) => (

            <tr key={organizacion.id || index}>

              <td>
                {index + 1}
              </td>


              <td>
                {organizacion.nombre}
              </td>


              <td>
                {organizacion.carrerasRelacionadas?.join(", ")}
              </td>


              <td>
                {organizacion.espaciosDisponibles || 0}
              </td>


              <td>

                <button
                  onClick={() => iniciarEdicion(organizacion)}
                >
                  ✏ Editar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {organizacionEditando && (

        <div className="modal-fondo">

          <div className="modal">

            <h2>
              ✏ Editar organización
            </h2>


            <label>
              Nombre de la organización
            </label>

            <input
              value={datosEditados.nombre}
              onChange={(e) =>
                setDatosEditados({
                  ...datosEditados,
                  nombre: e.target.value
                })
              }
            />


            <label>
              Espacios disponibles
            </label>

            <input
              type="number"
              min="0"
              value={datosEditados.espaciosDisponibles}
              onChange={(e) =>
                setDatosEditados({
                  ...datosEditados,
                  espaciosDisponibles: e.target.value
                })
              }
            />


            <button
              onClick={guardarCambios}
            >
              💾 Guardar cambios
            </button>


            <button
              onClick={() => setOrganizacionEditando(null)}
            >
              Cancelar
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default Organizaciones;