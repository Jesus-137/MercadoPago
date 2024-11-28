import { Request, Response } from "express";

import { GetAllUseCase } from "../../application/GetAllUseCase";
import { Clientes_Nombre } from "../../../../../ValueObjects/Cliente_nombre";
import { Publicaciones } from "../../domain/Publicaciones";
import { Clientes_uuid } from "../../../../../ValueObjects/Clientes_uuid";

export class GetAllClientesController {
  constructor(readonly getAllProductUseCase: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    try {
      let id_cliente = req.body.id_cliente
      if(!id_cliente){
        id_cliente = null
      }
      console.log('hola',id_cliente)
      const clientes = await this.getAllProductUseCase.run(id_cliente);
      if (typeof(clientes)!='string'){
        const nombres = new  Array();
        const uuids = new Array();
        for (let index = 0; index < clientes.length; index++) {
          const nombre = await new Clientes_Nombre().get(clientes[index].id_cliente)
          const uuid = await new Clientes_uuid().get(clientes[index].id_cliente)
          nombres.push(nombre)
          uuids.push(uuid)
        }
        console.log(nombres)
        res.status(200).send({
          status: "encontrados",
          data: clientes.map((cliente: Publicaciones, index: number) => {
            return {
              id: cliente.uuid,
              titulo: cliente.titulo,
              desripcion: cliente.descripcion,
              contenido: cliente.contenido,
              username_cliente: nombres[index],
              id_cliente: uuids[index]
            };
          }),
        });
      }
      else
        throw (clientes)
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(400).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}