import React, { useState, useEffect } from "react";
import { getGoal, editGoal } from "../../../services/api/StudentAPI";
import "./EditGoal.css";

export default function EditForm({ onClose, onSave, goal }) {
  const [formData, setFormData] = useState({
    user_id: "",
    course: "English",
    goals: "",
    courseExpectations: "",
    teacherExpectations: "",
    selfExpectations: "",
    dueDate: "",
  });
console.log(formData);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user_id) {
      setFormData((prev) => ({ ...prev, user_id: user.user_id }));
    } else {
      setErrorMessage("User not found. Please login again.");
    }
  }, []);


useEffect(() => {
  if (goal) {
    const fetchGoalData = async () => {
      try {
        const response = await getGoal(goal.id);
        console.log("Goal Data:", response);  
        if (response) {
          setFormData((prev) => ({
            ...prev,
            course: response.course || "English",
            goals: response.goals || "",
            courseExpectations: response.courseExpectations || "",
            teacherExpectations: response.teacherExpectations || "",
            selfExpectations: response.selfExpectations || "",
            dueDate: response.dueDate || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching goal data:", error);
      }
    };

    fetchGoalData();
  }
}, [goal]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_id, course, goals, courseExpectations, teacherExpectations, selfExpectations, dueDate } = formData;

    if (!user_id || !goals || !courseExpectations || !teacherExpectations || !selfExpectations || !dueDate) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const updatedGoal = {
      user_id,
      course,
      goals,
      courseExpectations,
      teacherExpectations,
      selfExpectations,
      dueDate,
    };

    try {
      const response = await editGoal(goal.id, updatedGoal);
      if (response) {
        onSave(response);
        onClose();
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      setErrorMessage("Failed to update goal. Please try again.");
    }
  };

  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>×</span>
        <h1>Edit Goal</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="edit-your-goal">
            <label className="title">Course</label>
            <span className="close-down">
              <i className="fa-solid fa-caret-down"></i>
            </span>
            <select
              className="form-control"
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="English">English</option>
              <option value="IT-English">IT English</option>
              <option value="Communicative">Communicative</option>
            </select>
          </div>

          <div className="edit-your-goal">
            <label className="title">Goal</label>
            <input
              type="text"
              className="form-control"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-your-goal">
            <label className="title">Course Expectations</label>
            <input
              type="text"
              className="form-control"
              name="courseExpectations"
              value={formData.courseExpectations}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-your-goal">
            <label className="title">Teacher Expectations</label>
            <input
              type="text"
              className="form-control"
              name="teacherExpectations"
              value={formData.teacherExpectations}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-your-goal">
            <label className="title">Self Expectations</label>
            <input
              type="text"
              className="form-control"
              name="selfExpectations"
              value={formData.selfExpectations}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-your-goal">
            <label className="title">Due Date</label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="button-save"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
