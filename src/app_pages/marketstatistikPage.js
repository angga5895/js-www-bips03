import React from 'react';
import { AppFrameAction } from '../appframe.js';
import StreamChart from './streamChart.js';

class MarketStatistikPage extends React.PureComponent {

    render() {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <StreamChart />
            </div>
        );
    }
}

export default MarketStatistikPage;
