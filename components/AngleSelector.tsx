import React, { useRef, useState, useCallback, useEffect } from "react";

import { cn } from "@/lib/utils";

interface AngleSelectorProps {
  angle: number;
  setAngle: (angle: number) => void;
  label?: string;
}

const AngleSelector = ({
  angle,
  setAngle: onChange,
  label = "Rotation",
}: AngleSelectorProps) => {
  const [localAngle, setLocalAngle] = useState(angle);

  useEffect(() => {
    setLocalAngle(angle);
  }, [angle]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculateAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate angle in degrees
    let newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    // Round to integer
    return Math.round(newAngle);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const newAngle = calculateAngle(e.clientX, e.clientY);

    setLocalAngle(newAngle);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      const newAngle = calculateAngle(e.clientX, e.clientY);

      setLocalAngle(newAngle);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const finalAngle = calculateAngle(e.clientX, e.clientY);

    setLocalAngle(finalAngle);
    onChange(finalAngle);
  };

  // Calculate handle position
  const rad = (localAngle * Math.PI) / 180;
  const radius = 35; // %
  const centerX = 50; // %
  const centerY = 50; // %

  // For display, we want the handle to rotate around the center.
  // Standard Math.cos/sin starts from 3 o'clock (0 rad).
  // CSS rotation usually starts from 12 o'clock if we use `rotate` transform, but here we use coordinates.
  // The atan2 calculation also matches standard math coordinates.

  const x = centerX + Math.cos(rad) * radius;
  const y = centerY + Math.sin(rad) * radius;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-3 select-none">
      <div className="flex justify-between w-full mb-4 px-1">
        <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider">
          {label}
        </h6>
        <span className="text-xs font-mono opacity-70 bg-content2 px-2 py-0.5 rounded">
          {localAngle}°
        </span>
      </div>

      <div
        ref={containerRef}
        className="relative w-40 h-40 bg-content2 rounded-full cursor-crosshair touch-none shadow-inner"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Center Grid/Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-full h-px bg-foreground absolute" />
          <div className="h-full w-px bg-foreground absolute" />
        </div>

        {/* Outer Ring */}
        <div className="absolute inset-2 rounded-full border border-default-200 opacity-50 pointer-events-none" />

        {/* Track */}
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-default-300/50 pointer-events-none" />

        {/* Center Point */}
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-default-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Handle */}
        <div
          className="absolute w-8 h-8 bg-primary rounded-full shadow-lg border-2 border-background transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-transform active:scale-95"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>

        {/* Line from center to handle */}
        {/* We can use a rotated div for the line */}
        <div
          className="absolute top-1/2 left-1/2 h-0.5 bg-primary/30 origin-left pointer-events-none"
          style={{
            width: `${radius}%`,
            transform: `rotate(${localAngle}deg)`,
          }}
        />
      </div>

      {/* Quick Select Buttons */}
      <div className="grid grid-cols-4 gap-2 mt-6 w-full">
        {[-45, 0, 45, 90].map((a) => (
          <button
            key={a}
            className={cn(
              "text-[10px] py-1.5 px-1 rounded-md transition-colors border",
              localAngle === a
                ? "bg-primary/10 border-primary text-primary"
                : "bg-content2 border-transparent hover:bg-content3 text-default-600",
            )}
            onClick={() => {
              setLocalAngle(a);
              onChange(a);
            }}
          >
            {a === 0 ? "0°" : a > 0 ? `+${a}°` : `${a}°`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AngleSelector;
