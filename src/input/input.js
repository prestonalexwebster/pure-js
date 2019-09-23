
function template({value}, styleContext, options){
    return `<input type="text" class="${styleContext.input}" value="${value}">`;
}

function create({value}, styleContext, options){
    const nodeElement = document.createElement('input');
    nodeElement.value = value;
    return nodeElement;
}

function mount(nodeElement, styleContext, {onChange}){
    nodeElement.addEventListener('change', onChange);
    return function(){
        nodeElement.removeEventListener(onChange);
    }
}

function updateCreator(nodeElement, initialProps, styleContext, options){
    return function({value}){
        nodeElement.value = value;
    }
}


export const Input = {
    create,
    mount,
    updateCreator,
    template
};