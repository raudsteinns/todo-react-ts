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
  limit: boolean;
  todos: Todo[];
  onClickComplete: (i: number) => void;
  onClickDelete: (i: number) => void;
}

const IncompleteTodos: React.FC<Props> = (props) => {
  const { limit, todos, onClickComplete, onClickDelete } = props;
  return (
    <>
      <div style={style} className='c-box'>
        <h2 className='title has-xl-font-size' data-layout='-fluid-typography'>未完了のTODO</h2>
        {limit && (
          <p className='msg-caution'>登録できるTODOは最大5個です。</p>
        )}
        <ul>
          {todos.map((todo, i) => (
            <li key={todo.id} className='todo-item--list'>
              <div className="todo-item--list-row">
                <div className="todo-item--header">
                  <span className='todo-item__id'>{todo.id}</span>
                  <div className="todo-item__ttl">{todo.text}</div>
                </div>
                <div className='todo-item--btns'>
                  <button onClick={() => onClickComplete(i)}>完了</button>{' '}
                  {/* 関数として定義しないとレンダリングの度に実行される */}
                  <button onClick={() => onClickDelete(i)}>削除</button>{' '}
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
