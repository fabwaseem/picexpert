"use client";
import { Input } from "@nextui-org/input";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React, { useState } from "react";

import { HexColorPicker } from "react-colorful";
import validateColor from "validate-color";

interface ColorPickerProps {
  inputId?: string;
  value: string;
  onChange: (value: string) => void;
  onChangeEnd?: (value: string) => void;
  label?: string;
}

const ColorPicker = ({
  inputId,
  value,
  onChange,
  onChangeEnd,
  label = "Fill color",
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorRef = React.useRef(value);

  React.useEffect(() => {
    colorRef.current = value;
  }, [value]);

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
    <Popover placement="bottom" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div className="w-full">
          <Input
            id={inputId}
            type="text"
            placeholder="Color"
            value={value}
            onChange={handleInputChange}
            errorMessage={!validateColor(value) ? "Invalid color" : ""}
            isInvalid={!validateColor(value)}
            label={label}
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
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none bg-transparent shadow-none">
        <div
          className="p-2 bg-content1 rounded-xl shadow-lg border border-default-200"
          onMouseUp={() => onChangeEnd?.(colorRef.current)}
          onTouchEnd={() => onChangeEnd?.(colorRef.current)}
        >
          <HexColorPicker
            color={validateColor(value) ? value : "#474BFF"}
            onChange={handleChange}
          />
          <div className="mt-2">
            <Input
              size="sm"
              variant="flat"
              value={value}
              onChange={handleInputChange}
              fullWidth
              classNames={{
                input: "text-center font-mono text-xs uppercase",
                inputWrapper: "h-8 min-h-0 px-1 bg-default-100",
              }}
              isInvalid={!validateColor(value)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
