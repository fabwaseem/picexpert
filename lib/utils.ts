import { DetailedFile, SettingsProps } from "@/types";
import clsx, { ClassValue } from "clsx";
import JSZip from "jszip";
import { MutableRefObject, Dispatch as ReactDispatch } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDimensions = (ratio: {
  width: number;
  height: number;
}) => {
  let width = 200;
  let height = 200;
  if (ratio.width > ratio.height) {
    height = (width * ratio.height) / ratio.width;
  } else {
    width = (height * ratio.width) / ratio.height;
  }
  return { width, height };
};

export const convertToDetailedFile = (
  file: File
): Promise<DetailedFile | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = async () => {
        const width = image.width;
        const height = image.height;
        const aspectRatio = width / height;
        const maxWidth = 400;
        const maxHeight = 400;

        let targetWidth = width;
        let targetHeight = height;

        if (width > maxWidth || height > maxHeight) {
          if (aspectRatio > 1) {
            targetWidth = maxWidth;
            targetHeight = maxWidth / aspectRatio;
          } else {
            targetWidth = maxHeight * aspectRatio;
            targetHeight = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

        const previewUrl = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG format for smaller size
        const detailedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          width: width,
          height: height,
          dotIndex: file.name.lastIndexOf("."),
          baseName: file.name.substring(0, file.name.lastIndexOf(".")),
          extension: file.name.substring(file.name.lastIndexOf(".") + 1),
          url: URL.createObjectURL(file),
          previewUrl: previewUrl,
          crop: {
            unit: "%" as "%",
            x: 0,
            y: 0,
            width: 0,
            height: 0,
          },
          generatedImage: "",
        };
        resolve(detailedFile);
      };
      image.onerror = () => {
        resolve(null);
      };
    };
  });
};

export const isSupported = (file: File): boolean => {
  const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
  return ["jpg", "jpeg", "png", "webp"].indexOf(ext.toLowerCase()) > -1;
};

export const validateImageURL = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
  });
};

export const getTruncatedName = (name: string): string => {
  let nameWithoutExtension = name.substring(0, name.lastIndexOf("."));
  let extension = name.substring(name.lastIndexOf("."));
  let truncatedName =
    nameWithoutExtension.length > 10
      ? nameWithoutExtension.slice(0, 10) + ".."
      : nameWithoutExtension;
  return truncatedName + extension;
};

export const calculateAspectRatio = (width: number, height: number): number => {
  if (width === 0 || height === 0 || isNaN(width) || isNaN(height)) {
    return 1;
  }
  const gcd = (a: number, b: number): number => {
    if (b < 0.0000001) {
      return a;
    }
    return gcd(b, Math.floor(a % b));
  };
  const divisor = gcd(width, height);
  width /= divisor;
  height /= divisor;
  return width / height;
};

// function to retun aspect ratio as 1:2
export const getAspectRatio = (width: number, height: number): string => {
  if (width === 0 || height === 0 || isNaN(width) || isNaN(height)) {
    return "1:1";
  }
  const gcd = (a: number, b: number): number => {
    if (b < 0.0000001) {
      return a;
    }
    return gcd(b, Math.floor(a % b));
  };
  const divisor = gcd(width, height);
  width /= divisor;
  height /= divisor;
  return `${width}:${height}`;
};

export const expandImage = (
  file: DetailedFile,
  settings: SettingsProps,
  isPreview: boolean
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // **1. Setup OffscreenCanvas for image manipulation**
      const canvas = new OffscreenCanvas(settings.width, settings.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      // **2. Load the image using createImageBitmap**
      const response = await fetch(file.url);
      const blob = await response.blob();
      const imgBitmap = await createImageBitmap(blob);

      // **3. Extract dimensions and units from settings**
      const dimensionsUnit = settings.currentUnit;
      let width = settings.width > 0 ? settings.width : 50;
      let height = settings.height > 0 ? settings.height : 50;

      // Apply quality setting
      width = width * settings.download.quality;
      height = height * settings.download.quality;

      const canvasAspectRatio = width / height;

      // **4. Calculate aspect ratio and scaled dimensions**
      const aspectRatio = Math.min(
        width / imgBitmap.width,
        height / imgBitmap.height
      );
      const scaledWidth = imgBitmap.width * aspectRatio;
      const scaledHeight = imgBitmap.height * aspectRatio;

      // **5. Calculate offsets to center the image**
      const x = (width - scaledWidth) / 2;
      const y = (height - scaledHeight) / 2;

      // **6. Set canvas dimensions**
      canvas.width = width;
      canvas.height = height;

      // **7. Handle background fill options**
      if (settings.background.type === "solid") {
        ctx.fillStyle = settings.background.solid.color;
        ctx.fillRect(0, 0, width, height);
      } else if (settings.download.format === "jpg") {
        ctx.fillStyle = "#fff"; // White default background for JPEG
        ctx.fillRect(0, 0, width, height);
      }

      // **8. Apply background blur (optional)**
      if (settings.background.type === "blur") {
        ctx.filter = `blur(${settings.background.blurStrength}px)`;
        ctx.drawImage(imgBitmap, 0, 0, width, height); // Blur entire canvas
        ctx.filter = "none"; // Reset filter
      }

      // **8.1 Apply background image (optional)**
      if (
        settings.background.type === "image" &&
        settings.background.image.image
      ) {
        const response = await fetch(settings.background.image.image?.url + "");
        const blob = await response.blob();
        const bgImage = await createImageBitmap(blob);
        const fit = settings.background.image.fit;
        let bgWidth = width;
        let bgHeight = height;
        let bgX = 0;
        let bgY = 0;
        const imgRatio = bgImage.width / bgImage.height;
        const canvasRatio = width / height;
        if (fit === "fit") {
          if (imgRatio > canvasRatio) {
            bgWidth = width;
            bgHeight = width / imgRatio;
            bgY = (height - bgHeight) / 2;
          } else {
            bgHeight = height;
            bgWidth = height * imgRatio;
            bgX = (width - bgWidth) / 2;
          }
        } else if (fit === "fill") {
          if (imgRatio > canvasRatio) {
            bgHeight = height;
            bgWidth = height * imgRatio;
            bgX = (width - bgWidth) / 2;
          } else {
            bgWidth = width;
            bgHeight = width / imgRatio;
            bgY = (height - bgHeight) / 2;
          }
        } else if (fit === "stretch") {
          bgWidth = width;
          bgHeight = height;
        } else if (fit === "repeat") {
          for (let i = 0; i <= width; i += bgImage.width) {
            for (let j = 0; j <= height; j += bgImage.height) {
              ctx.drawImage(bgImage, i, j);
            }
          }
        }
        if (fit !== "repeat") {
          ctx.drawImage(bgImage, bgX, bgY, bgWidth, bgHeight);
        }
      }

      // **9. Draw the image with a border radius (centered)**
      const borderRadius = settings.border.radius;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + borderRadius, y);
      ctx.lineTo(x + scaledWidth - borderRadius, y);
      ctx.quadraticCurveTo(
        x + scaledWidth,
        y,
        x + scaledWidth,
        y + borderRadius
      );
      ctx.lineTo(x + scaledWidth, y + scaledHeight - borderRadius);
      ctx.quadraticCurveTo(
        x + scaledWidth,
        y + scaledHeight,
        x + scaledWidth - borderRadius,
        y + scaledHeight
      );
      ctx.lineTo(x + borderRadius, y + scaledHeight);
      ctx.quadraticCurveTo(
        x,
        y + scaledHeight,
        x,
        y + scaledHeight - borderRadius
      );
      ctx.lineTo(x, y + borderRadius);
      ctx.quadraticCurveTo(x, y, x + borderRadius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(imgBitmap, x, y, scaledWidth, scaledHeight);
      ctx.restore();

      // Draw watermark (optional) - now after everything else
      if (settings.watermark?.enabled) {
        const opacity = settings.watermark.opacity;
        let size = (settings.watermark.size * Math.min(width, height)) / 100; // Size as percentage of smaller dimension
        const positionX = (settings.watermark.position.x / 100) * width; // Convert percentage to actual position
        const positionY = (settings.watermark.position.y / 100) * height; // Convert percentage to actual position

        ctx.save(); // Save the current canvas state
        ctx.globalAlpha = opacity;

        if (settings.watermark.type === "image" && settings.watermark.image) {
          const response = await fetch(settings.watermark.image.url + "");
          const blob = await response.blob();
          const watermark = await createImageBitmap(blob);
          let wmWidth = size;
          let wmHeight = (size / watermark.width) * watermark.height;

          ctx.drawImage(
            watermark,
            positionX - wmWidth / 2,
            positionY - wmHeight / 2,
            wmWidth,
            wmHeight
          );
        } else if (
          settings.watermark.type === "text" &&
          settings.watermark.text.text
        ) {
          const text = settings.watermark.text.text;
          const font = settings.watermark.text.font;
          const color = settings.watermark.text.color;
          ctx.font = `${size}px ${font}`;
          ctx.fillStyle = color;
          let textWidth = ctx.measureText(text).width;
          let textHeight = size;

          ctx.fillText(
            text,
            positionX - textWidth / 2,
            positionY + textHeight / 2
          );
        }

        ctx.restore(); // Restore the previous canvas state (resets globalAlpha)
      }

      // **11. Convert canvas to a PNG data URL**
      const blobOutput = await canvas.convertToBlob({ type: "image/png" });
      const fullSizeDataURL = URL.createObjectURL(blobOutput);

      // **12. Create preview if needed**
      if (isPreview) {
        const previewCanvas = new OffscreenCanvas(400, 400);
        const previewCtx = previewCanvas.getContext("2d");
        if (!previewCtx)
          throw new Error("Failed to get preview canvas context");

        const previewAspectRatio = width / height;
        let previewWidth, previewHeight;

        if (previewAspectRatio > 1) {
          previewWidth = 400;
          previewHeight = 400 / previewAspectRatio;
        } else {
          previewHeight = 400;
          previewWidth = 400 * previewAspectRatio;
        }

        previewCanvas.width = previewWidth;
        previewCanvas.height = previewHeight;

        previewCtx.drawImage(
          canvas,
          0,
          0,
          width,
          height,
          0,
          0,
          previewWidth,
          previewHeight
        );

        const previewBlobOutput = await previewCanvas.convertToBlob({
          type: "image/png",
        });
        resolve(URL.createObjectURL(previewBlobOutput));
      } else {
        resolve(fullSizeDataURL);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const generateCropped = (
  file: DetailedFile,
  settings: SettingsProps
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const blob = await fetch(file.url).then((res) => res.blob());
      const imgBitmap = await createImageBitmap(blob);

      const crop = file.crop;
      let targetWidth = settings.width;
      let targetHeight = settings.height;

      let cropWidth = (crop.width / 100) * imgBitmap.width;
      let cropHeight = (crop.height / 100) * imgBitmap.height;
      let cropX = (crop.x / 100) * imgBitmap.width;
      let cropY = (crop.y / 100) * imgBitmap.height;

      // Adjust crop dimensions to stay within image bounds
      if (cropWidth > imgBitmap.width) {
        cropWidth = imgBitmap.width;
      }
      if (cropHeight > imgBitmap.height) {
        cropHeight = imgBitmap.height;
      }

      // Adjust target dimensions if custom cropping is enabled
      targetWidth = settings.customCrop ? cropWidth : targetWidth;
      targetHeight = settings.customCrop ? cropHeight : targetHeight;

      targetWidth = targetWidth * settings.download.quality;
      targetHeight = targetHeight * settings.download.quality;

      const canvas = new OffscreenCanvas(targetWidth, targetHeight);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to get canvas context");

      // Handle background fill options
      if (settings.download.format === "jpg") {
        ctx.fillStyle = "#fff"; // White background for JPEG
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // Calculate scaling for cropped image to fill the target area
      const scaleX = targetWidth / cropWidth;
      const scaleY = targetHeight / cropHeight;
      const scale = Math.max(scaleX, scaleY);

      const scaledWidth = cropWidth * scale;
      const scaledHeight = cropHeight * scale;

      // Calculate offsets for centering
      const offsetX = (targetWidth - scaledWidth) / 2;
      const offsetY = (targetHeight - scaledHeight) / 2;

      // Draw the border radius
      const borderRadius = settings.border.radius;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(offsetX + borderRadius, offsetY);
      ctx.lineTo(offsetX + scaledWidth - borderRadius, offsetY);
      ctx.quadraticCurveTo(
        offsetX + scaledWidth,
        offsetY,
        offsetX + scaledWidth,
        offsetY + borderRadius
      );
      ctx.lineTo(offsetX + scaledWidth, offsetY + scaledHeight - borderRadius);
      ctx.quadraticCurveTo(
        offsetX + scaledWidth,
        offsetY + scaledHeight,
        offsetX + scaledWidth - borderRadius,
        offsetY + scaledHeight
      );
      ctx.lineTo(offsetX + borderRadius, offsetY + scaledHeight);
      ctx.quadraticCurveTo(
        offsetX,
        offsetY + scaledHeight,
        offsetX,
        offsetY + scaledHeight - borderRadius
      );
      ctx.lineTo(offsetX, offsetY + borderRadius);
      ctx.quadraticCurveTo(offsetX, offsetY, offsetX + borderRadius, offsetY);
      ctx.closePath();
      ctx.clip();

      // Draw the cropped and scaled image onto the canvas
      ctx.drawImage(
        imgBitmap,
        cropX,
        cropY, // Source rectangle
        cropWidth,
        cropHeight, // Source dimensions
        offsetX,
        offsetY, // Destination coordinates
        scaledWidth,
        scaledHeight // Destination dimensions
      );

      // Generate blob URL and resolve the promise
      const croppedBlob = await canvas.convertToBlob({ type: "image/png" });
      resolve(URL.createObjectURL(croppedBlob));
    } catch (error) {
      reject(error);
    }
  });
};

export const downloadSingleImage = async (
  file: DetailedFile,
  settings: SettingsProps
) => {
  const blobUrl = file.generatedImage;
  const extension = settings.download.format;
  const fileName = `picExpert.net_${file.baseName}`;
  let fileNameWithExtension = `${fileName}.${extension}`;
  fetch(blobUrl)
    .then((res) => res.blob())
    .then((blob) => {
      saveAs(blob, fileNameWithExtension);
    });
};

export const downloadZip = async (
  files: DetailedFile[],
  settings: SettingsProps
) => {
  const zip = new JSZip();
  let zipName = `picExpert.net_${settings.width}x${settings.height}`;
  const folder = zip.folder(zipName);
  if (!folder) return;

  const promises = files.map(async (file, index) => {
    let blobUrl = "";
    if (settings.mode === "expand") {
      blobUrl = file.generatedImage;
    } else {
      // Assuming generateCropped returns a Blob
      blobUrl = await generateCropped(file, settings);
    }

    const response = await fetch(blobUrl);
    const blob = await response.blob();

    const fileName = `picExpert.net_${file.baseName}`;
    const fileNameWithExtension = `${fileName} - ${index + 1}.${settings.download.format}`;

    folder.file(fileNameWithExtension, blob);
  });

  await Promise.all(promises);

  // Generate the zip file and trigger the download
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `${zipName}.zip`);
  });
};

export const saveAs = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
};

export const randNumber = (chars: number): number => {
  const min = Math.pow(10, chars - 1);
  const max = Math.pow(10, chars) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
