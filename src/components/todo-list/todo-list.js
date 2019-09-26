import {TodoList as ControlledTodoList} from '/components/todo-list/controlled-todo-list.js';
import {TodoRepository, initialState} from '/components/todo-list/todo-repository.js';
import {PersistentStore} from '/components/todo-list/persistent-store.js';

function template(){
    return ControlledTodoList.template(initialState);
}

function makeTodoListModule(){

    const todoStore = new PersistentStore('todo-store', initialState);

    const state = todoStore.getState();

    const todoRepository = new TodoRepository(todoStore);

    function create(){
        return ControlledTodoList.create(state);
    }

    function mount(nodeElements){

        function setTodoDraft(draftText){
            if(todoRepository.getState().activeTodoId !== null){
                todoRepository.setActiveToDoDraft(draftText);
            }else{
                todoRepository.setTodoDraft(draftText);
            }
        }

        function applyDraft(){
            if(todoRepository.getState().activeTodoId !== null){
                todoRepository.applyActiveTodo();
            }else{
                todoRepository.addTodo();
            }
        }

        function editTodo(id){
            todoRepository.setActiveTodo(id);
        }

        function removeTodo(id){
            todoRepository.removeTodo(id);
        }

        function emptyTodos(){
            updateTodos({todos: [], ...todoRepository.getState()});
        }

        const updateTodos = ControlledTodoList.updateCreator(
            nodeElements,
            state,
            {editTodo, removeTodo}
        );

        todoStore.subscribe(updateTodos);

        return ControlledTodoList.mount(
            nodeElements,
            todoRepository.getState(),
            {
                applyDraft,
                setTodoDraft,
                removeTodo,
                editTodo,
                emptyTodos
            }
        );
    }

    return {
        create,
        mount
    };

}



export const TodoList = {
    makeTodoListModule,
    template
};