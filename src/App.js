import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import { LandingPage } from "./features/Landing_page/Landing_page.js"
import { SignIn } from "./features/Sign_in/Sign_in.js"
import { ClientOffice } from './features/ClientOffice/ClientOffice.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage />
            )}
          />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/ClientOffice" component={ClientOffice} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
