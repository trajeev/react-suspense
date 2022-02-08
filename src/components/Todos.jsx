import React from "react";
import Todo from "./Todo";

export default function Todos({ todos, completeTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onComplete={() => completeTodo(todo.id)}
        />
      ))}
      {todos.length === 0 && <li>You're all done!</li>}
    </ul>
  );
}
