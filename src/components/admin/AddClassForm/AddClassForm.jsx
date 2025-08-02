import React, { useEffect, useState } from 'react';
import './AddClassForm.css';
import { createClass, updateClass, getClasses } from '../../../services/api/StudentAPI';
import { toast } from 'react-toastify';

const AddClassForm = ({ onClose, teacherData, setClassData, classToEdit }) => {
  const [formData, setFormData] = useState({
    className: '',
    teacherName: '',
    description: '',
    image: null,
    students: []
  });

  useEffect(() => {
    if (classToEdit) {
      setFormData({
        className: classToEdit.name || '',
        teacherName: classToEdit.teacher_name || '',
        description: classToEdit.description || '',
        image: null,
        students: []
      });
    }
  }, [classToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result.trim();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

      const students = rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.trim());
        const student = {};
        headers.forEach((header, index) => {
          student[header] = values[index];
        });
        return student;
      });

      setFormData(prev => ({
        ...prev,
        students
      }));
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (classToEdit) {
        // UPDATE
        result = await updateClass(classToEdit.id, formData);
      } else {
        // CREATE
        result = await createClass(formData);
      }

      if (result.status) {
        const newData = await getClasses();
        setClassData(newData);
        onClose();
        toast.success(`${classToEdit ? 'Class updated' : 'Class created'} successfully!`, { autoClose: 1500 });
      } else {
        toast.error(result.error || "Operation failed.");
      }
    } catch (error) {
      const message = error.response?.data?.error || "Unexpected error occurred.";
      toast.error(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{classToEdit ? 'Update Class' : 'Add New Class'}</h2>
        <form onSubmit={handleSubmit}>
          <label className='modal-label'>
            Name of Class
            <input
              type="text"
              name="className"
              value={formData.className}
              placeholder="Enter class name"
              required
              onChange={handleChange}
            />
          </label>

          <label className='modal-label'>
            Teacher
            <select
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              required
            >
              <option value="">Select teacher</option>
              {teacherData.map(teacher => (
                <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
              ))}
            </select>
          </label>

          <label className='modal-label'>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
            />
          </label>

          <label className='modal-label'>
            Upload Students (CSV)
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
            />
          </label>

          <button type="submit" className="submit-button1">
            {classToEdit ? 'Update Class' : 'Save Class'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClassForm;
