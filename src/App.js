import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
