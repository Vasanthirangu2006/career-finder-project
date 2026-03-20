
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCareersBySector } from "../services/careersService";
import CareerCard from "../components/CareerCard.jsx";
// import "./index.css";

export default function SectorJobs() {
  const { sector } = useParams();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const list = await getCareersBySector(sector?.toUpperCase());
        setCareers(list || []);
      } catch (err) {
        console.error("Error fetching careers:", err);
        setCareers([]);
      } finally {
        setLoading(false);
      }
    }
    if (sector) load();
  }, [sector]);

  return (
    <div className={`sector-page ${sector?.toLowerCase()}`}>
      <div className="sector-overlay">
        <h2 className="sector-title">{sector} Jobs</h2>
        <p className="sector-subtitle">
          Based on your sector interest, here are curated roles.
        </p>

        {loading ? (
          <p className="loading-text">Loading careers…</p>
        ) : careers.length > 0 ? (
          <div className="jobs-grid">
            {careers.map((c) => (
              <CareerCard key={c.id} career={c} />
            ))}
          </div>
        ) : (
          <p className="empty-text">
            No jobs found. Please seed Firestore "careers" with sector "{sector}".
          </p>
        )}
      </div>
    </div>
  );
}
