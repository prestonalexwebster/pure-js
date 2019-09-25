
const styleContext = {
    todo: 'todo',
    text: 'text',
    button: 'button',
    primary: 'primary',
    danger: 'danger'
};

function getElementByRef(parent, refName){
    return parent.querySelector(`[data-ref=${refName}]`);
}

function template(d){
    return (
        `<div class="${styleContext.todo}">
    <p class="${styleContext.text}"> data-ref="text"${d.text}</p>
    <button data-ref="edit" class="${styleContext.button} ${styleContext.primary}">🖉</button>
    <button data-ref="delete" class="${styleContext.button} ${styleContext.danger}">⌫</button>
</div>`
    );
}

function create(d){
    const nodeElement = document.createElement('div');
    nodeElement.className = styleContext.todo;
    const p = document.createElement('p');
    p.textContent = d.text;
    p.dataset.ref = "text";
    p.className = styleContext.text;
    const editButton = document.createElement('button');
    editButton.textContent = "🖉";
    editButton.dataset.ref = "edit";
    editButton.classList.add(styleContext.button);
    editButton.classList.add(styleContext.primary);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "⌫";
    deleteButton.dataset.ref = "delete";
    deleteButton.classList.add(styleContext.button);
    deleteButton.classList.add(styleContext.danger);
    nodeElement.appendChild(p);
    nodeElement.appendChild(editButton);
    nodeElement.appendChild(deleteButton);
    return nodeElement;
}

function mount(nodeElement, {id}, {removeTodo, editTodo}){
    const onRemove = function(){
        removeTodo(id);
    };
    const onEdit = function(){
        editTodo(id);
    };
    getElementByRef(nodeElement, "edit").addEventListener('click', onEdit);
    getElementByRef(nodeElement, "delete").addEventListener('click', onRemove);
    return function(){
        getElementByRef(nodeElement, "edit").removeEventListener('click', onEdit);
        getElementByRef(nodeElement, "delete").removeEventListener('click', onRemove);
    }
}

function update(nodeElement, {text}){
    getElementByRef(nodeElement, "text").textContent = text;
}

export const Todo = {
    create,
    mount,
    update,
    template
};