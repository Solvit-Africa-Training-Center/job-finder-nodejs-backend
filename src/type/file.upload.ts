export interface fileUpload {
  originalName: string;
  storedName: string;
  publicId: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  version: number;
  isprimary: boolean;
  isActive: boolean;
  context: string;
}
