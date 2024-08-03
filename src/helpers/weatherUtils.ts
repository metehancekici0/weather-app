import { WeatherData, WeatherEntry } from "../types/type";
import { timestampToDate, formatNumber } from "../helpers/helpers";

// Helper function to group data by day
export const groupDataByDay = (weatherData: WeatherData | null): Record<string, WeatherEntry[]> => {
  if (!weatherData) return {};

  const days: Record<string, WeatherEntry[]> = {};
  weatherData.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const day = date.toISOString().split("T")[0];
    if (!days[day]) {
      days[day] = [];
    }
    days[day].push(entry);
  });

  return days;
};

// Helper function to get data for the selected day
export const getDataForSelectedDay = (selectedDay: string, days: Record<string, WeatherEntry[]>): { labels: string[]; data: number[] } => {
  if (!selectedDay || !days[selectedDay]) return { labels: [], data: [] };

  const dayData = days[selectedDay];

  const labels = dayData.map((entry) => timestampToDate(entry.dt));
  const data = dayData.map((entry) => formatNumber(entry.main.temp));

  return { labels, data };
};
