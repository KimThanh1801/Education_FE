import React, { useState } from "react";
import "./SelfStudy.css";
import { AiOutlinePlus } from "react-icons/ai";
import {
  FaSave,
  FaTimes,
  FaTrash,
  FaClipboardList,
  FaRegClock,
  FaGift,
  FaHandPaper,
} from "react-icons/fa";

const SelfStudy = () => {
  const [entries, setEntries] = useState([
    {
      id: "1",
      date: "2024-01-15",
      skillModule: "React Hooks",
      lesson: "Mastered useEffect and custom hooks",
      timeAllocation: "3 hours",
      learningResources: "React docs, YouTube tutorials",
      learningActivities: "Coding practice, building mini projects",
      concentration: "Good - 8/10",
      planFollowPlan: "Followed 80% of planned activities",
      evaluationWork: "Completed all exercises successfully",
      reinforcingLearning: "Created flashcards, taught concepts to friend",
      notes: "Need more practice with useCallback",
      status: "Completed",
    },
    {
      id: "2",
      date: "2024-01-16",
      skillModule: "CSS Grid",
      lesson: "Grid layout and responsive design",
      timeAllocation: "2.5 hours",
      learningResources: "CSS Grid Garden, MDN docs",
      learningActivities: "Interactive games, layout challenges",
      concentration: "Excellent - 9/10",
      planFollowPlan: "Exceeded planned goals",
      evaluationWork: "Built 3 different grid layouts",
      reinforcingLearning: "Created cheat sheet, bookmarked examples",
      notes: "Grid areas are very powerful",
      status: "In Progress",
    },
  ]);

  const [showHistory, setShowHistory] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }
  };

  const viewHistory = (entry) => {
    setSelectedEntry(entry);
    setShowHistory(true);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Completed: "status-completed",
      "In Progress": "status-progress",
      Planned: "status-planned",
      "On Hold": "status-hold",
    };
    return statusClasses[status] || "status-default";
  };

  // Thêm các function cho inline editing
  const addNewRow = () => {
    const newRow = {
      id: "new-" + Date.now(),
      date: "",
      skillModule: "",
      lesson: "",
      timeAllocation: "",
      learningResources: "",
      learningActivities: "",
      concentration: "",
      planFollowPlan: "",
      evaluationWork: "",
      reinforcingLearning: "",
      notes: "",
      status: "In Progress",
      isEditing: true,
    };
    setEntries((prev) => [newRow, ...prev]);
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

  return (
    <div className="self-study-container">
      {/* Header */}
      <div className="table-card">
        <div className="card-header">
          <div>
            <h2>Self-Study Progress</h2>
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
                <th>Time Allocation</th>
                <th>Learning Resources</th>
                <th>Learning Activities</th>
                <th>Concentration</th>
                <th>Plan & Follow Plan</th>
                <th>Evaluation of My Work</th>
                <th>Reinforcing Learning</th>
                <th>Notes</th>
                <th>Status</th>
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
                        placeholder="Skill/Module"
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
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="e.g., 2 hours"
                        value={entry.timeAllocation}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "timeAllocation",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      entry.timeAllocation
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Resources..."
                        value={entry.learningResources}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "learningResources",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.learningResources}>
                        {entry.learningResources}
                      </div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Activities..."
                        value={entry.learningActivities}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "learningActivities",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.learningActivities}>
                        {entry.learningActivities}
                      </div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="e.g., Good - 8/10"
                        value={entry.concentration}
                        onChange={(e) =>
                          updateEntry(entry.id, "concentration", e.target.value)
                        }
                        className="inline-input"
                      />
                    ) : (
                      entry.concentration
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Plan follow..."
                        value={entry.planFollowPlan}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "planFollowPlan",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.planFollowPlan}>
                        {entry.planFollowPlan}
                      </div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Evaluation..."
                        value={entry.evaluationWork}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "evaluationWork",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.evaluationWork}>
                        {entry.evaluationWork}
                      </div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <input
                        type="text"
                        placeholder="Reinforcing..."
                        value={entry.reinforcingLearning}
                        onChange={(e) =>
                          updateEntry(
                            entry.id,
                            "reinforcingLearning",
                            e.target.value
                          )
                        }
                        className="inline-input"
                      />
                    ) : (
                      <div title={entry.reinforcingLearning}>
                        {entry.reinforcingLearning}
                      </div>
                    )}
                  </td>
                  <td className="text-cell">
                    {entry.isEditing ? (
                      <textarea
                        placeholder="Notes..."
                        value={entry.notes}
                        onChange={(e) =>
                          updateEntry(entry.id, "notes", e.target.value)
                        }
                        className="inline-textarea"
                      />
                    ) : (
                      <div title={entry.notes}>{entry.notes}</div>
                    )}
                  </td>
                  <td>
                    {entry.isEditing ? (
                      <select
                        value={entry.status}
                        onChange={(e) =>
                          updateEntry(entry.id, "status", e.target.value)
                        }
                        className="inline-select"
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                    ) : (
                      <span
                        className={`status-badge ${getStatusBadge(entry.status)}`}
                      >
                        {entry.status}
                      </span>
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

        {/* History Modal */}
        {showHistory && selectedEntry && (
          <div className="modal-overlay" onClick={() => setShowHistory(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Self-Study Entry History</h3>
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
                  <strong>Time Allocation:</strong>{" "}
                  {selectedEntry.timeAllocation}
                </div>
                <div className="history-item">
                  <strong>Learning Resources:</strong>{" "}
                  {selectedEntry.learningResources}
                </div>
                <div className="history-item">
                  <strong>Learning Activities:</strong>{" "}
                  {selectedEntry.learningActivities}
                </div>
                <div className="history-item">
                  <strong>Concentration:</strong> {selectedEntry.concentration}
                </div>
                <div className="history-item">
                  <strong>Plan & Follow Plan:</strong>{" "}
                  {selectedEntry.planFollowPlan}
                </div>
                <div className="history-item">
                  <strong>Evaluation of My Work:</strong>{" "}
                  {selectedEntry.evaluationWork}
                </div>
                <div className="history-item">
                  <strong>Reinforcing Learning:</strong>{" "}
                  {selectedEntry.reinforcingLearning}
                </div>
                <div className="history-item">
                  <strong>Notes:</strong> {selectedEntry.notes}
                </div>
                <div className="history-item">
                  <strong>Status:</strong>
                  <span
                    className={`status-badge ${getStatusBadge(selectedEntry.status)}`}
                  >
                    {selectedEntry.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfStudy;
