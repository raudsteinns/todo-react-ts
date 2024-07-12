import React, {ChangeEvent} from 'react';

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
  isEditing: boolean;
}

interface Props {
  limit: boolean;
  todos: Todo[];
  onClickComplete: (id: string) => void;
  onClickDelete: (id: string) => void;
  onEditTodo: (id: string) => void;
  onSaveTodo: (id: string, newText: string) => void;
  onChangeTodoText: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
}

const IncompleteTodos: React.FC<Props> = (props) => {
  const { limit, todos, onClickComplete, onClickDelete, onEditTodo, onSaveTodo, onChangeTodoText } = props;
  return (
    <>
      <div style={style} className='c-box'>
        <h2 className='title has-xl-font-size' data-layout='-fluid-typography'>未完了のTODO</h2>
        {limit && (
          <p className='msg-caution'>登録できるTODOは最大5個です。</p>
        )}
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className='todo-item--list'>
              <div className="todo-item--list-row">
                <div className="todo-item--header">
                  <span className='todo-item__id'>{todo.id}</span>
                  {todo.isEditing ? (
                    <input
                      type="text"
                      value={todo.text}
                      onChange={(e) => onChangeTodoText(e, todo.id)}
                    />
                  ) : (
                    <div className="todo-item__ttl">{todo.text}</div>
                  )}
                </div>
                <div className='todo-item--btns'>
                  {todo.isEditing ? (
                    <button onClick={() => onSaveTodo(todo.id, todo.text)}>保存</button>
                  ) : (
                    <button onClick={() => onEditTodo(todo.id)}>編集</button>
                  )}
                  <button onClick={() => onClickComplete(todo.id)}>完了</button>{' '}
                  {/* 関数として定義しないとレンダリングの度に実行される */}
                  <button onClick={() => onClickDelete(todo.id)}>削除</button>{' '}
                  {/* 関数として定義しないとレンダリングの度に実行される */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default IncompleteTodos;
