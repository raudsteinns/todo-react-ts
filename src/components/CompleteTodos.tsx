import React, { useState, ChangeEvent } from "react";
import useTodoActions from "../hooks/useTodoActions";
import TodoFunctions from "./TodoFunctions";

const style = {
  backgroundColor: "var(--white-c)",
  borderRadius: "var(--radius-m)",
  width: "100%",
  minHeight: "200px",
  padding: "var(--_p1)",
};

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
interface Props {
  todos: Todo[];
  setCompleteTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onClickReturn: (id: string) => void;
}

const CompleteTodos: React.FC<Props> = ({
  todos,
  setCompleteTodos,
  onClickReturn,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterPriority, setFilterPriority] = useState<string>("");

  const {
    memoText,
    setMemoText,
    handleToggleAddMemo,
    handleAddMemo,
    handleDeleteMemo,
  } = useTodoActions(todos, setCompleteTodos);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      filterPriority === "" || todo.priority === parseInt(filterPriority)
  );

  const sortedTodos = filteredTodos.sort((a, b) =>
    sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority
  );

  return (
    <>
      <div style={style} className="c-box">
        <h2 className="title has-xl-font-size" data-layout="-fluid-typography">
          完了のTODO
        </h2>
        <TodoFunctions
          sortOrder={sortOrder}
          filterPriority={filterPriority}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        <ul>
          {sortedTodos.map((todo) => (
            <li key={todo.id} className="todo-item--list">
              <details className="todo-item--list-details js-details">
                <summary className="todo-item--list-summary js-summary">
                  <div className="todo-item--list-summary__inner">
                    <div className="todo-item--header">
                      <div
                        className={
                          "c-tag todo-item__priority priority-" + todo.priority
                        }
                      >
                        優先度: {todo.priority}
                      </div>
                      <div className="todo-item__ttl">{todo.text}</div>
                    </div>
                    <div className="todo-item--btns">
                      <button onClick={() => onClickReturn(todo.id)}>
                        戻す
                      </button>
                    </div>
                  </div>
                </summary>
                <div className="todo-item--list-content js-content">
                  <div className="todo-item--list-content__inner">
                    <span className="todo-item__id">{todo.id}</span>
                    <div className="todo-item__create-date">
                      作成日：{todo.createdAt.toLocaleString()}
                    </div>
                    <div className="todo-item--memo">
                      {todo.memo && !todo.isAddingMemo ? (
                        <>
                          <p>{todo.memo}</p>
                          <div className="todo-item--memo__btns">
                            <button
                              onClick={() =>
                                handleToggleAddMemo(todo.id, todo.memo)
                              }
                            >
                              メモを編集
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteMemo(todo.id);
                                setMemoText({ ...memoText, [todo.id]: "" });
                              }}
                            >
                              メモを削除
                            </button>
                          </div>
                        </>
                      ) : (
                        todo.isAddingMemo && (
                          <>
                            <input
                              type="text"
                              value={memoText[todo.id] || ""}
                              onChange={(e) =>
                                setMemoText({
                                  ...memoText,
                                  [todo.id]: e.target.value,
                                })
                              }
                              placeholder="メモを追加"
                            />
                            <div className="todo-item--memo__btns">
                              <button
                                onClick={() => {
                                  handleAddMemo(todo.id, memoText[todo.id]);
                                  setMemoText({ ...memoText, [todo.id]: "" });
                                }}
                              >
                                保存
                              </button>
                              <button
                                onClick={() => handleToggleAddMemo(todo.id)}
                              >
                                キャンセル
                              </button>
                            </div>
                          </>
                        )
                      )}
                      {!todo.memo && !todo.isAddingMemo && (
                        <button onClick={() => handleToggleAddMemo(todo.id)}>
                          メモを追加
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CompleteTodos;
