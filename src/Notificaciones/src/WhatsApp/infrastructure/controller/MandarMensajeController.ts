import { Request, Response } from "express";
import { MandarMensajeUseCase } from "../../aplication/MandarMensajeUseCase";
import { consumeMessages } from "../../../../../Rabbit/ConsumeUseCase"; 
import { Leads_Id } from "../../../../../ValueObjects/Leads_id"; 

export class MandarMensajeController {
  constructor(private mandarMensajeUseCase: MandarMensajeUseCase) {
    // Inicia el consumo de mensajes
    consumeMessages('notificacion', async (msg: string) => {
        const data = JSON.parse(msg)
        if (data.sendBy = 'whatsapp'){
          await this.mandarMensajeUseCase.run(data.id, data.telefono);
        }
    });
  }

  async run(req: Request, res: Response) {
    const data = req.body;
    const uuid = req.params.uuid;
    try {
      const leads_id = new Leads_Id()
      if (await leads_id.get(uuid)!=null){
        const whatsapp = await this.mandarMensajeUseCase.run(uuid, data.telefono);
        if (whatsapp) {
          res.status(201).send({
            status: 'creado',
            data: {
              code: whatsapp.code
            }
          });
        } else {
          throw ("Ocurrió un error desconocido");
        }
      }else{
        throw ('No se encontro al usuario verificar el id')
      }
    } catch (error) {
      res.status(400).send({
        status: "Error",
        msn: error
      });
    }
  }
}
