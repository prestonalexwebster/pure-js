import {TodoList} from "/components/todo-list/todo-list.js";


const TodoListModule = TodoList.makeTodoListModule();

const todoListElements = TodoListModule.create();
const unmount = TodoListModule.mount(todoListElements);
todoListElements.forEach(element => {
    document.body.appendChild(element)
});