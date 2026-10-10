import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useWeather } from "../context/WeatherContext.jsx";
import PageHeading from "../components/common/PageHeading.jsx";
import UnitToggle from "../components/common/UnitToggle.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import CurrentWeather from "../components/weather/CurrentWeather.jsx";
import ForecastList from "../components/weather/ForecastList.jsx";
import WeatherHighlights from "../components/weather/WeatherHighlights.jsx";

export default function CityDetailsPage() {
  const { id } = useParams();

  const {
    unit,
    recentCities,
    favourites,
    isFavourite,
    toggleFavourite,
    loadWeather,
  } = useWeather();

  const city = [...recentCities, ...favourites].find(
    (item) => item.id === decodeURIComponent(id)
  );

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError("");

    loadWeather(city)
      .then(setWeather)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [city?.id]);

  if (!city) {
    return (
      <div className="page-content">
        <EmptyState
          title="City not found"
          message="Search for this city from the dashboard first."
          action={
            <Link className="btn btn-primary-soft" to="/">
              Back to dashboard
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="page-content">
      <Link to="/" className="back-link">
        <ArrowLeft size={17} /> Back to dashboard
      </Link>

      <PageHeading
        eyebrow="CITY DETAILS"
        title={city.name}
        description="Current conditions and the forecast."
        action={<UnitToggle />}
      />

      {loading && <LoadingState />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() =>
            loadWeather(city)
              .then(setWeather)
              .catch((requestError) => setError(requestError.message))
          }
        />
      )}

      {!loading && weather && (
        <>
          <CurrentWeather
            city={city}
            weather={weather}
            unit={unit}
            isFavourite={isFavourite(city)}
            onFavourite={() => toggleFavourite(city)}
          />

          <section className="content-section">
            <div className="section-heading">
              <div className="eyebrow">THE WEEK AHEAD</div>
              <h2>7-day forecast</h2>
            </div>
            <ForecastList daily={weather.daily} unit={unit} />
          </section>

          <section className="content-section">
            <h2>Today's highlights</h2>
            <WeatherHighlights daily={weather.daily} />
          </section>
        </>
      )}
    </div>
  );
}
