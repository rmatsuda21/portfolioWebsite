import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Test from './component/test';
import Home from './component/home';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
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
