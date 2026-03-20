// src/components/CareerCard.jsx
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CareerCard({ career }) {
  const navigate = useNavigate();
  if (!career) return null;

  return (
    <div className="career-card">
      <h3 className="career-title">{career.title}</h3>
      {career.sector && <div className="career-sector">{career.sector}</div>}
      {career.description && <p className="career-description">{career.description}</p>}

      {career.skills?.length > 0 && (
        <div className="career-skills">
          {career.skills.slice(0, 5).map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
          {career.skills.length > 5 && (
            <span className="skill-tag">+{career.skills.length - 5}</span>
          )}
        </div>
      )}

      <div className="card-footer">
        {career.salaryRange && (
          <div className="salary">
            Salary: <span className="salary-value">{career.salaryRange}</span>
          </div>
        )}
        <button
          className="action-btn"
          onClick={() => navigate(`/career/${career.id}`)}
        >
          View details →
        </button>
      </div>
    </div>
  );
}

CareerCard.propTypes = {
  career: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    sector: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    salaryRange: PropTypes.string,
  }).isRequired,
};
