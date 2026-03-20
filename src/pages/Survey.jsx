// src/pages/Survey.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar.jsx";
import { surveyQuestions } from "../data/mockData.js";
import { db, auth } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Survey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const current = surveyQuestions[step];
  const sectorClass = formData.sectorInterest
    ? formData.sectorInterest.toLowerCase()
    : "";

  const handleSelect = (value) => {
    setFormData((prev) => ({ ...prev, [current.field]: value }));
  };

  const isValid = Boolean(formData[current.field]);


  const handleNext = async () => {
    if (!Boolean(formData[current.field])) return;

    if (step < surveyQuestions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      // Save survey responses to Firebase for the logged-in user
      const user = auth.currentUser;
      if (user) {
        await setDoc(
          doc(db, "users", user.uid),
          { surveyResponses: formData, updatedAt: serverTimestamp() },
          { merge: true } // don't overwrite other fields
        );
      }

      // Navigate to jobs portal
      const sector = formData.sectorInterest || "IT";
      navigate(`/sector/${sector.toUpperCase()}`);
    }
  };


  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  return (
    <div className={`survey-page ${sectorClass}`}>
      {/* Left side illustration */}
      <div className="survey-illustration" />

      {/* Right side survey card */}
      <div className="survey-card">
        <ProgressBar step={step} total={surveyQuestions.length} />

        {/* Question */}
        <div className="survey-question">
          <h2 className="question-title">{current.title}</h2>
          <p className="question-subtitle">
            {current.field === "sectorInterest"
              ? "Your choice personalizes the experience."
              : "Select one option."}
          </p>
        </div>

        {/* Options */}
        <div className="options-grid">
          {current.options.map((opt) => (
            <button
              key={opt}
              className={`option-card ${formData[current.field] === opt ? "selected" : ""
                }`}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="survey-actions">
          <button
            className={`action-btn back ${step === 0 ? "disabled" : ""}`}
            onClick={handleBack}
            disabled={step === 0}
          >
            ← Back
          </button>
          <div className="spacer" />
          <button
            className={`action-btn next ${!isValid ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={!isValid}
          >
            {step === surveyQuestions.length - 1 ? "See Jobs →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
