import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { getWeatherDescription } from "../../api/weatherApi.js";
import { formatTemperature } from "../../utils/temperature.js";
import WeatherIcon from "../weather/WeatherIcon.jsx";
import FavouriteButton from "./FavouriteButton.jsx";

export default function CityCard({
  city,
  weather,
  unit,
  favourite,
  onFavourite,
}) {
  return (
    <article className="city-card">
      <div className="city-card-top">
        <span className="city-location">
          <MapPin size={15} />
          {city.country || "Saved city"}
        </span>

        <FavouriteButton
          active={favourite}
          onClick={onFavourite}
        />
      </div>

      <h3>{city.name}</h3>
      <p className="muted">{city.admin1 || city.country}</p>

      {weather ? (
        <div className="city-weather">
          <WeatherIcon
            code={weather.current.weather_code}
            isDay={weather.current.is_day}
            size="medium"
          />

          <div>
            <strong>
              {formatTemperature(weather.current.temperature_2m, unit)}
            </strong>
            <span>
              {getWeatherDescription(weather.current.weather_code)}
            </span>
          </div>
        </div>
      ) : (
        <p className="muted city-weather-empty">
          Open details to load weather.
        </p>
      )}

      <Link
        className="text-link"
        to={`/city/${encodeURIComponent(city.id)}`}
      >
        View details <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
