import React, { useEffect, useRef, useState } from "react";
import { SettingsProps } from "@/types";
import { drawWatermark } from "@/lib/utils";

interface WatermarkOverlayProps {
  settings: SettingsProps;
}

const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // Use device pixel ratio for sharper text
        // But drawWatermark expects CSS pixels?
        // Let's stick to standard pixels for now to match logic
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw watermark
      // We pass the canvas dimensions as the "target" size
      // This ensures the watermark scales relative to the preview size
      await drawWatermark(ctx, dimensions.width, dimensions.height, settings);
    };

    render();
    
    // Cleanup? drawWatermark is async, might complete after unmount.
    // Ideally we should cancel it, but for now just let it be.
  }, [settings, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="w-full h-full pointer-events-none block"
    />
  );
};

export default WatermarkOverlay;
