import CityCard from "./CityCard.jsx";
import EmptyState from "../common/EmptyState.jsx";

export default function CitySection({
  cities,
  weatherCache,
  unit,
  isFavourite,
  onFavourite,
  emptyTitle,
  emptyMessage,
}) {
  if (cities.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  return (
    <div className="city-grid">
      {cities.map((city) => (
        <CityCard
          key={city.id}
          city={city}
          weather={weatherCache[city.id]}
          unit={unit}
          favourite={isFavourite(city)}
          onFavourite={() => onFavourite(city)}
        />
      ))}
    </div>
  );
}
