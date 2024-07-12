import React, { useState, ChangeEvent } from 'react'
import './Todo.css'
import { v4 as uuidv4 } from 'uuid';

import InputTodo from './components/InputTodo';
import IncompleteTodos from './components/IncompleteTodos';
import CompleteTodos from './components/CompleteTodos';

interface Todo {
  id: string;
  text: string;
  isEditing: boolean;
}

const Todo: React.FC = () => {
  const [todoText, setTodoText] = useState<string>('');
  const [incompleteTodos, setIncompleteTodos] = useState<Todo[]>([]);
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([]);

  // 追加input
  const onChangeTodoText = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  // 追加button
  const onClickAdd = () => {
    if (todoText === '') return; // 何も入力されていなかった場合はそのまま返す
    const newTodo = { id: uuidv4(), text: todoText, isEditing: false };
    setIncompleteTodos([...incompleteTodos, newTodo]);
    setTodoText(''); // inputの中身の文字列を削除
  };

  // 削除button 一覧から削除する
  const onClickDelete = (id: string): void => { // onClickAddのuuidv4で設定された一意のid
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
    setIncompleteTodos(incompleteTodos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: true } : todo
    ));
  };

  // 保存button
  const handleSaveTodo = (id: string, newText: string) => {
    setIncompleteTodos(incompleteTodos.map((todo) =>
      todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
    ));
  };

  // 新Todoタイトル入力input
  const handleChangeTodoText = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const newText = e.target.value;
    setIncompleteTodos(incompleteTodos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // 未完了のTODOの数が5個以上になったら
  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

  return (
    <>
      <h1 className='has-3-xl-font-size' data-layout='-fluid-typography'>TODOリスト</h1>
      <div className='c-content--inner'>
        <InputTodo
          todoText={todoText}
          onChange={onChangeTodoText}
          onClick={onClickAdd}
          disabled={isMaxLimitIncompleteTodos}
        />{' '}
        {/* onChangeTodoText, onClickAdd関数や、useStateで設定したtodoTextをpropsで渡す */}
        <IncompleteTodos
          limit={isMaxLimitIncompleteTodos}
          todos={incompleteTodos}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDelete}
          onEditTodo={handleEditTodo}
          onSaveTodo={handleSaveTodo}
          onChangeTodoText={handleChangeTodoText}
        />
        <CompleteTodos
          todos={completeTodos}
          onClickReturn={onClickReturn}
        />
      </div>
    </>
  );
};

export default Todo;