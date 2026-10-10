import { Sun, Sunrise, Sunset } from "lucide-react";

import { formatTime } from "../../utils/date.js";

export default function WeatherHighlights({ daily }) {
  const highlights = [
    {
      icon: Sun,
      label: "UV index",
      value: daily.uv_index_max?.[0] ?? "--",
    },
    {
      icon: Sunrise,
      label: "Sunrise",
      value: formatTime(daily.sunrise?.[0]),
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: formatTime(daily.sunset?.[0]),
    },
  ];

  return (
    <div className="highlights-grid">
      {highlights.map((item) => {
        const Icon = item.icon;

        return (
          <div className="highlight-card" key={item.label}>
            <Icon size={20} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        );
      })}
    </div>
  );
}
