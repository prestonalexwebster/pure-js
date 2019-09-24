
const valueSelector = event => event.target.value;

function template({value}, styleContext, options){
    return `<input type="text" class="${styleContext.input}" value="${value}">`;
}

function create({value}, styleContext, options){
    const nodeElement = document.createElement('input');
    nodeElement.value = value;
    return nodeElement;
}

function mount(nodeElement, props, styleContext, {onChange}){
    function handleChange(event){
        onChange(valueSelector(event));
    }
    nodeElement.addEventListener('change', handleChange);
    return function(){
        nodeElement.removeEventListener(handleChange);
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