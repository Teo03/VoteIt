import React, { Component } from 'react';
import { Polls } from './Polls.js';
import { Nav } from './Nav';
export class App extends Component {
  render() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <Nav />
        <Polls />
      </div>
    );
  }
}