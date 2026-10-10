import { useWeather } from "../../context/WeatherContext.jsx";

export default function UnitToggle() {
  const { unit, setUnit } = useWeather();

  return (
    <div className="unit-toggle" aria-label="Temperature unit">
      <button
        className={unit === "C" ? "active" : ""}
        onClick={() => setUnit("C")}
      >
        °C
      </button>

      <button
        className={unit === "F" ? "active" : ""}
        onClick={() => setUnit("F")}
      >
        °F
      </button>
    </div>
  );
}
