import { Server } from "../domain/server";

export class ExecuteUseCase{
  private service: Server;

  constructor(service: Server) {
    this.service = service;
  }

  async handleRequest(request: any): Promise<any> {
    return await this.service.execute(request);
  }
}