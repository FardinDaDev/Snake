import React from 'react';
import './App.css';
import SnakeBoard from './Board/SnakeBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <SnakeBoard></SnakeBoard>
    </div>
  );
}

export default App;
