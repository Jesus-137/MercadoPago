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
    const data = {status: 200, data: result}
    return data;
  } catch (error: any) {
    // console.log(error);
    if (error.code === 'ER_DUP_ENTRY') {
      // console.error('Error: El username ya existe en la base de datos.');
      return { message: error.sqlMessage, status: 400 };
    } else {
      // console.error('Error inesperado:', error);
      return { message: 'Error interno del servidor.', status: 500 };
    }
  }
}
