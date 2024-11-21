import { Historial } from "./Historial";

export interface Repository {
  getAll(): Promise<Historial[] | string>;
  update(
    uuid: string,
    id_usuario: number,
    busqueda: string
  ): Promise<Historial | string>; 
}
