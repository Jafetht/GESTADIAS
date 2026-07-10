function Login({
  loginMatricula,
  setLoginMatricula,
  iniciarSesion,
  setPantalla
}) {
  return (
    <div>
      <h1>Iniciar Sesión</h1>

      <input
        placeholder="Matrícula"
        value={loginMatricula}
        onChange={(e) => setLoginMatricula(e.target.value)}
      />

      <button onClick={iniciarSesion}>
        Entrar
      </button>

      <button onClick={() => setPantalla('inicio')}>
        Volver al inicio
      </button>
    </div>
  )
}

export default Login