import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Checkbox, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import emotionStyled from "@emotion/styled";
import { Task } from "../types";
import { formatDate } from "../utils/datetime";
import { useDispatch } from "react-redux";
import {
  toggleTaskCompleted,
  changeTaskDueDate,
} from "../features/tasks/taskSlice";

const TaskItem = ({ id, completed, description, dueDate }: Task) => {
  const dispatch = useDispatch();

  const handleToggleCompleted = () => {
    dispatch(
      toggleTaskCompleted({
        taskId: id as string,
        completed: !completed,
      }) as any
    ); // Llama a la acción para cambiar el estado completed
  };

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

  const taskBackgroundColor = {
    completed: "rgba(0, 255, 0, 0.9)",
    overdue: "rgba(255, 0, 0, 0.9)",
    pending: "rgba(255, 255, 0, 0.9)",
  };
  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeTaskDueDate({
        taskId: id as string,
        newDueDate: event.target.value,
      }) as any
    );
  };
  return (
    <TaskItemContainer
      style={{ backgroundColor: taskBackgroundColor[state] }}
      elevation={2}
    >
      <Checkbox checked={completed||false} onClick={handleToggleCompleted} />
      <TaskDescription>{description}</TaskDescription>
      <DateInput
        type="date"
        value={formatDate(dueDate as string)}
        onChange={handleDueDateChange}
      />
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
