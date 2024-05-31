import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Form from "./components/Form";

function App() {
  return (
    <main className="outer-container">
       <div className="inner-container">
        <h1>Contact Us</h1>
        <Form/>
        </div>
      
    </main>
  );
}

export default App;
