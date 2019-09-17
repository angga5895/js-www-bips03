import React from 'react';
import { AppFrameAction } from '../appframe.js';
import { AppFrame, AppFrameProvider, AppModal } from "../appframe";
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
import FillHeaderTab from "../tabheaderfill";
import AnalyticChart from './analyticChart.js';

// default view analytic stock chart  
class AnalyticPage extends React.PureComponent {

    render() {

        // const stockSource = ['aali', 'adhi', 'antm', 'asii'];
        const stockSource = [{ stockName: 'aali', srcData: 'msft.json', dataAlias: 'MSFT' },
        { stockName: 'adhi', srcData: 'csco.json', dataAlias: 'CSCO' },
        { stockName: 'antm', srcData: 'ibm.json', dataAlias: 'IBM' },
        { stockName: 'asii', srcData: 'orcl.json', dataAlias: 'ORCL' }];

        let boxChart = (
            <div className="container px-1 mx-0 col-sm-12 row">
                {stockSource.map((charx, index) => {
                    return <AnalyticChart key={index.stockName} charVal={charx.stockName} chartData={charx.srcData} chartAlias={charx.dataAlias} />
                })}
            </div>
        );

        return (<div className="bg-black-trading">
            <main>
                <div class="container-fluid">
                    {boxChart}
                </div>
            </main>
        </div>);
    }
}

export default AnalyticPage;
