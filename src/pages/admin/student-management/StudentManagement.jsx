import React, { useEffect, useState } from 'react';
import './StudentManagement.css';
import { FaPlus } from 'react-icons/fa';
import { getStudents } from '../../../services/api/StudentAPI';
import { PulseLoader } from 'react-spinners';
import { add } from '../../../assets';
import StudentTable from '../../../components/admin/StudentTable/StudentTable';
import AddStudentForm from '../../../components/admin/AddStudent/AddStudentForm';
function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudents();
        setStudents(students);
      } catch (error) {
        console.error('Failed to fetch students:', error);
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
              Add new student
            </button>
          </div>
          <h2>Student Management</h2>
          <StudentTable students={students} setStudents={setStudents} setUpdateForm={setUpdateForm} setUserToEdit={setUserToEdit}/>
          {addForm && <AddStudentForm setAddForm={setAddForm} setStudents={setStudents}/>}
          {updateForm && <AddStudentForm setStudents={setStudents} userToEdit={userToEdit} setUpdateForm={setUpdateForm} setAddForm={setAddForm}/>}
        </>
      )}
    </div>
  );
}

export default StudentManagement;
