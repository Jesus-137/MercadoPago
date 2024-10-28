import { Historial } from "./Historial";

export interface Repository {
  getAll(): Promise<Historial[] | null>;
  update(
    uuid: string,
    id_usuario: number,
    busqueda: string
  ): Promise<Historial | null>; 
}
