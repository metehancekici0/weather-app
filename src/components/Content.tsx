import { dateToDayOfWeek, formatNumber, iconcodeToIcon, timestampToDay } from "../helpers/helpers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Graph from "../graph/Graph.jsx";
import { setSelectedDay } from "../redux/slice/weatherSlice.js";
import { getDataForSelectedDay, groupDataByDay } from "../helpers/weatherUtils.js";
import SkeletonContent from "../skeleton/SkeletonContent.js";

export default function Content() {
  const { weatherData, status, weatherIcon, selectedDay, pointData, graphPosition } = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  const COLORS: string[] = ["#FED402"];
  const days = groupDataByDay(weatherData);

  const { labels, data } = getDataForSelectedDay(selectedDay, days);

  const handleDayClick = (day: string) => {
    dispatch(setSelectedDay(day));
  };

  const today = weatherData ? new Date(weatherData.list[0].dt * 1000).toISOString().split("T")[0] : "";
  const futureDays = Object.keys(days).filter((day) => day > today);
  const next4Days = futureDays.slice(0, 4);

  return (
    <>
      {status == "succeeded" ? (
        <section className="w-full bg-white/50 dark:bg-black/50 backdrop-blur-2xl border-black/20 dark:border-white/20 border-solid border rounded-xl p-8 md:p-3 overflow-auto dark:text-white">
          <div className="bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10 shadow-sm rounded-md mb-8 md:mb-3">
            <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 px-4 py-2">
              <div className="flex flex-col">
                <h1 className="text-3xl sm:text-xl font-semibold">{weatherData?.city.name}</h1>
                <p className="sm:text-xs">
                  {dateToDayOfWeek(selectedDay)} - {pointData.clock}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <img src={`./images/icons/${weatherIcon}`} className="w-20 h-20 sm:w-12 sm:h-12" alt="" />
                  <div className="flex">
                    <span className="text-4xl sm:text-xl text-black dark:text-white">{pointData.temp}</span>
                    <span className="text-lg text-black/75 dark:text-white/75">°C</span>
                  </div>
                </div>
              </div>
            </div>
            <Graph data={[data]} colors={COLORS} dispatch={dispatch} graphPosition={graphPosition} range={[0, 50]} labels={labels} />
          </div>
          <div className="next-4-days grid grid-cols-4 gap-8 md:gap-3 sm:grid-cols-2">
            {next4Days.map((day) => {
              const dayEntries = days[day];
              const temp = dayEntries.length > 0 ? dayEntries[0].main.temp : 0;
              const icon = dayEntries.length > 0 ? iconcodeToIcon(dayEntries[0].weather[0].icon) : "";

              return (
                <div
                  key={day}
                  className={`border border-black/10 dark:border-white/10 shadow-sm rounded-md p-4 flex flex-col items-center ${day === selectedDay ? "bg-black/10 dark:bg-white/10" : "bg-black/5 dark:bg-white/5 cursor-pointer"}`}
                  onClick={() => handleDayClick(day)}
                >
                  <h3 className="font-semibold text-lg sm:text-base">{timestampToDay(new Date(day).getTime() / 1000)}</h3>
                  <img src={`./images/icons/${icon}`} className="w-[40%] sm:w-[70%] " alt="" />
                  <div className="flex">
                    <span className="text-2xl text-black dark:text-white sm:text-lg">{formatNumber(temp)}</span>
                    <span className="text-xs mt-1 text-black/85 dark:text-white/85">°C</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <SkeletonContent />
      )}
    </>
  );
}
