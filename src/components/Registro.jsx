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
    <div>
      <h1>Crear Cuenta</h1>

      <input
        placeholder="Matrícula"
        value={matricula}
        onChange={(e) => setMatricula(e.target.value)}
      />

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

      <select
  value={carrera}
  onChange={(e) => setCarrera(e.target.value)}
>
  <option value="">Selecciona tu carrera</option>

  {carreras.map((carrera) => (
  <option
    key={carrera.nombre}
    value={carrera.nombre}
  >
    {carrera.nombre}
  </option>
))}
</select>

      <input
        placeholder="CURP"
        value={curp}
        onChange={(e) => setCurp(e.target.value)}
      />

      <button onClick={guardarEstudiante}>
        Guardar
      </button>

      <button onClick={() => setPantalla('inicio')}>
        Volver al inicio
      </button>
    </div>
  )
}

export default Registro