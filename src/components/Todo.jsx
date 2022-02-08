import React, { useState } from "react";
import useIsMounted from "hooks/useIsMounted";

export default function Todo({ todo, onComplete }) {
  const [isLoading, setLoading] = useState(false);
  const isMounted = useIsMounted();
  return (
    <li>
      <label>
        <button
          onClick={async () => {
            setLoading(true);
            await onComplete();
            if (isMounted()) {
              setLoading(false);
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? <div className="spinner" /> : "Complete"}
        </button>{" "}
        {todo.label}
      </label>
    </li>
  );
}
