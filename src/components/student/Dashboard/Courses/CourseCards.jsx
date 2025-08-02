import React, { useEffect, useState } from "react";
import { getClasses } from "../../../../services/api/StudentAPI";
import "./CourseCards.css";

const CourseCards = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const data = async() => {
      const coursesData = await getClasses();
      console.log("test course: ",coursesData );
      setCourses(coursesData);
    };
    data();
  }, [])

  return (
    <div className="p-4">
      <div className="course-header">
        <h1 className="font-semibold text-lg">Courses</h1>
      </div>
        <div className="course-grid">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={index}
                className={`course-card p-4 rounded-xl shadow ${(course.name)}`}
              >
                <div
                  className="card-top"
                  style={{
                    backgroundImage: course.image ? `url(${course.image})` : "none",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h4 className="font-bold text-lg text-white">{course.name}</h4>
                  <p className="teacher-name text-sm text-gray-200">
                    {course.teacher_name}
                  </p>
                </div>
                <div className="card-bottom">
                  <div className="avatar-placeholder">
                    <img
                      src={course.teacher_image}
                      alt={course.teacher_name || "Teacher"}
                    />
                  </div>
                  <p className="course-desc text-sm">{course.description || "No description available"}</p>
                </div>
              </div>
            ))
          ) : (
            <div>No courses available.</div>
          )}
        </div>
    </div>
  );
};

export default CourseCards;