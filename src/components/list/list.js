
function template({items}, styleContext, {childTemplate}){
    return (
        `<ul class="${styleContext.container}">
    ${items.map(
            it => `<li class="${styleContext.item}">${childTemplate(it)}</li>`
        ).join('')}
</ul>`
    );
}

function create({items}, styleContext, {createChild}){
    const nodeElement = document.createElement('ul');
    nodeElement.className = styleContext.container;
    items.map(item => {
        const li = document.createElement('li');
        li.appendChild(createChild(item));
        return li;
    }).forEach(li => nodeElement.appendChild(li));
    return nodeElement;
}

//todo: handle mount/unmount procedure

function updateCreator(nodeElement, initialProps, styleContext, {createChild, updateChild}){
    let lastItems = initialProps.items;

    return function({items}){

        if(lastItems === items){
            return;
        }

        const deadNodes = lastItems
            .map((item, index) =>[item, index])
            .filter(prev => items.every(current => current.id !== prev[0].id))
            .map(pair => nodeElement.children[pair[1]]);
        deadNodes.forEach(node => nodeElement.removeChild(node));

        let nextNode = null;
        for(let i = items.length-1; i >= 0; --i){
            const prevIndex = lastItems.findIndex(prev => prev.id === items[i].id);
            if(prevIndex === -1){
                const li = document.createElement('li');
                li.className = styleContext.item;
                li.appendChild(createChild(items[i]));
                nodeElement.insertBefore(li, nextNode);
                nextNode = li;
            }else{
                const node = nodeElement.children[prevIndex];
                nodeElement.insertBefore(node, nextNode);
                updateChild(node, items[i]);
                nextNode = node;
            }
        }

        lastItems = items;
    }
}

export const List = {
    create,
    updateCreator,
    template
};