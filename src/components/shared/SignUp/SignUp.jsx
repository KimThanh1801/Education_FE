import React, { useState } from "react";
import "./SignUp.css";
import { loginImage } from "../../../assets";
import { register } from "../../../services/api/StudentAPI";

export default function SignUp() {
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({ password: "", terms: "" });

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");

    const next = { password: "", terms: "" };
    if (password !== confirm) next.password = "Passwords do not match";
    if (!accept) next.terms = "You must agree to the Terms";

    setErrors(next);
    if (next.password || next.terms) return;

    const data = { name, email, password, confirm_password: confirm };

    try {
      const response = await register(data);
      console.log("✅ Register success:", response);

      alert("Account created successfully!");
      form.reset();
      setAccept(false);
      setErrors({ password: "", terms: "" });
      window.location.href = "/login";
    } catch (error) {
      console.log("❌ Register error:", error);

      const resErrors = error.response?.data?.errors || {};
      if (resErrors.password) {
        setErrors((prev) => ({ ...prev, password: resErrors.password[0] }));
      }
      if (resErrors.email) {
        alert(resErrors.email[0] || "Email already exists or is invalid.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  }

  return (
    <section className="auth-card" aria-labelledby="signup-title">
      <div className="logout-box-form">
        <h1 id="signup-title" className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Create a new account to get started</p>

        <form className="auth-form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="name" className="label-sign-up">Full Name</label>
            <input id="name" name="name" className="input" placeholder="John Doe" />
          </div>

          <div className="field">
            <label htmlFor="email" className="label-sign-up">Email Address</label>
            <input id="email" name="email" type="email" required className="input" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label htmlFor="password" className="label-sign-up">Password</label>
            <div className="password-wrap">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                required
                className="input"
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "pw-error" : undefined}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="field">
            <label htmlFor="confirm" className="label-sign-up">Confirm Password</label>
            <div className="password-wrap">
              <input
                id="confirm"
                name="confirm"
                type={showPw2 ? "text" : "password"}
                required
                className="input"
                placeholder="••••••••"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "pw-error" : undefined}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPw2((v) => !v)}
                aria-label={showPw2 ? "Hide password" : "Show password"}
              >
                {showPw2 ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p id="pw-error" className="error">{errors.password}</p>
            )}
          </div>

          <div className="terms">
            <input
              id="terms"
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />
            <p htmlFor="terms">
              I agree to the <a href="#" onClick={(e) => e.preventDefault()}>Terms</a> and{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
            </p>
          </div>
          {errors.terms && <p className="error">{errors.terms}</p>}

          <div className="actions-button">
            <button type="submit" className="submit">Create Account</button>
          </div>

          <p className="helper">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>

      <div className="login-image">
        <img src={loginImage} alt="Login illustration" />
      </div>
    </section>
  );
}
