import { useEffect, useState } from 'react';
import reactLogo from './assets/logo-senhor-aneis.png';

import { io } from 'socket.io-client';
import './App.css';
import CounterService from './services/counter.service';

export const socket = io('http://localhost:3333');

socket.on('connect', () => {
  console.log('conected');
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCounter();
    socket.on('counter-changed', () => {
      getCounter();
    });
  }, []); // oninit

  const increment = async () => {
    // await new CounterService().incrementCounter();
    socket.emit('increment');
    // await getCounter();
  };

  const getCounter = async () => {
    try {
      const counter = await new CounterService().getCounter();
      setCount(counter.value);
    } catch (error) {
      console.log('erro na request');
    }
  };

  return (
    <>
      <div>
        <img src={reactLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>Contador: {count}</h1>
      <div className="card">
        <button onClick={increment}>Incrementar</button>
      </div>
    </>
  );
}

export default App;

/**

PUT 
/counter

return 200
{
  data: null,
  message: "Deu bom"
}


GET
/counter

return 200
{
  data: {
    counter: 123,
    updated_at: "2023-03-01"
  },
  message: "Deu bom"
}

 
 */
