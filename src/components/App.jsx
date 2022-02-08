import React, { Suspense } from "react";
import useResource from "hooks/useResource";

import KeyValueStoreResource from "resources/KeyValueStoreResource";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import Todos from "./Todos";

const todosResource = new KeyValueStoreResource("todos");

const completeTodo = async (todoId) =>
  await todosResource.update((todos) =>
    todos.filter((todo) => todo.id !== todoId)
  );

function TodosList() {
  const todos = useResource(todosResource);
  return <Todos todos={todos} completeTodo={completeTodo} />;
}

export default function App() {
  return (
    <>
      <h1>
        Todo list with <code>&lt;Suspense /&gt;</code>
      </h1>
      <p>Someone else may be adding todo's...</p>
      <Suspense fallback={<div className="spinner" />}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <TodosList />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
