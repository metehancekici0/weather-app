import { useEffect, useState } from "react";
import cities from "../data/cities.json";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { FaCheck, FaChevronDown, FaWater } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";

import { FiWind } from "react-icons/fi";
import { CiTempHigh } from "react-icons/ci";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { convertWindSpeed, timestampToDate, timestampToDay } from "../helpers/helpers";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchWeatherData } from "../redux/slice/weatherSlice";
import SkeletonSidebar from "../skeleton/SkeletonSidebar";

interface citiesType {
  id: number;
  name: string;
}

export default function Sidebar() {
  const [selected, setSelected] = useState<citiesType | null>(cities[0]);
  const [query, setQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const status = useAppSelector((state) => state.weather.status);
  const weatherIcon = useAppSelector((state) => state.weather.weatherIcon);

  const filteredCities =
    query === ""
      ? cities
      : cities.filter((city) => {
          return city.name.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    if (selected?.name != null) {
      dispatch(fetchWeatherData(selected.name));
    }
  }, [selected]);

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
                {filteredCities.length === 0 ? (
                  <div className="py-2 px-3 text-sm text-black/60">No result found.</div>
                ) : (
                  filteredCities.map((city) => (
                    <ComboboxOption
                      key={city.id}
                      value={city}
                      className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none data-[focus]:bg-black/5"
                    >
                      <FaCheck className="invisible size-3 fill-black group-data-[selected]:visible" />
                      <div className="text-sm/6 text-black">{city.name}</div>
                    </ComboboxOption>
                  ))
                )}
              </div>
            </ComboboxOptions>
          </Combobox>
        </div>

        {status == "succeeded" ? (
          <>
            <div className="flex flex-col rounded-md mt-5 items-center py-5 px-8 bg-black/15">
              <h2 className="font-semibold text-2xl">{weatherData ? timestampToDay(weatherData?.list[0].dt) : ""} </h2>
              <img src={`./images/icons/${weatherIcon}`} className="w-52" alt="" />
              <div className="flex mb-2">
                <span className="text-4xl font-medium">{weatherData?.list[0].main.temp}</span>
                <span className="text-sm mt-1 text-black/70"> °C</span>
              </div>
              <span className="text-xl">{weatherData?.city.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <span className="text-black/70 text-sm">Feels Like</span>
                  <div>
                    <span className="text-2xl">{weatherData?.list[0].main.feels_like}</span>
                    <span className="text-xs"> °C</span>
                  </div>
                </div>
                <CiTempHigh className="size-6" />
              </div>
              <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <span className="text-black/70 text-sm">Rain (Last 3h)</span>
                  <div>
                    <span className="text-2xl">{weatherData?.list[0].rain ? weatherData.list[0].rain["3h"] : "0"} </span>
                    <span className="text-xs"> mm</span>
                  </div>
                </div>
                <IoRainyOutline className="size-6" />
              </div>

              <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <span className="text-black/70 text-sm">Humidity</span>
                  <div>
                    <span className="text-2xl">{weatherData?.list[0].main.humidity}</span>
                    <span className="text-xs"> %</span>
                  </div>
                </div>
                <FaWater className="size-6" />
              </div>
              <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <span className="text-black/70 text-sm">Wind Speed</span>
                  <div>
                    <span className="text-2xl">{weatherData?.list[0].wind.speed ? convertWindSpeed(weatherData?.list[0].wind.speed) : "N/A"}</span>
                    <span className="text-xs"> km/h</span>
                  </div>
                </div>
                <FiWind className="size-6" />
              </div>

              <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <span className="text-black/70 text-sm">Sunrise</span>
                  <div>
                    <span className="text-2xl">{weatherData?.city.sunrise ? timestampToDate(weatherData?.city.sunrise) : "N/A"}</span>
                    <span className="text-xs"> AM</span>
                  </div>
                </div>
                <WiSunrise className="size-6" />
              </div>
              <div className="bg-black/15 rounded-md flex justify-between items-center p-4">
                <div className="flex flex-col">
                  <span className="text-black/70 text-sm">Sunset</span>
                  <div>
                    <span className="text-2xl">{weatherData?.city.sunset ? timestampToDate(weatherData?.city.sunset) : "N/A"}</span>
                    <span className="text-xs"> PM</span>
                  </div>
                </div>
                <WiSunset className="size-6" />
              </div>
            </div>
          </>
        ) : (
          <SkeletonSidebar />
        )}
      </section>
    </aside>
  );
}
