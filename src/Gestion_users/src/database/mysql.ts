import dotenv from "dotenv";
import mysql from "mysql2/promise";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};

// Crear el pool de conexiones
const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]) {
  try {
    const conn = await pool.getConnection();
    signale.success("Conexión exitosa a la BD");
    const result = await conn.execute(sql, params);
    conn.release();
    return { status: 200, data: result };
  } catch (error: any) {
    console.error(error);
    if (error.code === "ER_DUP_ENTRY") {
      // Extraer el campo del mensaje de error
      const match = error.sqlMessage.match(/for key '.*\.(.*)'/);
      const field = match ? match[1] : "valor único";
      return { message: `El campo '${field}' ya existe.`, status: 400 };
    } else {
      return { message: "Error interno del servidor.", status: 500 };
    }
  }
}
