import { query } from "../../../database/mysql";
import { Auditoria } from "../../domian/Auditoria";
import { Repository } from "../../domian/Repository";

export class MysqlRepo implements Repository{
    async crear(
        uuid: string,
        tarjet: string,
        accion: string
    ): Promise<Auditoria | null> {
        const sql = 'INSERT INTO logs (uuid, tarjet, accion) VALUES (?, ?, ?);';
        const params: any = [uuid, tarjet, accion];
        try {
            const [resultado]: any = await query(sql, params);
            return new Auditoria(resultado.insertid, uuid, tarjet, accion, null, null);
        } catch (error) {
            return null
        }
    }
    async getAll(): Promise<Auditoria[] | null> {
        const sql = 'SELECT * FROM logs;';
        const params: any = []
        try {
            const [resultado]: any = await query(sql, params);
            const auditorias = Object.values(JSON.parse(JSON.stringify(resultado)));
            return auditorias.map((auditoria: any)=>
                new Auditoria(
                    auditoria[0].id,
                    auditoria[0].uuid,
                    auditoria[0].tarjet,
                    auditoria[0].accion,
                    auditoria[0].fecha_creacion,
                    auditoria[0].ultima_actualizacion
                )
            );
        } catch (error) {
            return null
        }
    }
    async getByuuid(uuid: string): Promise<Auditoria | null> {
        const sql = 'SELECT * FROM logs WHERE uuid = ?;';
        const [params]: any = [uuid]
        try {
            const [auditoria]: any = await query(sql, params);
            return new Auditoria(
                auditoria[0].id,
                auditoria[0].uuid,
                auditoria[0].tarjet,
                auditoria[0].accion,
                auditoria[0].fecha_creacion,
                auditoria[0].ultima_actualizacion,
            );
        } catch (error) {
            return null;
        }
    }

    async update(uuid: string, tarjet: string, accion: string): Promise<Auditoria | null> {
        const sql = 'UPDATE clientes SET tarjet=?, accion=? WHERE uuid=?;';
        const [params]: any = [tarjet, accion, uuid];
        try {
            const [auditoria]: any =  query(sql, params);
            return new Auditoria(
                auditoria.insertid,
                uuid,
                tarjet,
                accion,
                null,
                null
            )
        } catch (error) {
            return null
        }
    }
}