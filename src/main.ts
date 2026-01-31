import { getRandomInt } from "./helper.js";
import { displayTable } from "./table.todo.js";
import { deleteTodo, removeTodoFromLocalStorage } from "./delete.todo.js";

const STORAGE_KEY = "toDoList";

interface ITodo {
  id: number;
  name: string;
}

const btnElement = document.getElementById("btnCreateTodo");

btnElement?.addEventListener("click", () => {
  const inputElement = document.getElementById("todoName") as HTMLInputElement;
  if (inputElement) {
    const name = inputElement.value;

    // Save todo to local storage
    const newTodo = {
      id: getRandomInt(1, 1000000),
      name: name,
    };

    handleSaveTodoToLocalStorage(newTodo);
    handelAddNewWithJS(newTodo);

    // Close modal
    //@ts-ignore
    const createTodoModal = bootstrap.Modal.getOrCreateInstance("#createTodo", {
      keyboard: false,
    });

    createTodoModal.hide();

    // Clear todo
    inputElement.value = "";

    // Show toast
    //@ts-ignore
    const toast = new bootstrap.Toast("#liveToast");
    toast.show();
  }
});

const handleSaveTodoToLocalStorage = (todo: ITodo) => {
  const todosStr = localStorage.getItem(STORAGE_KEY);
  if (todosStr) {
    // Update
    const todosArr = JSON.parse(todosStr) as ITodo[];
    todosArr.push(todo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todosArr));
  } else {
    // Create
    localStorage.setItem(STORAGE_KEY, JSON.stringify([todo]));
  }
};

const handelAddNewWithJS = (todo: ITodo) => {
  const tableBody = document.querySelector("#tableTodo tbody");
  const toDoListStr = localStorage.getItem("toDoList");
  let index = 0;
  if (toDoListStr) {
    index = JSON.parse(toDoListStr).length - 1;
  }

  const newRow = document.createElement("tr");

  newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${todo.id}</td>
            <td>${todo.name}</td>
            <td>
              <button type="button" class="btn btn-danger delete-todo" data-id="${todo.id}">Delete</button>
            </td>
  `;

  tableBody!.appendChild(newRow);

  const btnElement = document.querySelector(`[data-id = "${todo.id}"]`)!;

  btnElement.addEventListener("click", () => {
    const id = btnElement.getAttribute("data-id");

    // Delete Todo
    if (id) {
      removeTodoFromLocalStorage(+id); // Covert string -> number

      const row = btnElement.closest("tr");
      if (row) row.remove();

      // Show toast
      //@ts-ignore
      const toast = new bootstrap.Toast("#liveToastDelete");
      toast.show();
    }
  });
};

displayTable();

deleteTodo();

export { ITodo };
