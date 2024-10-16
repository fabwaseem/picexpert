import { expandImage, generateCropped } from "@/lib/utils";
import { DetailedFile, SettingsProps } from "@/types";

addEventListener(
  "message",
  async (
    event: MessageEvent<{
      files: DetailedFile[];
      settings: SettingsProps;
      isPreview: boolean;
      crop?: boolean;
    }>
  ) => {
    const { files, settings, isPreview, crop } = event.data;
    try {
      const newFiles: DetailedFile[] = [];
      for (const file of files) {
        let generatedImage = "";
        if (crop) {
          generatedImage = await generateCropped(file, settings);
        } else {
          generatedImage = await expandImage(file, settings, isPreview);
        }
        newFiles.push({
          ...file,
          generatedImage,
        });
      }
      self.postMessage({ type: "success", data: newFiles });
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        self.postMessage({ type: "error", error: errorMessage, data: [] });
      } else {
        console.error("Unknown error:", error);
        self.postMessage({
          type: "error",
          error: "Unknown error occurred",
          data: [],
        });
      }
    }
  }
);

// addEventListener(
//   "message",
//   async (
//     event: MessageEvent<{ file: DetailedFile; settings: SettingsProps }>
//   ) => {
//     const { file, settings } = event.data;
//     try {
//       const generatedImage = await expandImage(file, settings, true);
//       const newFile: DetailedFile = {
//         ...file,
//         generatedImage,
//       };

//       self.postMessage({ type: "success", data: newFile });
//     } catch (error) {
//       if (error instanceof Error) {
//         const errorMessage = error.message;
//         self.postMessage({ type: "error", error: errorMessage, data: [] });
//       } else {
//         console.error("Unknown error:", error);
//         self.postMessage({
//           type: "error",
//           error: "Unknown error occurred",
//           data: [],
//         });
//       }
//     }
//   }
// );
