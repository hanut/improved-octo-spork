"use client";

import {
  addTodoItem,
  deleteTodoList,
  getTodoList,
  removeTodoItem,
  updateTodoItem,
  updateTodoList,
} from "@frontend/api.service";
import Button from "@frontend/components/button";
import Input from "@frontend/components/input";
import PageTitle from "@frontend/components/page-title";
import {
  CreateTodolistItemDto,
  UpdateTodolistItemDto,
} from "@todo/backend/src/todolist/dto";
import { TodoListWithId } from "@todo/backend/src/todolist/todolist.schema";
import { useLayoutEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [list, setList] = useState<TodoListWithId | undefined>();
  const [title, setTitle] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [formItem, setFormItem] = useState<CreateTodolistItemDto>({
    title: "",
    detail: "",
  });

  useLayoutEffect(() => {
    getTodoList(params.id)
      .then((list) => setList(list))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateTitle = () => {
    updateTodoList(params.id, { title })
      .then((updatedList) => {
        window.location.reload();
      })
      .catch(console.error)
      .finally(() => {
        setEdit(false);
      });
  };

  const handleDelete = () => {
    deleteTodoList(params.id)
      .then(() => {
        window.location.assign("/todos");
      })
      .catch(console.error);
  };

  const enableEdit = (id: string) => {
    if (!list) return;
    const foundItem = list.items.find((item) => item.id === id);

    if (!foundItem) return;

    setFormItem(foundItem);
  };

  const handleAddItem = () => {
    if (!formItem) return;

    // Edit mode
    if (formItem.id) {
      updateTodoItem(params.id, formItem as UpdateTodolistItemDto)
        .then(() => {
          window.location.reload();
        })
        .catch(console.error);
      return;
    }

    // Add mode
    addTodoItem(params.id, {
      title: formItem.title,
      detail: formItem.detail,
    })
      .then(() => {
        window.location.reload();
      })
      .catch(console.error);
  };

  const handleRemoveItem = (id: string) => {
    removeTodoItem(params.id, id)
      .then(() => {
        window.location.reload();
      })
      .catch(console.error);
  };

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-[#2d78f1] h-48">
        <PageTitle>{list?.title}</PageTitle>
        <div className="flex flex-row">
          <Button
            className="mx-16 bg-gray-900 hover:bg-gray-600"
            onClick={() => {
              setTitle(list?.title || "");
              setEdit(!edit);
            }}
          >
            {!edit ? "Edit" : "Cancel"}
          </Button>
          <Button
            className="mx-16 bg-gray-900 hover:bg-gray-600"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="border border-gray-300 w-full py-16 px-8">
        {edit && (
          <>
            <Input
              value={title}
              type="text"
              name="title"
              label="Title"
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button className="w-full" onClick={() => updateTitle()}>
              Save
            </Button>
          </>
        )}
        {!edit && (
          <>
            <p className="mb-4 text-gray-500">ℹ️ Click on items to edit them</p>
            {list.items.map(({ id, title, detail, date }) => (
              <div
                key={id}
                className="flex flex-col border-2 border-gray-300 px-4 cursor-pointer"
                onClick={() => enableEdit(id)}
              >
                <label className="font-bold">{title}</label>
                <p>{detail}</p>
                <div className="text-sm">{new Date(date).toDateString()}</div>
                <button
                  onClick={() => handleRemoveItem(id)}
                  className="text-sm bg-red-100 hover:bg-red-200"
                >
                  Remove
                </button>
              </div>
            ))}
            <hr className="my-8" />
            <div className="flex flex-col">
              <label className="font-bold mb-4">
                {formItem.id ? "Edit" : "Add"} Todo Item
              </label>
              <Input
                value={formItem.title}
                type="text"
                name="title"
                label="Title"
                onChange={(e) =>
                  setFormItem((state) => ({ ...state, title: e.target.value }))
                }
              />
              <Input
                value={formItem.detail}
                type="text"
                name="detail"
                label="Detail"
                onChange={(e) =>
                  setFormItem((state) => ({ ...state, detail: e.target.value }))
                }
              />
              <div className="flex flex-row  justify-between">
                <Button className="w-1/3" onClick={handleAddItem}>
                  {formItem.id ? "Edit" : "Add"}
                </Button>
                <Button
                  className="w-1/3 bg-red-500 hover:bg-red-600"
                  onClick={() => setFormItem({ title: "", detail: "" })}
                >
                  Clear
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
