import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherState } from "../../types/type";
import { iconcodeToIcon } from "../../helpers/helpers";

const apiKey = import.meta.env.VITE_WEATHER_APP_KEY;

const initialState: WeatherState = {
  weatherData: null,
  weatherIcon: "",
  status: "empty",
};

// fake fetching method
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData", async (cityName: string) => {
  try {
    const coordResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const coord = coordResponse.data.coord;

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&lang=tr&appid=${apiKey}&units=metric`
    );
    console.log(weatherResponse.data);
    await delay(1000);
    return weatherResponse.data;
  } catch (error) {
    console.error("Fetch Error!", error);
  }
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherIcon: (state, action: PayloadAction<string>) => {
      state.weatherIcon = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.weatherData = action.payload;

        const iconCode = action.payload.list[0].weather[0].icon;
        state.weatherIcon = iconcodeToIcon(iconCode);
      });
  },
});

export const { setWeatherIcon } = weatherSlice.actions;
export default weatherSlice.reducer;
