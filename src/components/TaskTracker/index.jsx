import React, { useState, useEffect } from "react";
import TaskForm from "../TaskForm";
import TaskList from "../TaskList";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) =>
    filterStatus === "All" ? true : task.status === filterStatus
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      return new Date(b.dueDate) - new Date(a.dueDate);
    }
  });

  return (
    <div>
      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Filter by Status:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="me-2">Sort by Due Date:</label>
          <select
            className="form-select d-inline-block w-auto"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <TaskList
        tasks={sortedTasks}
        setEditingTask={setEditingTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskTracker;
