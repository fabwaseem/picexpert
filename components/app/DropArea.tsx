"use client";
import { cn, convertToDetailedFile, isSupported } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store";
import { addFiles } from "@/store/slices/FilesSlice";
import { DetailedFile } from "@/types";
import { Progress } from "@nextui-org/react";
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropArea = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.files);
  const [progress, setProgress] = useState({ processed: 0, total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const processFiles = useCallback(
    async (acceptedFiles: File[]) => {
      setIsProcessing(true);
      setProgress((prev) => ({
        processed: prev.processed,
        total: prev.total + acceptedFiles.length,
      }));

      const filesToAdd: DetailedFile[] = [];
      for (let i = 0; i < acceptedFiles.length; i++) {
        if (isSupported(acceptedFiles[i])) {
          let file = await convertToDetailedFile(acceptedFiles[i]);
          if (file) {
            filesToAdd.push(file);
          }
        }
        setProgress((prev) => ({ ...prev, processed: prev.processed + 1 }));
      }

      if (filesToAdd.length) {
        dispatch(addFiles(filesToAdd));
      }

      setIsProcessing(false);
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      processFiles(acceptedFiles);
    },
    multiple: true,
  });

  const percentComplete =
    progress.total > 0 ? (progress.processed / progress.total) * 100 : 0;

  return (
    <div className="w-full h-full rounded-lg flex items-center justify-center relative">
      <div
        {...getRootProps({
          onClick: (event) => {
            files.length > 0 && event.stopPropagation();
          },
        })}
        className={cn(className, isDragActive && "drag-active")}
      >
        <input {...getInputProps()} />
        {children}
      </div>
      {isProcessing && (
        <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4">
          <Progress value={percentComplete} className="w-full" />
          <p className="text-center mt-2">
            Processing {progress.processed} of {progress.total} images
          </p>
        </div>
      )}
    </div>
  );
};

export default DropArea;
