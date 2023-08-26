import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

const AddTaskForm: React.FC = ({}) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (description && dueDate) {
      dispatch(
        addTask({
          description,
          dueDate: new Date(dueDate),
          creationDate: new Date(),
          completed: "pending",
        }) as any
      );
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
