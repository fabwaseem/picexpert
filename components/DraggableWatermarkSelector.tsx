import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateSetting } from "@/store/slices/settingsSlice";
import { cn } from "@/lib/utils";

const DraggableWatermarkSelector = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const position = settings.watermark.position; // { x: number, y: number } (0-100)

  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isDragging = useRef(false);

  // Function to calculate and update handle position based on settings
  const updateHandlePosition = useCallback(() => {
    if (isDragging.current || !containerRef.current || !handleRef.current)
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const handleRect = handleRef.current.getBoundingClientRect();

    const availableW = containerRect.width - handleRect.width;
    const availableH = containerRect.height - handleRect.height;

    if (availableW <= 0 || availableH <= 0) return;

    const x = (position.x / 100) * availableW;
    const y = (position.y / 100) * availableH;

    controls.start({
      x,
      y,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [position, controls]);

  // Update on mount, resize, and settings change
  useEffect(() => {
    updateHandlePosition();

    const handleResize = () => updateHandlePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateHandlePosition]);

  const snapValue = (val: number) => {
    const threshold = 5;
    if (Math.abs(val - 0) < threshold) return 0;
    if (Math.abs(val - 50) < threshold) return 50;
    if (Math.abs(val - 100) < threshold) return 100;
    return val;
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    isDragging.current = false;
    if (!containerRef.current || !handleRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const handleRect = handleRef.current.getBoundingClientRect();

    const relativeX = handleRect.left - containerRect.left;
    const relativeY = handleRect.top - containerRect.top;

    const availableW = containerRect.width - handleRect.width;
    const availableH = containerRect.height - handleRect.height;

    let percentX = Math.min(100, Math.max(0, (relativeX / availableW) * 100));
    let percentY = Math.min(100, Math.max(0, (relativeY / availableH) * 100));

    // Apply snapping
    percentX = snapValue(percentX);
    percentY = snapValue(percentY);

    dispatch(
      updateSetting({
        watermark: {
          ...settings.watermark,
          position: { x: percentX, y: percentY },
        },
      }),
    );
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !handleRef.current) return;

    // Don't trigger if clicking on the handle itself (already handled by drag)
    if (handleRef.current.contains(e.target as Node)) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const handleRect = handleRef.current.getBoundingClientRect();

    // Click position relative to container
    const clickX = e.clientX - containerRect.left;
    const clickY = e.clientY - containerRect.top;

    // We want the handle CENTER to be at click position
    // So target left/top should be click - half_handle
    const targetX = clickX - handleRect.width / 2;
    const targetY = clickY - handleRect.height / 2;

    const availableW = containerRect.width - handleRect.width;
    const availableH = containerRect.height - handleRect.height;

    // Clamp to available range
    const clampedX = Math.max(0, Math.min(availableW, targetX));
    const clampedY = Math.max(0, Math.min(availableH, targetY));

    let percentX = (clampedX / availableW) * 100;
    let percentY = (clampedY / availableH) * 100;

    // Apply snapping
    percentX = snapValue(percentX);
    percentY = snapValue(percentY);

    dispatch(
      updateSetting({
        watermark: {
          ...settings.watermark,
          position: { x: percentX, y: percentY },
        },
      }),
    );
  };

  const setPreset = (x: number, y: number) => {
    dispatch(
      updateSetting({
        watermark: {
          ...settings.watermark,
          position: { x, y },
        },
      }),
    );
  };

  // Helper to check if current position matches a preset
  const isPresetActive = (x: number, y: number) => {
    return Math.abs(position.x - x) < 1 && Math.abs(position.y - y) < 1;
  };

  const presets = [
    { x: 0, y: 0 },
    { x: 50, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 50 },
    { x: 50, y: 50 },
    { x: 100, y: 50 },
    { x: 0, y: 100 },
    { x: 50, y: 100 },
    { x: 100, y: 100 },
  ];

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="flex justify-between items-center mb-2 px-1">
        <h6 className="font-semibold text-2xs uppercase opacity-50 tracking-wider">
          Position
        </h6>
        <div className="flex gap-1 text-[10px] font-mono text-default-400 opacity-70">
          <span>X:{Math.round(position.x)}%</span>
          <span>Y:{Math.round(position.y)}%</span>
        </div>
      </div>

      <div className="w-full relative">
        {/* Main Draggable Area */}
        <div
          ref={containerRef}
          className="w-full aspect-square relative bg-content2 rounded-xl border border-default-200 overflow-hidden cursor-crosshair touch-none shadow-inner group"
          onClick={handleContainerClick}
        >
          {/* Background Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "25% 25%",
            }}
          />

          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-default-300/30 -translate-y-1/2 pointer-events-none" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-default-300/30 -translate-x-1/2 pointer-events-none" />

          {/* Interactive Preset Zones (Visual indicators) */}
          {presets.map((p, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 rounded-full transition-all duration-300 pointer-events-none z-0",
                isPresetActive(p.x, p.y)
                  ? "bg-primary/50 scale-150"
                  : "bg-default-300/30",
              )}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `translate(-50%, -50%) ${
                  isPresetActive(p.x, p.y) ? "scale(1.5)" : "scale(1)"
                }`,
              }}
            />
          ))}

          {/* Draggable Handle */}
          <motion.div
            ref={handleRef}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={false}
            animate={controls}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-0 left-0 w-8 h-8 rounded-lg bg-primary/90 backdrop-blur-md shadow-lg ring-2 ring-background cursor-grab active:cursor-grabbing z-10 flex items-center justify-center"
            style={{}}
          >
            {/* Inner dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DraggableWatermarkSelector;
