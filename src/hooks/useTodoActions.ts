import { useState, ChangeEvent } from "react";

interface Todo {
  id: string;
  text: string;
  originalText: string;
  isEditing: boolean;
  createdAt: Date;
  priority: number;
  originalPriority: number;
  memo?: string;
  isAddingMemo?: boolean;
}

const useTodoActions = (todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
  const [memoText, setMemoText] = useState<{ [key: string]: string }>({});
  const [editValues, setEditValues] = useState<{
    [key: string]: { text: string; priority: number };
  }>({});

  const handleToggleAddMemo = (id: string, existingMemo?: string) => {
    setMemoText((prev) => ({
      ...prev,
      [id]: existingMemo || "",
    }));
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isAddingMemo: !todo.isAddingMemo } : todo
      )
    );
  };

  const handleEditTodo = (id: string) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditValues((prev) => ({
        ...prev,
        [id]: { text: todo.text, priority: todo.priority },
      }));
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: true,
              originalText: todo.text,
              originalPriority: todo.priority,
            }
          : todo
      )
    );
  };

  const handleChangeTodoText = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newText = e.target.value;
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], text: newText },
    }));
  };

  const handleChangeTodoPriority = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    const newPriority = parseInt(e.target.value);
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], priority: newPriority },
    }));
  };

  const handleSaveTodo = (id: string) => {
    const { text, priority } = editValues[id];
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text,
              originalText: text,
              priority,
              originalPriority: priority,
              isEditing: false,
            }
          : todo
      )
    );
    setEditValues((prev) => {
      const newEditValues = { ...prev };
      delete newEditValues[id];
      return newEditValues;
    });
  };

  const handleCancelEdit = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: todo.originalText,
              priority: todo.originalPriority,
              isEditing: false,
            }
          : todo
      )
    );
    setEditValues((prev) => {
      const newEditValues = { ...prev };
      delete newEditValues[id];
      return newEditValues;
    });
  };

  const handleAddMemo = (id: string, memo: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, memo, isAddingMemo: false, lastUpdatedAt: new Date() }
          : todo
      )
    );
  };

  const handleDeleteMemo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              memo: undefined,
              isAddingMemo: false,
              lastUpdatedAt: new Date(),
            }
          : todo
      )
    );
  };

  return {
    memoText,
    setMemoText,
    editValues,
    setEditValues,
    handleToggleAddMemo,
    handleEditTodo,
    handleChangeTodoText,
    handleChangeTodoPriority,
    handleSaveTodo,
    handleCancelEdit,
    handleAddMemo,
    handleDeleteMemo,
  };
};

export default useTodoActions;
