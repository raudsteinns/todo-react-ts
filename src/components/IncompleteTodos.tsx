import React, { useState, ChangeEvent, useMemo } from "react";
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
  limit: boolean;
  todos: Todo[];
  setIncompleteTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  onClickComplete: (id: string) => void;
  onClickDelete: (id: string) => void;
}

const IncompleteTodos: React.FC<Props> = ({
  limit,
  todos,
  setIncompleteTodos,
  onClickComplete,
  onClickDelete,
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterPriority, setFilterPriority] = useState<string>("");

  const {
    memoText,
    setMemoText,
    editValues,
    handleToggleAddMemo,
    handleEditTodo,
    handleChangeTodoText,
    handleChangeTodoPriority,
    handleSaveTodo,
    handleCancelEdit,
    handleAddMemo,
    handleDeleteMemo,
  } = useTodoActions(todos, setIncompleteTodos);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(
      (todo) =>
        filterPriority === "" || todo.priority === parseInt(filterPriority)
    );
  }, [todos, filterPriority]);

  const sortedTodos = useMemo(() => {
    return filteredTodos.sort((a, b) =>
      sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority
    );
  }, [filteredTodos, sortOrder]);

  return (
    <>
      <div style={style} className="c-box">
        <h2 className="title has-xl-font-size" data-layout="-fluid-typography">
          未完了のTODO
        </h2>
        {limit && <p className="msg-caution">登録できるTODOは最大5個です。</p>}
        <TodoFunctions
          sortOrder={sortOrder}
          filterPriority={filterPriority}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        <ul>
          {sortedTodos.map((todo) => (
            <li key={todo.id} className="todo-item--list">
              <details
                className={`todo-item--list-details js-details ${
                  todo.isEditing ? "is-editing" : ""
                }`}
                open={todo.isEditing} // 編集中は詳細を開いた状態にする
                onClick={(e) => todo.isEditing && e.preventDefault()} // 編集中はクリックを無効にする
              >
                <summary className="todo-item--list-summary js-summary">
                  <div className="todo-item--list-summary__inner">
                    <div className="todo-item--header">
                      <div
                        className={
                          "c-tag todo-item__priority priority-" + todo.priority
                        }
                      >
                        優先度:{" "}
                        {todo.isEditing ? (
                          <select
                            value={
                              editValues[todo.id]?.priority || todo.priority
                            }
                            onChange={(e) =>
                              handleChangeTodoPriority(e, todo.id)
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        ) : (
                          todo.priority
                        )}
                      </div>
                      {todo.isEditing ? (
                        <input
                          type="text"
                          value={editValues[todo.id]?.text || todo.text}
                          onChange={(e) => handleChangeTodoText(e, todo.id)}
                        />
                      ) : (
                        <div className="todo-item__ttl">{todo.text}</div>
                      )}
                    </div>
                    <div className="todo-item--btns">
                      {todo.isEditing ? (
                        <>
                          <button onClick={() => handleSaveTodo(todo.id)}>
                            保存
                          </button>
                          <button onClick={() => handleCancelEdit(todo.id)}>
                            キャンセル
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditTodo(todo.id)}>
                            編集
                          </button>
                          <button onClick={() => onClickComplete(todo.id)}>
                            完了
                          </button>
                          <button onClick={() => onClickDelete(todo.id)}>
                            削除
                          </button>
                        </>
                      )}
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
                          <p className="todo-item__memo">{todo.memo}</p>
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

export default IncompleteTodos;
