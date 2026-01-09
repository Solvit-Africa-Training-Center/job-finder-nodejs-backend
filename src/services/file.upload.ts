// import {fileUpload} from  "../types/file.upload";
import { File } from '../database/models/files.model';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
export class FileUploadService {
  async uploadFile(filedata: any) {
    const file = await File.create(filedata);
    return file;
  }

  async getFileById(id: string) {
    const file = await File.findByPk(id);
    return file;
  }

  async deactivateFile(id: string) {
    const file = await File.findByPk(id);
    if (!file) {
      throw new Error('File not found');
    }

    file.isActive = false;
    await file.save();
    return file;
  }

  async updateFile(
    id: string,
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    size: number,
    folder = 'test_uploads',
  ) {
    const original = await File.findByPk(id);
    if (!original) {
      throw new Error('File not found');
    }

    // upload new file to cloudinary
    const result = await uploadToCloudinary(buffer, folder);

    // mark original as not primary (keep history)
    original.isPrimary = false;
    await original.save();

    const newFileData = {
      originalName,
      storedName: `jobFinder_${originalName}`,
      publicId: result.publicId,
      fileUrl: result.secureUrl,
      mimeType,
      fileSize: size,
      version: (original.version || 1) + 1,
      isPrimary: true,
      isActive: true,
      context: original.context || 'updated file',
      userId: original.userId,
    };

    const newFile = await File.create(newFileData as any);
    return newFile;
  }
}
