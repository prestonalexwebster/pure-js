
export const initialState = {
    activeTodoId: null,
    activeDraft: "",
    todoDraft: "",
    todos: []
};

export class TodoStore {

    todosSequenceLength = 0;

    constructor(state){
        this.state = state;
        this.todosSequenceLength = this.state.todos.reduce((maxId, todo) => Math.max(maxId, todo.id),1);
    }

    addTodo() {
        this.state = {
            ...this.state,
            todoDraft: "",
            todos: [
                {id: this.todosSequenceLength++, text: this.state.todoDraft},
                ...this.state.todos
            ]
        };
    }

    removeTodo(id) {
        this.state = {
            ...this.state,
            todos: this.state.todos.filter(todo => todo.id !== id)
        };
    }

    setActiveTodo(id) {
        this.state = {
            ...this.state,
            activeDraft: this.state.todos.find(todo => todo.id === id).text,
            activeTodoId: id
        }
    }

    applyActiveTodo() {
        const id = this.state.activeTodoId;
        const text = this.state.activeDraft;
        const todoExists = this.state.todos.some(todo => todo.id === id);
        this.state = {
            ...this.state,
            todos: (todoExists
                ? this.state.todos.map(todo => todo.id === id ? {id, text} : todo)
                : [{id, todo}, ...this.state.todos]),
            activeDraft: "",
            activeTodoId: null
        }
    }


    setActiveToDoDraft(draftText){
        this.state = {
            ...this.state,
            activeDraft: draftText
        }
    }

    setTodoDraft(draftText) {
        this.state = {
            ...this.state,
            todoDraft: draftText
        };
    }

}