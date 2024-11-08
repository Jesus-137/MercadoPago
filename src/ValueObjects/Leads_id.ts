import { query } from './database';

export class Leads_Id{
    private user_id: number | undefined;
    constructor(){}

    async get (uuid: string):Promise<number|null>{
        const sql =  'SELECT id FROM leads WHERE uuid=?'
        const params: any[] = [uuid]
        try {
            const [result]: any = await query(sql, params);
            console.log(JSON.parse(JSON.stringify(result))[0].id)
            this.user_id = parseInt(JSON.parse(JSON.stringify(result))[0].id)
            if (isNaN(this.user_id)){
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