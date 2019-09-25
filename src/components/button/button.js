
function template({label}, options){
    return(`<button>${label}</button>`);
}

function create({label}, options){
    const nodeElement = document.createElement('button');
    nodeElement.textContent = label;
    return nodeElement;
}

function mount(nodeElement, props, {onClick}){
    nodeElement.addEventListener('click', onClick);
    return () => {
        nodeElement.removeEventListener('click', onClick);
    };
}

function updateCreator(nodeElement){
    return function({label}){
            nodeElement.textContent = label;
    };
}

export const Button = {
    create,
    mount,
    updateCreator,
    template
};