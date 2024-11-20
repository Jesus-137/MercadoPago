import { query } from "../../../database/mysql";
import { Tokens } from "../../domain/Tokens";
import { Repository } from "../../domain/Repository";

export class MySQL implements Repository{
    async crear(uuid: string, token: string, habilitado: boolean): Promise<Tokens | null> {
        const sql = 'INSERT INTO tokens (uuid, token, habilitado) VALUES (?, ?, ?);';
        const [params]: any = [uuid, token, habilitado];
        try {
            const [tokens]: any = await query(sql, params);
            return new Tokens(
                tokens.insertid,
                uuid,
                token,
                habilitado,
                null,
                null
            );
        } catch (error) {
            return null;
        }
    }

    async getAll(): Promise<Tokens[] | null> {
        const sql = 'SELECT * FROM tokens;';
        const [params]: any = []
        try {
            const [result]: any = query(sql, params);
            const tokens = Object.values(JSON.parse(JSON.stringify(result)));
            return tokens.map((token: any)=>(
                new Tokens(
                    token.id,
                    token.uuid,
                    token.token,
                    token.habilitado,
                    token.fecha_creacion,
                    token.ultima_actualizacion,
                )
            ));
        } catch (error) {
            return null;
        }
    }

    async update(habilitado: boolean, uuid: string): Promise<string | null> {
        const sql = "UPDATE tokens SET habilitado WHERE uuid=?;";
        const [params]: any = [habilitado, uuid];
        try {
            const [respuesta]: any = query(sql, params);
            console.log(respuesta);
            return 'Se actualizo el token';
        } catch (error) {
            return null;
        }
    }
}