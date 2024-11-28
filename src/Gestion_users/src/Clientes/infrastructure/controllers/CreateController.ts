import { Request, Response } from "express";

import { CreateUseCase } from "../../application/CreateUseCase";
import { Leads_Id } from "../../../../../ValueObjects/Leads_id";

export class CreateController {
  constructor(readonly CreateUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log(data)
    try {
      if (data.foto_perfil&&data.id_lead&&data.tipo&&data.generos&&data.nombre&&data.password&&data.ubicacion&&data.tipo_evento){
        const id_lead = await new Leads_Id().get(data.id_lead)
        if(id_lead==null){
          throw('no se encontro el contacto')
        }
        const clientes = await this.CreateUseCase.run(
          id_lead,
          data.foto_perfil,
          data.nombre,
          data.password,
          data.tipo,
          data.generos,
          data.ubicacion,
          data.tipo_evento
        );
        if (typeof(clientes)=='object'){
          res.status(200).send({
              id: clientes.uuid,
              nombre: clientes.nombre,
              tipo: clientes.tipo,
              tipo_evento: clientes.tipo_evento,
              generos: clientes.genero_musical,
              ubicacion: clientes.ubicacion
            });
        }else{
          throw(`${clientes}`)
        }
      }else{
        throw ('Campos insuficientes por farvor de verificarlos')
      }
    } catch (error) {
      res.status(400).send({
        status: "error",
        data: error,
      });
    }
  }
}
