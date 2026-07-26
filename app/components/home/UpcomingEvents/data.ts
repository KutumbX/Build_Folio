import { Event } from "./types";

// Helper to get dynamic date string offset from today
const getOffsetDateString = (offsetDays: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split("T")[0];
};

// Formatting utility for displaying dates cleanly (e.g., "JUL 10 - JUL 12, 2026")
export const formatEventDates = (startStr: string, endStr: string): string => {
  const start = new Date(startStr);
  const end = new Date(endStr);
  
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  const year = start.getFullYear();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
};

export const upcomingEventsData: Event[] = [
  {
    id: "1",
    title: "Hefty-Hacks",
    type: "Hackathon",
    theme: ["Blockchain", "FinTech"],
    participants: 100,
    status: "Online",
    registration: "Open",
    startDate: "24/10/2026",
    applyLink: "https://hefty-hacks.devfolio.co",
    discordLink: "https://discord.gg/heftyhacks",
    image: "/images/events/event1.webp",
  },
  {
    id: "2",
    title: "Push to Prod Hackathon: Building at the Frontier",
    type: "Hackathon",
    theme: ["AI"],
    participants: 1000,
    status: "Offline",
    registration: "Open",
    startDate: "08/08/2026",
    applyLink: "https://push-to-prod.devfolio.co",
    discordLink: "https://discord.gg/pushtoprod",
    image: "/images/events/event2.png",
  },
  {
    id: "3",
    title: "Agentic Commerce Hackathon",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 1000,
    status: "Online",
    registration: "Open",
    startDate: "31/07/2026",
    applyLink: "https://agentic-commerce.devfolio.co",
    discordLink: "https://discord.gg/agenticcommerce",
    image: "/images/events/event3.png",
  },
  {
    id: "4",
    title: "CodeStorm 2026 #2",
    type: "Hackathon",
    theme: ["Design", "AI"],
    participants: 1000,
    status: "Online",
    registration: "Open",
    startDate: "Live",
    applyLink: "https://codestorm2026.devfolio.co",
    discordLink: "https://discord.gg/codestorm",
    image: "/images/events/event4.png",
  },
  {
    id: "5",
    title: "Port Mortem 2026 - Code Resurrection Hackathon",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 250,
    status: "Online",
    registration: "Open",
    startDate: "31/07/2026",
    applyLink: "https://port-mortem-2026.devfolio.co",
    discordLink: "https://discord.gg/portmortem",
    image: "/images/events/event5.png",
  },
  {
    id: "6",
    title: "NexHack 2.0",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 500,
    status: "Offline",
    registration: "Open",
    startDate: "25/09/2026",
    applyLink: "https://nexhack2.devfolio.co",
    discordLink: "https://discord.gg/nexhack",
    image: "/images/events/event6.png",
  },
  {
    id: "7",
    title: ".hack '26",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 100,
    status: "Offline",
    registration: "Open",
    startDate: "04/09/2026",
    applyLink: "https://dothack26.devfolio.co",
    discordLink: "https://discord.gg/dothack",
    image: "/images/events/event7.png",
  },
  {
    id: "8",
    title: "DSU DEVHACK 3.0",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 1000,
    status: "Offline",
    registration: "Open",
    startDate: "18/09/2026",
    applyLink: "https://dsu-devhack3.devfolio.co",
    discordLink: "https://discord.gg/dsudevhack",
    image: "/images/events/event8.png",
  },
  {
    id: "9",
    title: "Dora Hack 2.0",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 250,
    status: "Online",
    registration: "Open",
    startDate: "20/08/2026",
    applyLink: "https://dorahacks.io/hackathon/dora-hack-2",
    discordLink: "https://discord.gg/dorahacks",
    image: "/images/events/event9.png",
  },
  {
    id: "10",
    title: "HyperFusion",
    type: "Hackathon",
    theme: ["FinTech", "AI", "HealthTech"],
    participants: 500,
    status: "Offline",
    registration: "Open",
    startDate: "27/08/2026",
    applyLink: "https://hyperfusion.devfolio.co",
    discordLink: "https://discord.gg/hyperfusion",
    image: "/images/events/event10.png",
  },
  {
    id: "11",
    title: "HackNex Season 2",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 500,
    status: "Offline",
    registration: "Open",
    startDate: "25/09/2026",
    applyLink: "https://hacknex-s2.devfolio.co",
    discordLink: "https://discord.gg/hacknex",
    image: "/images/events/event11.png",
  },
  {
    id: "12",
    title: "HackInverse 1.0",
    type: "Hackathon",
    theme: ["No Restrictions"],
    participants: 250,
    status: "Offline",
    registration: "Open",
    startDate: "29/08/2026",
    applyLink: "https://hackinverse.devfolio.co",
    discordLink: "https://discord.gg/hackinverse",
    image: "/images/events/event12.png",
  },
];
