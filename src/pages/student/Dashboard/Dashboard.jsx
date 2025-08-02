import ActionButtons from "../../../components/student/Dashboard/ActionButtons/ActionButtons"
import ProgressDashboard from "../../../components/student/Dashboard/ProgressDashboard/ProgressDashboard"
import TaskTable from "../../../components/student/Dashboard/TaskTable/TaskTable"
import CourseCards from "../../../components/student/Dashboard/Courses/CourseCards"
import './Dashboard.css'
    
export const Dashboard = () => {
    return (
        <div className="dashboard">
            <ActionButtons/>
            <ProgressDashboard/>
            <TaskTable/>
            <CourseCards/>
            <div className="confession-wrapper">
              <div className="confession-container">
                <div className="form-section">
                  <h1 className="form-title">Confession</h1>
                  <p className="form-description">
                    Feel free to contact us any time. We will get back to you as soon as we
                    can!
                  </p>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Full Name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Message"></textarea>
                  </div>
                  <button className="send-button">SEND</button>
                </div>
                <div className="info-section">
                  <h3 className="info-title">Info</h3>
                  <p className="info-text">
                    Passerelles Numériques VietNam
                    <br />
                    passerellesnumeriques.org
                    <br />
                    04255615678
                    <br />
                    99 Tô Hiến Thành - Phước Mỹ - Sơn Trà - Đà Nẵng
                  </p>
                  <div className="social-icon">
                    <i className="fab fa-facebook"></i>
                  </div>
                </div>
                <div className="orange-strip"></div>
              </div>
            </div>
        </div>
    )
}