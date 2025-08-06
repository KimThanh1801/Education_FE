
// import React, { useState, useEffect } from "react";
// import GoalForm from "../../student/GoalForm/GoalForm";
// import {
//   updateGoalStatus,
//   getGoal,
//   getAllGoal,
// } from "../../../services/api/StudentAPI";
// import DeleteGoal from "../GoalForm/DeleteGoal";
// import EditGoal from "../GoalForm/EditGoal";
// import "./SemesterGoal.css";

// export default function SemesterGoal() {
//   const [goals, setGoals] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [goalToDeleteId, setGoalToDeleteId] = useState(null);
//   const [goalToEdit, setGoalToEdit] = useState(null);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const goalsPerPage = 10;

//   useEffect(() => {
//     const fetchGoals = async () => {
//       try {
//         const fetchedGoals = await getAllGoal();
//         setGoals(fetchedGoals);
//       } catch (error) {
//         console.error("Error fetching goals:", error);
//       }
//     };
//     fetchGoals();
//   }, []);

//   const updateGoals = (newGoals) => {
//     setGoals(newGoals);
//     localStorage.setItem("goals", JSON.stringify(newGoals));
//   };

//   const handleSaveGoal = (newGoal) => {
//     const newGoals = [...goals, { ...newGoal, completeStatus: "doing" }];
//     updateGoals(newGoals);
//     setShowForm(false);
//   };

//   const handleDeleteSuccess = (deletedId) => {
//     const updated = goals.filter((goal) => goal.id !== deletedId);
//     updateGoals(updated);
//     setShowDeletePopup(false);
//     setGoalToDeleteId(null);
//   };

//   const handleUpdateGoal = (updatedGoal) => {
//     const updated = goals.map((goal, index) =>
//       index === goalToEdit.index ? updatedGoal : goal
//     );
//     updateGoals(updated);
//     setGoalToEdit(null);
//     setShowEditForm(false);
//   };

//   const getCompleteStatusClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case "done":
//         return "complete-yes";
//       case "doing":
//         return "complete-progress";
//       default:
//         return "complete-no";
//     }
//   };

//   const getCompleteStatusText = (status) => {
//     switch (status?.toLowerCase()) {
//       case "done":
//         return "Completed";
//       case "doing":
//         return "In Progress";
//       default:
//         return "Not Started";
//     }
//   };

//   const formatDueDate = (dateString) => {
//     if (!dateString) return "No due date";
//     const date = new Date(dateString);
//     const today = new Date();
//     const isOverdue = date < today;

//     return (
//       <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
//         {date.toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//         {isOverdue && " (Overdue)"}
//       </span>
//     );
//   };

//   const totalPages = Math.ceil(goals.length / goalsPerPage);
//   const indexOfLastGoal = currentPage * goalsPerPage;
//   const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
//   const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

//   return (
//     <div className="study-goal-container">
//       <div className="study-goal-header">
//         <h1 className="study-goal-title">Your Study Goal</h1>
//         <button
//           className="add-button"
//           onClick={() => setShowForm(true)}
//           title="Add new goal"
//         >
//           +
//         </button>
//       </div>

//       {showForm && (
//         <GoalForm onClose={() => setShowForm(false)} onSave={handleSaveGoal} />
//       )}

//       {showEditForm && goalToEdit && (
//         <EditGoal
//           goal={goalToEdit}
//           onClose={() => {
//             setGoalToEdit(null);
//             setShowEditForm(false);
//           }}
//           onSave={handleUpdateGoal}
//         />
//       )}

//       {currentGoals.length === 0 ? (
//         <div className="empty-state">
//           No study goals yet. Click the + button to add your first goal!
//         </div>
//       ) : (
//         <table className="study-goal-table">
//           <thead className="study-goal-thead">
//             <tr>
//               <th>Course</th>
//               <th>Goal</th>
//               <th>Course Expectations</th>
//               <th>Teacher Expectations</th>
//               <th>Self Expectations</th>
//               <th>Complete</th>
//               <th>Due to</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody className="study-goal-tbody">
//             {currentGoals.map((goal, index) => (
//               <tr key={goal.id || index}>
//                 <td>{goal.course}</td>
//                 <td>{goal.goals}</td>
//                 <td>{goal.courseExpectations}</td>
//                 <td>{goal.teacherExpectations}</td>
//                 <td>{goal.selfExpectations}</td>
//                 <td>
//                   <span
//                     className={`complete-status ${getCompleteStatusClass(goal.completeStatus)}`}
//                     onClick={async () => {
//                       try {
//                         const updatedGoal = await updateGoalStatus(
//                           goal.id,
//                           goal.completeStatus === "done" ? "doing" : "done"
//                         );
//                         const realIndex = goals.findIndex(
//                           (g) => g.id === goal.id
//                         );
//                         const updatedGoals = [...goals];
//                         updatedGoals[realIndex].completeStatus =
//                           updatedGoal.completeStatus;
//                         updateGoals(updatedGoals);
//                       } catch (error) {
//                         console.error("Error toggling complete status:", error);
//                       }
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     {getCompleteStatusText(goal.completeStatus)}
//                   </span>
//                 </td>
//                 <td>{formatDueDate(goal.dueDate)}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button
//                       className="action-btn view-btn"
//                       onClick={() => alert("View time clicked")}
//                       title="View time"
//                     >
//                       <i
//                         className="fa-regular fa-clock"
//                         style={{ color: "#00BFFF" }}
//                       ></i>{" "}
//                       {/* xanh dương nhạt */}
//                     </button>
//                     <button
//                       className="action-btn edit-btn"
//                       onClick={async () => {
//                         try {
//                           const goalData = await getGoal(goal.id);
//                           const realIndex = goals.findIndex(
//                             (g) => g.id === goal.id
//                           );
//                           setGoalToEdit({ ...goalData, index: realIndex });
//                           setShowEditForm(true);
//                         } catch (error) {
//                           console.error("Failed to fetch goal:", error);
//                         }
//                       }}
//                       title="Edit"
//                     >
//                       <i
//                         className="fa-regular fa-pen-to-square"
//                         style={{ color: "#FFA500" }}
//                       ></i>{" "}
//                       {/* cam */}
//                     </button>
//                     <button
//                       className="action-btn delete-btn"
//                       onClick={async () => {
//                         try {
//                           await getGoal(goal.id);
//                           setGoalToDeleteId(goal.id);
//                           setShowDeletePopup(true);
//                         } catch (error) {
//                           console.error("Failed to fetch goal:", error);
//                         }
//                       }}
//                       title="Delete"
//                     >
//                       <i
//                         className="fa-solid fa-trash"
//                         style={{ color: "#FF4D4F" }}
//                       ></i>{" "}
//                       {/* đỏ */}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             className="pagination-btn"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
//               onClick={() => setCurrentPage(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="pagination-btn"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {showDeletePopup && (
//         <DeleteGoal
//           id={goalToDeleteId}
//           onDeleteSuccess={handleDeleteSuccess}
//           onClose={() => setShowDeletePopup(false)}
//         />
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import GoalForm from "../../student/GoalForm/GoalForm";
import {
  updateGoalStatus,
  getGoal,
  getAllGoal,
  editGoal,
} from "../../../services/api/StudentAPI";
import DeleteGoal from "../GoalForm/DeleteGoal";
import "./SemesterGoal.css";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
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

  const handleEditClick = (goal) => {
    setEditingGoalId(goal.id);
    setEditFormData({
      course: goal.course || "",
      goals: goal.goals || "",
      courseExpectations: goal.courseExpectations || "",
      teacherExpectations: goal.teacherExpectations || "",
      selfExpectations: goal.selfExpectations || "",
      dueDate: goal.dueDate || "",
    });
  };

  const handleEditChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async (goalId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedGoalData = {
        user_id: user.user_id,
        ...editFormData
      };

      const response = await editGoal(goalId, updatedGoalData);
      
      if (response) {
        const updatedGoals = goals.map(goal => 
          goal.id === goalId ? { ...goal, ...editFormData } : goal
        );
        updateGoals(updatedGoals);
        setEditingGoalId(null);
        setEditFormData({});
      }
    } catch (error) {
      console.error("Error updating goal:", error);
      alert("Failed to update goal. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingGoalId(null);
    setEditFormData({});
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

  const totalPages = Math.ceil(goals.length / goalsPerPage);
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

  const renderEditableCell = (goal, field, type = "text") => {
    const isEditing = editingGoalId === goal.id;
    
    if (!isEditing) {
      return <span>{goal[field]}</span>;
    }

    if (field === "course") {
      return (
        <select
          className="inline-edit-select"
          value={editFormData[field] || ""}
          onChange={(e) => handleEditChange(field, e.target.value)}
        >
          <option value="English">English</option>
          <option value="IT-English">IT English</option>
          <option value="Communicative">Communicative</option>
        </select>
      );
    }

    if (type === "date") {
      return (
        <input
          type="date"
          className="inline-edit-input"
          value={editFormData[field] || ""}
          onChange={(e) => handleEditChange(field, e.target.value)}
        />
      );
    }

    return (
      <input
        type="text"
        className="inline-edit-input"
        value={editFormData[field] || ""}
        onChange={(e) => handleEditChange(field, e.target.value)}
        placeholder={`Enter ${field}`}
      />
    );
  };

  return (
    <div className="study-goal-container">
      <div className="study-goal-header">
        <h1 className="study-goal-title">Your Study Goal</h1>
        <button
          className="add-button"
          onClick={() => setShowForm(true)}
          title="Add new goal"
        >
          +
        </button>
      </div>

      {showForm && (
        <GoalForm onClose={() => setShowForm(false)} onSave={handleSaveGoal} />
      )}

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
              <th>Complete</th>
              <th>Due to</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="study-goal-tbody">
            {currentGoals.map((goal, index) => (
              <tr key={goal.id || index} className={editingGoalId === goal.id ? "editing-row" : ""}>
                <td>{renderEditableCell(goal, "course")}</td>
                <td>{renderEditableCell(goal, "goals")}</td>
                <td>{renderEditableCell(goal, "courseExpectations")}</td>
                <td>{renderEditableCell(goal, "teacherExpectations")}</td>
                <td>{renderEditableCell(goal, "selfExpectations")}</td>
                <td>
                  {editingGoalId === goal.id ? (
                    <span className={`complete-status ${getCompleteStatusClass(goal.completeStatus)}`}>
                      {getCompleteStatusText(goal.completeStatus)}
                    </span>
                  ) : (
                    <span
                      className={`complete-status ${getCompleteStatusClass(goal.completeStatus)}`}
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
                          console.error("Error toggling complete status:", error);
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {getCompleteStatusText(goal.completeStatus)}
                    </span>
                  )}
                </td>
                <td>
                  {editingGoalId === goal.id ? 
                    renderEditableCell(goal, "dueDate", "date") : 
                    formatDueDate(goal.dueDate)
                  }
                </td>
                <td>
                  <div className="action-buttons">
                    {editingGoalId === goal.id ? (
                      <>
                        <button
                          className="action-btn save-btn"
                          onClick={() => handleSaveEdit(goal.id)}
                          title="Save changes"
                        >
                          <i className="fa-solid fa-check" style={{ color: "#28a745" }}></i>
                        </button>
                        <button
                          className="action-btn cancel-btn"
                          onClick={handleCancelEdit}
                          title="Cancel editing"
                        >
                          <i className="fa-solid fa-times" style={{ color: "#6c757d" }}></i>
                        </button>
                      </>
                    ) : (
                      <>
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
                          className="action-btn edit-btn"
                          onClick={() => handleEditClick(goal)}
                          title="Edit"
                        >
                          <i
                            className="fa-regular fa-pen-to-square"
                            style={{ color: "#FFA500" }}
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
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
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
              className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
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
