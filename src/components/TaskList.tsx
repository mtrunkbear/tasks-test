import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, addTask } from "../features/tasks/taskSlice";
import TaskItem from "./TaskItem";
import AddTaskForm from "./AddTaskForm";
import { Button, Paper, Modal } from "@mui/material";
import { styled } from "@mui/system";
import { AddOutlined } from "@mui/icons-material";
import { Task } from "../types";

const style = {
  position: "absolute",
  color: "black",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const [filter, setFilter] = useState<string>("default");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const filteredTasks = [...tasks].sort((a, b) => {
    if (filter === "dateCreated") {
      return (
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
      );
    }
    if (filter === "dateDue") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (filter === "state") {
      return b.completed === a.completed ? 0 : b.completed ? -1 : 1;
    }
    return 0;
  });

  return (
    <div>
      <h1>Task List</h1>
      <div style={{margin:"24px"}}>
        <label>
          Filter & Sort:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="default">Default</option>
            <option value="dateCreated">Date Created (Newest)</option>
            <option value="dateDue">Due Date (Earliest)</option>
            <option value="state">State (Priority)</option>
          </select>
        </label>
      </div>

      <AddButton onClick={() => setOpen(true)}>
        <AddOutlined />
      </AddButton>
      {filteredTasks.map(
        ({ id, dueDate, creationDate, description, completed }) => (
          <TaskItem
            key={id}
            id={id}
            description={description}
            dueDate={dueDate as string}
            creationDate={creationDate}
            completed={completed}
          />
        )
      )}
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <AddTaskForm />
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
    color: "white",
  },
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export default TaskList;
