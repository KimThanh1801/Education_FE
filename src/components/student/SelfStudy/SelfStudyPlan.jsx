import React, { useEffect, useState } from 'react';
import './SelfStudyPlan.css';
import Date from '../DateSchedule/Date';
import AddNewSelfStudy from '../Buttons/AddNewSelfStudyPlan';
import Buttons from '../Buttons/Buttons';
import { getAllSelfStudy } from '../../../services/api/StudentAPI';

function SelfStudy() {
  const [selfStudyData, setSelfStudyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSelfStudy();
        if (Array.isArray(response)) {
          setSelfStudyData(response);
        } else {
          console.error("Invalid response format:", response);
          setSelfStudyData([]);
        }
      } catch (error) {
        console.error("Error fetching self-study data:", error);
        setSelfStudyData([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="study-table-container">
      <AddNewSelfStudy />
      <h2 className="table-title">Self-study</h2>
      <div className="study-table-wrapper">
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
            {selfStudyData.length === 0 ? (
              <tr>
                <td colSpan="13">No self-study data found.</td>
              </tr>
            ) : (
              selfStudyData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.skill_module}</td>
                  <td>{item.lesson_summary}</td>
                  <td>{item.time_allocation}</td>
                  <td>{item.learning_resources}</td>
                  <td>{item.learning_activities}</td>
                  <td>{item.concentration}</td>
                  <td>{item.follow_plan}</td>
                  <td>{item.evaluation}</td>
                  <td>{item.reinforcement}</td>
                  <td>{item.notes}</td>
                  <td>
                    <span className={`a-status ${item.status === 'done' ? 'green' : 'red'}`}></span>
                    {item.status}
                  </td>

                    <Buttons type="class" selfstudy={item} />
  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelfStudy;
