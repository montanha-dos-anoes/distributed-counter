import { useEffect, useState } from 'react';
import reactLogo from './assets/logo-senhor-aneis.png';

import './App.css';
import CounterService from './services/counter.service';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCounter();
  }, []); // oninit

  const increment = async () => {
    await new CounterService().incrementCounter();
    await getCounter();
  };

  const getCounter = async () => {
    const counter = await new CounterService().getCounter();
    console.log('chamou!!', counter);
    setCount(counter.value);
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
