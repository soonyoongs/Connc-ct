import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.access_granted) {
        setMessage("✅ Login successful!");
        localStorage.setItem("token", data.token);

        setTimeout(() => navigate("/main", {replace: true}), 1000);
      } else {
        setMessage("❌ Invalid email or password");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Server response data:", error.response.data);
      }
      setMessage("⚠️ Server error. Please try again.");
    }
  };

  return (
      <div className="login-page">
        {/* Google Translate Widget - Language Selector */}
        <div id="google_translate_element" style={{ position: 'absolute', top: 10, right: 10 }}></div>

        <header>Login</header>

        <form id="loginForm" className="login-form" onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email (e.g.: abc@gmail.com)"
              required
              className="notranslate"
          />
          <br />

          <label>Password</label>
          <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="notranslate"
          />
          <br />
          <br />

          <p style={{ textAlign: "center" }}>
            New user?{" "}
            <span
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/auth/SignUp")}
            >
            Create account
          </span>
          </p>

          <button type="submit" id="loginBtn">
            Login
          </button>
        </form>

        {message && <p style={{ marginTop: "10px", textAlign: "center" }}>{message}</p>}
      </div>
  );
};