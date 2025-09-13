import React from "react";
import { useBannerColor } from "../context/ColorContext";

import WidgetWrapper from "../components/widgets/WidgetWrapper";
import LeaderboardWidget from "../components/widgets/LeaderboardWidget";
import ScoreChart from "../components/widgets/ScoreChart";
import GenreCountCard from "../components/widgets/GenreCountCard";
import TopGenresBarChart from "../components/widgets/TopGenresBarChart";
import TopFinisherWidget from "../components/widgets/TopFinisherWidget";
import RecentCompletedWidget from "../components/widgets/RecentCompletedWidget";

// Eenvoudige witte icons (stroke volgt currentColor)
import {
  Trophy,
  CalendarDays,
  Crown,
  LineChart,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Medal,
} from "lucide-react";

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
      <WidgetWrapper
        title="Overall leaderboard"
        icon={<Trophy size={16} />}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <LeaderboardWidget />
      </WidgetWrapper>

      <WidgetWrapper
        title="Current season"
        icon={<CalendarDays size={16} />}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <LeaderboardWidget endpoint="/api/leaderboard?scope=season" />
      </WidgetWrapper>

      <WidgetWrapper
        title="CUP wins"
        icon={<Crown size={16} />}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <LeaderboardWidget endpoint="/api/leaderboard?scope=titles" />
      </WidgetWrapper>

      {/* Scores — over 3 kolommen op xl */}
      <div className="col-span-1 md:col-span-2 xl:col-span-3">
        <WidgetWrapper
          title="Scores"
          icon={<LineChart size={16} />}
          bgColor={bannerColor}
          textColor="#ffffff"
        >
          <ScoreChart />
        </WidgetWrapper>
      </div>

      {/* Laatste 5 completions */}
      <WidgetWrapper
        title="Recent games"
        icon={<CheckCircle2 size={16} />}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <RecentCompletedWidget />
      </WidgetWrapper>

      <WidgetWrapper
        title="Top genres"
        icon={<BarChart3 size={16} />}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <TopGenresBarChart data={genreData} />
      </WidgetWrapper>

      <WidgetWrapper
        title="Genres"
        icon={<BookOpen size={16} />}
        bgColor={bannerColor}
        textColor="#ffffff"
      >
        <GenreCountCard count={17} />
      </WidgetWrapper>

      <WidgetWrapper
        title="Top finisher"
        icon={<Medal size={16} />}
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
