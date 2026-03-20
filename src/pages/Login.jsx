import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user); // ✅ Debug
    navigate("/survey");
  } catch (err) {
    console.error("Login error:", err.message); // ✅ Shows exact Firebase error
    setError("Invalid email or password"); 
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <h3 style= {{textAlign: "center" , fontSize:"35px",padding: "0px"}}>Career Path Finder</h3>
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
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
          <button type="submit" className="submit-button">Login</button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <a href="/signup" className="login-link">Sign up here</a>
        </p>
      </div>
    </div>
  );
}
