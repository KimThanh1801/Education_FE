import React, { useEffect, useState } from 'react';
import ClassCard from '../../../components/admin/ClassCard/ClassCard';
import { PulseLoader } from 'react-spinners';
import { add } from '../../../assets';
import AddClassForm from '../../../components/admin/AddClassForm/AddClassForm';
import './ClassManagement.css';
import { getClasses, getNameOfTeachers } from '../../../services/api/StudentAPI';

function ClassManagement() {
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [classToEdit, setClassToEdit] = useState(null);

  const triggerReload = () => setReloadTrigger(prev => !prev);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getClasses();
      setClassData(response);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
      setClassData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await getNameOfTeachers();
      console.log("Test teacher name: ", response);
      setTeachers(response.data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, [reloadTrigger]);

  const handleAddClick = () => {
    setClassToEdit(null);
    setShowAddClassForm(true);
  };

  const handleUpdateClick = (classItem) => {
    setClassToEdit(classItem);
    setShowAddClassForm(true);
  };

  return (
    <div className="main-wrapper">
      {loading ? (
        <div className="spinner-wrapper">
          <PulseLoader color="#FF6600" size={18} />
        </div>
      ) : (
        <>
          <div className="wrapper-header">
            <button onClick={handleAddClick}>
              <img src={add} alt="Add Icon" className="button-icon" />
              Add new class
            </button>
            <h1>Class Management</h1>
          </div>

          {showAddClassForm && (
            <AddClassForm
              onClose={() => setShowAddClassForm(false)}
              teacherData={teachers}
              setClassData={setClassData}
              classToEdit={classToEdit}
              triggerReload={triggerReload}
            />
          )}

          <div className="card-grid">
            {classData.map((classItem, index) => (
              <ClassCard
                key={index}
                classItem={classItem}
                triggerReload={triggerReload}
                handleUpdateClick={handleUpdateClick}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ClassManagement;
