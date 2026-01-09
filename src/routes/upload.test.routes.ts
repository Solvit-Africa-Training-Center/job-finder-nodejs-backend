import express, { Router, Request, Response } from 'express';
import upload from '../middlewares/upload.middleware';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { FileUploadService } from '../services/file.upload';

const fileUploadService = new FileUploadService();
const UploadTestRouter: Router = express.Router();

UploadTestRouter.post(
  '/test-upload',
  upload.single('file'), // key name MUST be "file"
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const result = await uploadToCloudinary(req.file.buffer, 'test_uploads');

      res.status(200).json({
        message: 'Upload successful',
        data: {
          originalName: req.file.originalname,
          mimeType: req.file.mimetype,
          size: req.file.size,
          cloudinary: result,
        },
      });

      const fileData = {
        originalName: req.file.originalname,
        storedName: 'jobFinder_' + req.file.originalname,
        publicId: result.publicId,
        fileUrl: result.secureUrl,
        mimeType: req.file.mimetype,
        fileSize: req.file.size,
        version: 1,
        isPrimary: true,
        isActive: true,
        context: 'test upload',
        //uuid userId
        userId: '123e4567-e89b-12d3-a456-426614174000',
      };
      fileUploadService.uploadFile(fileData);
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json({
        message,
      });
    }
  },
);

UploadTestRouter.get(
  '/test-upload/:id',
  async (req: Request, res: Response) => {
    try {
      const fileId = req.params.id;
      const fileRecord = await fileUploadService.getFileById(fileId);
      if (!fileRecord) {
        return res.status(404).json({ message: 'File not found' });
      }
      res.status(200).json({
        message: 'File retrieved successfully',
        data: fileRecord,
      });
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json({
        message,
      });
    }
  },
);

// Update (versioning) File Endpoint
UploadTestRouter.put(
  '/test-upload/:id',
  upload.single('file'), // key name MUST be "file"
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const fileId = req.params.id;
      const newFile = await fileUploadService.updateFile(
        fileId,
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        req.file.size,
      );

      res.status(200).json({
        message: 'File updated (new version) successfully',
        data: newFile,
      });
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json({ message });
    }
  },
);

// Deactivate (Soft Delete) File Endpoint
UploadTestRouter.put(
  '/test-upload/:id/deactivate',
  async (req: Request, res: Response) => {
    try {
      const fileId = req.params.id;
      const deactivatedFile = await fileUploadService.deactivateFile(fileId);

      res.status(200).json({
        message: 'File deactivated successfully',
        data: deactivatedFile,
      });
    } catch (error) {
      const { message } = error as Error;
      res.status(500).json({
        message,
      });
    }
  },
);

export default UploadTestRouter;
