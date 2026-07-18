function MenuAlumno({
  alumnoActual,
  cerrarSesion,
  setPantalla
}) {

  return (
    <header className="menu-alumno">

      <div className="menu-info">

        <h2>
          GESTADIAS
        </h2>

        <p>
          {alumnoActual.nombre}
        </p>

        <span>
          Matrícula: {alumnoActual.matricula}
        </span>

      </div>


      <nav>

        <button onClick={() => setPantalla("alumno")}>
          🏠 Inicio
        </button>

        <button onClick={() => setPantalla("perfil")}>
          👤 Perfil
        </button>

        <button onClick={() => setPantalla("documentos")}>
          📄 Documentos
        </button>

        <button onClick={() => setPantalla("estadia")}>
          📌 Estadía
        </button>


        <button 
          className="btn-salir"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>

      </nav>

    </header>
  )
}

export default MenuAlumno