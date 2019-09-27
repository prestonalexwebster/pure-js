
export function createRef(name){
    return {
        template: `data-ref=${name}`,
        assing(nodeElement) {
            nodeElement.data['ref'] = name;
        },
        get(parentElement) {
            return parentElement.querySelector(`[date-ref]=${name}`);
        }
    }
}