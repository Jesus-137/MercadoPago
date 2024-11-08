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
    ): Promise<LeadsUser | null> {
        const sql = 'INSERT INTO leads (uuid, username, nombre, telefono, correo) values (?,?,?,?,?);'
        const [params]: any = [uuid, username, nombre, telefono, correo]
        try {
            const [resultado]: any = await query(sql, params);

            return new LeadsUser(
                resultado.insertid,
                uuid,
                username,
                nombre,
                telefono,
                correo
            )
        } catch (error) {
            return null
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