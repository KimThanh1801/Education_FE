import React, { useEffect, useState } from "react";
import InClass from "../../../components/student/StudyPlans/InClass";
import SelfStudy from "../../../components/student/StudyPlans/SelfStudy";
import "./StudyPlan.css";
import GoalsSummary from "./GoalsSummary";
import {getAllGoal}  from "../../../services/api/StudentAPI";
const StudyPlan = () => {
const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState("inclass");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const dataGoal = await getAllGoal();
        setGoals(dataGoal);
        
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  return (
    <div className="study-plan">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "inclass" ? "active" : ""}`}
          onClick={() => setActiveTab("inclass")}
        >
          In Class
        </button>
        <button
          className={`tab-button ${activeTab === "selfstudy" ? "active" : ""}`}
          onClick={() => setActiveTab("selfstudy")}
        >
          Self Study
        </button>
      </div>

      <div className="goal-summary">
        <GoalsSummary goals={goals} />
      </div>

      <div className="tab-content">
        {activeTab === "inclass" && <InClass />}
        {activeTab === "selfstudy" && <SelfStudy />}
      </div>
    </div>
  );
};

export default StudyPlan;
