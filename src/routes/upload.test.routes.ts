import { Router, Request, Response } from 'express';
import upload from '../middlewares/upload.middleware';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';

const UploadTestRouter = Router();

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
    } catch (error: any) {
      res.status(500).json({
        message: 'Upload failed',
        error: error.message,
      });
    }
  },
);

export default UploadTestRouter;
