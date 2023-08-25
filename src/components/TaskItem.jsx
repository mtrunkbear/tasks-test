import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <div>
      <p>{task.description}</p>
      <p>{task.creationDate}</p>
      <p>{task.dueDate}</p>
      <input type="checkbox" checked={task.completed} />
      {/* Implement other details */}
    </div>
  );
};

export default TaskItem;