import { SettingsProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: SettingsProps = {
  width: 512,
  height: 512,
  aspectRatio: 1,
  currentUnit: "px",
  lockRatio: false,
  mode: "expand",
  border: {
    style: "default",
    radius: 0,
  },
  background: {
    type: "blur",
    solid: {
      color: "#ffffff",
      history: [],
    },
    blurStrength: 20,
    image: {
      image: undefined,
      fit: "fill",
      history: [],
    },
  },
  watermark: {
    enabled: false,
    type: "text",
    image: undefined,
    text: {
      text: "picExpert",
      font: "Arial",
      color: "#000000",
    },
    size: 24,
    opacity: 1,
    position: {
      x: 90,
      y: 90,
    },
    sideOffset: 10,
  },
  download: {
    format: "png",
    quality: 1,
    name: "picExpert",
  },
  customCrop: false,
  filename: undefined,
  isLoading: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSetting: (state, action: PayloadAction<Partial<SettingsProps>>) => {
      const settingsToUpdate = action.payload;
      console.log(settingsToUpdate);
      Object.assign(state, settingsToUpdate);
      const settings = { ...state };
      localStorage.setItem("settings", JSON.stringify(settings));
    },

    loadSettings: (state) => {
      const settings = localStorage.getItem("settings");
      if (settings) {
        // Object.assign(state, JSON.parse(settings));
      }
    },
  },
});

export const { updateSetting, loadSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
