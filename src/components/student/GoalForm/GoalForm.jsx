import React, { useState, useEffect } from "react";
import { createGoal } from "../../../services/api/StudentAPI";
import "./GoalForm.css";

export default function GoalForm({ onClose, onSave }) {
  const [user_id, setUserID] = useState();
  const [course, setCourse] = useState("English");
  const [goals, setGoals] = useState("");
  const [courseExpectations, setCourseExpectations] = useState("");
  const [teacherExpectations, setTeacherExpectations] = useState("");
  const [selfExpectations, setSelfExpectations] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); 
    console.log("Test dasta, ", user);
    if (user && user.user_id) {
      setUserID(user.user_id);

    } else {
      setErrorMessage("User not found. Please login again.");
    }
  }, []);

  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) {
      try {
        const parsedGoal = JSON.parse(savedGoal);
        setCourse(parsedGoal.course || "English");
        setGoals(parsedGoal.goals || "");
        setCourseExpectations(parsedGoal.courseExpectations || "");
        setTeacherExpectations(parsedGoal.teacherExpectations || "");
        setSelfExpectations(parsedGoal.selfExpectations || "");
        setDueDate(parsedGoal.dueDate || "");
      } catch (error) {
        console.error("Error parsing saved goal data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const goalData = {
      user_id,
      course,
      goals,
      courseExpectations,
      teacherExpectations,
      selfExpectations,
      dueDate,
    };
    console.log("Sending to backend:", goalData);

    localStorage.setItem("goal", JSON.stringify(goalData));
  }, [user_id, course, goals, courseExpectations, teacherExpectations, selfExpectations, dueDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!goals || !courseExpectations || !teacherExpectations || !selfExpectations || !dueDate) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (!user_id) {
      setErrorMessage("User ID is missing. Please login again.");
      return;
    }

    const newGoal = {
      user_id,
      course,
      goals,
      courseExpectations,
      teacherExpectations,
      selfExpectations,
      dueDate,
    };

    console.log("Sending goal:", newGoal);

    try {
      const response = await createGoal(newGoal);
      if (response) {
        console.log("Goal saved successfully!", response);
        onSave(response);
        localStorage.removeItem("goal");
        onClose();
      }
    } catch (error) {
      console.error("Error saving goal:", error);
      setErrorMessage("Failed to save goal. Please try again.");
    }
  };

  return (
    <div className="goal-overlay">
      <div className="goal-form">
        <span className="close-btn" onClick={onClose}>×</span>
        <h1>Set Goals</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="your-goal-input">
            <label className="title">Course</label>
            <span className="close-down"><i className="fa-solid fa-caret-down"></i></span>
            <select className="form-control" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="English">English</option>
              <option value="IT-English">IT English</option>
              <option value="Communicative">Communicative</option>
            </select>
          </div>

          <div className="your-goal-input">
            <label className="title">Goal</label>
            <input type="text" className="form-control" value={goals} onChange={(e) => setGoals(e.target.value)} required />
          </div>

          <div className="your-goal-input">
            <label className="title">Course Expectations</label>
            <input type="text" className="form-control" value={courseExpectations} onChange={(e) => setCourseExpectations(e.target.value)} required />
          </div>

          <div className="your-goal-input">
            <label className="title">Teacher Expectations</label>
            <input type="text" className="form-control" value={teacherExpectations} onChange={(e) => setTeacherExpectations(e.target.value)} required />
          </div>

          <div className="your-goal-input">
            <label className="title">Self Expectations</label>
            <input type="text" className="form-control" value={selfExpectations} onChange={(e) => setSelfExpectations(e.target.value)} required />
          </div>

          <div className="your-goal-input">
            <label className="title">Due Date</label>
            <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
          </div>

          <button className="btn-save">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
