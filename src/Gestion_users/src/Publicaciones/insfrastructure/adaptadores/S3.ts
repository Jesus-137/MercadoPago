// src/infrastructure/adapters/S3MediaUploader.ts
import AWS from 'aws-sdk';
import { IUploadMedia } from '../../application/UploadUseCase'; 
import path from 'path';

class S3MediaUploader implements IUploadMedia {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    this.s3 = new AWS.S3();
    this.bucketName = process.env.AWS_BUCKET_NAME || '';
  }

  async uploadMedia(file: Express.Multer.File, type: 'image' | 'video'): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    console.log(fileExtension);
    const key = `${type}s/${Date.now()}_${file.originalname}`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.upload(params).promise();

    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }
}

export { S3MediaUploader };
