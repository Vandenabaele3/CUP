// src/pages/Dashboard.tsx
import React from "react";
import { useBannerColor } from "../context/ColorContext";

import WidgetWrapper from "../components/widgets/WidgetWrapper";
import LeaderboardWidget from "../components/widgets/LeaderboardWidget";
import ScoreChart from "../components/widgets/ScoreChart";
import GenreCountCard from "../components/widgets/GenreCountCard";
import TopGenresBarChart from "../components/widgets/TopGenresBarChart";
import TopFinisherWidget from "../components/widgets/TopFinisherWidget";

const chartData = [
  { date: "Ma", Alice: 10, Bob: 12, Charlie: 8 },
  { date: "Di", Alice: 14, Bob: 10, Charlie: 9 },
  { date: "Wo", Alice: 9, Bob: 15, Charlie: 11 },
  { date: "Do", Alice: 17, Bob: 13, Charlie: 14 },
  { date: "Vr", Alice: 13, Bob: 11, Charlie: 12 },
];

const genreData = [
  { genre: "RPG", count: 18 },
  { genre: "Action", count: 14 },
  { genre: "Puzzle", count: 11 },
  { genre: "Shooter", count: 9 },
  { genre: "Strategy", count: 7 },
];

const topFinisher = {
  name: "Alice",
  completed: 42,
  avatarUrl: "/images/alice.jpg",
};

export default function Dashboard() {
  const { bannerColor } = useBannerColor();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-6 pb-6">
      {/* Leaderboards */}
      <WidgetWrapper title="Leaderboard (totaal)" icon={<span>🏆</span>} bgColor={bannerColor} textColor="#ffffff">
        <LeaderboardWidget />
      </WidgetWrapper>

      <WidgetWrapper title="Leaderboard (dit jaar)" icon={<span>📅</span>} bgColor={bannerColor} textColor="#ffffff">
        <LeaderboardWidget endpoint="/api/leaderboard?scope=season" />
      </WidgetWrapper>

      <WidgetWrapper title="Titels (gewonnen jaren)" icon={<span>👑</span>} bgColor={bannerColor} textColor="#ffffff">
        <LeaderboardWidget endpoint="/api/leaderboard?scope=titles" />
      </WidgetWrapper>

      {/* Scores — spreid over 2 kolommen op md/xl */}
      <div className="md:col-span-2 xl:col-span-2">
        <WidgetWrapper title="Scores" icon={<span>📈</span>} bgColor={bannerColor} textColor="#ffffff">
          <ScoreChart data={chartData} />
        </WidgetWrapper>
      </div>

      <WidgetWrapper title="Top genres" icon={<span>📊</span>} bgColor={bannerColor} textColor="#ffffff">
        <TopGenresBarChart data={genreData} />
      </WidgetWrapper>

      <WidgetWrapper title="Genres" icon={<span>📚</span>} bgColor={bannerColor} textColor="#ffffff">
        <GenreCountCard count={17} />
      </WidgetWrapper>

      <WidgetWrapper title="Top finisher" icon={<span>👑</span>} bgColor={bannerColor} textColor="#ffffff">
        <TopFinisherWidget
          name={topFinisher.name}
          completed={topFinisher.completed}
          avatarUrl={topFinisher.avatarUrl}
        />
      </WidgetWrapper>
    </div>
  );
}
