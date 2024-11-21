import { Server } from '../../domain/server';
import axios from 'axios';

export class HttpServiceAdapter implements Server {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async execute(request: any): Promise<any> {
    const { method, url, body } = request;
    const response = await axios({
      method,
      url: `${this.baseUrl}${url}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: body,
    });
    return response.data;
  }
}
