import React, { Component } from 'react';
import { Polls } from './Polls.js';
import { Nav } from './Nav';

export class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Polls />
      </div>
    );
  }
}