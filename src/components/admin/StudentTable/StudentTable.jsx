import React, { useState } from 'react';
import { Table, Button, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteStudent, getStudents } from '../../../services/api/StudentAPI';
import { toast } from 'react-toastify';

function StudentTable({ students, setStudents, setUpdateForm, setUserToEdit }) {
  const handleDelete = async(id) => {
    try {
      const confirmed = window.confirm("Are you sure that you want to delete this student ?");
      if(confirmed)
      {
        const response = await deleteStudent(id);
        if(response.status){
          const updateStudents = await getStudents();
          setStudents(updateStudents);
          toast.success("Student Deleted Successfully!");
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} alt="student" width={40} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setUserToEdit(record);
              setUpdateForm(true);
            }}
          />
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}/>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={students}
        rowKey={(record, index) => index}
        pagination={{ pageSize: 8 }}
        style={{ fontSize: '12px' }}
      />
    </>
  );
}

export default StudentTable;
