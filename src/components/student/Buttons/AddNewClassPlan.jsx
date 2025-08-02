  import React, { useState } from "react";
import "./AddClassPlan.css";

const AddNewClassPlan = ({ onAddNewPlan }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    skillModule: "",
    lessonLearned: "",
    selfAssessment: "1",
    difficulties: "",
    plan: "",
    problemSolved: "Not yet",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddNewPlan) {
      onAddNewPlan(formData);
    }
    alert("Class Plan added successfully!");
    setFormData({
      date: "",
      skillModule: "",
      lessonLearned: "",
      selfAssessment: "1",
      difficulties: "",
      plan: "",
      problemSolved: "Not yet",
    });
    setShowForm(false);
  };

  return (
    <>
      <button onClick={() => setShowForm(true)} className="add-button">
        Add Class Plan
      </button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <form onSubmit={handleSubmit} className="class-plan-form">
              <div className="form-columns">
                <div className="left-column">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Skill/Module</label>
                    <input
                      type="text"
                      name="skillModule"
                      value={formData.skillModule}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>My lesson - What did I learn today?</label>
                    <input
                      name="lessonLearned"
                      value={formData.lessonLearned}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Self-assessment</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="selfAssessment"
                          value="1"
                          checked={formData.selfAssessment === "1"}
                          onChange={handleChange}
                        />{" "}
                        1
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="selfAssessment"
                          value="2"
                          checked={formData.selfAssessment === "2"}
                          onChange={handleChange}
                        />{" "}
                        2
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="selfAssessment"
                          value="3"
                          checked={formData.selfAssessment === "3"}
                          onChange={handleChange}
                        />{" "}
                        3
                      </label>
                    </div>
                  </div>
                </div>

                <div className="right-column">
                  <div className="form-group">
                    <label>Difficulties</label>
                    <input
                      type="text"
                      name="difficulties"
                      value={formData.difficulties}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>My plan</label>
                    <input
                      type="text"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Solved?</label>
                    <div className="radio-group">
                      <label>
                        <input
                          type="radio"
                          name="problemSolved"
                          value="Yes"
                          checked={formData.problemSolved === "Yes"}
                          onChange={handleChange}
                        />{" "}
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="problemSolved"
                          value="Not yet"
                          checked={formData.problemSolved === "Not yet"}
                          onChange={handleChange}
                        />{" "}
                        Not yet
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewClassPlan;
