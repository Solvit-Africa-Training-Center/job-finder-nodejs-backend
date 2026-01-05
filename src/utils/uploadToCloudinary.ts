import cloudinary from '../config/cloudinary';

type UploadResult = {
  secureUrl: string;
  publicId: string;
  resourceType: 'image' | 'video' | 'raw';
};

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  mimeType: string,
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    if (!buffer) {
      return reject(new Error('File buffer is required'));
    }

    if (!mimeType) {
      return reject(new Error('File mimeType is required'));
    }

    let resourceType: 'image' | 'video' | 'raw' = 'raw';

    if (mimeType.startsWith('image/')) {
      resourceType = 'image';
    } else if (mimeType.startsWith('video/')) {
      resourceType = 'video';
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) return reject(error);

        if (!result) {
          return reject(new Error('Cloudinary upload failed'));
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
          resourceType,
        });
      },
    );

    uploadStream.end(buffer);
  });
};
//      *
//     * *
//    * | *   Other team members will not need knowledge aboyt cloudinary
//   *  |  *   The just need to provide {buffer, folder, mimeType}
//  *   .   *
// ***********
