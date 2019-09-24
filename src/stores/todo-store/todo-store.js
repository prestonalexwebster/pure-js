
export class TodoStore{

    todosCount = 0;

    state = {
        todoDraft: "",
        todos: []
    };

    addTodo(){
        this.state = {
            todoDraft: "",
            todos: [
                {id: this.todosCount++, text: this.state.todoDraft},
                ...this.state.todos
            ]
        };
    }

    setTodoDraft(draftText){
        this.state = {
            ...this.state,
            todoDraft: draftText
        };
    }

}