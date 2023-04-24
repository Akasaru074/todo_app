import React from "react"
import Header from "./Header";

function App() {

  const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);

  const [input, setInput] = React.useState("");

  React.useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  function handleInputChange (e) {
    setInput(e.target.value)
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
      <div id="todos" data-num={l} className={todos[l].done ? "done" : ""} onClick={handleCheckboxChange}>
        <input type="checkbox" data-num={l} checked={todos[l].done} readOnly={true} />
        <label data-num={l}>{todo.text}</label>
      </div>
    )
  });



  return (
    <div className="App">
      <Header />

      <div className = "todo_add">
        <input type = "text" placeholder="Type todo" className="input_field" onChange={handleInputChange} value={input} />
        <input type="button" value = "Add todo" className="todo_button" onClick={addTodo} />
        <input type="button" value = "Clear done todos" className="todo_button" onClick={clearDoneTodos} />
      </div>

      <div className="active_todos">
        <h2>Todos:</h2>
        {todoElements}
      </div>

    </div>
  );
}

export default App;
