import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { graphPositionType, WeatherState } from "../../types/type";
import { iconcodeToIcon } from "../../helpers/helpers";
import { groupDataByDay, getDataForSelectedDay } from "../../helpers/weatherUtils"; // İçe aktarma

const apiKey = import.meta.env.VITE_WEATHER_APP_KEY;

const initialState: WeatherState = {
  weatherData: null,
  weatherIcon: "",
  status: "empty",
  labels: [],
  data: [],
  selectedDay: "",
  pointData: {
    clock: "",
    temp: 0,
  },
  graphPosition: {
    path: 0,
    point: 0,
  },
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
    // console.log(weatherResponse.data);
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
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;

      const days = groupDataByDay(state.weatherData);
      const { labels, data } = getDataForSelectedDay(action.payload, days);

      state.labels = labels;
      state.data = data;

      // Yeni eklenen setPointData(0) çağrısı
      state.pointData.temp = data[0];
      state.pointData.clock = labels[0];

      state.graphPosition.path = 0;
      state.graphPosition.point = 0;
    },
    setPointData: (state, action: PayloadAction<number>) => {
      state.pointData.temp = state.data[action.payload];
      state.pointData.clock = state.labels[action.payload];
    },
    setGraphPosition: (state, action: PayloadAction<graphPositionType>) => {
      state.graphPosition.path = action.payload.path;
      state.graphPosition.point = action.payload.point;
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

        // Automatically set the first day as selected if available
        const days = groupDataByDay(state.weatherData);
        const firstDay = Object.keys(days)[0];
        if (firstDay) {
          state.selectedDay = firstDay;
          const { labels, data } = getDataForSelectedDay(firstDay, days);

          state.labels = labels;
          state.data = data;

          // Yeni eklenen setPointData(0) çağrısı
          state.pointData.temp = data[0];
          state.pointData.clock = labels[0];

          state.graphPosition.path = 0;
          state.graphPosition.point = 0;
        }
      });
  },
});

export const { setWeatherIcon, setSelectedDay, setPointData, setGraphPosition } = weatherSlice.actions;
export default weatherSlice.reducer;
