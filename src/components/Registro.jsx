import carreras from '../data/carreras'


function Registro({
  matricula,
  setMatricula,
  nombre,
  setNombre,
  correo,
  setCorreo,
  carrera,
  setCarrera,
  curp,
  setCurp,
  periodo,
  setPeriodo,
  anio,
  setAnio,
  guardarEstudiante,
  setPantalla
}) {

const anioActual = new Date().getFullYear();

const años = Array.from(
  { length: 2100 - anioActual + 1 },
  (_, i) => anioActual + i
);

  return (

    <div className="registro-container">


      <div className="registro-card">


        <h1>
          Crear Cuenta del Estudiante
        </h1>


        <p className="registro-descripcion">
          Registra datos institucionales para que el estudiante inicie el proceso de Estadía Profesional.
        </p>




        <div className="seccion-registro">

          <h3>
            👤 Datos personales del estudiante
          </h3>


          <input
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />


          <input
            placeholder="Correo Institucional"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />


          <input
            placeholder="CURP"
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
          />


        </div>





        <div className="seccion-registro">


          <h3>
            🎓 Datos académicos
          </h3>


          <input
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />



          <select
            value={carrera}
            onChange={(e) => setCarrera(e.target.value)}
          >

            <option value="">
              Seleccion de carrera
            </option>


            {carreras.map((carrera) => (

              <option
                key={carrera.nombre}
                value={carrera.nombre}
              >

                {carrera.nombre}

              </option>

            ))}


          </select>

          <select
  value={periodo}
  onChange={(e) => setPeriodo(e.target.value)}
>
  <option value="">
    Seleccionar periodo
  </option>

  <option value="Enero - Abril">
    Enero - Abril
  </option>

  <option value="Mayo - Agosto">
    Mayo - Agosto
  </option>
</select>


<select
  value={anio}
  onChange={(e) => setAnio(e.target.value)}
>
  <option value="">
    Seleccionar año
  </option>

{años.map((año) => (
  <option
    key={año}
    value={año}
  >
    {año}
  </option>
))}

</select>

{periodo && (
  <div className="generacion-preview">

    <p>
      🎓 Nivel académico:
    </p>

    <strong>
      {periodo === "Enero - Abril"
        ? "Licenciatura"
        : "Técnico Superior Universitario (TSU)"
      }
    </strong>

  </div>
)}


{periodo && anio && (
  <div className="generacion-preview">

    <p>
      📅 Generación:
    </p>

    <strong>
      {periodo} {anio} - {
        periodo === "Enero - Abril"
          ? "Licenciatura"
          : "TSU"
      }
    </strong>

  </div>
)}


        </div>




        <button onClick={guardarEstudiante}>
          Crear cuenta del estudiante
        </button>


        <button 
          className="btn-regresar"
          onClick={() => setPantalla('inicio')}
        >
          Volver al inicio
        </button>


      </div>


    </div>

  )
}


export default Registro