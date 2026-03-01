"use client";
import React, { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { HexColorPicker } from "react-colorful";
import validateColor from "validate-color";

import { cn } from "@/lib/utils";

interface GradientPickerProps {
  startColor: string;
  endColor: string;
  onStartChange: (color: string) => void;
  onEndChange: (color: string) => void;
  onStartChangeEnd?: (color: string) => void;
  onEndChangeEnd?: (color: string) => void;
  className?: string;
}

const ColorHandle = ({
  color,
  onChange,
  onChangeEnd,
  position,
}: {
  color: string;
  onChange: (val: string) => void;
  onChangeEnd?: (val: string) => void;
  position: "left" | "right";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorRef = useRef(color);

  const handleChange = (val: string) => {
    colorRef.current = val;
    onChange(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (val[0] !== "#") {
      val = "#" + val;
    }
    if (val.length > 7) {
      return;
    }
    handleChange(val);
    if (validateColor(val)) {
      onChangeEnd?.(val);
    }
  };

  return (
    <Popover isOpen={isOpen} placement="bottom" onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95 z-10",
            position === "left"
              ? "left-0 -translate-x-1/2"
              : "right-0 translate-x-1/2",
          )}
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none bg-transparent shadow-none">
        <div
          className="p-2 bg-content1 rounded-xl shadow-lg border border-default-200"
          onMouseUp={() => onChangeEnd?.(colorRef.current)}
          onTouchEnd={() => onChangeEnd?.(colorRef.current)}
        >
          <HexColorPicker color={color} onChange={handleChange} />
          <div className="mt-2">
            <Input
              fullWidth
              classNames={{
                input: "text-center font-mono text-xs uppercase",
                inputWrapper: "h-8 min-h-0 px-1 bg-default-100",
              }}
              isInvalid={!validateColor(color)}
              size="sm"
              value={color}
              variant="flat"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const GradientPicker = ({
  startColor,
  endColor,
  onStartChange,
  onEndChange,
  onStartChangeEnd,
  onEndChangeEnd,
  className,
}: GradientPickerProps) => {
  return (
    <div className={cn("relative py-2 px-3 select-none", className)}>
      {/* Gradient Bar */}
      <div
        className="h-4 w-full rounded-full shadow-inner border border-default-200/50"
        style={{
          background: `linear-gradient(to right, ${startColor}, ${endColor})`,
        }}
      />

      {/* Handles */}
      <div className="absolute top-1/2 left-3 right-3 -translate-y-1/2 h-0">
        <ColorHandle
          color={startColor}
          position="left"
          onChange={onStartChange}
          onChangeEnd={onStartChangeEnd}
        />
        <ColorHandle
          color={endColor}
          position="right"
          onChange={onEndChange}
          onChangeEnd={onEndChangeEnd}
        />
      </div>
    </div>
  );
};
