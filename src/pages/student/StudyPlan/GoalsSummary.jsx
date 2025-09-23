import "./GoalsSummary.css"

const GoalsSummary = ({ goals }) => {
  const hasGoals = Array.isArray(goals) && goals.length > 0

  return (
    <div className="goals-summary-list">
      {hasGoals ? (
        goals.map((goal) => (
          <div
            key={goal.id}
            className={`goal-summary-item ${
              goal.completeStatus === "done" ? "goal-summary-completed" : ""
            }`}
          >
            <label className="goal-summary-label">
              <input
                type="checkbox"
                checked={goal.completeStatus === "done"}
                className="goal-summary-checkbox"
                readOnly
              />
              <span
                className={`goal-summary-title ${
                  goal.completeStatus === "done"
                    ? "goal-summary-completed-text"
                    : ""
                }`}
              >
                {goal.goals}
              </span>
            </label>
          </div>
        ))
      ) : (
        <p className="no-goals-text">No goals yet ⚠️⚠️⚠️</p>
      )}
    </div>
  )
}

export default GoalsSummary
