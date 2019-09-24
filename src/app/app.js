import {TodoList} from '/components/todo-list/todo-list.js';
import {TodoStore} from '/stores/todo-store/todo-store.js';

const styleContext = {};

const todoStore = new TodoStore();
const todoListElements = TodoList.create(todoStore.state, styleContext);

const updateTodos = TodoList.updateCreator(todoListElements, todoStore.state, styleContext);

function addTodo(){
    todoStore.addTodo();
    updateTodos(todoStore.state);
}

function setTodoDraft(draftText){
    todoStore.setTodoDraft(draftText);
    updateTodos(todoStore.state);
}

todoListElements.forEach(element => document.body.appendChild(element));

const unmount = TodoList.mount(todoListElements, todoStore.state, styleContext, {addTodo, setTodoDraft});