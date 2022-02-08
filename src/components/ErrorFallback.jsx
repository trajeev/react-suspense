import React from "react";

export default function ErrorFallback({ error }) {
  return (
    <div className="error">
      <p>Something went wrong...</p>
      <pre>{error}</pre>
    </div>
  );
}
