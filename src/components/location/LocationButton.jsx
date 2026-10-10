import { useState } from "react";
import { LocateFixed } from "lucide-react";

import { getCityNameFromCoordinates } from "../../api/weatherApi.js";

export default function LocationButton({ onLocate }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function handleLocation() {
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location services.");
      return;
    }

    setBusy(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Always use the browser's coordinates for the actual weather request.
        // Reverse geocoding is used only to find a readable place name.
        let place = { name: "Current location", admin1: "", country: "" };

        try {
          place = await getCityNameFromCoordinates(latitude, longitude);
        } catch (lookupError) {
          console.warn("Could not resolve the current place name:", lookupError);
        }

        const currentLocation = {
          id: `${latitude},${longitude}`,
          name: place.name || "Current location",
          country: place.country || "",
          admin1: place.admin1 || "",
          latitude,
          longitude,
          timezone: "auto",
        };

        try {
          await onLocate(currentLocation);
        } catch (requestError) {
          console.error("Current-location weather request failed:", requestError);
          setError(
            requestError.message ||
              "Could not load weather for your current location."
          );
        } finally {
          setBusy(false);
        }
      },
      (locationError) => {
        console.error("Browser geolocation failed:", locationError);

        if (locationError.code === 1) {
          setError("Location permission denied. Allow location in browser settings.");
        } else if (locationError.code === 2) {
          setError("Your location could not be detected. Check device location settings.");
        } else if (locationError.code === 3) {
          setError("Location request timed out. Please try again.");
        } else {
          setError(locationError.message || "Unable to access your location.");
        }

        setBusy(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }

  return (
    <div className="location-control">
      <button
        className="btn btn-location"
        onClick={handleLocation}
        disabled={busy}
      >
        <LocateFixed size={17} />
        {busy ? "Finding location..." : "Use my location"}
      </button>

      {error && <small className="inline-error">{error}</small>}
    </div>
  );
}
