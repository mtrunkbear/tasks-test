import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addTask } from "../features/tasks/taskSlice";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { Button, Paper } from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import { AddOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  color:"black",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState("default");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (task) => {
    dispatch(addTask(task));
  };

  const filteredTasks = [...tasks].sort((a, b) => {
    if (filter === "dateCreated") {
      return new Date(b.creationDate) - new Date(a.creationDate);
    }
    if (filter === "dateDue") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (filter === "state") {
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
      <AddButton onClick={() => setOpen(true)}>
        <AddOutlined />
      </AddButton>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <AddTaskForm onAddTask={handleAddTask} />
        </Paper>
      </Modal>
    </div>
  );
};

const AddButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  width: "100%",
  color: "black",
  "&:hover": {
    color: "white", // Cambia este color al color deseado para el hover
  },
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default TaskList;
