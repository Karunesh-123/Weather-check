import { Link, NavLink, Outlet } from "react-router-dom";
import { CloudSun, Heart, GitCompareArrows } from "lucide-react";

import { useWeather } from "../../context/WeatherContext.jsx";
import ThemeToggle from "../common/ThemeToggle.jsx";

export default function AppLayout() {
  const { theme } = useWeather();

  return (
    <div className={`app-shell theme-${theme}`}>
      <header className="topbar">
        <nav className="container nav-inner">
          <Link to="/" className="brand">
            <span className="brand-icon">
              <CloudSun size={25} />
            </span>

            <span>
              Weather<span className="brand-accent">Check</span>
            </span>
          </Link>

          <div className="nav-actions">
            <div className="nav-links">
              <NavLink to="/" end>
                Dashboard
              </NavLink>

              <NavLink to="/favourites">
                <Heart size={16} />
                Favourites
              </NavLink>

              <NavLink to="/compare">
                <GitCompareArrows size={16} />
                Compare
              </NavLink>
            </div>

            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className="container app-main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Weather Check</span>
          <span>Weather data by Open-Meteo</span>
        </div>
      </footer>
    </div>
  );
}
