import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './hooks/AuthContext';
import { TodoProvider } from './hooks/TodoContext';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
