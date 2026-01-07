import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Inter font for English/Latin text
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

// IRANSansX font for Persian/Farsi text
// Paths are relative to the project root
export const iranSansX = localFont({
  src: [
    {
      path: "../../public/fonts/IRANSansX-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-DemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/IRANSansX-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-iran-sans-x",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

