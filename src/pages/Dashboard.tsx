import React from "react";
import { useBannerColor } from "../context/ColorContext";
import WidgetWrapper from "../components/widgets/WidgetWrapper";
import LeaderboardWidget from "../components/widgets/LeaderboardWidget";
import ScoreChart from "../components/widgets/ScoreChart";
import GenreCountCard from "../components/widgets/GenreCountCard";
import TopGenresBarChart from "../components/widgets/TopGenresBarChart";
import TopFinisherWidget from "../components/widgets/TopFinisherWidget";

const leaderboardData = [
  { id: "1", name: "Alice", score: 120 },
  { id: "2", name: "Bob", score: 95 },
  { id: "3", name: "Charlie", score: 90 },
];

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
  avatarUrl: "/images/alice.jpg", // vervang dit pad indien nodig
};

export default function Dashboard() {
  const { bannerColor } = useBannerColor();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-6 pb-6">
      <WidgetWrapper
        title="Leaderboard"
        icon={<span>🏆</span>}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <LeaderboardWidget players={leaderboardData} />
      </WidgetWrapper>

      <WidgetWrapper
        title="Scores"
        icon={<span>📈</span>}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <ScoreChart data={chartData} />
      </WidgetWrapper>

      <WidgetWrapper
        title="Genres"
        icon={<span>📚</span>}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <GenreCountCard count={17} />
      </WidgetWrapper>

      <WidgetWrapper
        title="Top genres"
        icon={<span>📊</span>}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <TopGenresBarChart data={genreData} />
      </WidgetWrapper>

      <WidgetWrapper
        title="Top finisher"
        icon={<span>👑</span>}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <TopFinisherWidget
          name={topFinisher.name}
          completed={topFinisher.completed}
          avatarUrl={topFinisher.avatarUrl}
        />
      </WidgetWrapper>
    </div>
  );
}
