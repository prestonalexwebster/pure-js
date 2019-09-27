
function template({items}, {templateChild, childOptions}){
    return (
        `${items.map(
            it => `<li>${templateChild(it,  childOptions)}</li>`
        ).join('')}`
    );
}

function create({items}, {createChild, childOptions}){
    return items.map(item => {
        return createChild(item, childOptions);
    });
}

function makeChildren({parentElement,nodeElements, createChild,  childOptions, mountChild, updateChild}){

    let lastItems = null;

    const unMounts = new Map();

    return {
        mount({items}){
            lastItems = items;
            items.forEach((item,i) => {
                const nodeElement = nodeElements[i];
                unMounts.set(item.id, mountChild(nodeElement, item, childOptions));
                parentElement.appendChild(item);
            });
            return () => {
                for(let [id,unmount] of unMounts){
                    unmount();
                }
                [...parentElement.children].forEach(child => parentElement.removeChild(child));
            }
        },
        update({items}){
            if(lastItems === items){
                return;
            }

            const deadNodes = new Map();
            lastItems
                .map((item, index) =>[item, index])
                .filter(prev => items.every(current => current.id !== prev[0].id))
                .forEach(pair => {
                    deadNodes.set(pair[0].id, parentElement.children[pair[1]]);
                });
            for(const [id, node] of deadNodes){
                const unmount = unMounts.get(id);
                unmount();
                unMounts.delete(id);
                parentElement.removeChild(node);
            }
            const remainedItems = lastItems.filter(prev => items.some(current => current.id === prev.id));

            let nextNode = null;
            for(let i = items.length-1; i >= 0; --i){
                const prevIndex = remainedItems.findIndex(prev => prev.id === items[i].id);
                if(prevIndex === -1){
                    const nodeElement = createChild(items[i], childOptions);
                    parentElement.insertBefore(nodeElement, nextNode);
                    const unmount = mountChild(nodeElement, items[i], childOptions);
                    unMounts.set(items[i].id, unmount);
                    nextNode = nodeElement;
                }else{
                    const node = parentElement.children[prevIndex];
                    parentElement.insertBefore(node, nextNode);
                    updateChild(node, items[i], childOptions);
                    nextNode = node;
                }
            }

            lastItems = items;
        }
    }
}

export const Children = {
    template,
    create,
    makeChildren
};