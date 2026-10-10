# Weather Check

A beginner-friendly React weather app with readable, separate components.

## Run the project
1. Install Node.js LTS.
2. Extract the ZIP and open the `weather-check` folder in VS Code.
3. Open VS Code's terminal in this folder.
4. Run `npm install`, then `npm run dev`.
5. Open the local URL printed by Vite (usually http://localhost:5173).

## Features
- City search and current location (browser coordinates plus reverse-geocoded place name)
- Current weather and 7-day forecast
- Celsius/Fahrenheit switch
- Recent and favourite cities (saved in localStorage)
- City details and two-city comparison pages
- Loading and error states
- Dark/light theme toggle (saved in localStorage)
- Responsive layout

## API
Uses Open-Meteo Geocoding and Forecast APIs. No API key is required for eligible non-commercial use. See https://open-meteo.com/ for terms.


Current location note: allow location permission in your browser. Weather is fetched using the coordinates supplied by the browser; the displayed place name comes from reverse geocoding and can vary by map data coverage.
