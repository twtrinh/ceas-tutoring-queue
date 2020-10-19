import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import RequestForm from "./pages/RequestForm";
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/form">
            <RequestForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
