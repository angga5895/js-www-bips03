import React from 'react';
import { AppFrameAction } from '../appframe.js';

class PortfolioPage extends React.PureComponent {

  render () {
    return (
      <div>
        <AppFrameAction ref="frameAction" />
        <h1>PORTFOLIO LIST GOES HERE</h1>
      </div>
    );
  }
}

export default PortfolioPage;
