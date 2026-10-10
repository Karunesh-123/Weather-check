import { Link } from "react-router-dom";

import { useWeather } from "../context/WeatherContext.jsx";
import PageHeading from "../components/common/PageHeading.jsx";
import UnitToggle from "../components/common/UnitToggle.jsx";
import CitySection from "../components/cities/CitySection.jsx";

export default function FavouritesPage() {
  const {
    favourites,
    weatherCache,
    unit,
    isFavourite,
    toggleFavourite,
  } = useWeather();

  return (
    <div className="page-content">
      <PageHeading
        eyebrow="YOUR COLLECTION"
        title="Favourite cities"
        description="Your saved places, all in one view."
        action={<UnitToggle />}
      />

      <CitySection
        cities={favourites}
        weatherCache={weatherCache}
        unit={unit}
        isFavourite={isFavourite}
        onFavourite={toggleFavourite}
        emptyTitle="Nothing saved yet"
        emptyMessage="Go to the dashboard and tap the heart on a city you want to keep."
      />

      <div className="page-bottom-link">
        <Link className="btn btn-primary-soft" to="/">
          Search for a city
        </Link>
      </div>
    </div>
  );
}
