import React, { useContext, useState } from 'react';
import { useTodoContext, Todo } from '../hooks/TodoContext';
import { AuthContext } from '../hooks/AuthContext';
import './Dashboard.css';

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {

    const [nestedTodo, setNestedTodo] = useState('');

    const handleNestedTodoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nestedTodo.trim()) {
            todo.nestedTodos.push({
                id: new Date().getTime(),
                title: nestedTodo,
                completed: false,
                nestedTodos: []
            });
            setNestedTodo('');
        }
    };

    const handleTodoClick = () => {
        todo.completed = !todo.completed;
        console.log(todo.completed)
    };

    const handleNestedTodoClick = (nestedTodo: Todo) => {
        nestedTodo.completed = !nestedTodo.completed;
        setNestedTodo('');
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input type="checkbox" onChange={handleTodoClick} />
            <span>{todo.title}</span>
            <ul>
                {todo.nestedTodos.map((nestedTodo) => (
                    <div>
                        <input
                            type='checkbox'
                            key={nestedTodo.id}
                            className={`nested-todo ${nestedTodo.completed ? 'completed' : ''}`}
                            onClick={() => handleNestedTodoClick(nestedTodo)}
                        />
                        {nestedTodo.title}
                    </div>
                ))}
            </ul>
            <form onSubmit={handleNestedTodoSubmit}>
                <input
                    type="text"
                    value={nestedTodo}
                    onChange={(e) => setNestedTodo(e.target.value)}
                    className="todo-input"
                />
                <button type="submit" className="add-todo-button">Add Nested Todo</button>
            </form>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const { todos } = useTodoContext();
    const { logout } = useContext(AuthContext);
    const [newTodo, setNewTodo] = useState('');

    const handleTodoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodo.trim()) {
            todos.push({
                id: new Date().getTime(),
                title: newTodo,
                completed: false,
                nestedTodos: []
            });
            setNewTodo('');
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <form onSubmit={handleTodoSubmit}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className="todo-input"
                />
                <button type="submit" className="add-todo-button">Add Todo</button>
            </form>
            {todos.map((todo, i) => (
                <TodoItem key={i} todo={todo} />
            ))}
        </div>
    );
};

export default Dashboard;
