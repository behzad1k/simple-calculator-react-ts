import React from 'react';
import './App.css';
import Calculator from './Components/Calculator'
import {ToggleButton} from "./Components/ToggleButton";

function App() {
  return (
    <main className="App">
        <ToggleButton />
        <Calculator />
    </main>
  );
}

export default App;
