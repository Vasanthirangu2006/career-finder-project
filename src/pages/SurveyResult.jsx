import { useLocation } from "react-router-dom";
// import "./index.css";

export default function SurveyResult() {
  const location = useLocation();
  const { answers } = location.state || { answers: {} };

  const recommendedSector = answers.sectorInterest || "IT";

  return (
    <div className="survey-page">
      <div className="survey-card">
        <h2 className="result-title">Your Survey Results</h2>

        {/* Answers list */}
        <ul className="answers-list">
          {Object.entries(answers).map(([field, value]) => (
            <li key={field} className="answer-item">
              <strong className="answer-field">{field}:</strong>{" "}
              <span className="answer-value">{value}</span>
            </li>
          ))}
        </ul>

        {/* Recommendation */}
        <p className="recommendation-text">
          Based on your answers, we recommend exploring careers in{" "}
          <strong className="recommendation-sector">{recommendedSector}</strong>.
        </p>
      </div>
    </div>
  );
}
