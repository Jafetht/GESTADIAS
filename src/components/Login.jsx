function Login({
  loginMatricula,
  setLoginMatricula,
  iniciarSesion,
  setPantalla
}) {
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>
          Iniciar Sesión
        </h1>


        <p className="login-descripcion">
          Ingresa tu matrícula institucional para acceder a tu proceso de Estadía Profesional.
        </p>


        <input
          placeholder="Matrícula"
          value={loginMatricula}
          onChange={(e) => setLoginMatricula(e.target.value)}
        />


        <button onClick={iniciarSesion}>
          Entrar
        </button>


        <button 
          onClick={() => setPantalla('inicio')}
          className="btn-regresar"
        >
          Volver al inicio
        </button>


      </div>

    </div>
  )
}

export default Login