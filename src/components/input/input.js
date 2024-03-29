
const styleContext = {
    input: 'input'
};

const valueSelector = event => event.target.value;

function template({value}){
    return `<input type="text" class="${styleContext.input}" value="${value}">`;
}

function create({value}){
    const nodeElement = document.createElement('input');
    nodeElement.value = value;
    return nodeElement;
}

function mount(nodeElement, props, {onChange}){
    function handleChange(event){
        onChange(valueSelector(event));
    }
    nodeElement.addEventListener('change', handleChange);
    return function(){
        nodeElement.removeEventListener(handleChange);
    }
}

function updateCreator(nodeElement){
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