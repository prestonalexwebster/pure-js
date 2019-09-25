import {TodoList} from "/components/todo-list/todo-list.js";

const todoListElements = TodoList.create();
const unmount = TodoList.mount(todoListElements);
todoListElements.forEach(element => {
    document.body.appendChild(element)
});