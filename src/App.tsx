import React, {useState} from 'react';
import './App.css';
import Calculator from './components/Calculator'
import ToggleButton from "./components/ToggleButton";

function App() {
    const [theme,setTheme] = useState("light");
    return (
    <main className={"App " + theme}>
        <ToggleButton theme={theme} setTheme={setTheme} />
        <Calculator />
    </main>
  );
}

export default App;
