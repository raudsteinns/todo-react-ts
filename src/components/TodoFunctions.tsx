import React, { ChangeEvent } from "react";

interface Props {
  sortOrder: "asc" | "desc";
  filterPriority: string;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const TodoFunctions: React.FC<Props> = ({
  sortOrder,
  filterPriority,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <div className="l-todo-functions">
      <div className="sort-container">
        <label htmlFor="sortOrder">ソート順: </label>
        <select id="sortOrder" value={sortOrder} onChange={onSortChange}>
          <option value="asc">優先度高い順</option>
          <option value="desc">優先度低い順</option>
        </select>
      </div>
      <div className="filter-container">
        <label htmlFor="filterPriority">フィルター: </label>
        <select
          id="filterPriority"
          value={filterPriority}
          onChange={onFilterChange}
        >
          <option value="">すべて</option>
          <option value="1">優先度 1</option>
          <option value="2">優先度 2</option>
          <option value="3">優先度 3</option>
          <option value="4">優先度 4</option>
          <option value="5">優先度 5</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFunctions;
