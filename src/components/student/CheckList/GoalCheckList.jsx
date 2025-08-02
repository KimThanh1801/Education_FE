import React, { useState } from "react";
import "./GoalChecklist.css";

function GoalChecklist() {
  const [goals, setGoals] = useState([
    { id: 1, text: "Finish 2 lesson on PrepEdu.com", done: false },
  ]);

  const [newGoalText, setNewGoalText] = useState("");
  const [expandedIds, setExpandedIds] = useState([]); 

  const toggleGoal = (id) => {
    setGoals(goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    ));
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addGoal = () => {
    if (newGoalText.trim() === "") return;

    const newId = goals.length > 0 ? goals[goals.length - 1].id + 1 : 1;
    const newGoal = { id: newId, text: newGoalText, done: false };
    setGoals([...goals, newGoal]);
    setNewGoalText("");
  };

  return (
    <div className="goal-checklist-container">
      <div className="goal-checklist">
        {goals.map((goal) => (
          <div key={goal.id} className="goal-item">
            <input
              type="checkbox"
              checked={goal.done}
              onChange={() => toggleGoal(goal.id)}
            />
            <span
              className={`goal-text ${goal.done ? "completed" : ""} ${expandedIds.includes(goal.id) ? "expanded" : ""}`}
              onClick={() => toggleExpand(goal.id)}
            >
              {goal.text}
            </span>
          </div>
        ))}

        <div className="add-goal-form">
          <input
            type="text"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder="Enter your goal..."
          />
          <button className="add-button" onClick={addGoal}>
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
}

export default GoalChecklist;
