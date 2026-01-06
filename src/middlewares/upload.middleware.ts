import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 90 * 1024 * 1024 }, // 90 MB
});

export default upload;
