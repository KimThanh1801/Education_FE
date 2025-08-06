import React, { useState } from "react";
import "./AccountSettings.css";

const AccountSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    language: "vi",
    timezone: "GMT+7",
  });

  const [isSaving, setIsSaving] = useState(false);

  const languages = [
    { value: "vi", label: "Tiếng Việt" },
    { value: "en", label: "English" },
    { value: "ja", label: "日本語" },
    { value: "ko", label: "한국어" },
  ];

  const timezones = [
    { value: "GMT+7", label: "GMT+7 (Việt Nam)" },
    { value: "GMT+8", label: "GMT+8 (Singapore)" },
    { value: "GMT+9", label: "GMT+9 (Japan)" },
    { value: "GMT+0", label: "GMT+0 (UTC)" },
    { value: "GMT-5", label: "GMT-5 (EST)" },
    { value: "GMT-8", label: "GMT-8 (PST)" },
  ];

  const handleCheckboxChange = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSelectChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Settings saved:", settings);
    setIsSaving(false);

    // Show success message (you can implement toast notification here)
    alert("Cài đặt đã được lưu thành công!");
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2 className="settings-title">Cài đặt tài khoản</h2>

        <div className="settings-form">
          {/* Email Notifications Section */}
          <div className="form-section-account">
            <h3 className="section-title">Thông báo email</h3>
            <div className="checkbox-group">
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleCheckboxChange("emailNotifications")}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">
                  Nhận thông báo về bài tập mới
                </span>
              </label>
            </div>
          </div>

          {/* Language Section */}
          <div className="form-section-account">
            <label className="form-label">Ngôn ngữ</label>
            <div className="select-wrapper">
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange("language", e.target.value)}
                className="form-select"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Timezone Section */}
          <div className="form-section-account">
            <label className="form-label">Múi giờ</label>
            <div className="select-wrapper">
              <select
                value={settings.timezone}
                onChange={(e) => handleSelectChange("timezone", e.target.value)}
                className="form-select"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="form-actions">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="save-button"
            >
              {isSaving ? (
                <>
                  <div className="loading-spinner"></div>
                  Đang lưu...
                </>
              ) : (
                "Lưu cài đặt"
              )}
            </button>
          </div>
        </div>

        {/* Console Link */}
        <div className="console-link">
          <a href="#console" className="console-text">
            Console
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
