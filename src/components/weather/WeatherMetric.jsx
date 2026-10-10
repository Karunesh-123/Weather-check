export default function WeatherMetric({ icon: Icon, label, value }) {
  return (
    <div className="metric">
      <span className="metric-icon">
        <Icon size={18} />
      </span>

      <div>
        <span className="metric-label">{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
