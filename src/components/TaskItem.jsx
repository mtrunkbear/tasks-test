import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import emotionStyled  from "@emotion/styled";

const TaskItem = ({ task }) => {
  const getTaskState = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);

    if (task.completed) {
      return "completed";
    } else if (dueDate < today) {
      return "overdue";
    } else if (dueDate >= today) {
      return "pending";
    }
  };

  const state = getTaskState();

  return (
    <TaskItemContainer elevation={2}>
      <Checkbox checked={task.completed} />
      <TaskDescription>{task.description}</TaskDescription>
      <DateInput type="date" value={task.creationDate}  />
      {TaskIcons[state]}
    </TaskItemContainer>
  );
};

export default TaskItem;

const DateInput = emotionStyled.input`
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: "inherit",
  fontSize: "inherit",
`;

const TaskItemContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const TaskDescription = styled(Typography)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(2),
}));

const TaskIcons = {
  completed: <CheckCircleIcon />,
  overdue: <CancelIcon />,
  pending: <AccessTimeIcon />,
};
