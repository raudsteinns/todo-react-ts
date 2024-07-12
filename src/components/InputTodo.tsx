import React, {ChangeEvent} from 'react'

const style = {
  backgroundColor: 'var(--white-c)',
  borderRadius: 'var(--radius-m)',
  width: '100%',
  padding: 'var(--_p1)',
};

interface Props {
  todoText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  disabled: boolean;
}

const InputTodo: React.FC<Props> = (props) => {
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <>
      <div style={style} className='c-box'>
        <div className="c-search">
          <input
              disabled={disabled}
              type="text"
              placeholder="TODOを入力"
              value={todoText}
              onChange={onChange}
          />
          <button disabled={disabled} onClick={onClick}>追加</button>
        </div>
      </div>
    </>
  );
};

export default InputTodo;