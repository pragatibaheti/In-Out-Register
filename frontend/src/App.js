import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogReg from './views/LogReg/LogReg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={["/", "/update","/reset"]}>
          <LogReg />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
