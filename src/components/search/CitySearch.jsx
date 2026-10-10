import { useEffect, useState } from "react";
import { MapPin, Search } from "lucide-react";

import { useWeather } from "../../context/WeatherContext.jsx";

export default function CitySearch({ onSelect }) {
  const { searchCities } = useWeather();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setError("");
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const cities = await searchCities(query.trim());

        if (!cancelled) {
          setResults(cities);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(requestError.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, searchCities]);

  function chooseCity(city) {
    setQuery("");
    setResults([]);
    onSelect(city);
  }

  return (
    <div className="search-wrap">
      <div className="search-box">
        <Search size={19} />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search city, e.g. Delhi"
          aria-label="Search city"
        />

        {loading && <span className="mini-spinner" />}
      </div>

      {(results.length > 0 ||
        error ||
        (query.trim().length >= 2 && !loading)) && (
        <div className="search-results">
          {error && <div className="search-hint">{error}</div>}

          {!error &&
            results.map((city) => (
              <button key={city.id} onClick={() => chooseCity(city)}>
                <MapPin size={16} />

                <span>
                  {city.name}
                  <small>
                    {[city.admin1, city.country].filter(Boolean).join(", ")}
                  </small>
                </span>
              </button>
            ))}

          {!error && !loading && results.length === 0 && (
            <div className="search-hint">
              No cities found. Try another spelling.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
