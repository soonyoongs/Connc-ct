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
      <div className="auth-container">
        {/* Google Translate Widget */}
        <div id="google_translate_element" className="google-translate"></div>

        <div className="auth-card">
          <header className="auth-header">
            Login
          </header>

          <form id="loginForm" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                required
                className="form-input notranslate"
              />
            </div>

            {/* Password Field */}
            <div className="password-group">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="form-input notranslate"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              id="loginBtn"
              className="auth-button"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="signup-text">
            New user?{' '}
            <span
              className="signup-link"
              onClick={() => navigate("/auth/SignUp")}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
  );
};

export default LogIn;