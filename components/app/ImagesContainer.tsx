"use client";
import DropArea from "@/components/app/DropArea";
import { ImageIcon, PlusRoundIcon } from "@/components/icons";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateFiles } from "@/store/slices/FilesSlice";
import { DetailedFile } from "@/types";
import { Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import SingleImage from "./SingleImage";

import { setupWorker } from "@/workers/setup";
import LoadingScreen from "./LoadingScreen";

const ImagesContainer = () => {
  const files = useAppSelector((state) => state.files);
  const settings = useAppSelector((state) => state.settings);
  const workerRef = useRef<Worker>(null);
  const dispatch = useAppDispatch();
  const skipEffect = useRef(false);
  const prevFilesLengthRef = useRef(files.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdate = (files: DetailedFile[]) => {
    dispatch(updateFiles(files));
  };

  useEffect(
    () => setupWorker(handleUpdate, setIsLoading, skipEffect, workerRef),
    []
  );

  useEffect(() => {
    if (skipEffect.current) {
      skipEffect.current = false;
    } else {
      if (
        files.length > 0 &&
        files.length >= prevFilesLengthRef.current &&
        settings.mode === "expand"
      ) {
        setIsLoading(true); // Start loading
        workerRef.current?.postMessage({
          files,
          settings,
          isPreview: true,
          crop: false,
        });
      }
      prevFilesLengthRef.current = files.length;
    }
  }, [
    files,
    settings.mode,
    settings.width,
    settings.height,
    settings.background,
    settings.border,
    settings.watermark,
  ]);

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <LoadingScreen isLoading={isLoading} />
      {files.length > 0 ? (
        <DropArea className="w-full h-full">
          <ScrollShadow hideScrollBar>
            <Masonry
              breakpointCols={{ default: 4, 1200: 3, 700: 2, 500: 1 }}
              className="my-masonry-grid h-[calc(100vh-16px)] "
              columnClassName="my-masonry-grid_column"
            >
              {files.map((file, index) => (
                <SingleImage key={index} file={file} />
              ))}
            </Masonry>
          </ScrollShadow>
        </DropArea>
      ) : (
        <DropArea className="w-full max-w-2xl aspect-[4/3] group cursor-pointer">
          <Card className="w-full h-full">
            <CardBody className="flex flex-col items-center justify-center gap-2">
              <ImageIcon className="group-hover:hidden max-md:hidden group-[.drag-active]:hidden" />
              <PlusRoundIcon className="md:hidden group-hover:block group-[.drag-active]:block" />
              <h3 className="text-2xl text-center group-hover:hidden max-md:hidden group-[.drag-active]:hidden">
                Drag and Drop
              </h3>
              <h3 className="text-2xl text-center md:hidden group-hover:block group-[.drag-active]:hidden">
                Choose Images
              </h3>
              <h3 className="text-2xl text-center hidden group-[.drag-active]:block">
                Drop Here
              </h3>
              <p className="text-sm font-semibold opacity-50">(PNG or JPG)</p>
            </CardBody>
          </Card>
        </DropArea>
      )}
    </div>
  );
};

export default ImagesContainer;
