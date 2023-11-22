import Counter from "./components/Counter";
import SayHi from "./components/SayHi";
import {useState} from 'react';
import "./App.css"
function App() {
      const [count, setCount ] = useState(0);

return (
    <div>
     

      <div className="bg-red-400">
        <button
          onClick={() => setCount(count + 1)}>
          +
        </button>
        <p style={{fontSize: '30px', color: 'white'}}>{count}</p>
        <button>-</button>
      </div>
    </div>
  );}
export default App;
