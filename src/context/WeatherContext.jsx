import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getWeather, searchCities } from "../api/weatherApi.js";

const WeatherContext = createContext(null);

function readFromStorage(key, fallbackValue) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function WeatherProvider({ children }) {
  const [unit, setUnit] = useState(
    () => localStorage.getItem("weather-check-unit") || "C"
  );

  const [theme, setTheme] = useState(
    () => localStorage.getItem("weather-check-theme") || "dark"
  );

  const [favourites, setFavourites] = useState(
    () => readFromStorage("weather-check-favourites", [])
  );

  const [recentCities, setRecentCities] = useState(
    () => readFromStorage("weather-check-recent", [])
  );

  const [weatherCache, setWeatherCache] = useState({});

  useEffect(() => {
    localStorage.setItem("weather-check-unit", unit);
  }, [unit]);

  useEffect(() => {
    localStorage.setItem("weather-check-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "weather-check-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem(
      "weather-check-recent",
      JSON.stringify(recentCities)
    );
  }, [recentCities]);

  function rememberCity(city) {
    setRecentCities((previousCities) => {
      const remainingCities = previousCities.filter(
        (item) => item.id !== city.id
      );

      return [city, ...remainingCities].slice(0, 6);
    });
  }

  function toggleFavourite(city) {
    setFavourites((previousFavourites) => {
      const alreadySaved = previousFavourites.some(
        (item) => item.id === city.id
      );

      if (alreadySaved) {
        return previousFavourites.filter((item) => item.id !== city.id);
      }

      return [city, ...previousFavourites];
    });
  }

  function isFavourite(city) {
    return favourites.some((item) => item.id === city.id);
  }

  async function loadWeather(city) {
    if (weatherCache[city.id]) {
      return weatherCache[city.id];
    }

    const weatherData = await getWeather(city);

    setWeatherCache((previousCache) => ({
      ...previousCache,
      [city.id]: weatherData,
    }));

    return weatherData;
  }

  const contextValue = {
    unit,
    setUnit,
    theme,
    setTheme,
    favourites,
    recentCities,
    weatherCache,
    rememberCity,
    toggleFavourite,
    isFavourite,
    loadWeather,
    searchCities,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used inside WeatherProvider.");
  }

  return context;
}
