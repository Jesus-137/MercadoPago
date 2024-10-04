import { Historial } from "./Historial";

export interface Repository {
  getAll(): Promise<Historial[] | null>;
  update(
    uuid: string,
    fecha_busqueda: string,
    id_usuario: string,
    busqueda: string
  ): Promise<Historial | null>; 
}
