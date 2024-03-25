"use client";

import { useLayoutEffect, useState } from "react";
import { TodoListWithId } from "@todo/backend/src/todolist/todolist.schema";
import NavListItem from "../nav-list-item";
import Link from "next/link";
import { getTodoLists } from "@frontend/api.service";

type NavTodosProps = {};

const NavTodos: React.FC<NavTodosProps> = ({}) => {
  const [todoLists, setTodoLists] = useState<TodoListWithId[]>([]);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getTodoLists()
      .then((lists) => setTodoLists(lists))
      .catch(console.warn);
  }, []);

  return (
    <>
      {todoLists.length === 0 ? (
        <div className="text-gray-700 p-2">No lists added...</div>
      ) : (
        <>
          {todoLists.map(({ title, _id }) => (
            <NavListItem
              key={_id.toString()}
              href={`/todos/${_id}`}
              label={`📃 ${title}`}
            />
          ))}
        </>
      )}
      <NavListItem href="/todos/add" label="➕ New List" />
    </>
  );
};

export default NavTodos;
