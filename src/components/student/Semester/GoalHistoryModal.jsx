import { useEffect, useState } from "react";
import { getGoalWithHistory } from "../../../services/api/StudentAPI";
import "./GoalHistoryModal.css";
import { FaBook, FaBullseye, FaUser, FaUserFriends } from "react-icons/fa";

export default function GoalHistoryModal({ goalId, onClose }) {
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch goal + history data from API
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await getGoalWithHistory(goalId);
        setGoalData(data);
      } catch (error) {
        console.error("Error fetching goal with history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGoalData();
  }, [goalId]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Format date and time
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="spinner"></div>
          <p>Loading information...</p>
        </div>
      </div>
    );

  if (!goalData)
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <p className="text-red-600">Goal not found</p>
        </div>
      </div>
    );

  const { goal, history = [] } = goalData;

  // Render goal card (reusable for original goal and updates)
  const renderGoalCard = (g, title) => (
    <div className="goal-card" key={g.id}>
      <div className="course-row">
        <div className="course-left">
          <div className="course-title">
            <FaBook size={16} /> {g.course || goal.course}
          </div>
          <div className="course-date">
            {title}: {formatDate(g.updated_at || g.created_at)}
          </div>
        </div>
        <button className="btn-primary">{g.completeStatus}</button>
      </div>

      {/* Course goal */}
      <div className="goal-items">
        <div className="goal-title">
          <FaBullseye size={16} /> <strong>Course Goals</strong>
        </div>
        <div className="goal-content">{g.goals}</div>
      </div>

      {/* Expectations */}
      <div className="goal-expectations">
        <div className="goal-item-goals column">
          <div className="goal-title">
            <FaBook size={16} /> <strong>Course Expectations</strong>
          </div>
          <div className="goal-content">{g.courseExpectations}</div>
        </div>
        <div className="goal-item-goals column">
          <div className="goal-title">
            <FaUserFriends size={16} /> <strong>Teacher Expectations</strong>
          </div>
          <div className="goal-content">{g.teacherExpectations}</div>
        </div>
        <div className="goal-item-goals column">
          <div className="goal-title">
            <FaUser size={16} /> <strong>Self Expectations</strong>
          </div>
          <div className="goal-content">{g.selfExpectations}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header-goals">
          <h1>Learning History</h1>
          <p>
            Track your learning progress, goals, and expectations across updates
          </p>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Original goal */}
          {renderGoalCard(goal, "Created")}

          {/* Updates */}
          {history.length > 0 && (
            <>
              <h2 className="history-title">Updates</h2>
              {history.map((h) => renderGoalCard(h, "Updated"))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
