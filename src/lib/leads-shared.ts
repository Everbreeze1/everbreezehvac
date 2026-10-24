// Shared between the booking form (browser) and the leads API (server).
export const TIME_WINDOWS = [
  { label: "8:00 – 10:00 AM", start: 8 },
  { label: "10:00 AM – 12:00 PM", start: 10 },
  { label: "12:00 – 2:00 PM", start: 12 },
  { label: "2:00 – 4:00 PM", start: 14 },
  { label: "4:00 – 6:00 PM", start: 16 },
] as const;
