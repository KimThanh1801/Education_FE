import React, { useState } from 'react';
import InClass from '../../../components/student/StudyPlans/InClass';
import SelfStudy from '../../../components/student/StudyPlans/SelfStudy';
import './StudyPlan.css';

const StudyPlan = () => {
  const [goals, setGoals] = useState({});
  const [goalText, setGoalText] = useState('');
  const [activeTab, setActiveTab] = useState('inclass');

  const addGoal = () => {
    if (goalText.trim()) {
      setGoals(prev => ({ ...prev, [goalText]: false }));
      setGoalText('');
    }
  };

  const toggleGoal = (goal) => {
    setGoals(prev => ({ ...prev, [goal]: !prev[goal] }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addGoal();
    }
  };

  return (
    <div className="study-plan">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'inclass' ? 'active' : ''}`}
          onClick={() => setActiveTab('inclass')}
        >
          In Class
        </button>
        <button
          className={`tab-button ${activeTab === 'selfstudy' ? 'active' : ''}`}
          onClick={() => setActiveTab('selfstudy')}
        >
          Self Study
        </button>
      </div>
      <div className="goals-card-study-plan">
        <div className="card-header">
          <h2>Study Plans</h2>
          <p>Set and track your learning objectives</p>
        </div>
        <div className="card-content">
          <div className="goal-input-section">
            <input
              type="text"
              placeholder="Enter your goal..."
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="goal-input"
            />
            <button onClick={addGoal} className="add-goal-btn">
              Add Goal
            </button>
          </div>
          <div className="goals-list">
            {Object.entries(goals).map(([goal, completed]) => (
              <div key={goal} className="goal-item">
                <input
                  type="checkbox"
                  id={goal}
                  checked={completed}
                  onChange={() => toggleGoal(goal)}
                  className="goal-checkbox"
                />
                <label
                  htmlFor={goal}
                  className={`goal-label ${completed ? 'completed' : ''}`}
                >
                  {goal}
                </label>
                {completed && <span className="completed-badge">Completed</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nội dung tab */}
      <div className="tab-content">
        {activeTab === 'inclass' && <InClass />}
        {activeTab === 'selfstudy' && <SelfStudy />}
      </div>
    </div>
  );
};

export default StudyPlan;
