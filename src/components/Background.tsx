import { useEffect, useState } from "react";
import { IoSunny, IoMoonOutline } from "react-icons/io5";

export default function Background() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      setDarkMode(false);
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 w-full h-full -z-10 ${darkMode ? "" : "light-video"}`}>
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source type="video/mp4" src="./images/background/video.mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-7 right-7 rounded-full w-14 h-14 text-2xl flex items-center justify-center bg-white/70 backdrop-blur-lg outline-none"
      >
        {darkMode ? <IoSunny /> : <IoMoonOutline />}
      </button>
    </>
  );
}
