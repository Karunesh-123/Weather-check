import { useState } from "react";
import { GitCompareArrows } from "lucide-react";

import { useWeather } from "../context/WeatherContext.jsx";
import { getWeatherDescription } from "../api/weatherApi.js";
import { formatTemperature } from "../utils/temperature.js";
import PageHeading from "../components/common/PageHeading.jsx";
import UnitToggle from "../components/common/UnitToggle.jsx";
import CitySearch from "../components/search/CitySearch.jsx";
import WeatherIcon from "../components/weather/WeatherIcon.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

function ComparePanel({ city, weather, unit }) {
  if (!city || !weather) {
    return (
      <div className="compare-placeholder">
        <span>＋</span>
        <p>Choose a city to compare</p>
      </div>
    );
  }

  const current = weather.current;

  const stats = [
    {
      label: "Feels like",
      value: formatTemperature(current.apparent_temperature, unit),
    },
    {
      label: "Humidity",
      value: `${current.relative_humidity_2m}%`,
    },
    {
      label: "Wind",
      value: `${Math.round(current.wind_speed_10m)} km/h`,
    },
  ];

  return (
    <div className="compare-panel">
      <div className="eyebrow">CITY</div>
      <h3>{city.name}</h3>

      <WeatherIcon code={current.weather_code} isDay={current.is_day} />

      <div className="compare-temperature">
        {formatTemperature(current.temperature_2m, unit)}
      </div>

      <p>{getWeatherDescription(current.weather_code)}</p>

      {stats.map((stat) => (
        <div className="compare-stat" key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default function ComparePage() {
  const { unit, loadWeather } = useWeather();

  const [cities, setCities] = useState([null, null]);
  const [weatherData, setWeatherData] = useState([null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function chooseCity(index, city) {
    setCities((previousCities) =>
      previousCities.map((item, itemIndex) =>
        itemIndex === index ? city : item
      )
    );

    setWeatherData((previousWeather) =>
      previousWeather.map((item, itemIndex) =>
        itemIndex === index ? null : item
      )
    );

    setLoading(true);
    setError("");

    try {
      const data = await loadWeather(city);

      setWeatherData((previousWeather) =>
        previousWeather.map((item, itemIndex) =>
          itemIndex === index ? data : item
        )
      );
    } catch (requestError) {
      setError(requestError.message || "Could not load comparison.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-content">
      <PageHeading
        eyebrow="SIDE-BY-SIDE FORECAST"
        title="Compare cities"
        description="Choose two places and compare their current conditions."
        action={<UnitToggle />}
      />

      <div className="compare-search-grid">
        <div>
          <label className="form-label">First city</label>
          <CitySearch onSelect={(city) => chooseCity(0, city)} />
        </div>

        <div>
          <label className="form-label">Second city</label>
          <CitySearch onSelect={(city) => chooseCity(1, city)} />
        </div>
      </div>

      {loading && <LoadingState message="Loading comparison..." />}
      {error && <ErrorMessage message={error} />}

      <div className="compare-grid">
        <ComparePanel
          city={cities[0]}
          weather={weatherData[0]}
          unit={unit}
        />

        <div className="compare-divider">
          <GitCompareArrows size={22} />
        </div>

        <ComparePanel
          city={cities[1]}
          weather={weatherData[1]}
          unit={unit}
        />
      </div>

      {cities.every(Boolean) && weatherData.every(Boolean) && (
        <p className="comparison-note">
          Change the temperature unit above to switch both cities between
          Celsius and Fahrenheit.
        </p>
      )}
    </div>
  );
}
