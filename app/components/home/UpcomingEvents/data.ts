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
    id: "neo-genesis",
    title: "NEO_GENESIS_2026",
    organizer: "NEUROLINK CORP",
    image: "/images/events/neo_genesis.png",
    location: "VIRTUAL METAVERSE",
    mode: "Online",
    prizePool: "$150,000",
    registrationDeadline: getOffsetDateString(3), // 3 days remaining (Red warning)
    startDate: getOffsetDateString(6),
    endDate: getOffsetDateString(9),
    description: "Accelerate human-machine integration. Develop cognitive interfaces and decentralized AI neural nets under high-frequency simulations.",
    themeTags: ["AI", "Neural Net", "Cybernetics", "Open Source"],
    registrationLink: "#register-neo",
    detailsLink: "#details-neo"
  },
  {
    id: "void-runner",
    title: "VOID_RUNNER",
    organizer: "ZERO-KNOWLEDGE LABS",
    image: "/images/events/void_runner.png",
    location: "SF COMMONS / HYBRID",
    mode: "Hybrid",
    prizePool: "$250,000",
    registrationDeadline: getOffsetDateString(14), // 14 days remaining (Green active)
    startDate: getOffsetDateString(18),
    endDate: getOffsetDateString(21),
    description: "Architect security and zero-knowledge privacy protocols for the dark-net transit nodes. Build decentralized cryptographic relay runtimes.",
    themeTags: ["Web3", "ZK-Proofs", "Cryptography", "Security"],
    registrationLink: "#register-void",
    detailsLink: "#details-void"
  },
  {
    id: "synth-core",
    title: "SYNTH_CORE",
    organizer: "AETHER FOUNDATION",
    image: "/images/events/synth_core.png",
    location: "SHIBUYA UNDERGROUND",
    mode: "Offline",
    prizePool: "$100,000",
    registrationDeadline: getOffsetDateString(5), // 5 days remaining (Red warning)
    startDate: getOffsetDateString(8),
    endDate: getOffsetDateString(11),
    description: "Build custom low-level OS kernel modules, real-time memory management overrides, and custom drivers for modular synth matrix networks.",
    themeTags: ["C/C++", "Kernel Mod", "Open Source", "Hardware"],
    registrationLink: "#register-synth",
    detailsLink: "#details-synth"
  },
  {
    id: "matrix-reload",
    title: "MATRIX_RELOAD",
    organizer: "BLACK HAT ALLIANCE",
    image: "/images/events/matrix_reload.png",
    location: "DISTRIBUTED CLOUD",
    mode: "Online",
    prizePool: "$300,000",
    registrationDeadline: getOffsetDateString(25), // 25 days remaining (Green active)
    startDate: getOffsetDateString(30),
    endDate: getOffsetDateString(33),
    description: "Deconstruct post-quantum cryptographic primitives. Develop penetration defense grids, blockchain ledger overrides, and bypass protocols.",
    themeTags: ["Post-Quantum", "Solidity", "PenTesting", "Rust"],
    registrationLink: "#register-matrix",
    detailsLink: "#details-matrix"
  },
  {
    id: "bio-code",
    title: "BIO_CODE_GENESIS",
    organizer: "GENOMIC SYNAPSE",
    image: "/images/events/neo_genesis.png", // Reused template
    location: "BOSTON BIO-COMMONS",
    mode: "Offline",
    prizePool: "$175,000",
    registrationDeadline: getOffsetDateString(4), // 4 days remaining (Red warning)
    startDate: getOffsetDateString(7),
    endDate: getOffsetDateString(10),
    description: "Develop CRISPR genetic alignment simulators, protein structure calculators, and real-time DNA sequencer data analysis tools.",
    themeTags: ["BioTech", "Python", "Algorithms", "Open Source"],
    registrationLink: "#register-bio",
    detailsLink: "#details-bio"
  },
  {
    id: "quantum-shift",
    title: "QUANTUM_SHIFT",
    organizer: "LEDGER PROTOCOL",
    image: "/images/events/void_runner.png", // Reused template
    location: "VIRTUAL CLOUD",
    mode: "Online",
    prizePool: "$200,000",
    registrationDeadline: getOffsetDateString(18), // 18 days remaining (Green active)
    startDate: getOffsetDateString(22),
    endDate: getOffsetDateString(25),
    description: "Develop quantum-resistant block consensus engines, zero-latency distributed ledger syncing states, and sharding override bridges.",
    themeTags: ["Web3", "Consensus", "Rust", "Golang"],
    registrationLink: "#register-qshift",
    detailsLink: "#details-qshift"
  },
  {
    id: "cyber-dome",
    title: "CYBER_DOME_DEFENSE",
    organizer: "FEDERAL CYBER SECTOR",
    image: "/images/events/synth_core.png", // Reused template
    location: "WASHINGTON DC / HYBRID",
    mode: "Hybrid",
    prizePool: "$120,000",
    registrationDeadline: getOffsetDateString(6), // 6 days remaining (Red warning)
    startDate: getOffsetDateString(10),
    endDate: getOffsetDateString(13),
    description: "Participate in real-time red-team penetration simulation blocks. Build high-capacity automated firewall filters and alert triggers.",
    themeTags: ["Defense", "Networking", "PenTesting", "Linux"],
    registrationLink: "#register-cdome",
    detailsLink: "#details-cdome"
  },
  {
    id: "aether-drive",
    title: "AETHER_DRIVE_UAV",
    organizer: "AEROSPATIAL LABS",
    image: "/images/events/matrix_reload.png", // Reused template
    location: "MUNICH RESEARCH DOME",
    mode: "Offline",
    prizePool: "$220,000",
    registrationDeadline: getOffsetDateString(12), // 12 days remaining (Green active)
    startDate: getOffsetDateString(16),
    endDate: getOffsetDateString(19),
    description: "Write real-time flight controllers, sensor fusion processing arrays, and autonomous pathfinders for drone delivery swarms.",
    themeTags: ["C++", "Drone Tech", "ROS", "Telemetry"],
    registrationLink: "#register-adrive",
    detailsLink: "#details-adrive"
  },
  {
    id: "quantum-nexus",
    title: "QUANTUM_NEXUS",
    organizer: "NEXUS COMPUTING",
    image: "/images/events/event-09.webp", // New WebP
    location: "ORBITAL LABS / HYBRID",
    mode: "Hybrid",
    prizePool: "$400,000",
    registrationDeadline: getOffsetDateString(2), // 2 days remaining (Red warning)
    startDate: getOffsetDateString(5),
    endDate: getOffsetDateString(8),
    description: "Write processing layers for super-conducting topological qubits. Solve complex quantum logic gate matrices under thermal noise.",
    themeTags: ["Q#", "Quantum Computing", "Physics", "Linear Algebra"],
    registrationLink: "#register-qnexus",
    detailsLink: "#details-qnexus"
  },
  {
    id: "neural-forge",
    title: "NEURAL_FORGE_AI",
    organizer: "FORGE ROBOTICS",
    image: "/images/events/event-10.webp", // New WebP
    location: "ZURICH LABS",
    mode: "Offline",
    prizePool: "$350,000",
    registrationDeadline: getOffsetDateString(15), // 15 days remaining (Green active)
    startDate: getOffsetDateString(20),
    endDate: getOffsetDateString(23),
    description: "Train physical reinforcement learning models for robotic arm precision kinematics. Develop vision encoders and low-latency motor control.",
    themeTags: ["PyTorch", "Robotics", "Computer Vision", "Control Systems"],
    registrationLink: "#register-nforge",
    detailsLink: "#details-nforge"
  },
  {
    id: "skygrid-protocol",
    title: "SKYGRID_PROTOCOL",
    organizer: "MUNICIPAL SMART GRID",
    image: "/images/events/event-11.webp", // New WebP
    location: "VIRTUAL CITY DOME",
    mode: "Online",
    prizePool: "$280,000",
    registrationDeadline: getOffsetDateString(9), // 9 days remaining (Green active)
    startDate: getOffsetDateString(13),
    endDate: getOffsetDateString(16),
    description: "Design decentralized smart traffic networks for high-velocity urban flight corridors. Model drone pathways, logistics, and charging nodes.",
    themeTags: ["Smart Cities", "Go", "Simulation", "Routing"],
    registrationLink: "#register-skygrid",
    detailsLink: "#details-skygrid"
  },
  {
    id: "aether-network",
    title: "AETHER_NET_SECURITY",
    organizer: "AETHER COMMAND",
    image: "/images/events/event-12.webp", // New WebP
    location: "DISTRIBUTED SECURE VAULT",
    mode: "Online",
    prizePool: "$500,000",
    registrationDeadline: getOffsetDateString(22), // 22 days remaining (Green active)
    startDate: getOffsetDateString(28),
    endDate: getOffsetDateString(31),
    description: "Architect secure high-volume data networks utilizing quantum cryptography distribution nodes. Bypass intrusions and mitigate DDoS blocks.",
    themeTags: ["Network Sec", "Optics", "Cryptography", "Rust"],
    registrationLink: "#register-anet",
    detailsLink: "#details-anet"
  }
];
