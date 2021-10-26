import React, { useState, useEffect } from 'react'

export default function App()
{
  const [ value, setValue ] = useState("");
  const [ todos, setTodos ] = useState([]);

  useEffect(function()
  {

    const request = new XMLHttpRequest();

    request.open("GET", "http://localhost:8000/gettodo");
    request.send();

    request.addEventListener("load", function()
    {
      if(request.status === 200)
      {
        setTodos( JSON.parse(request.responseText) );
      }
      else
      {
        console.log("something went wrong")
      }
    })

  }, []);
        
  function onChange(event)
  {
    setValue(event.target.value);
  }

  function saveTodos()
  {
    const request = new XMLHttpRequest();

    request.open("POST", "http://localhost:8000/save");
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify({ text: value }));

    request.addEventListener("load", function()
    {
      if(request.status === 200)
      {
        setTodos([...todos, { text : value}]);
        setValue("");

      }
      else
      {
        console.log("something went wrong")
      }
    })

  }

  return (
    <div>
      <input 
        onChange={onChange} 
        value={value} 
        type="text" 
        placeholder="enter something"
      />
      <button onClick={saveTodos}>Submit</button>
      <ul>
        {
          todos.map(function(todo, index)
          {
            return <li key={index}>{todo.text}</li>
          })
        }
      </ul>
    </div>
  )
}
