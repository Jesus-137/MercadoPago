import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { Signale } from "signale";

dotenv.config();
const signale = new Signale();

const config = {
  uri: process.env.DB_URI || "mongodb://54.156.142.251:27017",
  database: process.env.DB_DATABASE_REGISTRO,
};

let client: MongoClient;

// Función para inicializar la conexión a MongoDB
export async function connectToMongo() {
  if (!client) {
    try {
      client = new MongoClient(config.uri);
      await client.connect();
      signale.success("Conexión exitosa a MongoDB");
    } catch (error) {
      signale.error("Error al conectar a MongoDB:", error);
      throw error;
    }
  }
  return client.db(config.database);
}

// Función para realizar consultas
export async function query(collectionName: string, queryObj: object) {
  try {
    const db = await connectToMongo();
    const collection = db.collection(collectionName);
    const result = await collection.find(queryObj).toArray();
    return result;
  } catch (error) {
    signale.error("Error en la consulta:", error);
    return null;
  }
}
