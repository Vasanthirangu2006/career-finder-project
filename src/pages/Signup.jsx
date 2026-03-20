import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // make sure db is exported from firebase.js

// import "./index.css";

export default function Signup() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Create a Firestore document for this user
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
        
        // Add other fields you want to track
      });

      // 3️⃣ Navigate to survey
      navigate("/survey");
    } catch (err) {
      setError(err.message);
    }
  };



  return (
    <div className="signup-page">
      <div className="signup-card">
        <h3 style={{ textAlign: "center", fontSize: "35px" }}>Career Path Finder</h3>
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <a href="/" style={{ color: "#2563eb" }}>Login here</a>
        </p>
      </div>
    </div>
  );
}
