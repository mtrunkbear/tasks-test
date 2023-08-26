export interface Task {
  id?: string;
  description: string;
  dueDate: string | Date;
  completed: "completed" | "overdue" | "pending";
  creationDate: string | Date;
}

export interface TaskItemProps {
  task: Task;
}
