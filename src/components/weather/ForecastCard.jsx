import { getWeatherDescription } from "../../api/weatherApi.js";
import { formatTemperature } from "../../utils/temperature.js";
import { formatDay } from "../../utils/date.js";
import WeatherIcon from "./WeatherIcon.jsx";

export default function ForecastCard({
  date,
  index,
  code,
  maximum,
  minimum,
  probability,
  unit,
}) {
  return (
    <div className="forecast-card">
      <span className="forecast-day">{formatDay(date, index)}</span>

      <WeatherIcon code={code} size="medium" />

      <span className="forecast-condition">
        {getWeatherDescription(code)}
      </span>

      <div className="forecast-temperatures">
        <strong>{formatTemperature(maximum, unit)}</strong>
        <span>{formatTemperature(minimum, unit)}</span>
      </div>

      <small>{probability ?? 0}% rain</small>
    </div>
  );
}
