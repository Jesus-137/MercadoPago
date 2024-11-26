// src/controllers/UploadMediaController.ts
import { Request, Response } from 'express';
import { UploadMediaUseCase } from '../../application/UploadUseCase'; 

class UploadMediaController {
  constructor(private uploadMediaUseCase: UploadMediaUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const file = req.file;
      const type = req.body.type; // "image" o "video"

      if (!file) {
        return res.status(400).json({ message: 'No se ha enviado ningún archivo' });
      }

      if (!['image', 'video'].includes(type)) {
        return res.status(400).json({ message: 'Tipo de archivo no soportado' });
      }

      const mediaUrl = await this.uploadMediaUseCase.execute(file, type);
      return res.status(200).json({ message: `${type} cargado exitosamente`, url: mediaUrl });
    } catch (error) {
      return res.status(500).json({ message: 'Error al cargar el archivo', error: error });
    }
  }
}

export { UploadMediaController };
