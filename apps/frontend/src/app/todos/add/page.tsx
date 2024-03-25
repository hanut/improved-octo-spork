"use client";

import { addTodoList } from "@frontend/api.service";
import Button from "@frontend/components/button";
import Input from "@frontend/components/input";
import PageTitle from "@frontend/components/page-title";
import React from "react";

export default function Page() {
  const [title, setTitle] = React.useState("");

  const saveTitle = () => {
    addTodoList({ title })
      .then((newTodo) => {
        window.location.assign(`/todos/${newTodo._id}`);
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#2d78f1] h-48">
        <PageTitle>Add To Do</PageTitle>
      </div>
      <div className="border border-gray-300 w-full py-16 px-8">
        <Input
          type="text"
          name="title"
          label="Title"
          className="w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button className="w-full" onClick={saveTitle}>
          Save
        </Button>
      </div>
    </div>
  );
}
