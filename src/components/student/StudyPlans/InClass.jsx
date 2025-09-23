import React, { useState } from "react";
import "./InClass.css";
import { getAllWeekGoal } from "./../../../services/api/StudentAPI";
import { AiOutlinePlus } from "react-icons/ai";
import {
  FaSave,
  FaEdit,
  FaTrash,
  FaRegClock,
  FaHandPaper,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { createInClass } from "./../../../services/api/StudentAPI";

const InClass = () => {
  const [user_id] = useState(1);
  const [entries, setEntries] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [currentPage, setCurrent] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState("");
  const entriesPage = 10;

  const indexOfLastPage = currentPage * entriesPage;
  const indexOfFirstPage = indexOfLastPage - entriesPage;
  const currentEntriesPage = entries.slice(indexOfFirstPage, indexOfLastPage);

  const totalPages = Math.ceil(entries.length / entriesPage);
  const maxVisible = 5;
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxVisible - 1, totalPages);
  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }
  startPage = Math.max(endPage - maxVisible + 1, 1);

  const viewHistory = (entry) => {
    setSelectedEntry(entry);
    setShowHistory(true);
  };

  const addNewRow = () => {
    const newRow = {
      id: "new-" + Date.now(),
      date: "",
      user_id: user_id,
      goal_id: 1,
      week_id: selectedWeek || 1,
      skillModule: "",
      lesson: "",
      selfAssessment: "",
      difficulties: "",
      plan: "",
      problemSolved: false,
      isEditing: true,
    };
    setEntries((prev) => [newRow, ...prev]);
  };

  const saveRow = async (id) => {
    const entry = entries.find((e) => e.id === id);
    if (!entry) return;

    if (!entry.date || !entry.skillModule || !entry.lesson || !entry.selfAssessment) {
      alert("Please fill in all required fields!");
      return;
    }

    const payload = {
      user_id: entry.user_id,
      goal_id: entry.goal_id,
      week_id: entry.week_id,
      date: entry.date,
      skill_module: entry.skillModule,
      lesson_summary: entry.lesson,
      self_assessment: parseInt(entry.selfAssessment),
      difficulties: entry.difficulties || "",
      improvement_plan: entry.plan || "",
      problem_solved: entry.problemSolved ? 1 : 0,
    };

    try {
      const response = await createInClass(payload);
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, ...response, isEditing: false } : e
        )
      );
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Failed to save entry. Check console for details.");
    }
  };

  const cancelEdit = (id) => {
    if (id.startsWith("new-")) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } else {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isEditing: false } : e))
      );
    }
  };

  const updateEntry = (id, field, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="study-plan-container-inclass">
      <div className="table-card">
        <div className="card-header">
          <div>
            <h2>In-Class Progress</h2>
            <p>Track your independent learning activities and progress</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "14px",
                cursor: "pointer",
                minWidth: "120px",
                height: "40px",
              }}
            >
              <option value="">Select Week</option>
              <option value="1">Week 1</option>
              <option value="2">Week 2</option>
              <option value="3">Week 3</option>
              <option value="4">Week 4</option>
            </select>

            <button onClick={addNewRow} className="add-new-btn">
              <AiOutlinePlus style={{ marginRight: "8px" }} />
              Add New
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="study-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skill/Module</th>
                <th>Lesson Learned</th>
                <th>Self-assessment (1-3)</th>
                <th>Difficulties</th>
                <th>Plan</th>
                <th>Problem Solved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body-inclass">
              {currentEntriesPage.map((entry) => (
                <tr key={entry.id} className={entry.isEditing ? "editing-row" : ""}>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                      />
                    ) : (
                      entry.date
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="text"
                        value={entry.skillModule}
                        onChange={(e) => updateEntry(entry.id, "skillModule", e.target.value)}
                        placeholder="e.g., React Hooks"
                      />
                    ) : (
                      entry.skillModule
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        value={entry.lesson}
                        onChange={(e) => updateEntry(entry.id, "lesson", e.target.value)}
                        placeholder="What did you learn?"
                      />
                    ) : (
                      entry.lesson
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="number"
                        value={entry.selfAssessment}
                        onChange={(e) => updateEntry(entry.id, "selfAssessment", e.target.value)}
                        min={1}
                        max={3}
                      />
                    ) : (
                      entry.selfAssessment
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="text"
                        value={entry.difficulties}
                        onChange={(e) => updateEntry(entry.id, "difficulties", e.target.value)}
                      />
                    ) : (
                      entry.difficulties
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="text"
                        value={entry.plan}
                        onChange={(e) => updateEntry(entry.id, "plan", e.target.value)}
                      />
                    ) : (
                      entry.plan
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="checkbox"
                        checked={entry.problemSolved}
                        onChange={(e) => updateEntry(entry.id, "problemSolved", e.target.checked)}
                      />
                    ) : entry.problemSolved ? (
                      "Yes"
                    ) : (
                      "No"
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <>
                        <button onClick={() => saveRow(entry.id)} title="Save">
                          <FaSave style={{ color: "#52c41a" }} />
                        </button>
                        <button onClick={() => cancelEdit(entry.id)} title="Cancel">
                          <FaTrash style={{ color: "#ff4d4f" }} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => viewHistory(entry)} title="View History">
                          <FaRegClock style={{ color: "#1890ff" }} />
                        </button>
                        <button
                          onClick={() => updateEntry(entry.id, "isEditing", true)}
                          title="Edit"
                        >
                          <FaEdit style={{ color: "#faad14" }} />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          title="Delete"
                          style={{
                            backgroundColor: "#ff4d4f",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            color: "#fff",
                            fontSize: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaTrash />
                        </button>
                        <button title="Ask Teacher for Help">
                          <FaHandPaper style={{ color: "#1890ff" }} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              onClick={() => setCurrent((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="button-pagination"
            >
              <FaAngleLeft />
            </button>

            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrent(page)}
                className={`button-active-pagination ${page === currentPage ? "active" : ""}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrent((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="button-pagination"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {showHistory && selectedEntry && (
          <div className="modal-overlay" onClick={() => setShowHistory(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Entry History</h3>
                <button onClick={() => setShowHistory(false)}>✕</button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Date:</strong> {selectedEntry.date}
                </p>
                <p>
                  <strong>Skill/Module:</strong> {selectedEntry.skillModule}
                </p>
                <p>
                  <strong>Lesson:</strong> {selectedEntry.lesson}
                </p>
                <p>
                  <strong>Self-assessment:</strong> {selectedEntry.selfAssessment}
                </p>
                <p>
                  <strong>Difficulties:</strong> {selectedEntry.difficulties}
                </p>
                <p>
                  <strong>Plan:</strong> {selectedEntry.plan}
                </p>
                <p>
                  <strong>Problem Solved:</strong> {selectedEntry.problemSolved ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InClass;
