import React, { useState } from "react";
import "./AddSelfStudy.css";

const AddNewSelfStudy = ({ onAddNewStudy }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: "10 Apr",
    lesson: "",
    resource: "",
    concentration: "",
    evaluation: "",
    notes: "",
    skillModule: "",
    timeAllocation: "",
    learningActivities: "",
    planFollow: "",
    reinforcingLearning: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddNewStudy) {
      onAddNewStudy(formData);
    }
    alert("Self Study added successfully!");
    setShowForm(false);
    // Reset form
    setFormData({
      date: "10 Apr",
      lesson: "",
      resource: "",
      concentration: "",
      evaluation: "",
      notes: "",
      skillModule: "",
      timeAllocation: "",
      learningActivities: "",
      planFollow: "",
      reinforcingLearning: ""
    });
  };

  return (
    <>
      <button onClick={() => setShowForm(true)} className="selfstudy-add-button">
        Add Self Study
      </button>

      {showForm && (
        <div className="selfstudy-modal-overlay">
          <div className="selfstudy-modal-content">
            <button 
              className="selfstudy-close-button" 
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="selfstudy-form">
              <h1 className="selfstudy-title">Update your process</h1>
              
              {/* Section 1: Main Learning Info */}
              <div className="selfstudy-form-section">
                <h2 className="selfstudy-section-title">Date</h2>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="selfstudy-date-input"
                  placeholder="e.g. 10 Apr"
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">My lesson - What did I learn today?</h3>
                <textarea
                  name="lesson"
                  value={formData.lesson}
                  onChange={handleChange}
                  rows="3"
                  className="selfstudy-textarea"
                  placeholder="Enter what you learned..."
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Learning resource</h3>
                <textarea
                  name="resource"
                  value={formData.resource}
                  onChange={handleChange}
                  rows="3"
                  className="selfstudy-textarea"
                  placeholder="Resources used..."
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Concentration</h3>
                <textarea
                  name="concentration"
                  value={formData.concentration}
                  onChange={handleChange}
                  rows="3"
                  className="selfstudy-textarea"
                  placeholder="Your concentration level..."
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Evaluation of My Work</h3>
                <textarea
                  name="evaluation"
                  value={formData.evaluation}
                  onChange={handleChange}
                  rows="3"
                  className="selfstudy-textarea"
                  placeholder="Self-evaluation..."
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Notes</h3>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="selfstudy-textarea"
                  placeholder="Additional notes..."
                />
              </div>

              <div className="selfstudy-divider"></div>

              {/* Section 2: Skill/Time Management */}
              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Skill/Module</h3>
                <input
                  type="text"
                  name="skillModule"
                  value={formData.skillModule}
                  onChange={handleChange}
                  className="selfstudy-input"
                  placeholder="e.g. TOEIC"
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Time allocation</h3>
                <input
                  type="text"
                  name="timeAllocation"
                  value={formData.timeAllocation}
                  onChange={handleChange}
                  className="selfstudy-input"
                  placeholder="e.g. 30 minutes"
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Learning activities</h3>
                <input
                  type="text"
                  name="learningActivities"
                  value={formData.learningActivities}
                  onChange={handleChange}
                  className="selfstudy-input"
                  placeholder="Activities performed..."
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Plan & Follow plan</h3>
                <input
                  type="text"
                  name="planFollow"
                  value={formData.planFollow}
                  onChange={handleChange}
                  className="selfstudy-input"
                  placeholder="Your plan..."
                />
              </div>

              <div className="selfstudy-form-section">
                <h3 className="selfstudy-subsection-title">Reinforcing Learning</h3>
                <input
                  type="text"
                  name="reinforcingLearning"
                  value={formData.reinforcingLearning}
                  onChange={handleChange}
                  className="selfstudy-input"
                  placeholder="Reinforcement methods..."
                />
              </div>

              <div className="selfstudy-form-actions">
                <button
                  type="button"
                  className="selfstudy-cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="selfstudy-save-button">
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

export default AddNewSelfStudy;