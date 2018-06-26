import React, { Component } from 'react';
import { PollsView } from './PollsView';
import { Nav } from './Nav';
export class App extends Component {
  render = () => {
    return (
      <div>
        <Nav />
        <PollsView />
        <footer className='container text-center'>
        <h4>Developed by <a href="https://github.com/Teo03">Teo</a></h4>
      </footer>
      </div>
    );
  }
}