import { query } from './database';

export class Leads_Telefono{
    private user_id: number | undefined;
    constructor(){}

    async get (uuid: number):Promise<number|null>{
        const sql =  'SELECT telefono FROM leads WHERE id=?'
        const params: any[] = [uuid]
        try {
            const [result]: any = await query(sql, params);
            console.log(JSON.parse(JSON.stringify(result))[0].telefono)
            this.user_id = JSON.parse(JSON.stringify(result))[0].telefono
            if (!this.user_id){
                return null
            }else{
                return this.user_id
            }
        } catch (error) {
            return null
        }
    }

    async verify (id:number): Promise<boolean>{
        if(id == this.user_id){
            return true;
        }else{
            return false;
        }
    }
}