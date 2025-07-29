import React, { useState } from "react";
import { ColorContext } from "./ColorContext";

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [bannerColor, setBannerColor] = useState("#1f4557");

  return (
    <ColorContext.Provider value={{ bannerColor, setBannerColor }}>
      {children}
    </ColorContext.Provider>
  );
};
