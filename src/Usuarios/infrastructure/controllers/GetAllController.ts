import { Request, Response } from "express";
import { GetAllUseCase } from "../../application/GetAllUseCase";

export class GetAllController{
    constructor(readonly getAllUseCase: GetAllUseCase){}

    async run(req: Request, res: Response){
        const filtros = req.query;
        try {
            const usuarios = await this.getAllUseCase.run();
            if(usuarios){
                if (filtros){
                    let usuariosFiltrados = usuarios;

                    Object.keys(filtros).forEach((key) => {
                        if (key !== 'fields') { // Ignorar el campo 'campos' si está presente
                          usuariosFiltrados = usuariosFiltrados.filter((cliente: any) => {
                            return cliente[key] && String(cliente[key]) === String(filtros[key]);
                          });
                        }
                    });

                    if(!(usuariosFiltrados.length>0)){
                        res.status(400).send({
                            status: 'No encontrado',
                            msn: 'No se encontro el usuario'
                        })
                    }else{
                        res.status(200).send({
                            status: 'encontrado',
                            data: usuariosFiltrados.map((usuario)=>({
                                id: usuario.uuid,
                                nombre: usuario.nombre,
                                telefono: usuario.telefono
                            }))
                        })
                    }
                }else{
                    res.status(200).send({
                        status: 'encontrado',
                        data: usuarios.map((usuario)=>({
                            id: usuario.uuid,
                            nombre: usuario.nombre,
                            telefono: usuario.telefono
                        }))
                    })
                }
            }else{
                res.status(400).send({
                    status: 'error',
                    msn: 'ocurio un error desconocido'
                })
            }
        } catch (error) {
            res.status(400).send({
                status: 'error',
                msn: error
            })
        }
    }
}