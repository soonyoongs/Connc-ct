import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setError("");

    if (password.length < 8 || password.length > 16) {
      setError("Password must be between 8 to 16 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(`${authError.message}`);
        return;
      }

      console.log("Auth successful!");
      console.log("2️Attempting to insert into 'users' table...");
      console.log("Data to insert:", {
        user_id: authData.user.id,
        name: name,
        email: email,
      });

      // Insert user data into supabase
      const { error: dbError } = await supabase
        .from("profiles")
        .insert([{
            user_id: authData.user.id,
            name,
            email,
          },
        ]);

      if (dbError) {
        console.error("Database error:", dbError);
        setError(`${dbError.message}`);
        return;
      }

      console.log("✅ User inserted into database successfully!");
      setTimeout(() => navigate("/auth/login"), 1500);
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
          Sign Up
        </header>

        <form id="signupForm" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="form-input notranslate"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
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
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8-16 characters"
              required
              className="form-input notranslate"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="password-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
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

          {/* Sign Up Button */}
          <button
            type="submit"
            id="signupBtn"
            className="auth-button"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="signup-text">
          Already have an account?{' '}
          <span
            className="signup-link"
            onClick={() => navigate("/auth/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;