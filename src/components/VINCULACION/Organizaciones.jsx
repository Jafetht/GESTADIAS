import { useState } from "react";
import carreras from "../../Data/carreras";

function Organizaciones({
  organizaciones,
  setOrganizaciones
}) {

  const [organizacionEditando, setOrganizacionEditando] = useState(null);

  const [organizacionInformacion, setOrganizacionInformacion] = useState(null);

const [datosEditados, setDatosEditados] = useState({
  nombre: "",
  espaciosDisponibles: 0,
  carrerasRelacionadas: []
});


  const iniciarEdicion = (organizacion) => {

    setOrganizacionEditando(organizacion);

   setDatosEditados({
  nombre: organizacion.nombre,
  espaciosDisponibles: organizacion.espaciosDisponibles || 0,
  carrerasRelacionadas: organizacion.carrerasRelacionadas || []
});

  };


  const guardarCambios = () => {

    const actualizadas = organizaciones.map((organizacion) =>

      organizacion.id === organizacionEditando.id

        ? {
            ...organizacion,

            nombre: datosEditados.nombre,

            espaciosDisponibles:
              Number(datosEditados.espaciosDisponibles),

            carrerasRelacionadas: datosEditados.carrerasRelacionadas
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

            <th>Organizaciones disponibles</th>

            <th>Espacios disponibles</th>

            <th>Información</th>

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
                {organizacion.espaciosDisponibles || 0}
              </td>


              <td>

                <button
                  className="btn-info"
                  onClick={() =>
                    setOrganizacionInformacion(organizacion)
                  }
                >
                  Ver información
                </button>

              </td>


              <td>

                <button
                  className="btn-seleccionar"
                  onClick={() =>
                    iniciarEdicion(organizacion)
                  }
                >
                  ✏ Editar
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* MODAL INFORMACIÓN */}

      {organizacionInformacion && (

        <div className="modal-fondo">

          <div className="modal">

            <h2>
              {organizacionInformacion.nombre}
            </h2>


            <p>
              <strong>Dirección:</strong>{" "}
              {organizacionInformacion.direccion}
            </p>


            <p>
              <strong>Contacto:</strong>{" "}
              {organizacionInformacion.contacto}
            </p>


            <p>
              <strong>Puesto:</strong>{" "}
              {organizacionInformacion.puesto}
            </p>


            <p>
              <strong>Teléfono:</strong>{" "}
              {organizacionInformacion.telefono}
            </p>


<p>
  <strong>Correo:</strong>{" "}

  <a
    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      organizacionInformacion.correo
    )}&su=${encodeURIComponent(
      "Solicitud de espacios para Estadías Profesionales"
    )}&body=${encodeURIComponent(
`Buen día.

Por medio del presente, nos permitimos solicitar información sobre la disponibilidad de espacios para que estudiantes de la Universidad Tecnológica del Poniente puedan realizar su Estadía Profesional en su organización.

Agradecemos de antemano su atención y quedamos atentos a su respuesta.

Saludos cordiales.

Departamento de Vinculación
Universidad Tecnológica del Poniente`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="correo-link"
  >
    {organizacionInformacion.correo}
  </a>
</p>

            <p>
              <strong>Carreras relacionadas:</strong>{" "}
              {organizacionInformacion.carrerasRelacionadas?.join(", ")}
            </p>


            <button
              onClick={() =>
                setOrganizacionInformacion(null)
              }
            >
              Cerrar
            </button>

          </div>

        </div>

      )}


      {/* MODAL EDITAR */}

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
            <label>
  Carreras relacionadas
</label>

<div className="carreras-edicion">

  {carreras.map((carrera) => (

    <label
      key={carrera.nombre}
      className="carrera-checkbox"
    >

      <input
        type="checkbox"
        checked={datosEditados.carrerasRelacionadas.includes(
          carrera.nombre
        )}
        onChange={() => {

          const yaSeleccionada =
            datosEditados.carrerasRelacionadas.includes(
              carrera.nombre
            );

          setDatosEditados({

            ...datosEditados,

            carrerasRelacionadas: yaSeleccionada

              ? datosEditados.carrerasRelacionadas.filter(
                  (c) => c !== carrera.nombre
                )

              : [
                  ...datosEditados.carrerasRelacionadas,
                  carrera.nombre
                ]

          });

        }}
      />

      {carrera.nombre}

    </label>

  ))}

</div>


            <button
              onClick={guardarCambios}
            >
              💾 Guardar cambios
            </button>


            <button
              onClick={() =>
                setOrganizacionEditando(null)
              }
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