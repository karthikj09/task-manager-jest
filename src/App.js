import React, { useState, useEffect } from 'react';
import { notification, Badge, Card, Button } from 'antd';
import lodash from 'lodash';
import { DeleteOutlined } from '@ant-design/icons';

import './App.css';

function App() {

  const [todos, setTodos] = useState(() => {
    //Accessing local
    const storedTodos = localStorage.getItem('todos');
    //check with ternary and set
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  
  // Set local for every data
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [inputVal, setInputVal] = useState('');

  const clearInputVal = () => {
    setInputVal('');
  };
  

  const addTodo = () => {
    if (inputVal === '') {
      notification.error({
        message: 'Error',
        description: 'Error in creating new todo',
      });
      clearInputVal();
    } else {
      const newTodo = {
        id: lodash.uniqueId('uniqueID-'),
        name: inputVal,
      };
      setTodos([...todos, newTodo]);
      clearInputVal();
      notification.success({
        message: 'Create Success',
        description: `Created todo named ${inputVal}`,
      });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    notification.success({
      message: 'Delete success',
      description: `Deleted todo with ID ${id}`,
    });
  };

  const [apiData, setApiData] = useState(null);
  async function fetchData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/10');
      const data = await response.json();
      setApiData(data);
  }

  return (
    <div className="App">
      <div>
        <h1>Todo List</h1>
        <input
          data-testid="input-box"
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div style={{ maxWidth: '500px', marginLeft: '35%', marginTop: '5%' }}>
        {todos.map((todo) => (
          <div key={todo.id} style={{ marginTop: '20px' }}>
            <Badge.Ribbon color="pink">
              <Card title="Pushes open the window" size="small">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {todo.name}
                  <Button
                    data-testid="deleteBtn"
                    type="primary"
                    icon={<DeleteOutlined />}
                    onClick={() => deleteTodo(todo.id)}
                  > Delete
                  </Button>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </div>
      <div className='apiCall'>
        <button onClick={()=>fetchData()}>Click</button>
        {apiData && <div data-testId="apicheck">Name : {apiData.name}<br></br> Email : {apiData.email}</div>}
      </div>
    </div>
  );
}

export default App;

