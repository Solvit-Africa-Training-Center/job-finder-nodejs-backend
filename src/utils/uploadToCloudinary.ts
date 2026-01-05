import cloudinary from '../config/cloudinary';

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
): Promise<{ secureUrl: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    if (!buffer) {
      return reject(new Error('File buffer is required'));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'raw', // CVs = PDF/DOCX
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result) {
          return reject(new Error('Cloudinary upload failed'));
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    uploadStream.end(buffer);
  });
};
