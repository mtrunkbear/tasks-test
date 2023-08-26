import React, { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import styled from "@emotion/styled";

const AddTaskForm: React.FC = () => {
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
        } as any) as any
      );
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <AddTaskFormContainer>
      <FormTitle>Add New Task</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FormField>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
        <FormField>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormField>
        <SubmitButton type="submit">Add Task</SubmitButton>
      </StyledForm>
    </AddTaskFormContainer>
  );
};

export default AddTaskForm;

const AddTaskFormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 1rem;

  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
