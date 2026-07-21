const pool = require("./database");

async function probarConexion() {
  try {
    const resultado = await pool.query("SELECT NOW()");
    console.log("✅ Conexión a PostgreSQL exitosa");
    console.log("Hora del servidor:", resultado.rows[0]);
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  } finally {
    await pool.end();
  }
}

probarConexion();