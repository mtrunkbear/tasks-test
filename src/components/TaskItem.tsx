import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import emotionStyled from "@emotion/styled";
import { Task } from "../types";
import { formatDate } from "../utils/datetime";

const TaskItem = ({ completed, description, dueDate }: Task) => {
  const getTaskState = ({
    dueDate,
  }: any): "completed" | "overdue" | "pending" => {
    const today = new Date();
    dueDate = new Date(dueDate);

    if (completed) {
      return "completed";
    } else if (dueDate < today) {
      return "overdue";
    } else {
      return "pending";
    }
  };

  const state = getTaskState({ dueDate });

  return (
    <TaskItemContainer elevation={2}>
      <Checkbox checked={completed == "completed"} />
      <TaskDescription>{description}</TaskDescription>
      <DateInput type="date" value={formatDate(dueDate as string)} />
      {TaskIcons[state]}
    </TaskItemContainer>
  );
};

export default TaskItem;

const DateInput = emotionStyled.input`
  border: none;
  outline: none;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
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

const TaskIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircleIcon />,
  overdue: <CancelIcon />,
  pending: <AccessTimeIcon />,
};
