import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Comforter_Brush as FontCursive,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontCursive = FontCursive({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400"],
});
