import React, { Component } from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import RegionView from './views/RegionView';
import TrackingView from './views/TrackingView';
import CountryView from './views/CountryView';

class App extends Component {
  render() {
    return (
      <div className="App padding-vert-large padding-horiz-large">
        <h1 className="margin-bottom-medium">React Countries</h1>
        <div className="padding-vert-large padding-horiz-large">
          <Switch>
            <Route exact path="/" component={RegionView} />
            <Route exact path="/:region" component={RegionView} />
            <Route exact path="/countries/:country" component={CountryView} />
            <Route exact path="/tracking/countries" component={TrackingView} />
            <Route render={ () => ( <Redirect to="/" />) } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
