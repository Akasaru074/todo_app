import React from "react"
import Header from "./Header";

function App() {

  const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);

  const [input, setInput] = React.useState("");

  const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  React.useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [todos, darkMode])

  function handleInputChange (e) {
    setInput(e.target.value)
  }

  function toggleDarkMode () {
    setDarkMode(prevMode => !prevMode);
  }

  function handleCheckboxChange (e) {
    setTodos(prevTodos => {
      let newArr = prevTodos.map(e => e);
      newArr[e.target.dataset.num].done = !newArr[e.target.dataset.num].done;
      return newArr;
    })
  }

  function addTodo () {
    setInput("");
    if(input.trim() === "") return;
    setTodos(prevTodos => [
      ...prevTodos, {
        text: input,
        done: false
      }
    ]);
  }

  function clearDoneTodos () {
    setTodos(prevTodos => {
      return prevTodos.filter(i => i.done === false);
    });
  }

  const todoElements = todos.map((todo, l) => {
    return (
      <div key={l} id="todos" data-num={l} className={todos[l].done ? "done" : ""} onClick={handleCheckboxChange}>
        <input type="checkbox" data-num={l} checked={todos[l].done} readOnly={true} />
        <label data-num={l}>{todo.text}</label>
      </div>
    )
  });



  return (
    <div className="App" id={darkMode ? "dark" : ""}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className = "todo_add">
        <input type="text" placeholder="Type todo" className="input_field" onChange={handleInputChange} value={input} />
        <input type="button" value = "Add todo" className="todo_button" onClick={addTodo} />
        <input type="button" value = "Clear done todos" className="todo_button" onClick={clearDoneTodos} />
      </div>

      <div className="active_todos">
        <div className="todo_count">
          <h4>Current: {todos.filter(i => i.done === false).length}</h4>
          <h4>Done: {todos.filter(i => i.done === true).length}</h4>
        </div>
        <h2>Todos:</h2>
        {todoElements}
      </div>

    </div>
  );
}

export default App;