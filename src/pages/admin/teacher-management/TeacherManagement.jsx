import React, { useEffect, useState } from 'react';
import '../student-management/StudentManagement.css'
import { getTeachers } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';
import { add } from '../../../assets';
import StudentTable from '../../../components/admin/StudentTable/StudentTable';
import AddStudentForm from '../../../components/admin/AddStudent/AddStudentForm';
import AddTeacher from '../../../components/teacher/AddTeacher/AddTeacher';
import TeacherTable from '../../../components/teacher/TeacherTable/TeacherTable';
function TeacherManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getTeachers();
        setStudents(students);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="student-management">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className="add-student-btn">
            <button onClick={() => setAddForm(true)}>
              <img src={add} alt="Add Icon" className="button-icon" />
              Add new teacher
            </button>
          </div>
          <h2>Teacher Management</h2>
          <TeacherTable students={students} setStudents={setStudents} setUpdateForm={setUpdateForm} setUserToEdit={setUserToEdit}/>
          {addForm && <AddTeacher setAddForm={setAddForm} setStudents={setStudents}/>}
          {updateForm && <AddTeacher setStudents={setStudents} userToEdit={userToEdit} setUpdateForm={setUpdateForm} setAddForm={setAddForm}/>}
        </>
      )}
    </div>
  );
}

export default TeacherManagement;