import { SVGProps } from "react";
import { type Crop } from "react-image-crop";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type DetailedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  width: number;
  height: number;
  dotIndex: number;
  baseName: string;
  extension: string;
  url: string;
  crop: Crop;
  generatedImage: string;
  previewUrl: string;
};

export type Scalling = "fill" | "fit" | "stretch" | "repeat";

export type SettingsProps = {
  mode: "expand" | "crop";
  width: number;
  height: number;
  aspectRatio: number;
  currentUnit: "px" | "in" | "cm" | "mm";
  lockRatio: boolean;
  background: {
    type: "color" | "blur" | "image" | null;
    color: {
      mode: "solid" | "gradient";
      solid: string;
      gradient: {
        start: string;
        end: string;
        direction: number;
      };
    };
    blurStrength: number;
    image: {
      image: DetailedFile | undefined;
      fit: Scalling;
      history: DetailedFile[];
    };
  };
  border: {
    style:
      | "default"
      | "stack"
      | "retro"
      | "border"
      | "glass-light"
      | "glass-dark";
    radius: number; // 0-100
  };
  watermark: {
    enabled: boolean;
    pattern: "single" | "repeat";
    direction: number;
    type: "text" | "image";
    image: {
      image: DetailedFile | undefined;
      fit: Scalling;
    };
    text: {
      text: string;
      font: string;
      color: string;
    };
    size: number;
    opacity: number;
    position: {
      x: number;
      y: number;
    };
    sideOffset: number;
  };
  download: {
    format: "png" | "jpg";
    quality: number;
    name: string;
  };
  customCrop: boolean;
  filename: string | undefined;
  isLoading: boolean;
};

export type Feature = {
  id: number;
  icon: React.FC<IconSvgProps>;
  title: string;
  description: string;
};
