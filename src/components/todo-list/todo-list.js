import {List} from '/components/list/list.js';
import {Button} from '/components/button/button.js';
import {Input} from '/components/input/input.js';

function templateText(d){
    return(`<p>${d.text}</p>`);
}

function createText(d){
    const p = document.createElement('p');
    p.textContent = d.text;
    return p;
}

function updateText(parent, {text}){
    parent.firstChild.textContent = text;
}

function template({todoDraft, todos}, styleContext, options){
    return (
`
${Input.template({value: todoDraft}, styleContext, null)}
${Button.template(null, styleContext, {label: "Add"})}
${List.template({items: todos}, styleContext, {label: "", childTemplate: templateText})}
`
    );
}

function create({todoDraft, todos}, styleContext, options){
    const inputElement = Input.create({value: todoDraft}, styleContext, null);
    const buttonElement = Button.create(null, styleContext, {label: "Add"});
    const listElement = List.create({items: todos}, styleContext, {createChild: createText});
    return [inputElement, buttonElement, listElement];
}

function mount(nodeElements, props, styleContext, {addTodo, setTodoDraft}){
    const [inputElement, buttonElement] = nodeElements;
    const unmountInput = Input.mount(inputElement, null, styleContext, {onChange: setTodoDraft});
    const unmountButton = Button.mount(buttonElement, null, styleContext, {onClick: addTodo});
    return () => {
        unmountInput();
        unmountButton();
    }
}

function updateCreator(nodeElements, {todos}, styleContext, options){
    const [inputElement, ,listElement] = nodeElements;
    const updateInput = Input.updateCreator(inputElement);
    const updateList = List.updateCreator(listElement, {items: todos}, styleContext, {updateChild: updateText, createChild: createText});
    return function ({todos, todoDraft}){
        updateInput({value: todoDraft});
        updateList({items: todos});
    };
}

export const TodoList = {
    create,
    mount,
    updateCreator,
    template
};
