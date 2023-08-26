export interface Task {
  id?: string;
  description: string;
  dueDate: string | Date;
  completed: boolean;
  creationDate: string | Date;
}

export interface TaskItemProps {
  task: Task;
}
