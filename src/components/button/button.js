
function template(props, styleContext, {label}){
    return(`<button>${label}</button>`);
}

function create(props, styleContext, {label}){
    const nodeElement = document.createElement('button');
    nodeElement.textContent = label;
    return nodeElement;
}

function mount(nodeElement, props, styleContext, {onClick}){
    nodeElement.addEventListener('click', onClick);
    return () => {
        nodeElement.removeEventListener('click', onClick);
    };
}

export const Button = {
    create,
    mount,
    template
};