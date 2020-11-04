import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Feed from "./Container/Feed/Feed";
import Dashboard  from "./Container/Dashboard/Dashboard";
import BeerDetails  from "./Container/BeerDetails/BeerDetails";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route  path="/" exact component={Dashboard} />
         <Route  exact path="/Feed" component={Feed}></Route> 
         <Route  exact path="/beer/:id" component={BeerDetails}></Route> 
        </Switch>
    </div>
  );
}

export default App;


