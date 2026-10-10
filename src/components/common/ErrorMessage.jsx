import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card" role="alert">
      <AlertTriangle size={24} />

      <div>
        <strong>Something went wrong</strong>
        <p>{message}</p>

        {onRetry && (
          <button
            className="btn btn-sm btn-outline-light"
            onClick={onRetry}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
