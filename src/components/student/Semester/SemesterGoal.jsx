
import React, { useState, useEffect } from "react";
import {
  updateGoalStatus,
  getGoal,
  getAllGoal,
  editGoal,
} from "../../../services/api/StudentAPI";
import DeleteGoal from "../GoalForm/DeleteGoal";
import EditGoal from "../GoalForm/EditGoal";
import "./SemesterGoal.css";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editCell, setEditCell] = useState({ rowIndex: null, field: null });
  const goalsPerPage = 10;

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await getAllGoal();
        setGoals(fetchedGoals);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

const handleAddEmptyGoal = () => {
  const newGoal = {
    id: Date.now(), // tạm thời
    course: "",
    goals: "",
    courseExpectations: "",
    teacherExpectations: "",
    selfExpectations: "",
    dueDate: "",
    completeStatus: "doing",
  };

  const newGoals = [newGoal, ...goals];
  updateGoals(newGoals);
  setEditCell({ rowIndex: 0, field: "course" });
  setCurrentPage(1);
};

  const handleDeleteSuccess = (deletedId) => {
    const updated = goals.filter((goal) => goal.id !== deletedId);
    updateGoals(updated);
    setShowDeletePopup(false);
    setGoalToDeleteId(null);
  };

  const getCompleteStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "complete-yes";
      case "doing":
        return "complete-progress";
      default:
        return "complete-no";
    }
  };

  const getCompleteStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "Completed";
      case "doing":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    const today = new Date();
    const isOverdue = date < today;
    return (
      <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        {isOverdue && " (Overdue)"}
      </span>
    );
  };

  const handleInlineChange = (e, rowIndex, field) => {
    const updated = [...goals];
    updated[rowIndex][field] = e.target.value;
    setGoals(updated);
  };

  const saveInlineEdit = async (goal, rowIndex) => {
    try {
      const updatedGoal = await editGoal(goal.id, goal);
      const newGoals = [...goals];
      newGoals[rowIndex] = updatedGoal;
      updateGoals(newGoals);
      setEditCell({ rowIndex: null, field: null });
    } catch (error) {
      console.error("Error saving inline edit:", error);
    }
  };

  const totalPages = Math.ceil(goals.length / goalsPerPage);
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

  return (
    <div className="study-goal-container">
      <div className="study-goal-header">
        <h1 className="study-goal-title">Your Study Goal</h1>
        <button
          className="add-button"
          onClick={handleAddEmptyGoal}
          title="Add new goal"
        >
          +
        </button>
      </div>

      {currentGoals.length === 0 ? (
        <div className="empty-state">
          No study goals yet. Click the + button to add your first goal!
        </div>
      ) : (
        <table className="study-goal-table">
          <thead className="study-goal-thead">
            <tr>
              <th>Course</th>
              <th>Goal</th>
              <th>Course Expectations</th>
              <th>Teacher Expectations</th>
              <th>Self Expectations</th>
              <th>Due to</th>
              <th>Complete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="study-goal-tbody">
            {currentGoals.map((goal, index) => (
              <tr key={goal.id || index}>
                {[
                  "course",
                  "goals",
                  "courseExpectations",
                  "teacherExpectations",
                  "selfExpectations",
                  "dueDate",
                ].map((field) => (
                  <EditGoal
                    key={field}
                    goal={goal}
                    field={field}
                    rowIndex={index}
                    isEditing={
                      editCell.rowIndex === index && editCell.field === field
                    }
                    onStartEdit={(rowIndex, field) =>
                      setEditCell({ rowIndex, field })
                    }
                    onChange={handleInlineChange}
                    onSave={saveInlineEdit}
                  />
                ))}

                <td>
                  <span
                    className={`complete-status ${getCompleteStatusClass(
                      goal.completeStatus
                    )}`}
                    onClick={async () => {
                      try {
                        const updatedGoal = await updateGoalStatus(
                          goal.id,
                          goal.completeStatus === "done" ? "doing" : "done"
                        );
                        const realIndex = goals.findIndex(
                          (g) => g.id === goal.id
                        );
                        const updatedGoals = [...goals];
                        updatedGoals[realIndex].completeStatus =
                          updatedGoal.completeStatus;
                        updateGoals(updatedGoals);
                      } catch (error) {
                        console.error(
                          "Error toggling complete status:",
                          error
                        );
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {getCompleteStatusText(goal.completeStatus)}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => alert("View time clicked")}
                      title="View time"
                    >
                      <i
                        className="fa-regular fa-clock"
                        style={{ color: "#00BFFF" }}
                      ></i>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={async () => {
                        try {
                          await getGoal(goal.id);
                          setGoalToDeleteId(goal.id);
                          setShowDeletePopup(true);
                        } catch (error) {
                          console.error("Failed to fetch goal:", error);
                        }
                      }}
                      title="Delete"
                    >
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "#FF4D4F" }}
                      ></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {showDeletePopup && (
        <DeleteGoal
          id={goalToDeleteId}
          onDeleteSuccess={handleDeleteSuccess}
          onClose={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
}

