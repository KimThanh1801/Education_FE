import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getAllGoal, getAllWeekGoal } from "../../../../services/api/StudentAPI";
import "./ProgressIndicators.css";

const ProgressIndicators = () => {
  const [goals, setGoals] = useState([]); // Semester goals
  const [weekGoals, setWeekGoals] = useState([]); // Week goals
  const [semesterGoalProgress, setSemesterGoalProgress] = useState(0);
  const [weekGoalProgress, setWeekGoalProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.token) {
      setErrorMessage("User not found. Please login again.");
      setLoading(false);
      return;
    }

    const fetchGoals = async () => {
      try {
        // Lấy semester goals
        const response = await getAllGoal();
        console.log("All semester goals:", response);
        if (response && Array.isArray(response)) {
          setGoals(response);
        } else {
          setErrorMessage("No semester goals found.");
        }

        // Lấy week goals
        const weekResponse = await getAllWeekGoal();
        console.log("All week goals:", weekResponse);
        if (weekResponse && Array.isArray(weekResponse)) {
          setWeekGoals(weekResponse);
        } else {
          setErrorMessage("No week goals found.");
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        setErrorMessage("Failed to load goals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  useEffect(() => {
    // Tính phần trăm semester goals
    if (goals.length > 0) {
      const completedGoals = goals.filter(goal => goal.completeStatus === "done").length;
      const totalGoals = goals.length;
      const semesterPercent = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
      setSemesterGoalProgress(semesterPercent);
    } else {
      setSemesterGoalProgress(0);
    }

    // Tính phần trăm week goals
    if (weekGoals.length > 0) {
      const currentDate = new Date(); // 10:35 PM +07, 15/05/2025
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1)); // Đầu tuần (Thứ Hai)
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Cuối tuần (Chủ Nhật)
      endOfWeek.setHours(23, 59, 59, 999);

      console.log("Week range:", startOfWeek.toISOString(), "to", endOfWeek.toISOString());

      const goalsInCurrentWeek = weekGoals.filter(goal => {
        if (!goal.due_date) {
console.warn("Goal missing due_date:", goal);
          return false;
        }
        const dueDateParts = goal.due_date.split('-');
        if (dueDateParts.length !== 3) {
          console.warn("Invalid due_date format:", goal.due_date, "for goal:", goal.goal);
          return false;
        }
        const dueDate = new Date(`${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`); // Chuyển DD-MM-YYYY sang YYYY-MM-DD
        const isInWeek = dueDate >= startOfWeek && dueDate <= endOfWeek;
        console.log(`Goal: ${goal.goal}, dueDate: ${dueDate.toISOString()}, in week: ${isInWeek}, status: ${goal.complete_status}`);
        return isInWeek;
      });

      console.log("Goals in current week:", goalsInCurrentWeek);

      if (goalsInCurrentWeek.length > 0) {
        const completedWeekGoals = goalsInCurrentWeek.filter(goal => goal.complete_status === "done").length;
        const totalWeekGoals = goalsInCurrentWeek.length;
        const weekPercent = totalWeekGoals > 0 ? Math.round((completedWeekGoals / totalWeekGoals) * 100) : 0;
        console.log("Week progress calculation:", { completedWeekGoals, total: totalWeekGoals, percent: weekPercent });
        setWeekGoalProgress(weekPercent);
      } else {
        console.log("No goals found in current week.");
        setWeekGoalProgress(0);
      }
    } else {
      setWeekGoalProgress(0);
    }
  }, [goals, weekGoals]);

  return (
    <div className="progress-container">
      {loading && <div>Loading goals...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!loading && !errorMessage && (
        <div className="progress-items-container">
          <div className="progress-item">
            <CircularProgressbar
              value={semesterGoalProgress}
              text={`${semesterGoalProgress}%`}
              styles={buildStyles({
                pathColor: "#00aaff",
                trailColor: "#d6d6d6"
              })}
            />
            <h3>Semester's Goal</h3>
          </div>
          <div className="progress-item">
            <CircularProgressbar
              value={weekGoalProgress}
              text={`${weekGoalProgress}%`}
              styles={buildStyles({
                pathColor: "#ff9900",
                trailColor: "#d6d6d6"
              })}
            />
            <h3>Week's Goal</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicators;