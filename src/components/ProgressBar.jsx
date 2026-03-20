// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ step, total }) {
  return (
    <div className="survey-progress">
      <div className="progress-steps">
        {Array.from({ length: total }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              className={`step-circle ${
                index === step
                  ? "active"
                  : index < step
                  ? "completed"
                  : "upcoming"
              }`}
            >
              {index + 1}
            </div>
            {index < total - 1 && (
              <div
                className={`step-line ${
                  index < step ? "completed" : ""
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="progress-text">
        Step {step + 1} of {total}
      </div>
    </div>
  );
}
