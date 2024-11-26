// src/application/usecases/UploadMediaUseCase.ts
interface IUploadMedia {
  uploadMedia(file: Express.Multer.File, type: 'image' | 'video'): Promise<string>;
}

class UploadMediaUseCase {
  constructor(private mediaUploader: IUploadMedia) {}

  async execute(file: Express.Multer.File, type: 'image' | 'video'): Promise<string> {
    if (!['image', 'video'].includes(type)) {
      throw new Error('Tipo de archivo no soportado');
    }

    return await this.mediaUploader.uploadMedia(file, type);
  }
}

export { UploadMediaUseCase, IUploadMedia };
