import React from 'react';
import SearchBar from './Components/SearchBar';
import './App.css';

function App() {
  const onSubmit = (value) => {
    console.log('onSubmit fired', value)
  }

  return (
    <div className="App">
      <SearchBar onSubmit={onSubmit} />
    </div>
  );
}

export default App;
