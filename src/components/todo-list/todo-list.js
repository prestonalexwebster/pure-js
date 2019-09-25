import {TodoList as ControlledTodoList} from '/components/todo-list/controlled-todo-list.js';
import {TodoStore, initialState} from '/components/todo-list/todo-store.js';

function template(state=initialState){
    return ControlledTodoList.template(state);
}

function create(state=initialState){
    return ControlledTodoList.create(state);
}

function mount(nodeElements, state=initialState){

    const todoStore = new TodoStore(state);

    function setTodoDraft(draftText){
        if(todoStore.state.activeTodoId !== null){
            todoStore.setActiveToDoDraft(draftText);
        }else{
            todoStore.setTodoDraft(draftText);
        }
        updateTodos(todoStore.state);
    }

    function applyDraft(){
        if(todoStore.state.activeTodoId !== null){
            todoStore.applyActiveTodo();
        }else{
            todoStore.addTodo();
        }
        updateTodos(todoStore.state);
    }

    function editTodo(id){
        todoStore.setActiveTodo(id);
        updateTodos(todoStore.state);
    }

    function removeTodo(id){
        todoStore.removeTodo(id);
        updateTodos(todoStore.state);
    }

    function emptyTodos(){
        updateTodos({todos: [], ...todoStore.state});
    }

    const updateTodos = ControlledTodoList.updateCreator(
        nodeElements,
        state,
        {editTodo, removeTodo}
        );


    return ControlledTodoList.mount(
        nodeElements,
        todoStore.state,
        {
            applyDraft,
            setTodoDraft,
            removeTodo,
            editTodo,
            emptyTodos
        }
    );
}

export const TodoList = {
    create,
    mount,
    template
};