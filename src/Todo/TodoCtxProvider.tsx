import * as React from "react";

export type OneTodo = {
    id: string;
    text: string;
    title: string;
    date: number;
}

export type Updater = (todo: OneTodo) => OneTodo;

export type TodoCtx = {
    todos: OneTodo[];
    setTodos: (todos: OneTodo[]) => void;
    addBlankTodo: () => void;
    removeTodo: (todoId: string) => void;
    updateById: (todoId: string, updater: Updater) => void;
    saveAll: () => void;
}

export const todoCtx = React.createContext({} as TodoCtx);

const INIT_TODOS_FROM_LOCALSTORAGE = (() => {
    const str = localStorage.getItem('todos');
    if (str) {
        try {
            return JSON.parse(str);
        } catch (err) {
            return [];
        }
    } else {
        return [];
    }
})();


export function TodoCtxProvider(props: React.PropsWithChildren<{}>) {
    const [todos, setTodos] = React.useState(
        INIT_TODOS_FROM_LOCALSTORAGE as OneTodo[]
    );

    const addBlankTodo = () => {
        console.log('addBlankTodo');
        setTodos(todos.concat({
            id: Date.now().toString(),
            text: '',
            title: '',
            date: Date.now()
        }));
    }

    const updateById = (todoId: string, updater: Updater) => {
        const idx = todos.findIndex(todo => todo.id === todoId);
        const todo = todos[idx];
        // To Update 
        const newTodo = updater(todo);
        // Replace 
        const nextTodos = todos.slice();
        nextTodos.splice(idx, 1, newTodo);
        setTodos(nextTodos);
    }

    const removeTodo = (todoId: string) => {
        const targetIdx = todos.findIndex(todo => todo.id === todoId);
        const nextTodos = todos.slice();

        if (targetIdx !== -1) {
            nextTodos.splice(targetIdx, 1);
            setTodos(nextTodos);
        }
    }

    const saveAll = () => {
        const str = JSON.stringify(todos);
        localStorage.setItem('todos', str);
        alert('存储成功');
    }

    return (
        <todoCtx.Provider value={{
            todos, setTodos, addBlankTodo, removeTodo,

            updateById, saveAll
        }}>
            { props.children }
        </todoCtx.Provider>
    )
}
