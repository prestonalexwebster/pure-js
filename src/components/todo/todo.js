
function getElementByRef(parent, refName){
    return parent.querySelector(`[data-ref=${refName}]`);
}

function template(d){
    return(
        `<div>
    <p> data-ref="text"${d.text}</p>
    <button data-ref="edit">🖉</button>
    <button data-ref="delete">⌫</button>
</div>`
    );
}

function create(d){
    const nodeElement = document.createElement('div');
    const p = document.createElement('p');
    p.textContent = d.text;
    p.dataset.ref = "text";
    const editButton = document.createElement('button');
    editButton.textContent = "🖉";
    editButton.dataset.ref = "edit";
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "⌫";
    deleteButton.dataset.ref = "delete";
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