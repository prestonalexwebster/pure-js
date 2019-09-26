
export const initialState = {
    activeTodoId: null,
    activeDraft: "",
    todoDraft: "",
    todos: []
};

export class TodoRepository {

    todosSequenceLength = 0;

    getState(){
        return this.store.getState();
    }

    setState(state){
        this.store.setState(state);
    }

    constructor(store){
        this.store = store;
        this.todosSequenceLength = this.getState().todos.reduce((maxId, todo) => Math.max(maxId, todo.id),1);
    }

    addTodo() {
        this.setState({
            ...this.getState(),
            todoDraft: "",
            todos: [
                {id: this.todosSequenceLength++, text: this.getState().todoDraft},
                ...this.getState().todos
            ]
        });
    }

    removeTodo(id) {
        this.setState({
            ...this.getState(),
            todos: this.getState().todos.filter(todo => todo.id !== id)
        });
    }

    setActiveTodo(id) {
        this.setState({
            ...this.getState(),
            activeDraft: this.getState().todos.find(todo => todo.id === id).text,
            activeTodoId: id
        });
    }

    applyActiveTodo() {
        const id = this.getState().activeTodoId;
        const text = this.getState().activeDraft;
        const todoExists = this.getState().todos.some(todo => todo.id === id);
        this.setState({
            ...this.getState(),
            todos: (todoExists
                ? this.getState().todos.map(todo => todo.id === id ? {id, text} : todo)
                : [{id, todo}, ...this.getState().todos]),
            activeDraft: "",
            activeTodoId: null
        });
    }


    setActiveToDoDraft(draftText){
        this.setState({
            ...this.getState(),
            activeDraft: draftText
        });
    }

    setTodoDraft(draftText) {
        this.setState({
            ...this.getState(),
            todoDraft: draftText
        });
    }

}