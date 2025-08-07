import React, { useState } from "react";
import "./InClass.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaSave, FaTimes, FaTrash, FaClipboardList, FaRegClock, FaHandPaper } from "react-icons/fa";

const InClass = () => {
  // const [showAddForm, setShowAddForm] = useState(false);
  const [entries, setEntries] = useState([
    {
      id: "1",
      date: "2024-01-15",
      skillModule: "React Fundamentals",
      lesson: "Learned about useState and useEffect hooks",
      selfAssessment: "Good understanding - 8/10",
      difficulties: "Understanding dependency arrays",
      plan: "Practice more with useEffect examples",
      problemSolved: "Fixed infinite re-render issue",
      actions: "Complete practice exercises",
    },
    {
      id: "2",
      date: "2024-01-16",
      skillModule: "JavaScript ES6",
      lesson: "Arrow functions and destructuring",
      selfAssessment: "Excellent - 9/10",
      difficulties: "Complex destructuring patterns",
      plan: "Study advanced destructuring",
      problemSolved: "Nested object destructuring",
      actions: "Build a project using ES6 features",
    },
  ]);

  // const [newEntry, setNewEntry] = useState({
  //   date: "",
  //   skillModule: "",
  //   lesson: "",
  //   selfAssessment: "",
  //   difficulties: "",
  //   plan: "",
  //   problemSolved: "",
  //   actions: "",
  // });

  const [showHistory, setShowHistory] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  // const [editingRow, setEditingRow] = useState(null);

  // const handleInputChange = (field, value) => {
  //   setNewEntry((prev) => ({ ...prev, [field]: value }));
  // };

  // const addNewEntry = () => {
  //   if (newEntry.date && newEntry.skillModule) {
  //     const entry = {
  //       id: Date.now().toString(),
  //       ...newEntry,
  //     };
  //     setEntries((prev) => [...prev, entry]);
  //     setNewEntry({
  //       date: "",
  //       skillModule: "",
  //       lesson: "",
  //       selfAssessment: "",
  //       difficulties: "",
  //       plan: "",
  //       problemSolved: "",
  //       actions: "",
  //     });
  //     setShowAddForm(false);
  //   }
  // };

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const viewHistory = (entry) => {
    setSelectedEntry(entry);
    setShowHistory(true);
  };

  // Thêm các function cho inline editing
  const addNewRow = () => {
    const newRow = {
      id: "new-" + Date.now(),
      date: "",
      skillModule: "",
      lesson: "",
      selfAssessment: "",
      difficulties: "",
      plan: "",
      problemSolved: "",
      actions: "",
      isEditing: true,
    };
    setEntries((prev) => [newRow, ...prev]);
    // setEditingRow(newRow.id);
  };

  const saveRow = (id) => {
    const entry = entries.find((e) => e.id === id);
    if (entry && entry.date && entry.skillModule) {
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? { ...e, isEditing: false, id: Date.now().toString() }
            : e
        )
      );
      // setEditingRow(null);
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
    // setEditingRow(null);
  };

  const updateEntry = (id, field, value) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  return (
    <div className="study-plan-container-inclass">
      {/* Goals Section */}
      {/* Study Entries Table */}
      <div className="table-card">
        <div className="card-header">
          <div>
            <h2>In-Class Progress</h2>
            <p>Track your independent learning activities and progress</p>
          </div>
          <button onClick={addNewRow} className="add-new-btn">
            <AiOutlinePlus style={{ marginRight: "8px" }} />
            Add New
          </button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="study-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Skill/Module</th>
                <th>My lesson - What did I learn today?</th>
                <th>Self-assessment</th>
                <th>My difficulties</th>
                <th>My plan</th>
                <th>Problem Solved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className={entry.isEditing ? "editing-row" : ""}
                >
                  <td className="date-cell">
                    {entry.isEditing ? (
                      <input
                        type="date"
                        value={entry.date}
                        onChange={(e) =>
                          updateEntry(entry.id, "date", e.target.value)
                        }
                        className="inline-input"
                      />
                    ) : (
                      entry.date
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="e.g., React Hooks"
                        value={entry.skillModule}
                        onChange={(e) =>
                          updateEntry(entry.id, "skillModule", e.target.value)
                        }
                        className="inline-input"
                      />
                    ) : (
                      <span className="skill-badge">{entry.skillModule}</span>
                    )}
                  </td>
                  <td className="lesson-cell">
                    {entry.isEditing ? (
                      <textarea
                        placeholder="What did you learn?"
                        value={entry.lesson}
                        onChange={(e) =>
                          updateEntry(entry.id, "lesson", e.target.value)
                        }
                        className="inline-textarea"
                      />
                    ) : (
                      <div title={entry.lesson}>{entry.lesson}</div>
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="e.g., Good - 8/10"
                        value={entry.selfAssessment}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "selfAssessment",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      entry.selfAssessment
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Difficulties..."
                        value={entry.difficulties}
                        onChange={(e) =>
                          updateEntry(entry.id, "difficulties", e.target.value)
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.difficulties}>{entry.difficulties}</div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Next steps..."
                        value={entry.plan}
                        onChange={(e) =>
                          updateEntry(entry.id, "plan", e.target.value)
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.plan}>{entry.plan}</div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Problems solved..."
                        value={entry.problemSolved}
                        onChange={(e) =>
                          updateEntry(entry.id, "problemSolved", e.target.value)
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.problemSolved}>
                        {entry.problemSolved}
                      </div>
                    )}
                  </td>
                  <td className="actions-cell">
                    {entry.isEditing ? (
                      <div className="action-buttons">
                        <button
                          onClick={() => saveRow(entry.id)}
                          className="action-btn save-btn-inline"
                          title="Save"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={() => cancelEdit(entry.id)}
                          className="action-btn cancel-btn-inline"
                          title="Cancel"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button
                          onClick={() => viewHistory(entry)}
                          className="action-btn history-btn"
                          title="View History"
                        >
                          <FaRegClock />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="action-btn delete-btn"
                          title="Delete Entry"
                        >
                          <FaTrash style={{ color: "#ff4d4f" }} />
                        </button>
                        <button
                          className="action-btn help-btn"
                          title="Ask Teacher for Help"
                        >
                          <FaHandPaper style={{ color: "#1890ff" }} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showHistory && selectedEntry && (
          <div className="modal-overlay" onClick={() => setShowHistory(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Entry History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="close-btn"
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="history-item">
                  <strong>Date:</strong> {selectedEntry.date}
                </div>
                <div className="history-item">
                  <strong>Skill/Module:</strong> {selectedEntry.skillModule}
                </div>
                <div className="history-item">
                  <strong>Lesson:</strong> {selectedEntry.lesson}
                </div>
                <div className="history-item">
                  <strong>Self-assessment:</strong>{" "}
                  {selectedEntry.selfAssessment}
                </div>
                <div className="history-item">
                  <strong>Difficulties:</strong> {selectedEntry.difficulties}
                </div>
                <div className="history-item">
                  <strong>Plan:</strong> {selectedEntry.plan}
                </div>
                <div className="history-item">
                  <strong>Problem Solved:</strong> {selectedEntry.problemSolved}
                </div>
                <div className="history-item">
                  <strong>Actions:</strong> {selectedEntry.actions}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InClass;
