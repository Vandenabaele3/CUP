import React, { useState } from "react";
import WizardModal from "./WizardModal";

interface Game {
  id: number;
  name: string;
  playedOn: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const dummyGames: Game[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Game ${i + 1}`,
  playedOn: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}));

export default function CompleteGameWizard({ open, onClose }: Props) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [customDate, setCustomDate] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [search, setSearch] = useState("");

  const filteredGames = dummyGames.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const steps = [
    {
      title: "Selecteer een game",
      content: (
        <div>
          <input
            type="text"
            placeholder="Zoek een game..."
            className="mb-2 w-full p-2 border rounded text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-64 overflow-y-auto space-y-2">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className={`p-2 border rounded cursor-pointer transition-colors ${
                  selectedGame?.id === game.id
                    ? "bg-gray-300 text-black"
                    : "bg-transparent text-white hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => {
                  setSelectedGame(game);
                  setTimeout(() => setCurrentStep(1), 100);
                }}
              >
                {game.name}
              </div>
            ))}
          </div>
        </div>
      ),
      validate: () => false, // handmatige doorgang blokkeren
    },
    {
      title: "Vul extra info in",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block font-semibold mb-1">
              URL naar stream (optioneel)
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Aantal uren gespeeld (optioneel)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={customDate}
                onChange={() => setCustomDate(!customDate)}
              />
              Andere datum kiezen
            </label>
            {customDate && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 p-2 border rounded"
              />
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Bevestiging",
      content: (
        <div className="space-y-2">
          <p>
            <strong>Game:</strong> {selectedGame?.name}
          </p>
          <p>
            <strong>Datum:</strong>{" "}
            {customDate
              ? date
              : new Date().toISOString().split("T")[0]}
          </p>
          {url && (
            <p>
              <strong>URL:</strong> {url}
            </p>
          )}
          {duration && (
            <p>
              <strong>Uren gespeeld:</strong> {duration}
            </p>
          )}
          <p>Weet je zeker dat je deze game wilt afronden?</p>
        </div>
      ),
    },
  ];

  const onFinish = () => {
    console.log("Game voltooid:", {
      id: selectedGame?.id,
      url,
      duration,
      date: customDate
        ? date
        : new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  return (
    <WizardModal
      open={open}
      onClose={onClose}
      steps={steps}
      onFinish={onFinish}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    />
  );
}
