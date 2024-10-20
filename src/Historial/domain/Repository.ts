import { Historial } from "./Historial";

export interface Repository {
  getAll(): Promise<Historial[] | null>;
  update(
    uuid: string,
    id_usuario: string,
    busqueda: string
  ): Promise<Historial | null>; 
}
