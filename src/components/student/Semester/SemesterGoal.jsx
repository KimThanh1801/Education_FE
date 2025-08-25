import React, { useState, useEffect } from "react";
import { Toast } from "bootstrap";
import {
  updateGoalStatus,
  createGoal,
  editGoal,
  getAllSemesterGoal,
  getAllGoal,
  createSemester,
} from "../../../services/api/StudentAPI";
import DeleteGoal from "../GoalForm/DeleteGoal";
import { FaClock, FaTrash } from "react-icons/fa";
import "./SemesterGoal.css";
import { toast } from "react-toastify";

export default function SemesterGoal() {
  const [goals, setGoals] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [goalToDeleteId, setGoalToDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const goalsPerPage = 10;

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch the list of semesters
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
    const fetchGoalsBySemester = async () => {
      try {
        if (!user?.id || !selectedSemester) return;
        const allGoals = await getAllGoal();
        const filteredGoals = allGoals.filter(
          (g) => g.user_id === user.id && g.semester_id === Number(selectedSemester)
        );
        setGoals(filteredGoals);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoalsBySemester();
  }, [user?.id, selectedSemester]);

  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  // Add an empty goal
  const handleAddEmptyGoal = () => {
    if (!selectedSemester) {
      toast.error("Please select a semester before adding a goal!");
      return;
    }
    const newGoal = {
      semester_id: selectedSemester,
      user_id: user?.id,
      course: "",
      goals: "",
      courseExpectations: "",
      teacherExpectations: "",
      selfExpectations: "",
      dueDate: new Date().toISOString().split("T")[0],
      completeStatus: "doing",
      isNew: true,
    };
    updateGoals([newGoal, ...goals]);
    setCurrentPage(1);
  };

  // Save or edit a goal
  const handleSaveGoal = async (index) => {
    const goal = goals[index];
    const requiredFields = [
      "course",
      "goals",
      "courseExpectations",
      "teacherExpectations",
      "selfExpectations",
      "dueDate",
    ];
    const emptyFields = requiredFields.filter((field) => !goal[field]?.trim());
    if (emptyFields.length > 0) {
      toast.error(`Please fill in all required fields: ${emptyFields.join(", ")}`);
      return;
    }

    try {
      let savedGoal;
      if (goal.isNew) {
        savedGoal = await createGoal(goal);
      } else {
        savedGoal = await editGoal(goal.id, goal);
      }
      const updatedGoals = [...goals];
      updatedGoals[index] = savedGoal;
      updatedGoals[index].isNew = false;
      updateGoals(updatedGoals);
      toast.success("Goal saved successfully!");
    } catch (error) {
      console.error("Error saving goal:", error.response?.data || error.message);
      toast.error("Unable to save goal. Please try again!");
    }
  };

  // Delete a goal
  const handleDeleteSuccess = (deletedId) => {
    const updated = goals.filter((goal) => goal.id !== deletedId);
    updateGoals(updated);
    setShowDeletePopup(false);
    setGoalToDeleteId(null);
  };

  // Handle input changes
  const handleInputChange = (e, index, field) => {
    const updated = [...goals];
    updated[index][field] = e.target.value;
    setGoals(updated);
  };

  // Get complete status classes
  const getCompleteStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "done": return "complete-yes";
      case "doing": return "complete-progress";
      default: return "complete-no";
    }
  };

  const getCompleteStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case "done": return "Completed";
      case "doing": return "In Progress";
      default: return "Not Started";
    }
  };

  // Add a new semester automatically increasing the number
  const handleAddSemester = async () => {
    try {
      let newSemesterNumber = 1;
      if (semesters.length > 0) {
        const semesterNumbers = semesters.map(s => {
          const match = s.name.match(/(\d+)$/);
          return match ? Number(match[1]) : 0;
        });
        newSemesterNumber = Math.max(...semesterNumbers) + 1;
      }

      const newSemesterName = `Semester ${newSemesterNumber}`;
      const newSemester = await createSemester({ name: newSemesterName });

      setSemesters([...semesters, newSemester]);
      setSelectedSemester(newSemester.id);
      toast.success(`New semester created: ${newSemesterName}`);
    } catch (error) {
      console.error("Error creating semester:", error);
      alert("Unable to create new semester. Please try again!");
    }
  };

  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

  return (
    <div className="study-goal-container">
      <div className="study-goal-header">
        <h1 className="study-goal-title">Your Study Goal</h1>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button className="add-button" onClick={handleAddEmptyGoal}>+</button>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters.map((sem, i) => (
              <option key={i} value={sem.id}>
                {sem.name || `Semester ${i + 1}`}
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
          No study goals yet. Click the + button to add your first goal!
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
                <tr key={goal.id || index}>
                  {["course","goals","courseExpectations","teacherExpectations","selfExpectations","dueDate"].map((field) => (
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
                      onClick={async () => {
                        try {
                          const updatedGoal = await updateGoalStatus(
                            goal.id,
                            goal.completeStatus === "done" ? "doing" : "done"
                          );
                          const updatedGoals = [...goals];
                          updatedGoals[index].completeStatus = updatedGoal.completeStatus;
                          updateGoals(updatedGoals);
                        } catch (err) { console.error(err); }
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
                        <FaClock size={18} color="blue" style={{border: "2px solid blue", borderRadius: "50%", padding: "2px"}}/>
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => { setGoalToDeleteId(goal.id); setShowDeletePopup(true); }}
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
          {Array.from({ length: Math.ceil(goals.length / goalsPerPage) }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}




// //// có thể xóa học kì 

// import React, { useState, useEffect } from "react";
// import {
//   updateGoalStatus,
//   createGoal,
//   editGoal,
//   getAllSemesterGoal,
//   getAllGoal,
//   createSemester,
//   deleteSemester,
// } from "../../../services/api/StudentAPI";
// import DeleteGoal from "../GoalForm/DeleteGoal";
// import { FaClock, FaTrash, FaTimes } from "react-icons/fa";
// import "./SemesterGoal.css";

// export default function SemesterGoal() {
//   const [goals, setGoals] = useState([]);
//   const [semesters, setSemesters] = useState([]);
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [goalToDeleteId, setGoalToDeleteId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const goalsPerPage = 10;

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Lấy danh sách học kỳ
//   useEffect(() => {
//     const fetchSemesters = async () => {
//       try {
//         const data = await getAllSemesterGoal();
//         setSemesters(data);
//         if (data.length > 0) setSelectedSemester(data[0].id);
//       } catch (error) {
//         console.error("Error fetching semesters:", error);
//       }
//     };
//     fetchSemesters();
//   }, []);

//   // Lấy danh sách goal theo học kỳ
//   useEffect(() => {
//     const fetchGoalsBySemester = async () => {
//       try {
//         if (!user?.id || !selectedSemester) return;
//         const allGoals = await getAllGoal();
//         const filteredGoals = allGoals.filter(
//           (g) => g.user_id === user.id && g.semester_id === Number(selectedSemester)
//         );
//         setGoals(filteredGoals);
//         setCurrentPage(1);
//       } catch (error) {
//         console.error("Error fetching goals:", error);
//       }
//     };
//     fetchGoalsBySemester();
//   }, [user?.id, selectedSemester]);

//   const updateGoals = (newGoals) => {
//     setGoals(newGoals);
//     localStorage.setItem("goals", JSON.stringify(newGoals));
//   };

//   // Thêm goal trống
//   const handleAddEmptyGoal = () => {
//     if (!selectedSemester) {
//       alert("Vui lòng chọn kỳ học trước khi thêm goal!");
//       return;
//     }
//     const newGoal = {
//       semester_id: selectedSemester,
//       user_id: user?.id,
//       course: "",
//       goals: "",
//       courseExpectations: "",
//       teacherExpectations: "",
//       selfExpectations: "",
//       dueDate: new Date().toISOString().split("T")[0],
//       completeStatus: "doing",
//       isNew: true,
//     };
//     updateGoals([newGoal, ...goals]);
//     setCurrentPage(1);
//   };

//   // Lưu hoặc sửa goal
//   const handleSaveGoal = async (index) => {
//     const goal = goals[index];
//     const requiredFields = [
//       "course",
//       "goals",
//       "courseExpectations",
//       "teacherExpectations",
//       "selfExpectations",
//       "dueDate",
//     ];
//     const emptyFields = requiredFields.filter((field) => !goal[field]?.trim());
//     if (emptyFields.length > 0) {
//       alert(`Vui lòng nhập đầy đủ dữ liệu cho: ${emptyFields.join(", ")}`);
//       return;
//     }

//     try {
//       let savedGoal;
//       if (goal.isNew) {
//         savedGoal = await createGoal(goal);
//       } else {
//         savedGoal = await editGoal(goal.id, goal);
//       }
//       const updatedGoals = [...goals];
//       updatedGoals[index] = savedGoal;
//       updatedGoals[index].isNew = false;
//       updateGoals(updatedGoals);
//       alert("Đã lưu goal thành công!");
//     } catch (error) {
//       console.error("Error saving goal:", error.response?.data || error.message);
//       alert("Không thể lưu goal. Vui lòng thử lại!");
//     }
//   };

//   // Xóa goal
//   const handleDeleteSuccess = (deletedId) => {
//     const updated = goals.filter((goal) => goal.id !== deletedId);
//     updateGoals(updated);
//     setShowDeletePopup(false);
//     setGoalToDeleteId(null);
//   };

//   // Thêm học kỳ mới
//   const handleAddSemester = async () => {
//     try {
//       let newSemesterNumber = 1;
//       if (semesters.length > 0) {
//         const semesterNumbers = semesters.map(s => {
//           const match = s.name.match(/(\d+)$/);
//           return match ? Number(match[1]) : 0;
//         });
//         newSemesterNumber = Math.max(...semesterNumbers) + 1;
//       }

//       const newSemesterName = `Semester ${newSemesterNumber}`;
//       const newSemester = await createSemester({ name: newSemesterName });
//       setSemesters([...semesters, newSemester]);
//       setSelectedSemester(newSemester.id);
//       alert(`Đã tạo học kỳ mới: ${newSemesterName}`);
//     } catch (error) {
//       console.error("Error creating semester:", error);
//       alert("Không thể tạo học kỳ mới. Thử lại!");
//     }
//   };

//   // Xóa học kỳ
//   const handleDeleteSemester = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xóa học kỳ này?")) return;
//     try {
//       await deleteSemester(id);
//       setSemesters(semesters.filter((s) => s.id !== id));
//       if (selectedSemester === id && semesters.length > 1) {
//         setSelectedSemester(semesters[0].id);
//       }
//     } catch (error) {
//       console.error("Error deleting semester:", error);
//       alert("Không thể xóa học kỳ.");
//     }
//   };

//   const indexOfLastGoal = currentPage * goalsPerPage;
//   const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
//   const currentGoals = goals.slice(indexOfFirstGoal, indexOfLastGoal);

//   return (
//     <div className="study-goal-container">
//       <div className="study-goal-header">
//         <h1 className="study-goal-title">Your Study Goal</h1>
//         <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//           <button className="add-button" onClick={handleAddEmptyGoal}>+</button>

//           {/* Custom dropdown */}
//           <div className="semester-dropdown" onMouseLeave={() => setDropdownOpen(false)}>
//             <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
//               {semesters.find(s => s.id === selectedSemester)?.name || "Select Semester"}
//             </button>
//             {dropdownOpen && (
//               <ul className="dropdown-list">
//                 {semesters.map((sem) => (
//                   <li key={sem.id} className="semester-item">
//                     <span onClick={() => { setSelectedSemester(sem.id); setDropdownOpen(false); }}>
//                       {sem.name}
//                     </span>
//                     <button
//                       className="delete-semester-btn"
//                       onClick={() => handleDeleteSemester(sem.id)}
//                     >
//                       <FaTimes />
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <button className="add-semester-btn" onClick={handleAddSemester}>
//             + Add Semester
//           </button>
//         </div>
//       </div>

//       {/* Table goals */}
//       {currentGoals.length === 0 ? (
//         <div className="empty-state">
//           No study goals yet. Click the + button to add your first goal!
//         </div>
//       ) : (
//         <div className="table-wrapper">
//           <table className="study-goal-table">
//             <thead>
//               <tr>
//                 <th>Course</th>
//                 <th>Goal</th>
//                 <th>Course Expectations</th>
//                 <th>Teacher Expectations</th>
//                 <th>Self Expectations</th>
//                 <th>Due to</th>
//                 <th>Complete</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentGoals.map((goal, index) => (
//                 <tr key={goal.id || index}>
//                   {["course","goals","courseExpectations","teacherExpectations","selfExpectations","dueDate"].map((field) => (
//                     <td key={field}>
//                       <input
//                         type={field === "dueDate" ? "date" : "text"}
//                         value={goal[field]}
//                         onChange={(e) => {
//                           const updated = [...goals];
//                           updated[index][field] = e.target.value;
//                           setGoals(updated);
//                         }}
//                         onBlur={() => handleSaveGoal(index)}
//                         onKeyDown={(e) => e.key === "Enter" && handleSaveGoal(index)}
//                       />
//                     </td>
//                   ))}
//                   <td>
//                     <span
//                       className={`complete-status ${goal.completeStatus === "done" ? "complete-yes" : goal.completeStatus === "doing" ? "complete-progress" : "complete-no"}`}
//                       onClick={async () => {
//                         try {
//                           const updatedGoal = await updateGoalStatus(
//                             goal.id,
//                             goal.completeStatus === "done" ? "doing" : "done"
//                           );
//                           const updatedGoals = [...goals];
//                           updatedGoals[index].completeStatus = updatedGoal.completeStatus;
//                           setGoals(updatedGoals);
//                         } catch (err) { console.error(err); }
//                       }}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {goal.completeStatus === "done" ? "Completed" : goal.completeStatus === "doing" ? "In Progress" : "Not Started"}
//                     </span>
//                   </td>
//                   <td>
//                     <div className="action-buttons">
//                       <button
//                         className="action-btn view-btn"
//                         onClick={() => alert("View time clicked")}
//                         title="View time"
//                       >
//                         <FaClock size={18} color="blue" style={{border: "2px solid blue", borderRadius: "50%", padding: "2px"}}/>
//                       </button>
//                       <button
//                         className="action-btn delete-btn"
//                         onClick={() => { setGoalToDeleteId(goal.id); setShowDeletePopup(true); }}
//                         title="Delete"
//                       >
//                         <FaTrash size={18} color="red" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showDeletePopup && (
//         <DeleteGoal
//           id={goalToDeleteId}
//           onDeleteSuccess={handleDeleteSuccess}
//           onClose={() => setShowDeletePopup(false)}
//         />
//       )}

//       {goals.length > goalsPerPage && (
//         <div className="pagination">
//           {Array.from({ length: Math.ceil(goals.length / goalsPerPage) }, (_, i) => (
//             <button
//               key={i}
//               className={currentPage === i + 1 ? "active" : ""}
//               onClick={() => setCurrentPage(i + 1)}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
