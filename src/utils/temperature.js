export function formatTemperature(value, unit) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  const convertedValue =
    unit === "F" ? (Number(value) * 9) / 5 + 32 : Number(value);

  return `${Math.round(convertedValue)}°${unit}`;
}
