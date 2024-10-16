import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateSetting } from "@/store/slices/settingsSlice";
import { cn } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

const DraggableWatermarkSelector: React.FC = () => {
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  const [handleHovered, setHandleHovered] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: settings.watermark.position.x,
    y: settings.watermark.position.y,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const handleRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const GRID_SIZE = 5;
  const HANDLE_SIZE = 44.8;
  const CONTAINER_PADDING = 4; // 1rem = 4px in this case

  const calculatePosition = useCallback((x: number, y: number): Position => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const containerWidth =
      containerRef.current.clientWidth - 2 * CONTAINER_PADDING;
    const containerHeight =
      containerRef.current.clientHeight - 2 * CONTAINER_PADDING;

    const percentX = Math.max(0, Math.min((x / containerWidth) * 100, 100));
    const percentY = Math.max(0, Math.min((y / containerHeight) * 100, 100));

    // percentage are realted to handles left top corner make it center of hanle

    return { x: percentX, y: percentY };
  }, []);

  const handleDrag = useCallback(
    (e: any, info: PanInfo) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newX = Math.max(
        0,
        Math.min(
          info.point.x - containerRect.left - CONTAINER_PADDING,
          containerRect.width - 2 * CONTAINER_PADDING - HANDLE_SIZE
        )
      );
      const newY = Math.max(
        0,
        Math.min(
          info.point.y - containerRect.top - CONTAINER_PADDING,
          containerRect.height - 2 * CONTAINER_PADDING - HANDLE_SIZE
        )
      );

      const newPosition = calculatePosition(newX, newY);
      setPosition(newPosition);
    },
    [calculatePosition]
  );

  const handleDragStop = useCallback(() => {
    dispatch(
      updateSetting({
        watermark: {
          ...settings.watermark,
          position: position,
        },
      })
    );
  }, [dispatch, position, settings.watermark]);

  const handleGridClick = useCallback(
    (colIndex: number, rowIndex: number) => {
      if (!containerRef.current) return;

      const containerWidth =
        containerRef.current.clientWidth - 2 * CONTAINER_PADDING;
      const containerHeight =
        containerRef.current.clientHeight - 2 * CONTAINER_PADDING;

      const cellWidth = containerWidth / (GRID_SIZE - 1);
      const cellHeight = containerHeight / (GRID_SIZE - 1);
      const newX = colIndex * cellWidth;
      const newY = rowIndex * cellHeight;

      const newPosition = calculatePosition(newX, newY);
      console.log({ newPosition });
      setPosition(newPosition);
      controls.start({
        x: newX + CONTAINER_PADDING,
        y: newY + CONTAINER_PADDING,
        transition: { type: "spring", stiffness: 500, damping: 20 },
      });

      dispatch(
        updateSetting({
          watermark: {
            ...settings.watermark,
            position: newPosition,
          },
        })
      );
    },
    [dispatch, settings.watermark, controls, calculatePosition]
  );

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth =
        containerRef.current.clientWidth - 2 * CONTAINER_PADDING;
      const containerHeight =
        containerRef.current.clientHeight - 2 * CONTAINER_PADDING;

      const initialX = (position.x / 100) * containerWidth + CONTAINER_PADDING;
      const initialY = (position.y / 100) * containerHeight + CONTAINER_PADDING;

      controls.start({ x: initialX, y: initialY });
    }
  }, [position, controls]);

  return (
    <div
      ref={containerRef}
      className="mock-drag-pad w-full aspect-square relative dark:bg-background bg-content2 rounded-lg mt-3 p-1"
    >
      <motion.div
        animate={controls}
        drag
        dragConstraints={containerRef}
        dragElastic={0}
        onDrag={handleDrag}
        onDragEnd={handleDragStop}
        onHoverStart={() => setHandleHovered(true)}
        onHoverEnd={() => setHandleHovered(false)}
        className="w-[44.8px] aspect-square rounded-xl bg-content2 absolute cursor-grab z-10 shadow-inner"
      />
      <div className="flex h-full">
        {[...Array(GRID_SIZE)].map((_, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col">
            {[...Array(GRID_SIZE)].map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="flex-1 p-0.5"
                onClick={() => handleGridClick(colIndex, rowIndex)}
              >
                <div
                  className={cn(
                    "w-full h-full rounded-xl border cursor-pointer transition-colors",
                    handleHovered
                      ? "border-transparent"
                      : "border-content1 hover:bg-content1"
                  )}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DraggableWatermarkSelector;
