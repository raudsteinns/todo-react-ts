const style = {
  backgroundColor: "var(--white-c)",
  borderRadius: "var(--radius-m)",
  width: "100%",
  padding: "var(--_p1)",
};

interface Props {
  todoText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priority: string;
  onSetPriority: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick: () => void;
  disabled: boolean;
}

const InputTodo: React.FC<Props> = (props) => {
  const { todoText, priority, onChange, onSetPriority, onClick, disabled } =
    props;
  return (
    <>
      <div style={style} className="c-box">
        <div className="c-search">
          <input
            type="text"
            placeholder="TODOを入力"
            value={todoText}
            onChange={onChange}
          />
          <select value={priority} onChange={onSetPriority} required>
            <option value="" disabled>
              優先度を選択
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button disabled={disabled || priority === ""} onClick={onClick}>
            追加
          </button>
        </div>
      </div>
    </>
  );
};

export default InputTodo;
