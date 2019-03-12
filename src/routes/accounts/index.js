import React from "react";
import {Route, Switch} from "react-router-dom";
import FullList from "./fullList";
import Suspends from "./suspends";
import Maintenance from "./maintenance";

const Accounts = ({match}) => (
  <Switch>
    <Route path={`${match.url}/fullList`} component={FullList}/>
    <Route path={`${match.url}/suspends`} component={Suspends}/>
    <Route path={`${match.url}/maintenance`} component={Maintenance}/>
  </Switch>
);

export default Accounts;