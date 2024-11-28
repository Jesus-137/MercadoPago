import { query } from './database';

export class Clientes_uuid{
    private user_id: string | undefined;
    constructor(){}

    async get (uuid: number):Promise<string|null>{
        const sql =  'SELECT uuid FROM clientes WHERE id=?'
        const params: any[] = [uuid]
        try {
            const [result]: any = await query(sql, params);
            console.log(JSON.parse(JSON.stringify(result))[0].uuid)
            this.user_id = JSON.parse(JSON.stringify(result))[0].uuid
            if (!this.user_id){
                return null
            }else{
                return this.user_id
            }
        } catch (error) {
            return null
        }
    }
}