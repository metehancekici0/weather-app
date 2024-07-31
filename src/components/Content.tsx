import { iconcodeToIcon, timestampToDay } from "../helpers/helpers";
import { useAppSelector } from "../redux/hooks";

export default function Content() {
  const weatherData = useAppSelector((state) => state.weather.weatherData);

  return (
    <section className="w-full bg-white/50 backdrop-blur-lg border-black/20 border-solid border rounded-xl h-full p-8">
      <div className="next-5-days grid grid-cols-5 gap-6">
        <div className="bg-black/15 rounded-md p-4 flex flex-col items-center">
          <h3 className="font-semibold text-lg">{weatherData ? timestampToDay(weatherData?.list[7].dt) : ""}</h3>
          <img src={`./images/icons/${weatherData ? iconcodeToIcon(weatherData?.list[7].weather[0].icon) : ""}`} className="w-[60%]" alt="" />
          <div className="flex">
            <span className="text-2xl text-black">{weatherData?.list[7].main.temp}</span>
            <span className="text-xs mt-1 text-black/85">°C</span>
          </div>
        </div>
        <div className="bg-black/15 rounded-md p-4 flex flex-col items-center">
          <h3 className="font-semibold text-lg">{weatherData ? timestampToDay(weatherData?.list[15].dt) : ""}</h3>
          <img src={`./images/icons/${weatherData ? iconcodeToIcon(weatherData?.list[15].weather[0].icon) : ""}`} className="w-[60%]" alt="" />
          <div className="flex">
            <span className="text-2xl text-black">{weatherData?.list[15].main.temp}</span>
            <span className="text-xs mt-1 text-black/85">°C</span>
          </div>
        </div>
        <div className="bg-black/15 rounded-md p-4 flex flex-col items-center">
          <h3 className="font-semibold text-lg">{weatherData ? timestampToDay(weatherData?.list[23].dt) : ""}</h3>
          <img src={`./images/icons/${weatherData ? iconcodeToIcon(weatherData?.list[23].weather[0].icon) : ""}`} className="w-[60%]" alt="" />
          <div className="flex">
            <span className="text-2xl text-black">{weatherData?.list[23].main.temp}</span>
            <span className="text-xs mt-1 text-black/85">°C</span>
          </div>
        </div>
        <div className="bg-black/15 rounded-md p-4 flex flex-col items-center">
          <h3 className="font-semibold text-lg">{weatherData ? timestampToDay(weatherData?.list[31].dt) : ""}</h3>
          <img src={`./images/icons/${weatherData ? iconcodeToIcon(weatherData?.list[31].weather[0].icon) : ""}`} className="w-[60%]" alt="" />
          <div className="flex">
            <span className="text-2xl text-black">{weatherData?.list[31].main.temp}</span>
            <span className="text-xs mt-1 text-black/85">°C</span>
          </div>
        </div>
        <div className="bg-black/15 rounded-md p-4 flex flex-col items-center">
          <h3 className="font-semibold text-lg">{weatherData ? timestampToDay(weatherData?.list[39].dt) : ""}</h3>
          <img src={`./images/icons/${weatherData ? iconcodeToIcon(weatherData?.list[39].weather[0].icon) : ""}`} className="w-[60%]" alt="" />
          <div className="flex">
            <span className="text-2xl text-black">{weatherData?.list[39].main.temp}</span>
            <span className="text-xs mt-1 text-black/85">°C</span>
          </div>
        </div>
      </div>
    </section>
  );
}
