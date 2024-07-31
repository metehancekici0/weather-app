export interface WeatherData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    rain?: {
      "3h": number;
    };
    wind: {
      speed: number;
    };
    weather: Array<{ icon: string }>;
  }>;
  city: {
    name: string;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherState {
  weatherData: WeatherData | null;
  weatherIcon: string;
  status: "empty" | "loading" | "succeeded" | "failed";
}
