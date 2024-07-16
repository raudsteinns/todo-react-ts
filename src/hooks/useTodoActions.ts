import { useState, useMemo } from 'react';

export const useTodoFunctions = (todos, sortOrder, setSortOrder, filterPriority, setFilterPriority) => {
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value);
  };

  const sortedTodos = useMemo(() => {
    return todos.filter(
      (todo) =>
        filterPriority === "" || todo.priority === parseInt(filterPriority)
    ).sort((a, b) =>
      sortOrder === "asc" ? a.priority - b.priority : b.priority - a.priority
    );
  }, [todos, sortOrder, filterPriority]);

  return {
    handleSortChange,
    handleFilterChange,
    sortedTodos
  };
};