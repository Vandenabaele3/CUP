import React from "react";

type TopFinisherWidgetProps = {
  name: string;
  completed: number;
  avatarUrl: string;
};

const TopFinisherWidget: React.FC<TopFinisherWidgetProps> = ({ name, completed, avatarUrl }) => {
  return (
    <div className="bg-muted p-3 rounded-md shadow-sm text-center text-sm">
      <img
        src={avatarUrl}
        alt={name}
        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border border-border"
      />
      <p className="text-muted-foreground">Top speler</p>
      <p className="font-semibold">{name}</p>
      <p className="text-lg font-bold">{completed} uitgespeeld</p>
    </div>
  );
};

export default TopFinisherWidget;
