import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import MainComponent from './components/MainComponent';

function App() {

  return (
    <div className="App">
      {/* <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">
            Ristorante Con Fusion
          </NavbarBrand>
        </div>
      </Navbar> */}
      <MainComponent />
    </div>
  );
}

export default App;
