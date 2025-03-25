import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const inputRef = useRef();

  const handleAddToDo = () => {
    const text = inputRef.current.value.trim();
    if (text === '') return;

    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const getFilteredTodos = () => {
    if (filter === 'completed') {
      return todos.filter(todo => todo.completed);
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.completed);
    }
    return todos;
  };

  return (
    <div className="App">
      <h2>To Do List</h2>

      {/* Filtres */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>Tous</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>À faire</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Terminés</button>
      </div>

      <div className='to-do-container'>
        <ul>
          {getFilteredTodos().map(({ text, completed }, index) => (
            <div className='item' key={index}>
              <li
                className={completed ? "done" : ""}
                onClick={() => handleItemDone(index)}
              >
                {text}
              </li>
              <span className='del' onClick={() => handleDeleteItem(index)}>❌</span>
            </div>
          ))}
        </ul>

        <input ref={inputRef} placeholder='Enter new task..' />
        <button onClick={handleAddToDo}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
