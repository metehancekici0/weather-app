export const timestampToDate = (timestamp: number, isMillis: boolean = false): string => {
  if (isMillis) {
    timestamp = Math.floor(timestamp / 1000);
  }

  const date = new Date(timestamp * 1000);

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const convertWindSpeed = (windSpeedMs: number): number => {
  const windSpeedKmH = windSpeedMs * 3.6;
  return Math.floor(windSpeedKmH);
};

export const timestampToDay = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const iconcodeToIcon = (iconcode: string): string => {
  switch (iconcode) {
    case "01d":
    case "01n":
      return "clear.png";
    case "02d":
    case "02n":
      return "cloud.png";
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "drizzle.png";
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "rain.png";
    case "13d":
    case "13n":
      return "snow.png";
    default:
      return "clear.png";
  }
};

export const formatNumber = (value: number): number => {
  const roundedValue = Math.round(value * 10) / 10;
  const decimalPart = roundedValue - Math.floor(roundedValue);

  if (decimalPart <= 0.05) {
    return Math.floor(roundedValue);
  }

  return roundedValue;
};

export function dateToDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return date.toLocaleDateString("en-US", options);
}
