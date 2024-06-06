// JS script for To-Do App
document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const saveButton = document.getElementById("saveButton");
  const todoList = document.getElementById("todoList");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let editIndex = -1;

  saveButton.addEventListener("click", saveTodo);
  titleInput.addEventListener("keypress", handleKeyPress);
  descriptionInput.addEventListener("keypress", handleKeyPress);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      saveTodo();
    }
  }

  function saveTodo() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {
      alert("Please fill in both fields");
      return;
    }

    if (editIndex === -1) {
      todos.push({ title, description });
    } else {
      todos[editIndex] = { title, description };
      editIndex = -1;
    }

    titleInput.value = "";
    descriptionInput.value = "";

    saveTodos();
    renderTodos();
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${todo.title}</td>
                <td>${todo.description}</td>
                <td>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
      todoList.appendChild(row);
    });

    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", (event) => {
        editIndex = event.target.getAttribute("data-index");
        const todo = todos[editIndex];
        titleInput.value = todo.title;
        descriptionInput.value = todo.description;
      });
    });

    document.querySelectorAll(".delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });
    });
  }
  renderTodos();
});
