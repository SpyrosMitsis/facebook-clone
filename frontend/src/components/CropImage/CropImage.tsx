import { signInFunctionParams } from "react-auth-kit/dist/types";
import axios from "../../api/axios";
import { dataURLtoFile } from "../DataUrlToFile/DataUrlToFile";

type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};


const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues
    image.src = url;
    console.log(image)
  });

const getRadianAngle = (degreeValue: number): number => {
  return (degreeValue * Math.PI) / 180;
};

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop,
  rotation: number = 0
): Promise<HTMLCanvasElement> {
  const image = await createImage(imageSrc);
  console.log('Hello')
  console.log(image)
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return canvas;
}

export const uploadCroppedImage = async (
  userId: number,
  destinationFolder: string,
  imageSrc: string,
  crop: PixelCrop | null,
): Promise<void> => {
  if (!crop || !imageSrc) {
    console.error("Crop or image source is missing.");
    return;
  }

  const canvas = await getCroppedImg(imageSrc, crop);
  const PROFILE_URL = `User/${destinationFolder}?userId=`

  canvas.toBlob(
    async (blob) => {
      if (!blob) {
        throw new Error('Canvas is empty');
      }

      // Prepare the FormData with the blob
      const formData = new FormData();
      formData.append('ProfilePic', blob, 'cropped-image.jpeg');

      const profile_url_with_user = PROFILE_URL + userId

      try {
        // Make the HTTP PATCH request using axios
        const response = await axios.patch(profile_url_with_user, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image uploaded successfully', response.data);
      } catch (error) {
        console.error('Error uploading image', error);
      }


    },
    "image/jpeg",
    0.66
  );
};

export const generateDownload = async (imageSrc: string, crop: PixelCrop | null): Promise<void> => {
  if (!crop || !imageSrc) {
    return;
  }

  const canvas = await getCroppedImg(imageSrc, crop);

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        throw new Error('Canvas is empty');
      }
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = "image.jpeg";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/jpeg",
    0.66
  );
};


