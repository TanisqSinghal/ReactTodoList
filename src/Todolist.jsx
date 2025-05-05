import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Todolist.css";
export default function Todolist() {
  let [todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo === "") {
      alert("Please enter a task to do");
    } else {
      // setTodos([...todos, { task: newTodo, id: uuidv4() }]);
      setTodos((prevTodos) => {
        return [...prevTodos, { task: newTodo, id: uuidv4() }];
      });

      setNewTodo("");
    }
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  }

  let upperCaseAll = () => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return { ...todo, task: todo.task.toUpperCase() };
      });
    });
  }

  let upperCase = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: todo.task.toUpperCase() };
        } else {
          return todo;
        }
      });
    });
  }

  let marksAsDone = (id) => {
    //give a method , when click on button , task came with a line-through
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: true };
        } else {
          return todo;
        }
      });
    })
  }

  return (
    <div>
      <input
      className="TodoInput"
        type="text"
        placeholder="Add a Task to do"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <button style={{ marginLeft: "20px" }} onClick={addNewTask}>
        Add
      </button>
      <button style={{marginLeft : "20px"}} onClick={upperCaseAll}>UpperCase All</button>
      <br />
      <br />
      <br />
      <br />
      <hr />

      <h4>Tasks To do</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={{textDecoration: todo.isDone ? "line-through" : "none"}}>{todo.task}</span>
            <button style={{marginLeft : "20px"}} onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button style={{marginLeft : "20px"}} onClick={() => upperCase(todo.id)}>UpperCase</button>
            <button style={{marginLeft : "20px"}} onClick={() => marksAsDone(todo.id)} >Mark As Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
