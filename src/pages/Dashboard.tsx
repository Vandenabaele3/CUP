import React from "react";
import { useBannerColor } from "../context/ColorContext";
import WidgetWrapper from "../components/widgets/WidgetWrapper";
import LeaderboardWidget from "../components/widgets/LeaderboardWidget";
import ChartWidget from "../components/widgets/ChartWidget";
import ListWidget from "../components/widgets/ListWidget";

const leaderboardData = [
  { id: "1", name: "Alice", score: 120 },
  { id: "2", name: "Bob", score: 95 },
  { id: "3", name: "Charlie", score: 90 },
];

const chartData = [
  { name: "Ma", value: 10 },
  { name: "Di", value: 14 },
  { name: "Wo", value: 9 },
  { name: "Do", value: 17 },
  { name: "Vr", value: 13 },
];

const initialItems = [
  { id: "1", text: "Documentatie afwerken", created: "2025-07-20", status: "Actief" },
  { id: "2", text: "Testscenario’s valideren", created: "2025-07-19", status: "Inactief" },
  { id: "3", text: "Bug #42 analyseren", created: "2025-07-18", status: "Actief" },
  { id: "4", text: "Meeting met klant voorbereiden", created: "2025-07-17", status: "Inactief" },
  { id: "5", text: "Code review Mason", created: "2025-07-16", status: "Actief" },
  { id: "6", text: "Nieuwe feature bespreken", created: "2025-07-15", status: "Verlopen" },
  { id: "7", text: "Refactor oude module", created: "2025-07-14", status: "Actief" },
  { id: "8", text: "Mail beantwoorden", created: "2025-07-13", status: "Actief" },
  { id: "9", text: "Design feedback doorgeven", created: "2025-07-12", status: "Inactief" },
  { id: "10", text: "Sprint planning afronden", created: "2025-07-11", status: "Actief" },
];

export default function Dashboard() {
  const { bannerColor } = useBannerColor();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 pb-6">
      <div className="flex flex-col gap-6 col-span-1">
        <WidgetWrapper title="Leaderboard" icon={<span>🏆</span>} bgColor={bannerColor} textColor="#ffffff">
          <LeaderboardWidget players={leaderboardData} />
        </WidgetWrapper>

        <WidgetWrapper title="Scores" icon={<span>📈</span>} bgColor={bannerColor} textColor="#ffffff">
          <ChartWidget data={chartData} />
        </WidgetWrapper>
      </div>

      <div className="col-span-1 lg:col-span-2 min-w-[400px] flex flex-col">
        <WidgetWrapper title="Games" icon={<span>🎮</span>} bgColor={bannerColor} textColor="#ffffff">
          <ListWidget initialItems={initialItems} />
        </WidgetWrapper>
      </div>
    </div>
  );
}
