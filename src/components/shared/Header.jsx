import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Header with user info */}
        <div className="user-info">
          <div className="user-info-inner">
            <div className="notification-icon">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a3 3 0 00-6 0v.083A6 6 0 002 11v3.159c0 .538-.214 1.053-.595 1.436L0 17h5m5 0v1a3 3 0 006 0v-1m-6 0h6"
                ></path>
              </svg>
            </div>
            <div className="user-avatar">CT</div>
            <span className="user-name">Cô Trang</span>
            {/* <div className="user-avatar">KT</div>
            <span className="user-name">Kim Thanh</span> */}
          </div>
        </div>

        {/* Main Card */}
        <div className="welcome-card">
          <div className="welcome-text">
            {/* <h1 className="welcome-title">Welcome back Kim Thanh</h1> */}
            <h1 className="welcome-title">Welcome back Trang</h1>
            <p className="welcome-info">
              Today you have <span className="highlight">9 new applications</span>.
            </p>
            <p className="welcome-info">
              Also you need to hire for <span className="highlight">Developer, ReactJS Developer</span>.
            </p>
          </div>
          <div className="welcome-illustration">
            <img
              src="../../../src/assets/image/anhstudent.png"
              alt="User Illustration"
              className="illustration-img"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

