export type Widget = {
  id: string;
  title: string;
  component: React.ReactNode;
};
export type Player = {
  id: string;
  name: string;
  username?: string;         // unieker dan naam, bv. voor login of URL
  email?: string;            // enkel als gebruikers zich registreren
  avatarUrl?: string;        // profielfoto
  score: number;             // huidige score
  level?: number;            // game- of gebruikersniveau
  rank?: number;             // positie in ranking
  achievements?: string[];   // behaald badges of titels
  joinedAt?: string;         // ISO-datum van registratie
  lastActiveAt?: string;     // ISO-datum voor online status
  isOnline?: boolean;        // real-time status
  country?: string;          // voor statistieken/leaderboards per land
  team?: string;             // teamnaam of ID indien van toepassing
  bio?: string;              // korte beschrijving
};
