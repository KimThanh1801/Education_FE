import React, { useState,useEffect } from 'react';
import './SelfStudyPlanForm.css'; 
  

const UpdateSelfStudyPlanForm = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    skill: '',
    lesson: '',
    timeAllocation: '',
    resource: '',
    activities: '',
    concentration: '',
    plan: '',
    evaluation: '',
    reinforce: '',
    evaluation2: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Form data saved:', formData);
    onSave();  
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user_id) {
      setFormData(prev => ({ ...prev, user_id: user.user_id }));
    }
  }, []);
  return (
    <form className="form-container6">
      <h2>Update your process</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="skill">Skill/Module</label>
          <select 
            id="skill" 
            name="skill" 
            value={formData.skill} 
            onChange={handleChange}
          >
            <option value="TOEIC">TOEIC</option>
            <option value="IELTS">IELTS</option>
            <option value="IT">IT </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lesson">My lesson - What did I learn today?</label>
          <input 
            type="text" 
            id="lesson" 
            name="lesson" 
            placeholder="I learned abcxyz"
            value={formData.lesson} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="timeAllocation">Time allocation</label>
          <input 
            type="text" 
            id="timeAllocation" 
            name="timeAllocation" 
            placeholder="30 minutes"
            value={formData['timeAllocation']} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="resource">Learning resource</label>
          <input 
            type="text" 
            id="resource" 
            name="resource" 
            placeholder="I used this resource"
            value={formData.resource} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="activities">Learning activities</label>
          <input 
            type="text" 
            id="activities" 
            name="activities"
placeholder="Study time or exercises"
            value={formData.activities} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="concentration">Concentration</label>
          <input 
            type="text" 
            id="concentration" 
            name="concentration" 
            placeholder="Focus level"
            value={formData.concentration} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="plan">Plan & Follow plan</label>
          <input 
            type="text" 
            id="plan" 
            name="plan" 
            placeholder="Planned tasks"
            value={formData.plan} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="reinforce">Reinforcing Learning</label>
          <input 
            type="text" 
            id="reinforce" 
            name="reinforce" 
            placeholder="Review or repeat"
            value={formData.reinforce} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="evaluation2">Evaluation of My Work</label>
          <input 
            type="text" 
            id="evaluation2" 
            name="evaluation2" 
            placeholder="Final self-evaluation"
            value={formData.evaluation2} 
            onChange={handleChange} 
          />
        </div>
      </div>  

      <div className="form-actions">
        <button className='btn-1' type="button" onClick={onCancel}>Cancel</button>
        <button className='btn-1' type="button" onClick={handleSave}>Save</button>
      </div>
    </form>
  );
};

export default UpdateSelfStudyPlanForm;