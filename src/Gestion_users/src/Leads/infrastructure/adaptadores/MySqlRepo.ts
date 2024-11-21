import { query } from "../../../database/mysql";
import { LeadsUser } from "../../domain/LeadsUser";
import { Repository } from "../../domain/Repository";
import jwt from "jsonwebtoken";

export class MySqlRepo implements Repository{
    async crearTokenByid(uuid: string): Promise<string | null> {
        try {
            const secretKey = 'Cre4rT0kenForPagopay';
            const payload = {
                uuid: uuid
            }
            const token = await jwt.sign(payload, secretKey, {expiresIn: '1h'});
            if(token){
                return token;
            }else{
                return null;
            }
        } catch (error) {
            return null
        }
    }
    async crear(
        uuid: string,
        username: string,
        nombre: string,
        telefono: string,
        correo: string
    ): Promise<LeadsUser | string> {
        const sql = 'INSERT INTO leads (uuid, username, nombre, telefono, correo) VALUES (?,?,?,?,?);';
        const params: any[] = [uuid, username, nombre, telefono, correo]
        console.log(params[0])
        try {
            const resultado = await query(sql, params);
            const data = JSON.parse(JSON.stringify(resultado))
            if(data.status==200){
                return new LeadsUser(
                    data.data.insertid,
                    uuid,
                    username,
                    nombre,
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
    async crearToken(
        uuid: string,
        username: string,
        nombre: string,
        telefono: string
    ): Promise<string | null> {
        try {
            const secretKey = 'VerificarUsuario';
            const payload = {
                uuid: uuid,
                username: username,
                nombre: nombre,
                telefono: telefono
            }
            const token = await jwt.sign(payload, secretKey, {expiresIn: '1h'});
            if(token){
                return token;
            }else{
                return null;
            }
        } catch (error) {
            return null
        }
    }
    async verificar(
        tipo: string,
        data: any
    ): Promise<string | null> {
        try {
            if(tipo = 'usuario'){
                const sql = "INSERT INTO Usuarios (uuid, nombre, password, telefono) VALUES (?, ?, ?, ?)";
                const [params]: any = [data.uuid, data.nombre, data.password, data.telefono] 
                const verificado = await query(sql, params) 
                console.log(verificado)
            }else{
                const sql = "INSERT INTO clientes (uuid, nombre, password, tipo, telefono) VALUES (?, ?, ?, ?, ?)";
                const [params]: any = [data.uuid, data.nombre, data.password, data.tipo, data.telefono]
                const verificado = await query(sql, params)
                console.log(verificado)
            }
            return 'verificado';
        } catch (error) {
            return null;
        }
    }
}