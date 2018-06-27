import React, { Component } from 'react';
import { PollsView } from './PollsView';
import { Nav } from './Nav';
export class App extends Component {
  render = () => {
    return (
      <div>
        <Nav />
        <PollsView />
      </div>
    );
  }
}