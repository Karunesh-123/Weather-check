import ForecastCard from "./ForecastCard.jsx";

export default function ForecastList({ daily, unit }) {
  return (
    <div className="forecast-grid">
      {daily.time.map((date, index) => (
        <ForecastCard
          key={date}
          date={date}
          index={index}
          code={daily.weather_code[index]}
          maximum={daily.temperature_2m_max[index]}
          minimum={daily.temperature_2m_min[index]}
          probability={daily.precipitation_probability_max?.[index]}
          unit={unit}
        />
      ))}
    </div>
  );
}
