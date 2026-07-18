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
  guardarEstudiante,
  setPantalla
}) {
  return (

    <div className="registro-container">


      <div className="registro-card">


        <h1>
          Crear Cuenta
        </h1>


        <p className="registro-descripcion">
          Registra tus datos institucionales para iniciar tu proceso de Estadía Profesional.
        </p>




        <div className="seccion-registro">

          <h3>
            👤 Datos personales
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
              Selecciona tu carrera
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


        </div>




        <button onClick={guardarEstudiante}>
          Crear cuenta
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