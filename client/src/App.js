// App.js
//new 
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../src/components/LoginPage';
import ListComponent from '../src/components/ListPage';
import PrivateRoute from '../src/components/PrivateRoute';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/list" component={ListComponent} />
        <Redirect from="/" to="/login" />

      </Switch>
    </Router>
  );
}

export default App;
