import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        'https://task-management-ezcgeccwe8gha2av.southindia-01.azurewebsites.net/api/tasks',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
  };

  const fetchTaskById = async () => {
    if (!searchId) return;
    try {
      const response = await axios.get(
        `https://task-management-ezcgeccwe8gha2av.southindia-01.azurewebsites.net/api/tasks/${searchId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTasks([response.data]); // set as array to match table rendering
    } catch (error) {
      console.error('Error fetching task by ID', error);
      alert('Task not found');
    }
  };

  const fetchTasksByStatus = async () => {
    if (!statusFilter) return;
    try {
      const response = await axios.get(
        `https://task-management-ezcgeccwe8gha2av.southindia-01.azurewebsites.net/api/tasks/status/${statusFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks by status', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <div>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={fetchTaskById}>Search</button>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button onClick={fetchTasksByStatus}>Filter</button>

        <button onClick={fetchTasks}>Reset</button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks
          .sort((a, b) => a.id - b.id)
          .map(task => (
            <tr key={task.id}>
                <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
