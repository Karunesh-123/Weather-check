const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCities(query) {
  const params = new URLSearchParams({
    name: query,
    count: "8",
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error("City search failed. Check your internet connection.");
  }

  const data = await response.json();

  return (data.results || []).map((city) => ({
    id: `${city.latitude},${city.longitude}`,
    name: city.name,
    country: city.country || "",
    admin1: city.admin1 || "",
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone || "auto",
  }));
}


export async function getCityNameFromCoordinates(latitude, longitude) {
  const coordinates = `${latitude},${longitude}`;

  // First try OpenStreetMap reverse geocoding for a specific town or village.
  try {
    const params = new URLSearchParams({
      lat: String(latitude),
      lon: String(longitude),
      format: "jsonv2",
      zoom: "18",
      addressdetails: "1",
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${params}`,
      { headers: { "Accept-Language": "en" } }
    );

    if (response.ok) {
      const data = await response.json();
      const address = data.address || {};
      const name =
        address.town ||
        address.village ||
        address.city ||
        address.municipality ||
        address.city_district ||
        address.suburb ||
        address.hamlet ||
        address.county ||
        "";

      if (name) {
        return {
          name,
          admin1: address.state || address.state_district || "",
          country: address.country || "",
          coordinates,
        };
      }
    }
  } catch (error) {
    console.warn("OpenStreetMap reverse geocoding failed:", error);
  }

  // Fallback in case the first geocoder is unavailable.
  try {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      localityLanguage: "en",
    });

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Fallback location API response:", data);

      const name =
        data.locality ||
        data.city ||
        data.town ||
        data.village ||
        data.localityInfo?.informative?.[0]?.name ||
        "";

      return {
        name,
        admin1: data.principalSubdivision || "",
        country: data.countryName || "",
        coordinates,
      };
    }
  } catch (error) {
    console.warn("Fallback reverse geocoding failed:", error);
  }

  return { name: "Current location", admin1: "", country: "", coordinates };
}

export async function getWeather(city) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(`${FORECAST_URL}?${params}`);

  if (!response.ok) {
    throw new Error(
      "Weather data could not be loaded. Check your internet connection."
    );
  }

  const data = await response.json();

  if (!data.current || !data.daily) {
    throw new Error("The weather service returned incomplete data.");
  }

  return data;
}

export function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rainy";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Weather conditions";
}

export function getWeatherEmoji(code, isDay = true) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";

  return "🌡️";
}
