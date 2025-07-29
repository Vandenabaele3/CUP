import React from "react";
import { Player } from "../../types";

type LeaderboardWidgetProps = {
  players: Player[];
};

export default function LeaderboardWidget({ players }: LeaderboardWidgetProps) {
  return (
    <div className="space-y-2">
      {players.map((player, index) => (
        <div
          key={player.id}
          className="flex items-center justify-between rounded-md p-3 bg-white/10"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold w-6">
              {index + 1 === 1 ? "🏆" : index + 1}
            </div>
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <div className="font-semibold">{player.name}</div>
          </div>
          <div className="text-lg font-bold">{player.score}</div>
        </div>
      ))}
    </div>
  );
}
