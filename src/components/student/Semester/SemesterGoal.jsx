import React, { useState, useEffect } from "react";
import GoalForm from "../../student/GoalForm/GoalForm";
import {
  updateGoalStatus,
  getGoal,
  getAllGoal,
} from "../../../services/api/StudentAPI";
import DeleteGoal from "../GoalForm/DeleteGoal";
import EditGoal from "../GoalForm/EditGoal";
import "./SemesterGoal.css";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState(null);
  const [goalToEdit, setGoalToEdit] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleSaveGoal = (newGoal) => {
    const newGoals = [...goals, { ...newGoal, completeStatus: "doing" }];
    updateGoals(newGoals);
    setShowForm(false);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updated = goals.filter((goal) => goal.id !== deletedId);
    updateGoals(updated);
    setShowDeletePopup(false);
    setGoalToDeleteId(null);
  };

  const handleUpdateGoal = (updatedGoal) => {
    const updated = goals.map((goal, index) =>
      index === goalToEdit.index ? updatedGoal : goal
    );
    updateGoals(updated);
    setGoalToEdit(null);
    setShowEditForm(false);
  };

  const totalPages = Math.ceil(goals.length / goalsPerPage);
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

  return (
    <div className="container">
      <div className="yourGoall">
        <div className="goal-header">
          <h2>Your Study Goal</h2>
          <span className="add-goal-btn" onClick={() => setShowForm(true)}>
            <img
              src="/src/assets/image/plus.png"
              className="icon_add"
              alt="Add Goal"
            />
          </span>
        </div>

        {showForm && (
          <GoalForm
            onClose={() => setShowForm(false)}
            onSave={handleSaveGoal}
          />
        )}

        {showEditForm && goalToEdit && (
          <EditGoal
            goal={goalToEdit}
            onClose={() => {
              setGoalToEdit(null);
              setShowEditForm(false);
            }}
            onSave={handleUpdateGoal}
          />
        )}

        <div className="table-wrapper">
          <table className="table table-your-goal">
            <thead>
<tr>
                <th>Course</th>
                <th>Goal</th>
                <th>Course Expectations</th>
                <th>Teacher Expectations</th>
                <th>Self Expectations</th>
                <th>Complete</th>
                <th>Due to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentGoals.length > 0 ? (
                currentGoals.map((goal, index) => (
                  <tr key={index}>
                    <td>{goal.course}</td>
                    <td>{goal.goals}</td>
                    <td>{goal.courseExpectations}</td>
                    <td>{goal.teacherExpectations}</td>
                    <td>{goal.selfExpectations}</td>
                    <td>
                      <span
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
                        style={{
                          display: "inline-block",
                          backgroundColor:
                            goal.completeStatus === "done"
                              ? "#28a745"
                              : "#ffc107",
                          color:
                            goal.completeStatus === "done"
                              ? "white"
                              : "inherit",
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </td>
                    <td>{goal.dueDate}</td>
                    <td>
                      <i
                        className="fa-regular fa-clock"
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        title="View time"
                        onClick={() => alert("View time clicked")}
                      ></i>
                      <i
                        className="fa-regular fa-pen-to-square"
                        style={{ marginRight: "10px", cursor: "pointer" }}
title="Edit"
                        onClick={async () => {
                          try {
                            const goalData = await getGoal(goal.id);
                            const realIndex = goals.findIndex(
                              (g) => g.id === goal.id
                            );
                            setGoalToEdit({ ...goalData, index: realIndex });
                            setShowEditForm(true);
                          } catch (error) {
                            console.error("Failed to fetch goal:", error);
                          }
                        }}
                      />
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        title="Delete"
                        onClick={async () => {
                          try {
                            await getGoal(goal.id);
                            setGoalToDeleteId(goal.id);
                            setShowDeletePopup(true);
                          } catch (error) {
                            console.error("Failed to fetch goal:", error);
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No goals found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

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
