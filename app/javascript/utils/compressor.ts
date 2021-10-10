
import Compressor from 'compressorjs';

export const compressor = async (image: File | Blob, options?: Compressor.Options): Promise<File | Blob> => {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      maxWidth: 800,
      maxHeight: 600,
      success: resolve,
      error: reject,
      ...options
    });
  });
}
