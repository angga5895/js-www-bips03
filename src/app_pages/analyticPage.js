import React from 'react';
import { AppFrameAction } from '../appframe.js';
import { AppFrame, AppFrameProvider, AppModal } from "../appframe";
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
import FillHeaderTab from "../tabheaderfill";
import AnalyticChart from './analyticChart.js';
import $ from 'jquery';
window.$ = window.jQuery = $;


const stockSource = [{ stockName: 'chart1', srcData: 'msft.json', dataAlias: 'CHART 1' },
{ stockName: 'chart2', srcData: 'csco.json', dataAlias: 'CHART 2' },
{ stockName: 'chart3', srcData: 'ibm.json', dataAlias: 'CHART 3' },
{ stockName: 'chart4', srcData: 'orcl.json', dataAlias: 'CHART 4' }];

// default view analytic stock chart  
class AnalyticPage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tabLabel: true,
            indexChart: 0,
            colMd: 6
        }
    }

    //inisiasi active tab
    componentDidMount() {
        $('#tabStockchart1').addClass('active');
        $('#chartBoxchart1').css('border-color', '#a09c9c');
    }

    // set tab aktif ketika action klik tab
    setTabChart = (tabId, e) => {
        let tabActive = '#tabStock' + tabId;

        $('.tabVi').removeClass('active');
        $(tabActive).addClass('active');

        if (this.state.tabLabel) {
            // set warna border pada saat view grid

            let chartBox = '#chartBox' + tabId;
            $('.card-chart').css('border-color', '');
            $(chartBox).css('border-color', '#a09c9c');
        } else {

            // tampilkan chart yang "hidden" pada mode view tab
            let tabChartActive = '#tabChartV' + tabId;
            $('.tbchart').hide();
            $(tabChartActive).show();
        }
    }

    // action untuk beralih mode view (grid, tab)
    changeView = () => {
        this.setState({ tabLabel: !this.state.tabLabel });

        let selectedId = $('.col-sm-3.click-pointer.d-border-right.text-center.tabVi.active').attr('id');
        let tabIds = selectedId.substring(8);
        let tabSelected = '#tabChartV' + tabIds;
        let chartBoxs = '#chartBox' + tabIds;

        if (this.state.tabLabel) {

            // tampilkan tab chart dimana tipe stok sesuai dengan aktiv tab (tab view)
            $('#tabChartView').show();
            $('#gridChartView').hide();

            $('.tbchart').hide();
            $(tabSelected).show();
        } else {

            // tampilkan grid chart dimana tipe stok sesuai dengan aktiv tab (grid view)
            $('#tabChartView').hide();
            $('#gridChartView').show();

            $('.card-chart').css('border-color', '');
            $(chartBoxs).css('border-color', '#a09c9c');

        }
    }

    expandView = (chartIndex) => {
        let chartContainerId = '';
        let chartView = [];
        stockSource.map((charx, index) => {
            if (chartIndex != charx.stockName) {
                chartView.push('#chartContent' + charx.stockName);
            }
        })
        chartContainerId = chartView.join(",");

        if (this.state.colMd == 6) {
            this.setState({ colMd: 12 });
            $(chartContainerId).hide();
        } else {
            this.setState({ colMd: 6 });
            $(chartContainerId).show();
        }
    }

    render() {
        let labelName = this.state.tabLabel ? "Tab View" : "Grid View";

        let classChart = (this.state.tabView) ? 'tab-chart bg-dark-grey' : 'card-chart bg-dark-grey';

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

        let tabChart = (
            <div className="row col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                    <div className="cssmenu">
                        <ul>
                            {stockSource.map((charx, index) => {
                                return (
                                    <li key={index.stockName} onClick={(e) => this.setTabChart(charx.stockName, e)} id={"tabStock" + charx.stockName} class="col-sm-3 click-pointer d-border-right text-center tabVi">
                                        <a>
                                            <span class="f-12">&nbsp;{charx.dataAlias}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                    <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={this.changeView.bind(this)}>{labelName}</button>
                </div>
            </div>
        );

        let gridChartView = (
            <div className="bg-black-trading" id="gridChartView">
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            {stockSource.map((charx, index) => {
                                return (
                                    <div className={"col-md-" + this.state.colMd + " px-1 py-2"} id={"chartContent" + charx.stockName}>
                                        <div className={"d-border-inactive card " + classChart} style={boxScroll} id={"chartBox" + charx.stockName}>
                                            <i onClick={(e) => this.expandView(charx.stockName, e)} className="icon-icon-fullscreen-in pull-right" style={btnExpPost} data-toggle="tooltip" data-placement="left" title="Expand this chart"></i>
                                            <AnalyticChart tabView={false} key={index.stockName} charVal={charx.stockName} chartData={charx.srcData} chartAlias={charx.dataAlias} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div >
        );

        let tabChartwidth = {
            width: 'auto'
        }

        let tabChartHeight = {
            height: '100%'
        }

        let tabChartView = (
            <div id="tabChartView">
                {stockSource.map((charx, index) => {
                    return (
                        <div className="card card-75 tbchart" id={"tabChartV" + charx.stockName} hidden>
                            <div style={tabChartHeight}>
                                <AnalyticChart tabView={true} key={index.stockName + index} charVal={charx.stockName + index} chartData={charx.srcData} chartAlias={charx.dataAlias} chartGridClass='chart-views' />
                            </div>
                        </div>
                    );
                })}
            </div>
        );

        return (
            <div>
                {tabChart}
                {tabChartView}

                {gridChartView}
            </div>);
    }
}

export default AnalyticPage;
