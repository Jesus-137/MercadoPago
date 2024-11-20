import { connectToMongo } from "../../../database/mongo";
import { Auditoria } from "../../domian/Auditoria";
import { Repository } from "../../domian/Repository";

export class MongoRepo implements Repository {
    async crear(
        tarjet: string,
        accion: string
    ): Promise<Auditoria | null> {
        const doc = { tarjet, accion };
        try {
            const db = await connectToMongo();
            const resultado = await db.collection("logs").insertOne({
                ...doc,
                fecha_creacion: new Date()
            });
            console.log(resultado);
            return new Auditoria(resultado.insertedId.toString(), tarjet, accion, new Date().toString());
        } catch (error) {
            return null;
        }
    }

    async getAll(): Promise<Auditoria[] | null> {
        try {
            const db = await connectToMongo();
            const resultado = await db.collection("logs").find().toArray();
            return resultado.map((auditoria: any) =>
                new Auditoria(
                    auditoria._id.toString(),
                    auditoria.tarjet,
                    auditoria.accion,
                    auditoria.fecha_creacion
                )
            );
        } catch (error) {
            return null;
        }
    }

    async getByuuid(uuid: string): Promise<Auditoria | null> {
        try {
            const db = await connectToMongo();
            const auditoria = await db.collection("logs").findOne({ uuid });
            if (!auditoria) return null;

            return new Auditoria(
                auditoria._id.toString(),
                auditoria.tarjet,
                auditoria.accion,
                auditoria.fecha_creacion
            );
        } catch (error) {
            return null;
        }
    }
}
