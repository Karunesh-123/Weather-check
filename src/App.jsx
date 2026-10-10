import { Route, Routes } from "react-router-dom";

import { WeatherProvider } from "./context/WeatherContext.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CityDetailsPage from "./pages/CityDetailsPage.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <WeatherProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:id" element={<CityDetailsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </WeatherProvider>
  );
}
