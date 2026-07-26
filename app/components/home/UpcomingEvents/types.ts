export interface Event {
  id: string;
  title: string;
  type?: string;
  theme?: string[];
  participants?: number;
  status?: string;
  registration?: string;
  startDate?: string;
  applyLink?: string;
  discordLink?: string;
  websiteLink?: string;
  image: string;
  avatars?: string[];
  // Backwards compatibility fields
  organizer?: string;
  location?: string;
  mode?: "Online" | "Offline" | "Hybrid";
  prizePool?: string;
  registrationDeadline?: string;
  endDate?: string;
  description?: string;
  themeTags?: string[];
  registrationLink?: string;
  detailsLink?: string;
}
