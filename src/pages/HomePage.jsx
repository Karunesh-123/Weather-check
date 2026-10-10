import { useEffect, useState } from "react";
import { ArrowRight, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { useWeather } from "../context/WeatherContext.jsx";
import PageHeading from "../components/common/PageHeading.jsx";
import UnitToggle from "../components/common/UnitToggle.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import CitySearch from "../components/search/CitySearch.jsx";
import LocationButton from "../components/location/LocationButton.jsx";
import CurrentWeather from "../components/weather/CurrentWeather.jsx";
import ForecastList from "../components/weather/ForecastList.jsx";
import WeatherHighlights from "../components/weather/WeatherHighlights.jsx";
import CitySection from "../components/cities/CitySection.jsx";

const DEFAULT_CITY = {
  id: "28.6139,77.2090",
  name: "New Delhi",
  country: "India",
  admin1: "Delhi",
  latitude: 28.6139,
  longitude: 77.209,
  timezone: "Asia/Kolkata",
};

export default function HomePage() {
  const {
    unit,
    favourites,
    recentCities,
    weatherCache,
    rememberCity,
    toggleFavourite,
    isFavourite,
    loadWeather,
  } = useWeather();

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function selectCity(selectedCity) {
    setCity(selectedCity);
    rememberCity(selectedCity);
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const data = await loadWeather(selectedCity);
      setWeather(data);
    } catch (requestError) {
      setError(requestError.message || "Unable to load weather.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    selectCity(DEFAULT_CITY);
    // Load the default city only when the dashboard first opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCurrentLocation(location) {
    // Important: load the forecast directly using the browser coordinates.
    // No unsupported reverse-geocoding endpoint is called here.
    await selectCity(location);
  }

  return (
    <div className="page-content">
      <PageHeading
        eyebrow="YOUR PERSONAL WEATHER DASHBOARD"
        title="Weather, made simple."
        description="Know what the sky has planned for you today."
        action={<UnitToggle />}
      />

      <div className="search-row">
        <CitySearch onSelect={selectCity} />
        <LocationButton onLocate={handleCurrentLocation} />
      </div>

      {loading && (
        <LoadingState message="Getting the latest weather..." />
      )}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => city && selectCity(city)}
        />
      )}

      {!loading && !error && weather && city && (
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
              <div>
                <div className="eyebrow">THE WEEK AHEAD</div>
                <h2>7-day forecast</h2>
              </div>

              <span className="section-note">Local forecast</span>
            </div>

            <ForecastList daily={weather.daily} unit={unit} />
          </section>

          <section className="content-section">
            <div className="section-heading">
              <div>
                <div className="eyebrow">DAYLIGHT & CONDITIONS</div>
                <h2>Today's highlights</h2>
              </div>
            </div>

            <WeatherHighlights daily={weather.daily} />
          </section>
        </>
      )}

      <section className="content-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <Clock3 size={13} /> YOUR SEARCHES
            </div>
            <h2>Recent cities</h2>
          </div>
        </div>

        <CitySection
          cities={recentCities.filter((item) => item.id !== city?.id).slice(0, 3)}
          weatherCache={weatherCache}
          unit={unit}
          isFavourite={isFavourite}
          onFavourite={toggleFavourite}
          emptyTitle="No recent cities yet"
          emptyMessage="Search for a city to see it here."
        />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <Star size={13} /> SAVED PLACES
            </div>
            <h2>Favourite cities</h2>
          </div>

          <Link className="text-link" to="/favourites">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <CitySection
          cities={favourites.slice(0, 3)}
          weatherCache={weatherCache}
          unit={unit}
          isFavourite={isFavourite}
          onFavourite={toggleFavourite}
          emptyTitle="No favourites yet"
          emptyMessage="Tap the heart on a city to save it."
        />
      </section>
    </div>
  );
}
