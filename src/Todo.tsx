import React, { useState, ChangeEvent } from "react";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";

import InputTodo from "./components/InputTodo";
import IncompleteTodos from "./components/IncompleteTodos";
import CompleteTodos from "./components/CompleteTodos";

interface Todo {
  id: string;
  text: string;
  originalText: string; // 編集前のTodoタイトル
  isEditing: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
  priority: number;
  originalPriority: number; // 編集前の優先度
  memo?: string;
  isAddingMemo?: boolean;
}

const Todo: React.FC = () => {
  const [todoText, setTodoText] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);

  // 追加input
  const onChangeTodoText = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  const onSetPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
  };

  // 追加button
  const onClickAdd = () => {
    if (todoText === "" || priority === "") return; // 何も入力されていなかった場合はそのまま返す
    const newTodo = {
      id: uuidv4(),
      text: todoText,
      originalText: todoText,
      isEditing: false,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      priority: parseInt(priority),
      originalPriority: parseInt(priority), // 追加
    };
    setIncompleteTodos([...incompleteTodos, newTodo]);
    setTodoText(""); // inputの中身の文字列を削除
    setPriority("");
  };

  // 削除button 一覧から削除する
  const onClickDelete = (id: string): void => {
    const newTodos = incompleteTodos.filter((todo) => todo.id !== id);
    setIncompleteTodos(newTodos);
  };

  // 完了button 一覧から削除してcompleteTodosに追加する
  const onClickComplete = (id: string): void => {
    const newIncompleteTodos = incompleteTodos.filter((todo) => todo.id !== id);
    setIncompleteTodos(newIncompleteTodos);

    const completedTodo = incompleteTodos.find((todo) => todo.id === id);
    if (completedTodo) {
      setCompleteTodos([...completeTodos, completedTodo]);
    }
  };

  // 戻すbutton 一覧から削除してincompleteTodosに追加する
  const onClickReturn = (id: string): void => {
    const newCompleteTodos = completeTodos.filter((todo) => todo.id !== id);
    setCompleteTodos(newCompleteTodos);

    const returnedTodo = completeTodos.find((todo) => todo.id === id);
    if (returnedTodo) {
      setIncompleteTodos([...incompleteTodos, returnedTodo]);
    }
  };

  // 編集button
  const handleEditTodo = (id: string) => {
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isEditing: true,
              originalText: todo.text, // 編集前の値を保持
              originalPriority: todo.priority, // 編集前の値を保持
            }
          : todo
      )
    );
  };

  // 保存button
  const handleSaveTodo = (id: string, newText: string, newPriority: number) => {
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText,
              originalText: newText,
              priority: newPriority,
              originalPriority: newPriority,
              isEditing: false,
            }
          : todo
      )
    );
  };

  // 新Todoタイトル入力input
  const handleChangeTodoText = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newText = e.target.value;
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // 優先度変更用の関数を追加
  const handleChangeTodoPriority = (
    e: ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    const newPriority = parseInt(e.target.value);
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
        todo.id === id ? { ...todo, priority: newPriority } : todo
      )
    );
  };

  const onCancelEdit = (id: string) => {
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
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
  };

  const handleAddMemo = (id: string, memo: string) => {
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
        todo.id === id
          ? { ...todo, memo, isAddingMemo: false, lastUpdatedAt: new Date() }
          : todo
      )
    );
  };

  const handleDeleteMemo = (id: string) => {
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
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

  const handleToggleAddMemo = (id: string) => {
    setIncompleteTodos(
      incompleteTodos.map((todo) =>
        todo.id === id ? { ...todo, isAddingMemo: !todo.isAddingMemo } : todo
      )
    );
  };

  // 未完了のTODOの数が5個以上になったら
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <h1 className="has-3-xl-font-size" data-layout="-fluid-typography">
        TODOリスト
      </h1>
      <div className="c-content--inner">
        <InputTodo
          todoText={todoText}
          onChange={onChangeTodoText}
          priority={priority}
          onSetPriority={onSetPriority}
          onClick={onClickAdd}
          disabled={isMaxLimitIncompleteTodos}
        />
        <IncompleteTodos
          limit={isMaxLimitIncompleteTodos}
          todos={incompleteTodos}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
          onEditTodo={handleEditTodo}
          onSaveTodo={handleSaveTodo}
          onChangeTodoText={handleChangeTodoText}
          onChangeTodoPriority={handleChangeTodoPriority}
          onAddMemo={handleAddMemo}
          onDeleteMemo={handleDeleteMemo}
          onToggleAddMemo={handleToggleAddMemo}
          onCancelEdit={onCancelEdit}
        />
        <CompleteTodos
          todos={completeTodos}
          onClickReturn={onClickReturn}
          onAddMemo={handleAddMemo}
          onDeleteMemo={handleDeleteMemo}
          onToggleAddMemo={handleToggleAddMemo}
        />
      </div>
    </>
  );
};

export default Todo;
