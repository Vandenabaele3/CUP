import React from "react";
import { Player } from "../../types";

type LeaderboardWidgetProps = {
  players: Player[];
};

export default function LeaderboardWidget({ players }: LeaderboardWidgetProps) {
  return (
    <div className="space-y-2 p-4 min-w-[400px]">
      {players.map((player, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white rounded-md shadow-sm p-3"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold text-sky-400 w-6">
              {index + 1}
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="font-semibold">{player.name}</div>
          </div>
          <div className="text-lg font-bold">{player.score}</div>
        </div>
      ))}
    </div>
  );
}
