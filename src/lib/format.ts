export function formatTimeUTC(iso: string): string {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
  return fmt.format(new Date(iso));
}

export function formatTimeRangeUTC(startIso: string, endIso: string): string {
  return `${formatTimeUTC(startIso)}–${formatTimeUTC(endIso)}`;
}
