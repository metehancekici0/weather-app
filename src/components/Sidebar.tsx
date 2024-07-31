import { useEffect, useState } from "react";
import cities from "../data/cities.json";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { FaCheck, FaChevronDown, FaWater } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";

import { FiWind } from "react-icons/fi";
import { CiTempHigh } from "react-icons/ci";
import { WiSunrise, WiSunset } from "react-icons/wi";

import axios from "axios";
import timestampToDate from "../helpers/timestampToDate";

interface citiesType {
  id: number;
  name: string;
}

const apiKey = import.meta.env.VITE_WEATHER_APP_KEY;

export default function Sidebar() {
  const [selected, setSelected] = useState<citiesType | null>(cities[0]);
  const [weatherData, setWeatherData] = useState<any>();
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const filteredPeople =
    query === ""
      ? cities
      : cities.filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase());
        });

  const getCoordByCity = async (cityName: string): Promise<any> => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      return response.data.coord;
    } catch (error) {
      console.error("Veri getirilemedi! ", error);
    }
  };

  const getWeatherByCoord = async (coord: { lat: number; lon: number }): Promise<any> => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Veri Getirilemedi! ", error);
    }
  };

  const updateWeatherData = async (cityName: string): Promise<void> => {
    try {
      const coord = await getCoordByCity(cityName);
      const weatherData = await getWeatherByCoord(coord);
      setWeatherData(weatherData);
      // console.log(weatherData);

      if (weatherData.list[0].weather[0].icon === "01d" || weatherData.list[0].weather[0].icon === "01n") {
        setWeatherIcon("clear.png");
      } else if (weatherData.list[0].weather[0].icon === "02d" || weatherData.list[0].weather[0].icon === "02n") {
        setWeatherIcon("cloud.png");
      } else if (weatherData.list[0].weather[0].icon === "03d" || weatherData.list[0].weather[0].icon === "03n") {
        setWeatherIcon("drizzle.png");
      } else if (weatherData.list[0].weather[0].icon === "04d" || weatherData.list[0].weather[0].icon === "04n") {
        setWeatherIcon("drizzle.png");
      } else if (weatherData.list[0].weather[0].icon === "09d" || weatherData.list[0].weather[0].icon === "09n") {
        setWeatherIcon("rain.png");
      } else if (weatherData.list[0].weather[0].icon === "10d" || weatherData.list[0].weather[0].icon === "10n") {
        setWeatherIcon("rain.png");
      } else if (weatherData.list[0].weather[0].icon === "13d" || weatherData.list[0].weather[0].icon === "13n") {
        setWeatherIcon("snow.png");
      } else {
        setWeatherIcon("clear.png");
      }
    } catch (error) {
      console.error("Hata oluştu: ", error);
    }
  };

  useEffect(() => {
    if (selected?.name != null) updateWeatherData(selected.name);
  }, [selected]);

  // useEffect(() => {
  //   console.log(cityCoord);
  // }, [cityCoord]);

  return (
    <aside className="bg-white/50 border-black/20 backdrop-blur-lg border-solid border rounded-xl h-full flex-shrink-0 overflow-auto">
      <header className="p-6 border-b border-black/20 border-solid text-2xl text-center flex">
        <div className="flex items-center gap-x-2">
          <span className="w-4 h-4 rounded-full bg-[#d83836] flex border-solid border border-[#d83836]"></span>
          <span className="w-4 h-4 rounded-full bg-[#ffbb3b] flex border-solid border border-[#d69317]"></span>
          <span className="w-4 h-4 rounded-full bg-[#34c748] flex border-solid border border-[#1bad2f]"></span>
        </div>
        <div className="flex ml-5">
          <h1 className="tracking-tight">Weather App</h1> <small className="tracking-tighter text-black/70 ml-2">(Vite + React + TS)</small>
        </div>
      </header>
      <section className="py-6 px-8">
        <div>
          <label className="text-sm text-black/70 mb-1">Select a city:</label>
          <Combobox value={selected} onChange={(value: citiesType) => setSelected(value)} onClose={() => setQuery("")}>
            <div className="relative">
              <ComboboxInput
                className="w-full rounded-md bg-white/60 border border-black/10 border-solid py-1.5 pr-8 pl-3 text-sm/6 text-black focus:outline-none"
                displayValue={(city: citiesType) => city?.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <FaChevronDown className="size-3 fill-black/60 group-data-[hover]:fill-black" />
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor="bottom"
              transition
              className="w-[var(--input-width)] rounded-md bg-white/60 border border-black/5 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 mt-2 p-0 overflow-hidden relative h-[var(--anchor-height)] backdrop-blur-2xl"
            >
              <div className="overflow-auto h-full absolute top-0 left-0 w-full">
                {filteredPeople.map((city) => (
                  <ComboboxOption
                    key={city.id}
                    value={city}
                    className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-black/5"
                  >
                    <FaCheck className="invisible size-3 fill-black group-data-[selected]:visible" />
                    <div className="text-sm/6 text-black">{city.name}</div>
                  </ComboboxOption>
                ))}
              </div>
            </ComboboxOptions>
          </Combobox>
        </div>
        <div className="flex flex-col rounded-md mt-5 items-center py-5 px-8 bg-black/15">
          <img src={`./images/icons/${weatherIcon}`} className="w-52" alt="" />
          <div className="flex text-4xl mb-2 font-medium">
            <span>{weatherData?.list[0].main.temp}</span>
            <span>°C</span>
          </div>
          <span className="text-xl">{weatherData?.city.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-5">
          <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
            <div className="flex flex-col">
              <span className="text-black/70 text-sm">Feels Like</span>
              <div>
                <span className="text-2xl">{weatherData?.list[0].main.feels_like}</span>
                <span className="text-xs">°C</span>
              </div>
            </div>
            <CiTempHigh className="size-6" />
          </div>
          <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
            <div className="flex flex-col">
              <span className="text-black/70 text-sm">Rain (Last 3h)</span>
              <div>
                <span className="text-2xl">{weatherData?.list[0].rain ? weatherData.list[0].rain["3h"] : "0"} </span>
                <span className="text-xs">mm</span>
              </div>
            </div>
            <IoRainyOutline className="size-6" />
          </div>

          <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
            <div className="flex flex-col">
              <span className="text-black/70 text-sm">Humidity</span>
              <div>
                <span className="text-2xl">{weatherData?.list[0].main.humidity}</span>
                <span className="text-xs">%</span>
              </div>
            </div>
            <FaWater className="size-6" />
          </div>
          <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
            <div className="flex flex-col">
              <span className="text-black/70 text-sm">Wind Speed</span>
              <div>
                <span className="text-2xl">{weatherData?.list[0].wind.speed}</span>
                <span className="text-xs">km/h</span>
              </div>
            </div>
            <FiWind className="size-6" />
          </div>

          <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
            <div className="flex flex-col">
              <span className="text-black/70 text-sm">Sunrise</span>
              <div>
                <span className="text-2xl">{timestampToDate(weatherData?.city.sunrise)}</span>
                <span className="text-xs">AM</span>
              </div>
            </div>
            <WiSunrise className="size-6" />
          </div>
          <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
            <div className="flex flex-col">
              <span className="text-black/70 text-sm">Sunset</span>
              <div>
                <span className="text-2xl">{timestampToDate(weatherData?.city.sunset)}</span>
                <span className="text-xs">PM</span>
              </div>
            </div>
            <WiSunset className="size-6" />
          </div>
        </div>
      </section>
    </aside>
  );
}
