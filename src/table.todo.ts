import { ITodo } from "./main";

const STORAGE_KEY = "toDoList";

const displayTable = () => {
  const tableBody = document.querySelector("#tableTodo tbody");

  const toDoListStr = localStorage.getItem(STORAGE_KEY);

  if (toDoListStr && tableBody) {
    const todoList = JSON.parse(toDoListStr) as ITodo[];

    todoList.forEach((todo, index) => {
      tableBody.innerHTML += `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${todo.id}</td>
            <td>${todo.name}</td>
            <td>
              <button type="button" class="btn btn-danger delete-todo" data-id="${todo.id}">Delete</button>
            </td>
          </tr>
      `;
    });
  }
};

export { displayTable };
