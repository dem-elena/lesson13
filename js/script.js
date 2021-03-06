"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
let toDoData;
const readStorage = function () {
  if (localStorage.toDos !== undefined) {
    toDoData = JSON.parse(localStorage.toDos);
    render();
  } else {
    toDoData = [];
  }
};

const writeStorange = function () {
  localStorage.toDos = JSON.stringify(toDoData);
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value !== "") {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };
    toDoData.push(newToDo);
    headerInput.value = "";
    writeStorange();
    render();
  }
});

// Отрисовываем toDo листы
const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button></div>';
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      writeStorange();
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(index, 1);
      writeStorange();
      render();
    });
  });
};

readStorage();
