
function getKey(name){
    return `@persistent-store-${name}`;
}

export class PersistentStore{

    constructor(name, initialState){
        this.key = getKey(name);
        if(localStorage.getItem(this.key) === null){
            localStorage.setItem(this.key, JSON.stringify(initialState));
            this.state = initialState;
        }else{
            this.state = JSON.parse(localStorage.getItem(this.key));
        }
        this.callbacks = new Set();
        this.syncRequestId = null;
    }

    triggerSync(){
        if(this.syncRequestId === null){
            this.syncRequestId = requestIdleCallback(() => {
                localStorage.setItem(this.key, JSON.stringify(this.state));
                this.syncRequestId = null;
            }, {timeout: 1000});
        }
    }

    setState(state){
        this.state = state;
        this.triggerSync();
        this.emit();
    }

    getState(){
        return this.state;
    }

    subscribe(callback){
        this.callbacks.add(callback);
    }

    emit(){
        for(const callback of this.callbacks){
            callback(this.state);
        }
    }

}