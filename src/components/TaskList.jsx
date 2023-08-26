import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState('default');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const filteredTasks = [...tasks].sort((a, b) => {
    if (filter === 'dateCreated') {
      return new Date(b.creationDate) - new Date(a.creationDate);
    }
    if (filter === 'dateDue') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (filter === 'state') {
      return b.completed - a.completed;
    }
    return 0;
  });

  return (
    <div>
      <h1>Task List</h1>
      <label>
        Filter & Sort:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="default">Default</option>
          <option value="dateCreated">Date Created (Newest)</option>
          <option value="dateDue">Due Date (Earliest)</option>
          <option value="state">State (Priority)</option>
        </select>
      </label>
      <AddTaskForm onAddTask={handleAddTask} />
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
