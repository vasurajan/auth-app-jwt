import React, { createContext, useContext } from 'react';

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
    nestedTodos: Todo[];
};

type TodoContextValue = {
    todos: Todo[];
};

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const todos: Todo[] = [];

    const value: TodoContextValue = {
        todos
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
