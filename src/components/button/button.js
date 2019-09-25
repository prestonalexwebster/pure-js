
const styleContext = {
    button: 'button',
    primary: 'primary',
    accept: 'accept'
};

function template({label, primary}){
    return(`<button class="${styleContext.button} ${primary ? styleContext.primary : styleContext.accept}">${label}</button>`);
}

function create({label, primary}){
    const nodeElement = document.createElement('button');
    nodeElement.textContent = label;
    nodeElement.classList.add(styleContext.button);
    nodeElement.classList.add(primary ? styleContext.primary : styleContext.accept);
    return nodeElement;
}

function mount(nodeElement, props, {onClick}){
    nodeElement.addEventListener('click', onClick);
    return () => {
        nodeElement.removeEventListener('click', onClick);
    };
}

function updateCreator(nodeElement){
    return function({label, primary}){
            nodeElement.textContent = label;
            if(primary){
                nodeElement.classList.add(styleContext.primary);
                nodeElement.classList.remove(styleContext.accept);
            }else{
                nodeElement.classList.add(styleContext.accept);
                nodeElement.classList.remove(styleContext.primary);
            }
    };
}

export const Button = {
    create,
    mount,
    updateCreator,
    template
};