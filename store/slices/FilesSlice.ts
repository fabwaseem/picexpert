import { DetailedFile } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DetailedFile[] = [];
type UpdatePayload = Partial<DetailedFile> & {
  id: string;
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<DetailedFile[]>) => {
      state.push(...action.payload);
    },
    updateFiles: (state, action: PayloadAction<DetailedFile[]>) => {
     return action.payload;
    },
    updateFile: (state, action: PayloadAction<UpdatePayload>) => {
      const { id, ...fileToUpdate } = action.payload;
      const fileIndex = state.findIndex((file) => file.id === id);
      state[fileIndex] = { ...state[fileIndex], ...fileToUpdate };
    },
    removeFile: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((file) => file.id !== id);
    },
    clearFiles: (state) => {
      state = [];
    },
  },
});

export default filesSlice.reducer;
export const { addFiles, updateFile, removeFile, clearFiles, updateFiles } =
  filesSlice.actions;
