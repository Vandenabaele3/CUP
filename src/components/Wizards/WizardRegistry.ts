// src/components/Wizards/WizardRegistry.ts

import { FC } from "react";
import ListWidget from "../widgets/ListWidget";
import LeaderboardWidget from "../widgets/LeaderboardWidget";
import PlayerWizard from "./PlayerWizard";
import GameWizard from "./GameWizard";
import GenreWizard from "./GenreWizard";

export type WizardComponent = FC<{ onComplete: () => void }>;

export const WizardRegistry = {
  list: {
    component: ListWidget,
    dataTypes: {
      players: PlayerWizard,
      games: GameWizard,
      genres: GenreWizard,
    },
  },
  leaderboard: {
    component: LeaderboardWidget,
    dataTypes: {
      players: PlayerWizard,
    },
  },
} as const;
