import { useEffect, useState } from "react";
import cities from "../data/cities.json";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { FaCheck, FaChevronDown, FaWater } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";
import { FiWind } from "react-icons/fi";
import { CiTempHigh } from "react-icons/ci";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { convertWindSpeed, formatNumber, timestampToDate, timestampToDay } from "../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchWeatherData, setSelectedDay } from "../redux/slice/weatherSlice";
import SkeletonSidebar from "../skeleton/SkeletonSidebar";
import { citiesType } from "../types/type";

export default function Sidebar() {
  const [selected, setSelected] = useState<citiesType | null>(cities[0]);
  const [query, setQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const { weatherData, status, weatherIcon, selectedDay } = useAppSelector((state) => state.weather);
  const today = weatherData ? new Date(weatherData.list[0].dt * 1000).toISOString().split("T")[0] : "";

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

  const handleDaySelect = (day: string) => {
    dispatch(setSelectedDay(day));
  };

  return (
    <aside className="bg-white/50 backdrop-blur-2xl dark:bg-black/50 border-solid border border-black/20 rounded-xl h-full flex-shrink-0 overflow-auto dark:text-white">
      <header className="p-6 sm:p-4 border-b border-black/20 dark:border-white/20 border-solid text-2xl text-center flex">
        <div className="flex items-center gap-x-2">
          <span className="w-4 h-4 rounded-full bg-[#d83836] flex border-solid border border-[#d83836]"></span>
          <span className="w-4 h-4 rounded-full bg-[#ffbb3b] flex border-solid border border-[#d69317]"></span>
          <span className="w-4 h-4 rounded-full bg-[#34c748] flex border-solid border border-[#1bad2f]"></span>
        </div>
        <div className="flex ml-5">
          <h1 className="tracking-tight">Weather App</h1>
          <small className="tracking-tighter text-black/70 dark:text-white/70 ml-2 sm:hidden">(Vite + React + TS)</small>
        </div>
      </header>
      <section className="py-6 px-8 xl:max-w-[80%] mx-auto md:max-w-full md:px-3 md:py-3">
        <div>
          <label className="text-sm text-black/70 dark:text-white/70 mb-1">Select a city:</label>
          <Combobox value={selected} onChange={(value: citiesType) => setSelected(value)} onClose={() => setQuery("")}>
            <div className="relative">
              <ComboboxInput
                className="w-full rounded-md bg-white/60 dark:bg-black/60 border border-black/10 dark:border-white/10 dark:text-white border-solid py-1.5 pr-8 pl-3 text-sm/6 text-black focus:outline-none"
                displayValue={(city: citiesType) => city?.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <FaChevronDown className="size-3 fill-black/60 dark:fill-white/60 dark:group-data-[hover]:fill-white group-data-[hover]:fill-black" />
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor="bottom"
              transition
              className="w-[var(--input-width)] rounded-md bg-white/60 dark:bg-black/60 border border-black/5 dark:border-white/5 [--anchor-gap:var(--spacing-1)] empty:invisible transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 mt-2 p-0 overflow-hidden relative h-[var(--anchor-height)] backdrop-blur-2xl"
            >
              <div className="overflow-auto h-full absolute top-0 left-0 w-full">
                {filteredCities.length === 0 ? (
                  <div className="py-2 px-3 text-sm text-black/60 dark:text-white/60">No result found.</div>
                ) : (
                  filteredCities.map((city) => (
                    <ComboboxOption
                      key={city.id}
                      value={city}
                      className="group flex cursor-default items-center gap-2 py-1.5 px-3 select-none dark:data-[focus]:bg-white/5 data-[focus]:bg-black/5"
                    >
                      <FaCheck className="invisible size-3 fill-black dark:fill-white group-data-[selected]:visible" />
                      <div className="text-sm/6 text-black dark:text-white">{city.name}</div>
                    </ComboboxOption>
                  ))
                )}
              </div>
            </ComboboxOptions>
          </Combobox>
        </div>

        {status == "succeeded" ? (
          <>
            <div
              onClick={() => {
                handleDaySelect(today);
              }}
              className={`flex flex-col rounded-md mt-5 items-center py-5 px-8 border border-black/10 dark:border-white/10 shadow-sm ${today === selectedDay ? "bg-black/10 dark:bg-white/10" : "bg-black/5 dark:bg-white/5 cursor-pointer"}`}
            >
              <h2 className="font-semibold text-2xl sm:text-xl sm:font-medium h-8">{weatherData ? timestampToDay(weatherData?.list[0].dt) : ""} </h2>
              <img src={`./images/icons/${weatherIcon}`} className="w-52 h-52 sm:w-36 sm:h-36" alt="" />
              <div className="flex mb-2 h-10">
                <span className="text-4xl font-medium">{weatherData ? formatNumber(weatherData?.list[0].main.temp) : ""}</span>
                <span className="text-sm mt-1 text-black/70 dark:text-white/70"> °C</span>
              </div>
              <span className="text-xl h-7">{weatherData?.city.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-5">
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm rounded-md flex justify-between items-center p-4 sm:p-2">
                <div className="flex flex-col">
                  <span className="text-black/70 dark:text-white/50 text-sm sm:text-xs">Feels Like</span>
                  <div className="dark:text-white/85">
                    <span className="text-2xl sm:text-xl">{weatherData ? formatNumber(weatherData?.list[0].main.feels_like) : ""}</span>
                    <span className="text-xs"> °C</span>
                  </div>
                </div>
                <CiTempHigh className="size-6" />
              </div>
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm rounded-md flex justify-between items-center p-4 sm:p-2">
                <div className="flex flex-col">
                  <span className="text-black/70 dark:text-white/50 text-sm sm:text-xs">Rain (Last 3h)</span>
                  <div className="dark:text-white/85">
                    <span className="text-2xl sm:text-xl">{weatherData?.list[0].rain ? weatherData.list[0].rain["3h"] : "0"} </span>
                    <span className="text-xs"> mm</span>
                  </div>
                </div>
                <IoRainyOutline className="size-6" />
              </div>

              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm rounded-md flex justify-between items-center p-4 sm:p-2">
                <div className="flex flex-col">
                  <span className="text-black/70 dark:text-white/50 text-sm sm:text-xs">Humidity</span>
                  <div className="dark:text-white/85">
                    <span className="text-2xl sm:text-xl">{weatherData?.list[0].main.humidity}</span>
                    <span className="text-xs"> %</span>
                  </div>
                </div>
                <FaWater className="size-6" />
              </div>
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm rounded-md flex justify-between items-center p-4 sm:p-2">
                <div className="flex flex-col">
                  <span className="text-black/70 dark:text-white/50 text-sm sm:text-xs">Wind Speed</span>
                  <div className="dark:text-white/85">
                    <span className="text-2xl sm:text-xl">
                      {weatherData?.list[0].wind.speed ? convertWindSpeed(weatherData?.list[0].wind.speed) : "N/A"}
                    </span>
                    <span className="text-xs"> km/h</span>
                  </div>
                </div>
                <FiWind className="size-6" />
              </div>

              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm rounded-md flex justify-between items-center p-4 sm:p-2">
                <div className="flex flex-col">
                  <span className="text-black/70 dark:text-white/50 text-sm sm:text-xs">Sunrise</span>
                  <div className="dark:text-white/85">
                    <span className="text-2xl sm:text-xl">{weatherData?.city.sunrise ? timestampToDate(weatherData?.city.sunrise) : "N/A"}</span>
                    <span className="text-xs"> AM</span>
                  </div>
                </div>
                <WiSunrise className="size-6" />
              </div>
              <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm rounded-md flex justify-between items-center p-4 sm:p-2">
                <div className="flex flex-col">
                  <span className="text-black/70 dark:text-white/50 text-sm sm:text-xs">Sunset</span>
                  <div className="dark:text-white/85">
                    <span className="text-2xl sm:text-xl">{weatherData?.city.sunset ? timestampToDate(weatherData?.city.sunset) : "N/A"}</span>
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
