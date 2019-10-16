import React from 'react';
import { AppFrameAction } from '../appframe.js';
import { AppFrame, AppFrameProvider, AppModal } from "../appframe";
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
import FillHeaderTab from "../tabheaderfill";
import AnalyticChart from './analyticChart.js';
import $ from 'jquery';
window.$ = window.jQuery = $;

// default view analytic stock chart  
class AnalyticPage_Base extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    state = {
        tabLabel: true,
        indexChart: 0,
        colMd: 6,
        expnView: false,
        stockSource: [
            { stockName: 'chart1', srcData: 'msft.json', dataAlias: 'CHART 1', expandView: false },
            { stockName: 'chart2', srcData: 'csco.json', dataAlias: 'CHART 2', expandView: false },
            { stockName: 'chart3', srcData: 'ibm.json', dataAlias: 'CHART 3', expandView: false },
            { stockName: 'chart4', srcData: 'orcl.json', dataAlias: 'CHART 4', expandView: false }
        ]
    }

    //inisiasi active tab

    expandView = (chartIndex) => {
        let chartContainerId = '';
        let chartView = [];

        // constructing chart id to be hidden
        this.state.stockSource.map((charx, index) => {
            if (chartIndex != charx.stockName) {
                chartView.push('#chartContent' + charx.stockName);
            }
        })
        chartContainerId = chartView.join(",");

        // change flag for view mode (expand/condense)
        const index = this.state.stockSource.findIndex(emp => emp.stockName === chartIndex);
        const updateStockSource = [...this.state.stockSource];
        updateStockSource[index].expandView = this.state.colMd == 6 ? true : false;

        if (this.state.colMd == 6) {
            this.setState({ stockSource: updateStockSource, colMd: 12, expnView: true });
            this.props.changeChartMode(true);
            $(chartContainerId).hide();
        } else {
            this.props.changeChartMode(false);
            this.setState({ stockSource: updateStockSource, colMd: 6, expnView: false });
            $(chartContainerId).show();
        }
    }

    render() {
        let classChart = (this.state.expnView) ? 'tab-chart bg-dark-grey' : 'card-chart bg-dark-grey';

        let boxScroll = {
            overflowX: 'hidden'
        }

        let btnExpPost = {
            position: 'absolute',
            zIndex: '999',
            cursor: 'pointer',
            background: '#696969',
            opacity: '0.5',
            right: 0,
            marginRight: '5px'
        }

        let gridChartView = (
            <div className="bg-black-trading" id="gridChartView">
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            {this.state.stockSource.map((charx, index) => {
                                return (
                                    <div className={"col-md-" + this.state.colMd + " px-1 py-2"} id={"chartContent" + charx.stockName}>
                                        <div className={"d-border-inactive card " + classChart} style={boxScroll} id={"chartBox" + charx.stockName}>
                                            <i onClick={() => this.expandView(charx.stockName)} className="icon-icon-fullscreen-in pull-right" style={btnExpPost} data-toggle="tooltip" data-placement="left" title="Expand/Condense chart"></i>
                                            <AnalyticChart viewMode={charx.expandView} key={index.stockName} charVal={charx.stockName} chartData={charx.srcData} chartAlias={charx.dataAlias} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div >
        );

        return (
            <div>
                {gridChartView}
            </div>);
    }
}

const AnalyticPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        changeChartMode: (chartMode) => { actions.sendAction('changeChartMode', { chartMode }) }
    }),
)(AnalyticPage_Base);

export default AnalyticPage;
