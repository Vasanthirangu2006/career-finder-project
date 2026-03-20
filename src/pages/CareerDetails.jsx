import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCareer } from "../services/careersService.js";
// import "./index.css";

export default function CareerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCareer(id);
        setCareer(data);
      } catch (err) {
        console.error("Error loading career:", err);
        setCareer(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="career-detail">
        <div className="career-container">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
          <p>Loading career details…</p>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="career-detail">
        <div className="career-container">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
          <p>Career not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="career-detail">
      <div className="career-container">
        <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

        {/* Header */}
        <div className="career-header">
          <div>
            <div className="career-title">{career.title}</div>
            <div className="career-sector">{career.sector}</div>
          </div>
        </div>

        <div className="career-body">
          {/* Stats cards */}
          <div className="career-stats">
            {career.salaryRange && (
              <div className="stat-card salary">
                <div className="stat-icon">💰</div>
                <div className="stat-label">Salary Range</div>
                <div className="stat-value">{career.salaryRange}</div>
              </div>
            )}
            {career.growth && (
              <div className="stat-card growth">
                <div className="stat-icon">📈</div>
                <div className="stat-label">Growth Outlook</div>
                <div className="stat-value">{career.growth}</div>
              </div>
            )}
            {career.educationRequirement && (
              <div className="stat-card education">
                <div className="stat-icon">🎓</div>
                <div className="stat-label">Education Requirement</div>
                <div className="stat-value">{career.educationRequirement}</div>
              </div>
            )}
          </div>

          {/* Overview */}
          <div className="career-section">
            <div className="section-title">Overview</div>
            <p className="section-text">{career.description || "No description available."}</p>
          </div>

          {/* Skills */}
          <div className="career-section">
            <div className="section-title">Skills</div>
            <div className="skills-list">
              {Array.isArray(career.skills) && career.skills.length > 0 ? (
                career.skills.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))
              ) : (
                <p>No skills listed.</p>
              )}
            </div>
          </div>

          {/* Roadmap */}
          <div className="career-section">
            <div className="section-title">Roadmap</div>
            {Array.isArray(career.roadmap) && career.roadmap.length > 0 ? (
              career.roadmap.map((step, idx) => (
                <div className="roadmap-step" key={idx}>
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-content">{step}</div>
                </div>
              ))
            ) : (
              <p>No roadmap available.</p>
            )}
          </div>

          {/* Resources */}
          <div className="career-section">
            <div className="section-title">Resources</div>
            <div className="resources-grid">
              {Array.isArray(career.resources) && career.resources.length > 0 ? (
                career.resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="resource-card"
                  >
                    <div className="resource-icon">📘</div>
                    <div className="resource-info">
                      <div className="resource-label">{r.label}</div>
                      <div className="resource-url">
                        {r.url.replace(/^https?:\/\//, "")}
                      </div>
                    </div>
                    <div className="resource-arrow">↗</div>
                  </a>
                ))
              ) : (
                <p>No resources available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
