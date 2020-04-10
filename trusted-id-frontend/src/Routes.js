import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Landing from "./containers/Landing";

//need to add authenticated vs not authenticated

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/signup"> <Signup /></Route>
            <Route exact path="/landing"> <Landing /></Route>
            <Route> <NotFound /></Route>
        </Switch>
    )
}