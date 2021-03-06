import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Test from './component/test';
import Home from './component/home';
import TypingTest from './component/TypingTest';
import JLCC from './component/JLCC';

class App extends Component {
  render() {
    const App = () => (
      <div style={{height: '100vh'}}> 
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/jlcc' component={JLCC}/>
          <Route path='/test' component={Test}/>
          <Route path='/test1' render={() => <h1>TEST</h1>}/>
          <Route path='/typing' component={TypingTest}/>
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
