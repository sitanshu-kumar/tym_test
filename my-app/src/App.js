import React from 'react';
import Navbar from './Components/navbar'

import SurveyHomePage from './Components/surveyHomePage'
import { NotificationContainer } from "react-notifications";
import AssignedResult from './Components/lastPage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>

      <Navbar />
      <Router>
        <NotificationContainer />
        <Switch>
          <Route exact path="/" component={SurveyHomePage} />
          <Route path="/assigned" component={AssignedResult} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
