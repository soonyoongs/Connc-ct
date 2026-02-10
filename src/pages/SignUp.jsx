import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Account created successfully!");
        setTimeout(() => navigate("/auth/login"), 1500);
      } else {
        setMessage(`⚠️ ${data.error || "Sign up failed"}`);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };

  return (
      <div className="login-page">
        {/* Google Translate Widget - Language Selector */}
        <div id="google_translate_element" style={{ position: 'absolute', top: 10, right: 10 }}></div>

        <header>Sign Up</header>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="notranslate"
          />

          <label>Email</label>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="notranslate"
          />

          <label>Password</label>
          <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min. 8 characters)"
              required
              className="notranslate"
          />

          <label>Confirm Password</label>
          <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="notranslate"
          />

          <button type="submit">Sign Up!</button>
        </form>

        {message && <p style={{ marginTop: "10px", textAlign: "center" }}>{message}</p>}

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
              style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/auth/Login")}
          >
          Login
        </span>
        </p>
      </div>
  );
};