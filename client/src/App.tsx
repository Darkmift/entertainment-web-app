import Test from 'components/Test';
import { useState } from 'react';
import './App.scss';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <h1>Hi</h1>
            <Test />
        </div>
    );
}

export default App;
