import { getWeatherEmoji } from "../../api/weatherApi.js";

export default function WeatherIcon({
  code,
  isDay = true,
  size = "large",
}) {
  return (
    <span
      className={`weather-emoji ${size}`}
      role="img"
      aria-label="Weather condition"
    >
      {getWeatherEmoji(code, Boolean(isDay))}
    </span>
  );
}
