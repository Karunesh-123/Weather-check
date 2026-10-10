export function formatDay(dateString, index) {
  if (index === 0) {
    return "Today";
  }

  return new Date(`${dateString}T12:00:00`).toLocaleDateString(
    undefined,
    { weekday: "short" }
  );
}

export function formatTime(dateString) {
  if (!dateString) {
    return "--";
  }

  return new Date(dateString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
