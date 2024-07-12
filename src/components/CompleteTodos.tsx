import React from 'react';

const style = {
  backgroundColor: 'var(--white-c)',
  borderRadius: 'var(--radius-m)',
  width: '100%',
  minHeight: '200px',
  padding: 'var(--_p1)',
};

interface Todo {
  id: string;
  text: string;
}

interface Props {
  todos: Todo[];
  onClickReturn: (id: string) => void;
}

const CompleteTodos: React.FC<Props> = (props) => {
  const { todos, onClickReturn } = props;
  return (
    <>
      <div style={style} className='c-box'>
        <h2 className='title has-xl-font-size' data-layout='-fluid-typography'>完了のTODO</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className='todo-item--list'>
              <div className="todo-item--list-row">
                <div className="todo-item--header">
                  <span className='todo-item__id'>{todo.id}</span>
                  <div className="todo-item__ttl">{todo.text}</div>
                </div>
                <div className='todo-item--btns'>
                  <button onClick={() => onClickReturn(todo.id)}>戻す</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CompleteTodos;
