export default function LoadingState({ message = "Loading weather..." }) {
  return (
    <div className="state-card">
      <div className="spinner-border text-info" role="status" />
      <p>{message}</p>
    </div>
  );
}
