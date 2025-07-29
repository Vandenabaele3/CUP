import { createContext, useContext } from "react";

export type ColorContextType = {
  bannerColor: string;
  setBannerColor: (hex: string) => void;
};

export const ColorContext = createContext<ColorContextType>({
  bannerColor: "#1f4557", // fallback
  setBannerColor: () => {},
});

export const useBannerColor = () => {
  const { bannerColor } = useContext(ColorContext);
  return { bannerColor };
};

export const useSetBannerColor = () => {
  const { setBannerColor } = useContext(ColorContext);
  return { setBannerColor };
};
