import { Response } from "express";
import { GetAllUseCase } from "../../application/GetAllUseCase";
import { Clientes } from "../../domain/Clientes";

export class GetAllController{
    constructor(private getAllUseCase: GetAllUseCase){}

    async run(res: Response){
        try {
            const clientes = await this.getAllUseCase.run();
            if(clientes){
                res.status(200).send({
                    status: 'Encontrado',
                    data: clientes.map((cliente: Clientes)=>({
                        id: cliente.uuid,
                        tipo: cliente.tipo,
                        tipo_evento: cliente.tipo_evento,
                        ubicacion: cliente.ubicacion,
                        generos: cliente.genero_musical
                    }))
                })
            }else{
                throw('Ocurio un error inesperado');
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msn: error
            })
        }
    }
}