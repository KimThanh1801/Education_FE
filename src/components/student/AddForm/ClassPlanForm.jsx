import React, { useState, useEffect } from "react";
import { getInClassByID, editInClass } from "../../../services/api/StudentAPI";
import "./ClassPlanForm.css";

export default function ClassPlanForm({ inclass, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    date: "",
    skill_module: "TOEIC",
    lesson_summary: "",
    self_assessment: null,
    difficulties: "",
    improvement_plan: "",
    user_id: "",
    goal_id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy user_id từ localStorage khi component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.user_id) {
      setFormData((prev) => ({ ...prev, user_id: Number(user.user_id) }));
    } else {
      setErrorMessage("User not found. Please login again.");
    }
  }, []);

  // Khi prop inclass thay đổi, cập nhật formData
  useEffect(() => {
    if (!inclass?.id) return;

    if (
      inclass.date &&
      inclass.skill_module &&
      typeof inclass.self_assessment !== "undefined"
    ) {
      setFormData((prev) => ({
        ...prev,
        date: inclass.date || "",
        skill_module: inclass.skill_module || "TOEIC",
        lesson_summary: inclass.lesson_summary || "",
        self_assessment:
          typeof inclass.self_assessment === "number"
            ? inclass.self_assessment
            : null,
        difficulties: inclass.difficulties || "",
        improvement_plan: inclass.improvement_plan || "",
        goal_id: Number(inclass.goal_id) || 0,
        user_id: prev.user_id,
      }));
      return;
    }

    (async () => {
      try {
        const data = await getInClassByID(inclass.id);
        setFormData((prev) => ({
          ...prev,
          date: data.date || "",
          skill_module: data.skill_module || "TOEIC",
          lesson_summary: data.lesson_summary || "",
          self_assessment:
            typeof data.self_assessment === "number"
              ? data.self_assessment
              : null,
          difficulties: data.difficulties || "",
          improvement_plan: data.improvement_plan || "",
          goal_id: Number(data.goal_id) || 0,
          user_id: prev.user_id,
        }));
      } catch (error) {
        setErrorMessage("Failed to load data.");
        console.error(error);
      }
    })();
  }, [inclass]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.date || !formData.skill_module) {
      setErrorMessage("Please fill in Date and Skill/Module.");
      return;
    }

    if (!inclass?.id) {
      setErrorMessage("No record selected.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        date: formData.date,
        skill_module: formData.skill_module,
        lesson_summary: formData.lesson_summary,
        self_assessment: formData.self_assessment,
        difficulties: formData.difficulties,
        improvement_plan: formData.improvement_plan,
        user_id: Number(formData.user_id),
        goal_id: Number(formData.goal_id),
      };

      const updated = await editInClass(inclass.id, payload);
      onSave(updated);
      onCancel();
    } catch (error) {
      setErrorMessage("Update failed. Please try again.");
      console.error(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="form-container5">
      <h2>Update Your Process</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>
              Date <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              Skill/Module <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="skill_module"
              value={formData.skill_module}
              onChange={handleChange}
              required
            >
              <option value="TOEIC">TOEIC</option>
              <option value="Speaking">Speaking</option>
              <option value="IT_English">IT_English</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Lesson Summary</label>
            <textarea
              name="lesson_summary"
              value={formData.lesson_summary}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Difficulties</label>
            <textarea
              name="difficulties"
              value={formData.difficulties}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group" style={{ flex: 1 }}>
            <label>Improvement Plan</label>
            <textarea
              name="improvement_plan"
              value={formData.improvement_plan}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Self-assessment</label>
            <div className="radio-group">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} style={{ marginRight: "10px" }}>
                  <input
                    type="radio"
                    name="self_assessment"
                    value={num}
                    checked={formData.self_assessment === num}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        self_assessment: parseInt(e.target.value, 10),
                      })
                    }
                  />
                  {num}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="submit"
            className="btn save-btn"
            style={{ backgroundColor: "orange", borderColor: "orange" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
