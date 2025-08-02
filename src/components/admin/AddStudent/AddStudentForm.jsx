import React, { useState, useEffect } from 'react';
import '../AddClassForm/AddClassForm.css'
import { toast } from 'react-toastify';
import { createUser, getStudents, updateUser } from '../../../services/api/StudentAPI';

const AddStudentForm = ({ setStudents, userToEdit, setAddForm, setUpdateForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null
  });

  const handleCloseForm = () => {
    if(userToEdit){
      setUpdateForm(false);
    }else {
      setAddForm(false);
    }
  }

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        password: '',
        image: null
      });
    }
  }, [userToEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (userToEdit) {
        result = await updateUser(userToEdit.id, formData);
        console.log("Test coi nha: ", result);
      } else {
        result = await createUser(formData);
        console.log("test coi: ", result, result.status);
      }

      if (result.status == true) {
        const updatedUsers = await getStudents();
        setStudents(updatedUsers);
        handleCloseForm();
        toast.success(`${userToEdit ? 'User updated' : 'User created'} successfully!`, { autoClose: 1500 });
      } else {
        toast.error(result.error || "Operation failed.");
      }
    } catch (error) {
        console.error("Lỗi xảy ra:", error);
        console.log("Status code:", error.response?.status);
        console.log("Data:", error.response?.data);
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "Unexpected error occurred.";
        toast.error(message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={() => (userToEdit ? setUpdateForm(false) : setAddForm(false))}>×</button>
        <h2>{userToEdit ? 'Update Student' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit}>
          <label className="modal-label">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter name"
              required
              onChange={handleChange}
            />
          </label>

          <label className="modal-label">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              required
              onChange={handleChange}
            />
          </label>

          <label className="modal-label">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter password"
              required={!userToEdit}
              onChange={handleChange}
            />
          </label>

          <label className="modal-label">
            Upload Image
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-button1">
            {userToEdit ? 'Update User' : 'Save User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
