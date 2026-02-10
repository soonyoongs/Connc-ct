import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/main", { replace: true });
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data, error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseError) {
        setError(`${supabaseError.error}`);
        return;
      }

      if (data.session) {
        // Optional success message
        console.log("✅ Login successful!");
        setTimeout(() => navigate("/main", { replace: true }), 1000);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Server error. Please try again later.");
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

        {error && <p style={{ marginTop: "10px", textAlign: "center" }}>{error}</p>}
      </div>
  );
};

export default LogIn;