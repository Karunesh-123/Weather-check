import { Link } from "react-router-dom";

import EmptyState from "../components/common/EmptyState.jsx";

export default function NotFoundPage() {
  return (
    <div className="page-content">
      <EmptyState
        title="Page not found"
        message="This page doesn't exist."
        action={
          <Link className="btn btn-primary-soft" to="/">
            Go to dashboard
          </Link>
        }
      />
    </div>
  );
}
