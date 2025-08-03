import React from "react";

type GenreCountCardProps = {
  count: number;
};

const GenreCountCard: React.FC<GenreCountCardProps> = ({ count }) => {
  return (
    <div className="bg-muted p-3 rounded-md shadow-sm text-center text-sm">
      <p className="text-muted-foreground mb-1">Aantal genres</p>
      <p className="text-xl font-bold">{count}</p>
    </div>
  );
};

export default GenreCountCard;
