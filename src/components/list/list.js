
const styleContext = {
    container: 'container',
    item: 'item'
};

function template({items}, {templateChild, childOptions}){
    return (
        `<ul class="${styleContext.container}">
    ${items.map(
            it => `<li class="${styleContext.item}">${templateChild(it, styleContext, childOptions)}</li>`
        ).join('')}
</ul>`
    );
}

function create({items},  {createChild,  childOptions}){
    const nodeElement = document.createElement('ul');
    nodeElement.className = styleContext.container;
    items.map(item => {
        const li = document.createElement('li');
        li.appendChild(createChild(item, childOptions));
        return li;
    }).forEach(li => nodeElement.appendChild(li));
    return nodeElement;
}


function updateCreator(nodeElement, initialProps, {createChild, updateChild, mountChild, childOptions}){
    let lastItems = initialProps.items;
    const unMounts = new Map([...nodeElement.children].map((node, i) => {
        const childNode = node.firstChild;
        return [initialProps.items[i].id, mountChild(childNode, initialProps.items[i], childOptions)];
    }));
    return function({items}){

        if(lastItems === items){
            return;
        }

        const deadNodes = new Map();
        lastItems
            .map((item, index) =>[item, index])
            .filter(prev => items.every(current => current.id !== prev[0].id))
            .forEach(pair => {
                deadNodes.set(pair[0].id, nodeElement.children[pair[1]]);
            });
        for(const [id, node] of deadNodes){
            const unmount = unMounts.get(id);
            unmount();
            unMounts.delete(id);
            nodeElement.removeChild(node);
        }
        const remainedItems = lastItems.filter(prev => items.some(current => current.id === prev.id));

        let nextNode = null;
        for(let i = items.length-1; i >= 0; --i){
            const prevIndex = remainedItems.findIndex(prev => prev.id === items[i].id);
            if(prevIndex === -1){
                const li = document.createElement('li');
                li.className = styleContext.item;
                li.appendChild(createChild(items[i], childOptions));
                nodeElement.insertBefore(li, nextNode);
                const unmount = mountChild(li.firstChild, items[i], childOptions);
                unMounts.set(items[i].id, unmount);
                nextNode = li;
            }else{
                const node = nodeElement.children[prevIndex];
                nodeElement.insertBefore(node, nextNode);
                updateChild(node.firstChild, items[i], childOptions);
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