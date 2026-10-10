import {
  CloudRain,
  Droplets,
  Thermometer,
  Wind,
} from "lucide-react";

import { getWeatherDescription } from "../../api/weatherApi.js";
import { formatTemperature } from "../../utils/temperature.js";
import WeatherIcon from "./WeatherIcon.jsx";
import WeatherMetric from "./WeatherMetric.jsx";
import FavouriteButton from "../cities/FavouriteButton.jsx";

export default function CurrentWeather({
  city,
  weather,
  unit,
  isFavourite,
  onFavourite,
}) {
  const current = weather.current;

  const metrics = [
    {
      icon: Droplets,
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
    },
    {
      icon: Wind,
      label: "Wind speed",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
    },
    {
      icon: Thermometer,
      label: "Feels like",
      value: formatTemperature(current.apparent_temperature, unit),
    },
    {
      icon: CloudRain,
      label: "Precipitation",
      value: `${current.precipitation} mm`,
    },
  ];

  return (
    <section className="current-weather panel">
      <div className="current-top">
        <div>
          <div className="eyebrow">CURRENT WEATHER</div>
          <h2>{city.name}</h2>

          <p className="muted">
            {[city.admin1, city.country].filter(Boolean).join(", ") ||
              `${city.latitude.toFixed(2)}, ${city.longitude.toFixed(2)}`}
          </p>
        </div>

        <FavouriteButton
          active={isFavourite}
          onClick={onFavourite}
        />
      </div>

      <div className="current-main">
        <WeatherIcon
          code={current.weather_code}
          isDay={current.is_day}
        />

        <div>
          <div className="big-temp">
            {formatTemperature(current.temperature_2m, unit)}
          </div>

          <div className="condition">
            {getWeatherDescription(current.weather_code)}
          </div>

          <div className="feels-like">
            Feels like{" "}
            {formatTemperature(current.apparent_temperature, unit)}
          </div>
        </div>
      </div>

      <div className="metric-grid">
        {metrics.map((metric) => (
          <WeatherMetric
            key={metric.label}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
    </section>
  );
}
