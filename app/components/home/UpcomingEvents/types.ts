export interface Event {
  id: string;
  title: string;
  organizer: string;
  image: string;
  location: string;
  mode: "Online" | "Offline" | "Hybrid";
  prizePool: string;
  registrationDeadline: string; // ISO format string (e.g. '2026-07-15')
  startDate: string;
  endDate: string;
  description: string;
  themeTags: string[];
  registrationLink: string;
  detailsLink: string;
}
