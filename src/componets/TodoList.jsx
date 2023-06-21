import React, { useEffect } from "react";
import alert from "./alert";
import { Checkbox, Typography, Button, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TodoList({ todos, fetchTodos }) {
  const deleteTodo = (id) => {
    fetch(
      `https://todo-f1518-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(() => {
      fetchTodos();
      alert("Todo deleted successfully", "info");
    });
  };
  const updateToDo = (id, currState) => {
    fetch(
      `https://todo-f1518-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          isCompleted: !currState,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    ).then(() => {
      fetchTodos();
      alert("Todo updated successfully", "info");
    });
  };

  return (
    <div className="todos">
      {todos.length > 0 ? (
        <div className="todos-container">
          {todos.map((todo) => {
            return (
              <div
                key={todo.id}
                className={
                  todo.priority === "high"
                    ? "todo priority-high"
                    : todo.priority === "medium"
                    ? "todo priority-medium"
                    : todo.priority === "low"
                    ? "todo priority-low"
                    : "todo"
                }
              >
                <div className="todo-left">
                  <div className="todo-done">
                    <Checkbox
                      checked={todo.isCompleted}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                      onClick={() => updateToDo(todo.id, todo.isCompleted)}
                    />
                  </div>
                  <div className="todo-detail">
                    <Typography variant="h6" component="div">
                      {todo.title}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {todo.description}
                    </Typography>
                  </div>
                </div>
                <div className="todo-right">
                  <div className="todo-delete">
                    <IconButton onClick={() => deleteTodo(todo.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </div>
                </div>
                {/* <div>{todo.priority}</div>
                                    <div>{todo.dueDate}</div>
                                    <div>{todo.isCompleted}</div> */}
              </div>
            );
          })}
        </div>
      ) : (
        <div>No todos</div>
      )}
    </div>
  );
}

export default TodoList;
