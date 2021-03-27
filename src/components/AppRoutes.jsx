import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GifView from "../view/GifView.jsx";
import GiphyGallery from "../view/GiphyGallery.jsx";

export default function AppRoutes() {

  return (
    <Router>
      <Switch>
        <Route exact path="/view/:id" component={GifView} />
        <Route exact path="/" component={GiphyGallery} />
      </Switch>
    </Router>
  );

}
