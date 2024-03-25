import {
  CreateTodolistDto,
  CreateTodolistItemDto,
  UpdateTodolistDto,
  UpdateTodolistItemDto,
} from "@todo/backend/src/todolist/dto";
import { TodoListWithId } from "@todo/backend/src/todolist/todolist.schema";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const AuthUrl = baseUrl + "/auth";
const TodosUrl = baseUrl + "/todos";

const commonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

function HeadersWithToken(headers: any) {
  const token = localStorage.getItem("token");
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}

function statusToError(statusCode: number, statusText: string) {
  if (statusCode === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  return Promise.reject(new Error(`${status} ${statusText}`));
}

export const login = async (user: string, pass: string): Promise<string> =>
  fetch(AuthUrl + "/login", {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify({ username: user, password: pass }),
  }).then((res) =>
    res.ok
      ? res.text()
      : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  );

export async function logout() {}

/**
 * Sends a POST request to create a new todo list.
 *
 * @param {CreateTodolistDto} createDto - The data needed to create a new todo list.
 * @return {Promise<any>} A promise that resolves to the created todo list if successful, or rejects with an error if unsuccessful.
 */
export const addTodoList = (
  createDto: CreateTodolistDto
): Promise<TodoListWithId> =>
  fetch(TodosUrl, {
    method: "post",
    headers: HeadersWithToken(commonHeaders),
    body: JSON.stringify(createDto),
  }).then((res) =>
    res.ok ? res.json() : statusToError(res.status, res.statusText)
  );

export const getTodoLists = async (): Promise<TodoListWithId[]> => {
  return fetch(TodosUrl, {
    method: "GET",
    headers: HeadersWithToken(commonHeaders),
  }).then((res) =>
    res.ok ? res.json() : statusToError(res.status, res.statusText)
  );
};

export const getTodoList = async (id: string): Promise<TodoListWithId> =>
  fetch(`${TodosUrl}/${id}`, {
    method: "GET",
    headers: HeadersWithToken(commonHeaders),
  }).then((res) =>
    res.ok ? res.json() : statusToError(res.status, res.statusText)
  );

export const updateTodoList = async (
  id: string,
  updateDto: UpdateTodolistDto
): Promise<TodoListWithId> =>
  fetch(`${TodosUrl}/${id}`, {
    method: "PATCH",
    headers: HeadersWithToken(commonHeaders),
    body: JSON.stringify(updateDto),
  }).then((res) =>
    res.ok ? res.json() : statusToError(res.status, res.statusText)
  );

export const deleteTodoList = async (id: string) => {
  return fetch(`${TodosUrl}/${id}`, {
    method: "DELETE",
    headers: HeadersWithToken(commonHeaders),
  }).then((res) =>
    res.ok ? res.json() : statusToError(res.status, res.statusText)
  );
};

export const addTodoItem = (
  listId: string,
  data: CreateTodolistItemDto
): Promise<void> =>
  fetch(`${TodosUrl}/${listId}/items`, {
    method: "POST",
    headers: HeadersWithToken(commonHeaders),
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      return statusToError(res.status, res.statusText);
    }
  });

export async function updateTodoItem(
  listId: string,
  updateDto: UpdateTodolistItemDto
) {
  return fetch(`${TodosUrl}/${listId}/items`, {
    method: "PATCH",
    headers: HeadersWithToken(commonHeaders),
    body: JSON.stringify(updateDto),
  }).then((res) => {
    if (!res.ok) {
      return statusToError(res.status, res.statusText);
    }
  });
}

export const removeTodoItem = async (
  listId: string,
  id: string
): Promise<void> =>
  fetch(`${TodosUrl}/${listId}/items/${id}`, {
    method: "DELETE",
    headers: HeadersWithToken(commonHeaders),
  }).then((res) => {
    if (!res.ok) {
      return statusToError(res.status, res.statusText);
    }
  });
