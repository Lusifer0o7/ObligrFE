import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: '' });

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/admin/dept');
      console.log(response)
      setDepartments(response.data.dept);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const createDepartment = useCallback(async () => {
    try {
      await axios.post('http://localhost:4000/api/v1/admin/dept/new', newDepartment);
      fetchDepartments();
      setNewDepartment({ name: '' });
    } catch (error) {
      console.error('Error creating department:', error);
    }
  }, [newDepartment, fetchDepartments]);

  const updateDepartment = useCallback(async (id, updatedDepartment) => {
    try {
      await axios.put(`http://localhost:4000/api/v1/admin/dept/${id}`, updatedDepartment);
      fetchDepartments();
    } catch (error) {
      console.error('Error updating department:', error);
    }
  }, [fetchDepartments]);

  const deleteDepartment = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/admin/dept/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  }, [fetchDepartments]);

  console.log(departments)

    // const memoizedDepartments = useMemo(() => , [departments]);

  return (
    <div>
       
      <h1>Departments</h1>
      <div>
        <input
          type="text"
          placeholder="Department name"
          value={newDepartment.name}
          onChange={(e) => setNewDepartment({ name: e.target.value })}
        />
        <button onClick={createDepartment}>Create Department</button>
      </div>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>
            {department.name}{' '}
            <button onClick={() => deleteDepartment(department._id)}>Delete</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default Departments;
