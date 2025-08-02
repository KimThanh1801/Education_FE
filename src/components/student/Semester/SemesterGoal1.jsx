import React, { useEffect, useState } from "react";
import "./SemesterGoal.css";
import { getUser } from "../../../services/api/StudentAPI";

export function SemesterGoal() {
  const [completeStatus, setCompleteStatus] = useState("doing");
  const [showForm, setShowForm] = useState(false);
  const[user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        console.log("Test", response)
        setUser(response.data.name);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchUser();
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const toggleCompleteStatus = () => {
    setCompleteStatus((prev) => (prev === "done" ? "doing" : "done"));
  };

  const renderCompleteIcon = () => {
    if (completeStatus === "done") {
      return (
        <span
          onClick={toggleCompleteStatus}
          style={{
            display: "inline-block",
            backgroundColor: "#28a745",
            padding: "5px",
            borderRadius: "4px",
            color: "white",
            cursor: "pointer",
          }}
        ></span>
      );
    } else {
      return (
        <span
          onClick={toggleCompleteStatus}
          style={{
            display: "inline-block",
            backgroundColor: "#ffc107",
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        ></span>
      );
    }
  };

  const getStatus = () => {
    return completeStatus === "done" ? "Completed" : "In Progress";
  };

  return (
    <div className="container">
      <div className="yourGoal">
        <h2 className="mt-4 mb-3">
          Your Study Goal
          <span onClick={handleShowForm} style={{ cursor: "pointer" }}>
            <img
              src="/src/assets/image/plus.png"
              className="icon_add"
              alt="Add Goal"
              style={{ marginLeft: "10px", width: "24px", height: "24px" }}
            />
          </span>
        </h2>
        <div> Name is: {user}</div>

        {showForm && (
          <div className="goal-overlay">
            <div className="goal-form">
              <span className="close-btn" onClick={() => setShowForm(false)}>
                ×
              </span>
              <h3>Set a Goal </h3>
              <div className="mb-3">
                <label className="title">Course</label>
                <select className="form-control">
                  <option value="English">English</option>
                  <option value="IT-English">IT-English</option>
                  <option value="Communicative">Communicative</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="title">Goal</label>
                <input type="text" className="form-control" />
              </div>

              <div className="mb-3">
                <label className="title">Due date</label>
                <input type="date" className="form-control due-date" />
              </div>
              <button
                className="btn w-100"
                style={{ backgroundColor: "orange", borderColor: "orange" }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="table-wrapper">
          <table className="table table-bordered text-center align-middle">
            <thead>
              <tr>
                <th>Course</th>
                <th>Goal</th>
                <th>Complete</th>
                <th>Status</th>
                <th>Due to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ReactJS</td>
                <td>Build a To-do App</td>
                <td>{renderCompleteIcon()}</td>
                <td>{getStatus()}</td>
                <td>
                 May 10
                </td>
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
                    onClick={() => alert("Edit clicked")}
                  ></i>

                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "red", cursor: "pointer" }}
                    title="Delete"
                    onClick={() => alert("Delete clicked")}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>ReactJS</td>
                <td>Build a To-do App</td>
                <td>{renderCompleteIcon()}</td>
                <td>{getStatus()}</td>
                <td>
                 May 10
                </td>
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
                    onClick={() => alert("Edit clicked")}
                  ></i>

                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "red", cursor: "pointer" }}
                    title="Delete"
                    onClick={() => alert("Delete clicked")}
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SemesterGoal;
