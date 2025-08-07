// import React, { useEffect, useState } from "react";
// import { getStudents } from "../../services/api/StudentAPI";
// import "./Header.css";

// const Header = () => {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const students = await getStudents();
//         if (students.length > 0) {
//           console.log("First student data:", students[0]);
//           setStudent(students[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudent();
//   }, []);

//   const initials = student?.name
//     ? student.name
//         .split(" ")
//         .map((part) => part[0])
//         .join("")
//         .toUpperCase()
//     : "??";

//   return (
//     <header className="header">
//       <div className="header-container">
//         <div className="user-info">
//           <div className="user-info-inner">
//             <div className="notification-icon">
//               <svg
//                 className="icon"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a3 3 0 00-6 0v.083A6 6 0 002 11v3.159c0 .538-.214 1.053-.595 1.436L0 17h5m5 0v1a3 3 0 006 0v-1m-6 0h6"
//                 ></path>
//               </svg>
//             </div>
//             <div className="user-avatar">
//               {student?.image ? (
//                 <img src={student.image} alt="Avatar" className="avatar-img" />
//               ) : (
//                 initials
//               )}
//             </div>
//             <span className="user-name">{student?.name || "Loading..."}</span>
//           </div>
//         </div>

//         <div className="welcome-card">
//           <div className="welcome-text">
//             <h1 className="welcome-title">
//               Welcome back {student?.name?.split(" ")[0] || "you"}!
//             </h1>
//             <p className="welcome-info">
//               Today you have{" "}
//               <span className="highlight">9 new applications</span>.
//             </p>
//             <p className="welcome-info">
//               Also you need to hire for{" "}
//               <span className="highlight">Developer, ReactJS Developer</span>.
//             </p>
//           </div>
//           <div className="welcome-illustration">
//             <img
//               src="../../../src/assets/image/anhstudent.png"
//               alt="User Illustration"
//               className="illustration-img"
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này
import { getStudents } from "../../services/api/StudentAPI";
import "./Header.css";

const Header = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate(); // ✅ khởi tạo điều hướng

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const students = await getStudents();
        if (students.length > 0) {
          console.log("First student data:", students[0]);
          setStudent(students[0]);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, []);

  const initials = student?.name
    ? student.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "??";
  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="header">
      {location.pathname !== "/profile" && (
      <div className="header-container">
        <div className="user-info">
          <div className="user-info-inner">
            <div className="notification-icon">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a3 3 0 00-6 0v.083A6 6 0 002 11v3.159c0 .538-.214 1.053-.595 1.436L0 17h5m5 0v1a3 3 0 006 0v-1m-6 0h6"
                ></path>
              </svg>
            </div>
            {/* ✅ Thêm onClick vào avatar và tên */}
            <div className="user-avatar" onClick={goToProfile} style={{ cursor: "pointer" }}>
              {student?.image ? (
                <img src={student.image} alt="Avatar" className="avatar-img" />
              ) : (
                initials
              )}
            </div>
            <span className="user-name" onClick={goToProfile} style={{ cursor: "pointer" }}>
              {student?.name || "Loading..."}
            </span>
          </div>
        </div>

        <div className="welcome-card">
          <div className="welcome-text">
            <h1 className="welcome-title">
              Welcome back {student?.name?.split(" ")[0] || "you"}!
            </h1>
            <p className="welcome-info">
              Today you have <span className="highlight">9 new applications</span>.
            </p>
            <p className="welcome-info">
              Also you need to hire for{" "}
              <span className="highlight">Developer, ReactJS Developer</span>.
            </p>
          </div>
          <div className="welcome-illustration">
            <img
              src="../../../src/assets/image/anhstudent.png"
              alt="User Illustration"
              className="illustration-img"
            />
          </div>
        </div>
      </div>
      )}
    </header>
  );
};

export default Header;
