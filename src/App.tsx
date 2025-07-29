import React from "react";
import AppRouter from "./router";
import { ColorProvider } from "./context/ColorProvider";
import "./icons";

export default function App() {
  return (
    <ColorProvider>
      <AppRouter />
    </ColorProvider>
  );
}
