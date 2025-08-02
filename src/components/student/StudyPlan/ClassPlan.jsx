import React from 'react';
import Buttons from '../Buttons/Buttons';
import Date from '../DateSchedule/Date'
import './ClassPlan.css';

function ClassPlan() {
  return (
    <div className="main-content">
      <div className="table-section">
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
            <tr>
              <Date></Date>
              <td>TOEIC</td>
              <td>Preposition</td>
              <td>1</td>
              <td>I struggle with a, an, the.</td>
              <td></td>
              <td><span className="status red"></span></td>
              <Buttons type="class"/>
            </tr>
          <tr>
              <Date></Date>
              <td>TOEIC</td>
              <td>Preposition</td>
              <td>3</td>
              <td>I have no difficult</td>
              <td></td>
              <td><span className="status green"></span></td>
              <Buttons type="class"/>
            </tr>  
            <tr>
              <Date></Date>
              <td>TOEIC</td>
              <td>Preposition</td>
              <td>3</td>
              <td>I have no difficult</td>  
              <td></td>
              <td><span className="status green"></span></td>
              <Buttons type="class"/>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClassPlan;
