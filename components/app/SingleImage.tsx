import React, { useEffect, useState } from "react";

import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { DetailedFile } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFile, updateFile } from "@/store/slices/FilesSlice";
import { getTruncatedName } from "@/lib/utils";
import {
  Card,
  CardBody,
  Tooltip,
  Image as NextUIImage,
} from "@nextui-org/react";
import { PlusRoundIcon } from "../icons";
import Image from "next/image";

const SingleImage = ({ file }: { file: DetailedFile }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const handleRemoveFile = (id: string) => {
    dispatch(removeFile(id));
  };

  useEffect(() => {
    const calculateCrop = () => {
      const newCrop: Crop = {
        unit: "%",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
      const width = settings.width;
      const height = settings.height;
      const originalWidth = file.width;
      const originalHeight = file.height;
      let scaledWidth = originalWidth;
      let scaledHeight = originalHeight;

      scaledWidth =
        width * Math.min(originalWidth / width, originalHeight / height);
      scaledHeight =
        height * Math.min(originalWidth / width, originalHeight / height);

      const x = (originalWidth - scaledWidth) / 2;
      const y = (originalHeight - scaledHeight) / 2;

      newCrop.x = (x / originalWidth) * 100;
      newCrop.y = (y / originalHeight) * 100;
      newCrop.width = (scaledWidth / originalWidth) * 100;
      newCrop.height = (scaledHeight / originalHeight) * 100;
      dispatch(updateFile({ id: file.id, crop: newCrop }));
      return crop;
    };
    if (settings.mode === "crop" && !settings.customCrop) {
      setCrop(calculateCrop());
    }
  }, [settings.width, settings.height, settings.customCrop, settings.mode]);

  const handleChangeCrop = (crop: Crop) => {
    dispatch(updateFile({ id: file.id, crop: crop }));
    setCrop(crop);
  };

  const calculateValueAspectRatio = () => {
    // Assuming crop is a valid object containing percentage values for width and height
    const widthPercentage = crop.width;
    const heightPercentage = crop.height;

    // Assuming totalWidth and totalHeight represent the total width and height of the object or image
    const totalWidth = file.width; // Example total width (can be any appropriate value)
    const totalHeight = file.height; // Example total height (can be any appropriate value)

    // Calculate the actual width and height values from percentages
    const widthValue = (widthPercentage / 100) * totalWidth;
    const heightValue = (heightPercentage / 100) * totalHeight;

    // Calculate the aspect ratio
    const aspectRatio = widthValue / heightValue;
    return aspectRatio;
  };

  return (
    <Card className="group flex flex-col justify-between p-0">
      <CardBody className="p-2">
        <div className="relative">
          {settings.mode === "expand" ? (
            <NextUIImage
              src={file.generatedImage ? file.generatedImage : file.previewUrl}
              alt={file.name}
              width={file.width}
              // height={file.height}
              className="w-full rounded-md shadow pointer-events-none select-none"
            />
          ) : (
            <ReactCrop
              crop={file.crop ? file.crop : crop}
              onChange={(_, percentCrop) => handleChangeCrop(percentCrop)}
              // onComplete={(c) => handleCropComplete(c)}
              aspect={
                settings.lockRatio
                  ? settings.customCrop
                    ? calculateValueAspectRatio()
                    : settings.aspectRatio
                  : undefined
              }
              keepSelection={true}
              locked={settings.customCrop ? false : true}
              ruleOfThirds
              className="w-full h-full rounded-md shadow"
            >
              <img
                src={file.previewUrl}
                alt={file.name}
                className="pointer-events-none select-none w-full h-full"
              />
            </ReactCrop>
          )}
          <div className="flex xl:opacity-0 group-hover:opacity-100 duration-500 transition-opacity absolute top-2 right-2 items-center gap-2 z-10 ">
            <Tooltip content="Remove" showArrow>
              <div
                className="cursor-pointer  bg-zinc-500 bg-opacity-50 rounded-full p-1"
                data-tooltip-id="remove-button"
                data-tooltip-content={"Remove Image"}
                onClick={() => handleRemoveFile(file.id)}
              >
                <PlusRoundIcon className="rotate-45" />
              </div>
            </Tooltip>
          </div>
        </div>
        <p className="mt-2 text-sm font-medium opacity-50">
          {getTruncatedName(file.name)}
        </p>
      </CardBody>
    </Card>
  );
};

export default SingleImage;
