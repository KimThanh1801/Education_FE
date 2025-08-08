import React, { useState } from "react"
import "./SignUp.css";
import { loginImage } from "../../../assets";
export default function SignUp() {
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)
  const [accept, setAccept] = useState(false)
  const [errors, setErrors] = useState({ password: "", terms: "" })

  function onSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") || "")
    const email = String(fd.get("email") || "")
    const password = String(fd.get("password") || "")
    const confirm = String(fd.get("confirm") || "")

    const next = { password: "", terms: "" }
    if (password !== confirm) next.password = "Mật khẩu không khớp"
    if (!accept) next.terms = "Bạn cần đồng ý với Điều khoản"

    setErrors(next)
    if (next.password || next.terms) return

    // Demo: báo thành công
    alert(`Tạo tài khoản thành công cho: ${name || email}`)
    e.currentTarget.reset()
    setAccept(false)
  }

  return (
    <section className="auth-card" aria-labelledby="signup-title">
     <div className="logout-box-form">
         <h1 id="signup-title" className="auth-title">Đăng ký</h1>
      <p className="auth-subtitle">Tạo tài khoản mới để bắt đầu sử dụng</p>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="name" className="label-sign-up">Họ và tên</label>
          <input id="name" name="name" className="input" placeholder="Nguyễn Văn A" />
        </div>

        <div className="field">
          <p htmlFor="email" className="label-sign-up">Địa chỉ email</p>
          <input id="email" name="email" type="email" required className="input" placeholder="ban@example.com" />
        </div>

        <div className="field">
          <label htmlFor="password" className="label-sign-up">Mật khẩu</label>
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
              aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPw ? "Ẩn" : "Hiện"}
            </button>
          </div>
        </div>

        <div className="field">
          <label htmlFor="confirm" className="label-sign-up">Xác nhận mật khẩu</label>
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
              aria-label={showPw2 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPw2 ? "Ẩn" : "Hiện"}
            </button>
          </div>
          {errors.password ? (
            <p id="pw-error" className="error">{errors.password}</p>
          ) : null}
        </div>

        <div className="terms">
          <input
            id="terms"
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
          />
          <p htmlFor="terms">
            Tôi đồng ý với <a href="#" onClick={(e) => e.preventDefault()}>Điều khoản</a> và{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a>.
          </p>
        </div>
        {errors.terms ? <p className="error">{errors.terms}</p> : null}

        <div className="actions-button">
          <button type="submit" className="submit">Tạo tài khoản</button>
        </div>

        <p className="helper">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </form>
     </div>

      <div className="login-image">
        <img src={loginImage} alt="Login illustration" />
      </div>
    </section>
  )
}
