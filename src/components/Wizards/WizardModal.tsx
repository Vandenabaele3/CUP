import React, { ReactNode } from "react";

interface WizardStep {
  title: string;
  content: ReactNode;
  validate?: () => boolean;
}

interface WizardModalProps {
  open: boolean;
  onClose: () => void;
  steps: WizardStep[];
  onFinish: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export default function WizardModal({
  open,
  onClose,
  steps,
  onFinish,
  currentStep,
  setCurrentStep,
}: WizardModalProps) {
  if (!open) return null;

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const current = steps[currentStep];

  const goNext = () => {
    if (current.validate && !current.validate()) return;
    if (!isLastStep) setCurrentStep(currentStep + 1);
    else onFinish();
  };

  const goBack = () => {
    if (!isFirstStep) setCurrentStep(currentStep - 1);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{current.title}</h2>
          <button onClick={onClose} style={iconButtonStyle} title="Annuleren">
            ✕
          </button>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>{current.content}</div>

        {!isFirstStep && (
          <div style={footerStyle}>
            <button onClick={goBack} style={iconButtonStyle} title="Vorige stap">
              ←
            </button>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={goNext} style={iconButtonStyle} title={isLastStep ? "Voltooien" : "Volgende stap"}>
                {isLastStep ? "✓" : "→"}
              </button>
            </div>
          </div>
        )}
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
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: "#1f2937", // donkergrijs
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
  width: "600px",
  maxWidth: "90vw",
  color: "#f3f4f6",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.25rem",
  fontWeight: 600,
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconButtonStyle: React.CSSProperties = {
  backgroundColor: "#374151", // grijs
  color: "#f9fafb", // bijna wit
  border: "none",
  padding: "0.5rem 0.75rem",
  borderRadius: "8px",
  fontSize: "1.25rem",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
};
