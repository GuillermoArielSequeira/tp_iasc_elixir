import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import CreateTodoList from './pages/CreateTodoList';
import ShowTodoLists from './pages/ShowTodoLists';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <CreateTodoList />
        </Route>
        <Route exact path="/about">
          <ShowTodoLists />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
