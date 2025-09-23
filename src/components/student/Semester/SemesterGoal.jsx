import React, { useState, useEffect } from "react";
import GoalHistoryModal from "./GoalHistoryModal";
import DeleteGoal from "../GoalForm/DeleteGoal";
import { FaClock, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "./SemesterGoal.css";
import "./GoalHistoryModal.css";
import {
  updateGoalStatus,
  createGoal,
  editGoal,
  getAllSemesterGoal,
  getAllGoal,
  createSemester,
  createGoalHistory,
} from "../../../services/api/StudentAPI";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [historyGoalId, setHistoryGoalId] = useState(null);
  const goalsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch semesters
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const data = await getAllSemesterGoal();
        setSemesters(data);
        if (data.length > 0) setSelectedSemester(data[0].id);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };
    fetchSemesters();
  }, []);

  // Fetch goals by selected semester
  useEffect(() => {
    const fetchGoals = async () => {
      if (!user?.id || !selectedSemester) return;
      try {
        const allGoals = await getAllGoal();
        // Chỉ lấy goal đúng user và semester, đảm bảo goal cũ có id
        const filtered = allGoals
          .filter(
            (g) =>
              g.user_id === user.id &&
              g.semester_id === Number(selectedSemester)
          )
          .map((g) => ({ ...g, isNew: false })); // cũ => isNew: false
        setGoals(filtered);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, [user?.id, selectedSemester]);

  // Update local state
  const updateGoals = (newGoals) => {
    setGoals(newGoals);
  };

  // Add new goal
  const handleAddEmptyGoal = () => {
    if (!selectedSemester) {
      toast.error("Please select a semester before adding a goal!");
      return;
    }
    const newGoal = {
      semester_id: Number(selectedSemester),
      user_id: user?.id,
      course: "",
      goals: "",
      courseExpectations: "",
      teacherExpectations: "",
      selfExpectations: "",
      dueDate: new Date().toISOString().split("T")[0],
      completeStatus: "doing",
      isNew: true, // chỉ goal mới mới có isNew: true
    };
    updateGoals([newGoal, ...goals]);
    setCurrentPage(1);
  };

  // Save or edit goal
const handleSaveGoal = async (index) => {
  const goal = goals[index];
  // check required fields
  const requiredFields = ["course","goals","courseExpectations","teacherExpectations","selfExpectations","dueDate"];
  const emptyFields = requiredFields.filter(f => !goal[f]?.trim());
  if (emptyFields.length > 0) {
    toast.error(`Please fill: ${emptyFields.join(", ")}`);
    return;
  }

  try {
    let savedGoal;
    if (goal.id) {
      // update goal cũ
      savedGoal = await editGoal(goal.id, goal);
      await createGoalHistory(savedGoal.id, "Updated goal");
    } else {
      // create goal mới
      savedGoal = await createGoal(goal);
      await createGoalHistory(savedGoal.id, "Created goal");
    }

    // cập nhật state
    const updatedGoals = [...goals];
    updatedGoals[index] = { ...savedGoal }; // đảm bảo id mới được set
    setGoals(updatedGoals);
    toast.success("Goal saved successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Unable to save goal!");
  }
};

  // Delete goal
  const handleDeleteSuccess = (deletedId) => {
    const updated = goals.filter((goal) => goal.id !== deletedId);
    updateGoals(updated);
    setShowDeletePopup(false);
    setGoalToDeleteId(null);
  };

  // Handle input change
  const handleInputChange = (e, index, field) => {
    const updated = [...goals];
    updated[index][field] = e.target.value;
    setGoals(updated);
  };

  // Toggle complete status
  const handleToggleComplete = async (goal, index) => {
    try {
      const updatedGoal = await updateGoalStatus(
        goal.id,
        goal.completeStatus === "done" ? "doing" : "done"
      );
      await createGoalHistory(
        goal.id,
        `Changed status to ${updatedGoal.completeStatus}`
      );
      const updatedGoals = [...goals];
      updatedGoals[index].completeStatus = updatedGoal.completeStatus;
      updateGoals(updatedGoals);
    } catch (err) {
      console.error(err);
    }
  };

  // Semester management
  const handleAddSemester = async () => {
    try {
      let newNumber = 1;
      if (semesters.length > 0) {
        const nums = semesters.map((s) =>
          Number(s.name.match(/\d+$/)?.[0] || 0)
        );
        newNumber = Math.max(...nums) + 1;
      }
      const newSemester = await createSemester({
        name: `Semester ${newNumber}`,
      });
      setSemesters([...semesters, newSemester]);
      setSelectedSemester(newSemester.id);
      toast.success(`New semester created: Semester ${newNumber}`);
    } catch (error) {
      console.error(error);
      toast.error("Unable to create new semester!");
    }
  };

  // Pagination
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

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

  return (
    <div className="study-goal-container">
      <div className="study-goal-header">
        <h1 className="study-goal-title">Your Study Goal</h1>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button className="add-button" onClick={handleAddEmptyGoal}>
            +
          </button>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters.map((sem) => (
              <option key={sem.id} value={sem.id}>
                {sem.name}
              </option>
            ))}
          </select>
          <button className="add-semester-btn" onClick={handleAddSemester}>
            + Add Semester
          </button>
        </div>
      </div>

      {currentGoals.length === 0 ? (
        <div className="empty-state">
          No study goals yet. Click + to add your first goal!
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="study-goal-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Goal</th>
                <th>Course Expectations</th>
                <th>Teacher Expectations</th>
                <th>Self Expectations</th>
                <th>Due Date</th>
                <th>Complete</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentGoals.map((goal, index) => (
                <tr key={goal.id ?? index}>
                  {[
                    "course",
                    "goals",
                    "courseExpectations",
                    "teacherExpectations",
                    "selfExpectations",
                    "dueDate",
                  ].map((field) => (
                    <td key={field}>
                      <input
                        type={field === "dueDate" ? "date" : "text"}
                        value={goal[field]}
                        onChange={(e) => handleInputChange(e, index, field)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveGoal(index);
                        }}
                      />
                    </td>
                  ))}
                  <td>
                    <span
                      className={`complete-status ${getCompleteStatusClass(goal.completeStatus)}`}
                      onClick={() => handleToggleComplete(goal, index)}
                      style={{ cursor: "pointer" }}
                    >
                      {getCompleteStatusText(goal.completeStatus)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn view-btn"
                        onClick={() => setHistoryGoalId(goal.id)}
                        title="View history"
                      >
                        <FaClock
                          size={18}
                          color="blue"
                          style={{
                            border: "2px solid blue",
                            borderRadius: "50%",
                            padding: "2px",
                          }}
                        />
                      </button>
                      {historyGoalId === goal.id && (
                        <GoalHistoryModal
                          goalId={historyGoalId}
                          onClose={() => setHistoryGoalId(null)}
                        />
                      )}
                      <button
                        className="action-btn delete-btn"
                        onClick={() => {
                          setGoalToDeleteId(goal.id);
                          setShowDeletePopup(true);
                        }}
                        title="Delete"
                      >
                        <FaTrash size={18} color="red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDeletePopup && (
        <DeleteGoal
          id={goalToDeleteId}
          onDeleteSuccess={handleDeleteSuccess}
          onClose={() => setShowDeletePopup(false)}
        />
      )}

      {goals.length > goalsPerPage && (
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(goals.length / goalsPerPage) },
            (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
