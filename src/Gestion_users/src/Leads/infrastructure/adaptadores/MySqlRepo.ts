import { query } from "../../../database/mysql";
import { LeadsUser } from "../../domain/LeadsUser";
import { Repository } from "../../domain/Repository";

export class MySqlRepo implements Repository{
    
    async crear(
        uuid: string,
        username: string,
        telefono: string,
        correo: string
    ): Promise<LeadsUser | string> {
        const sql = 'INSERT INTO leads (uuid, username, telefono, correo) VALUES (?,?,?,?);';
        const params: any[] = [uuid, username, telefono, correo]
        console.log(params[0])
        try {
            const resultado = await query(sql, params);
            const data = JSON.parse(JSON.stringify(resultado))
            if(data.status==200){
                return new LeadsUser(
                    data.data.insertid,
                    uuid,
                    username,
                    telefono,
                    correo
                )
            }else{
                throw(data.message)
            }
        } catch (error) {
            return String(error);
        }
    }
}