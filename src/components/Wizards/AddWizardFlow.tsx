// src/components/Wizards/AddWizardFlow.tsx

import React, { JSX } from "react";
import { WizardRegistry } from "./WizardRegistry";

type Props =
  | {
      widgetType: "list";
      dataType: "players" | "games" | "genres";
      onClose: () => void;
    }
  | {
      widgetType: "leaderboard";
      dataType: "players";
      onClose: () => void;
    };

export default function AddWizardFlow(props: Props) {
  const { widgetType, dataType, onClose } = props;

  if (widgetType === "list") {
    const WizardComponent = WizardRegistry.list.dataTypes[dataType];
    return renderWizard(WizardComponent, dataType, onClose);
  }

  if (widgetType === "leaderboard") {
    const WizardComponent = WizardRegistry.leaderboard.dataTypes[dataType];
    return renderWizard(WizardComponent, dataType, onClose);
  }

  return (
    <div>Geen wizard gevonden voor "{String(widgetType)}" / "{String(dataType)}".</div>
  );
}

function renderWizard(
  Component: (props: { onComplete: () => void }) => JSX.Element,
  label: string,
  onClose: () => void
) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2>Nieuwe {label}</h2>
          <button onClick={onClose} style={closeButtonStyle}>×</button>
        </div>
        <Component onComplete={onClose} />
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  width: "500px",
  maxWidth: "90vw",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
};

const closeButtonStyle: React.CSSProperties = {
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  cursor: "pointer",
};
