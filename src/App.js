import logo from './logo.svg';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Test from './component/test';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' render={() =>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          }/>
          <Route path='/test' component={Test}/>
          <Route path='/test1' render={() => <h1>TEST</h1>}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}
export default App;
