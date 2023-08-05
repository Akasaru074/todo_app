import React from "react"
import Header from "./Header";

function App() {

  const [todos, setTodos] = React.useState(JSON.parse(localStorage.getItem("todos")) || []);

  const [input, setInput] = React.useState("");

  const [darkMode, setDarkMode] = React.useState(JSON.parse(localStorage.getItem("darkMode")) || false);

  const [renameState, setRenameState] = React.useState({hidden: true, id: undefined, value: ""});

  React.useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [todos, darkMode])

  function handleInputChange (e) {
    setInput(e.target.value);
  }

  function toggleDarkMode () {
    setDarkMode(prevMode => !prevMode);
  }

  function handleCheckboxChange (e) {
    if([...e.target.classList].includes("notClickable")) return;
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
        done: false,
        dropdownHidden: true,
      }
    ]);
  }

  function clearDoneTodos () {
    setTodos(prevTodos => {
      return prevTodos.filter(i => i.done === false);
    });
  }

  function toggleDropdown (e) {
    setTodos(prevTodos => {
      let newTodos = [...prevTodos];
      let index = +e.target.dataset.num;
      for(let i = 0; i < newTodos.length; i++) {
        if (i === index) continue;
        newTodos[i].dropdownHidden = true;
      }
      newTodos[index].dropdownHidden = !newTodos[index].dropdownHidden;
      return newTodos;
    })
  }

  function closeAllDropdowns (e) {
    if ([...e.target.classList].includes("notClickable") || (todos.filter(todo=>todo.dropdownHidden === false)).length === 0) return;
    setTodos(prevTodos => {
      let newArr = [...prevTodos];
      newArr.forEach(todo => todo.dropdownHidden = true);
      return newArr;
    });
  }

  function deleteTodo (e) {
    setTodos(prevTodos => prevTodos.filter((todo, i) => i !== (+e.target.dataset.num)));
  }

  function renameTodo (e) {
    setTodos(prevTodos => {
      let newArr = [...prevTodos];
      newArr[e.target.dataset.num].dropdownHidden = true;
      return newArr;
    });

    setRenameState({
      hidden: false,
      id: e.target.dataset.num,
      value: ""
    });
  }

  function closeRenameWindow () {
    setRenameState({
      hidden: true,
      id: undefined,
      value: ""
    });
  }

  function setNewTodoName () {
    // Change todo's name to new
    if (renameState.value.trim() === "") return;
    setTodos(prevTodos => {
      let newArr = [...prevTodos];
      newArr[renameState.id].text = renameState.value;
      return newArr;
    });
    
    closeRenameWindow();
  }

  const todoElements = todos.map((todo, l) => {
    return (
      <div key={l} id="todos" data-num={l} className={todos[l].done ? "done" : ""} onClick={handleCheckboxChange}>
        <input type="checkbox" data-num={l} checked={todos[l].done} readOnly={true} />
        <label data-num={l}>{todo.text}</label>
        <button className="dropdown_button notClickable" data-num={l} onClick={toggleDropdown}></button>
        <div className={"dropdown_menu notClickable" + (todos[l].dropdownHidden ? " hidden" : "")} data-num={l}>
          <div className="dropdown_option notClickable" data-num={l} onClick={deleteTodo}>Delete</div>
          <div className="dropdown_option notClickable" data-num={l} onClick={renameTodo}>Rename</div>
        </div>
      </div>
    )
  });



  return (
    <div className="App" id={darkMode ? "dark" : ""} onClick={closeAllDropdowns}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className={"rename_popup" + (renameState.hidden ? " hidden" : "")}>
        <div className="rename_window">
          <div className="rename_window_container">
            <input className="rename_field" placeholder="New name" value={renameState.value} onChange={e=>{setRenameState(prevState => ({...prevState, value: e.target.value}))}} />
            <input type="button" className="cancel-button" value="Cancel" onClick={closeRenameWindow} />
            <input type="button" className="confirm-button" value="Confirm" onClick={setNewTodoName} />
          </div>
        </div>

        <div className="bg_blur"></div>
      </div>

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