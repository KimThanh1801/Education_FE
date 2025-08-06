import React, { useEffect, useState } from 'react';
import Buttons from '../Buttons/Buttons';
import Date from '../DateSchedule/Date';
import AddNewClassPlan from '../Buttons/AddNewClassPlan';
import { getAllInClass } from '../../../services/api/StudentAPI';
import './ClassPlan.css';

function ClassPlan() {
  const [inClassData, setInClassData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllInClass();
        setInClassData(data);
      } catch (error) {
        console.error("Failed to fetch in-class data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="a-main-content-check">
      <div className="a-table-section">
        <AddNewClassPlan />
        <h2>In class</h2>
        <table>
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
            {inClassData.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.skill_module}</td>
                <td>{item.lesson_summary}</td>
                <td>{item.self_assessment}</td>
                <td>{item.difficulties}</td>
                <td>{item.improvement_plan}</td>
                <td>{item.problem_solved}</td>
                {/* <td>
                  <span className={`a-status ${item.problemSolved ? 'green' : 'red'}`}></span>
                </td> */}
                <Buttons type="class" inclass={item} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassPlan;
