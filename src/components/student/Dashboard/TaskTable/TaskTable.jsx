import React, { useState, useEffect } from "react";
import "./TaskTable.css";
import { getAllTasks } from "../../../../services/api/StudentAPI";

const statusOptions = [
  { value: "inprogress", label: "In progress" },
  { value: "done", label: "Completed" },
  { value: "cancel", label: "Cancelled" },
];

const getCourseColorClass = (course) => {
  switch (course) {
    case "TOEIC":
      return "course-toeic";
    case "IT English":
      return "course-it-english";
    case "Speaking":
      return "course-speaking";
    default:
      return "course-default";
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "inprogress":
      return "in-progress";
    case "done":
      return "completed";
    case "cancel":
      return "cancel";
    default:
      return "default";
  }
};

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        console.log("Fetched tasks: ", response);

        if (response.success) {
          const formattedTasks = response.data.map((task) => ({
            task: task.lesson_summary || "No task",
            course: task.skill_module || "Unknown",
            status: task.status || "inprogress",
          }));
          setTasks(formattedTasks);
        } else {
          setErrorMessage(response.message || "Failed to load tasks.");
        }
      } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again later.");
        console.error("Error fetching tasks: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = (index, e) => {
    const newStatus = e.target.value;
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].status = newStatus;
      return updatedTasks;
    });
  };

  return (
    <div className="task-table-wrapper">
      <h1>Course You're Taking</h1>

      {loading && <div>Loading tasks...</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {!loading && !errorMessage && (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((item, index) => (
                <tr key={index}>
                  <td>{item.task}</td>
                  <td className={`course-name ${getCourseColorClass(item.course)}`}>
                    {item.course}
                  </td>
                  <td>
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(index, e)}
className={`task-status ${getStatusClass(item.status)}`}
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No tasks available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskTable;