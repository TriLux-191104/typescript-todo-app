import { ITodo } from "./main.js";
const STORAGE_KEY = "toDoList";

const removeTodoFromLocalStorage = (id: number) => {
  const todosStr = localStorage.getItem(STORAGE_KEY);
  if (todosStr) {
    const todoList = JSON.parse(todosStr) as ITodo[];
    const newList = todoList.filter((todo) => {
      return todo.id != id;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  }
};

const deleteTodo = () => {
  const allDeleteBtn = document.querySelectorAll(".delete-todo");

  if (allDeleteBtn) {
    allDeleteBtn.forEach((button, index) => {
      const btnElement = button as HTMLButtonElement;
      btnElement.addEventListener("click", () => {
        const id = btnElement.getAttribute("data-id");

        // Delete Todo
        if (id) {
          removeTodoFromLocalStorage(+id); // Covert string -> number

          const row = btnElement.closest("tr");
          if (row) row.remove();
        }
      });
    });
  }
};

console.log("Hi");

export { deleteTodo, removeTodoFromLocalStorage };
