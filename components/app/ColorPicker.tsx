"use client";
import { Input } from "@nextui-org/input";
import React, { useEffect, useRef, useState } from "react";

import { HexColorPicker } from "react-colorful";
import validateColor from "validate-color";

interface ColorPickerProps {
  inputId?: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ inputId, value, onChange }: ColorPickerProps) => {
  const [active, setActive] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[0] !== "#") {
      e.target.value = "#" + e.target.value;
    }
    if (e.target.value.length > 7) {
      return;
    }
    onChange(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative w-full " ref={pickerRef}>
        <div className="relative z-20">
          <Input
            id={inputId}
            type="text"
            placeholder="Color"
            value={value}
            onChange={handleChange}
            errorMessage={!validateColor(value) ? "Invalid color" : ""}
            isInvalid={!validateColor(value)}
            onFocus={() => setActive(true)}
            label="Fill color"
            endContent={
              <div
                className="pointer-events-none border-2 border-white absolute top-1/2 -translate-y-1/2 right-4 w-7 h-7 bg-black rounded-full"
                style={{
                  backgroundColor: validateColor(value) ? value : "#474BFF",
                }}
              ></div>
            }
          />
        </div>
        {active && (
          <>
            <HexColorPicker
              color={validateColor(value) ? value : "#474BFF"}
              onChange={onChange}
              className="!absolute top-[calc(100%+8px)] right-0 !w-full z-20"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ColorPicker;
