import {List} from '/components/list/list.js';
import {Button} from '/components/button/button.js';
import {Input} from '/components/input/input.js';
import {Todo} from '/components/todo/todo.js';

function template({todoDraft, todos,  activeTodoId, activeDraft}){
    const isEditMode = activeTodoId !== null;
    return (
`
${Input.template({value: isEditMode ? activeDraft : todoDraft})}
${Button.template({label: isEditMode ? "Apply" : "Add", primary: isEditMode})}
${List.template({items: todos}, {childTemplate: Todo.template})}
`
);
}

function create({todoDraft, todos, activeTodoId, activeDraft}){
    const isEditMode = activeTodoId !== null;
    const inputElement = Input.create({value: isEditMode ? activeDraft : todoDraft});
    const buttonElement = Button.create({label: isEditMode ? "Apply" : "Add", primary: isEditMode});
    const listElement = List.create({items: todos}, {createChild: Todo.create});
    return [inputElement, buttonElement, listElement];
}

function mount(nodeElements, {todos}, {applyDraft, setTodoDraft, emptyTodos}){
    const [inputElement, buttonElement] = nodeElements;
    const unmountInput = Input.mount(inputElement, null, {onChange: setTodoDraft});
    const unmountButton = Button.mount(buttonElement, null, {onClick: applyDraft});
    return () => {
        unmountInput();
        unmountButton();
        emptyTodos();
    }
}

function updateCreator(nodeElements, {todos, activeTodoId, activeDraft}, {editTodo, removeTodo}){
    const [inputElement, buttonElement, listElement] = nodeElements;
    const updateInput = Input.updateCreator(inputElement);
    const updateList = List.updateCreator(
        listElement,
        {items: todos},
        {
            updateChild: Todo.update,
            createChild: Todo.create,
            mountChild: Todo.mount,
            childOptions: {editTodo, removeTodo}
        });
    const updateButton = Button.updateCreator(buttonElement);
    return function ({todos, todoDraft, activeTodoId, activeDraft}){
        const isEditMode = activeTodoId !== null;
        updateInput({value: isEditMode ? activeDraft : todoDraft});
        updateList({items: todos});
        updateButton({label:  isEditMode ? "Apply" : "Add", primary: isEditMode})
    };
}

export const TodoList = {
    create,
    mount,
    updateCreator,
    template
};
