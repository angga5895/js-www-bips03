import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import { AppFrameAction } from '../appframe.js';
import StreamChart from './streamChart.js';
import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import {BIPSAppProvider} from "../AppData";
import FillHeaderTab from "../tabheaderfill";
import { NetAppProvider, WSConnection} from './../appnetwork.js';
import {WSConnectionAction} from "./../appnetwork";
import {Table as TableBS, Button} from "react-bootstrap";
import Select from "react-select";
import ModalBuy from "./../app_modals/modal_buy";
import ModalSell from "./../app_modals/modal_sell";
import {
    ColumnChooser,
    DragDropProvider,
    Grid, SearchPanel,
    Table,
    TableColumnReordering,
    TableColumnResizing, TableColumnVisibility, TableHeaderRow, Toolbar
} from "@devexpress/dx-react-grid-bootstrap4";
import {IntegratedFiltering, IntegratedSorting, SearchState, SortingState} from "@devexpress/dx-react-grid";
import {Plugin, Template, TemplatePlaceholder} from "@devexpress/dx-react-core";
import AmendArrow from "./../img/amend-arrow.svg";

const stateOptions = [
    //untuk top active
    { key: 'value', value: 'value', text: 'by value' },
    { key: 'volume', value: 'volume', text: 'by volume' },
    { key: 'frequency', value: 'frequency', text: 'by frequency' },
    //untuk top gainer dan top looser --> tambahkan value
    { key: 'percentage', value: 'percentage', text: 'by percentage' },
];


const CustomFrameHeaderMarketStatistik= (props) =>{
    return (
        <AppFrameProvider
            initialClasses={{
                MarketStatistikPage,
                StatisticMarketStatistikPage,
                IndiceMarketStatistikPage,
                TopBrokerMarketStatistikPage,
                NewResearchMarketStatistikPage
            }}
            initialFrames={
                [
                    {className: 'MarketStatistikPage', title: 'SUMMARY PAGE', instanceName: 'marketStatistikPage'},
                    {className: 'IndiceMarketStatistikPage', title: 'INDICES PAGE', instanceName: 'indiceMarketStatistikPage'},
                    {className: 'StatisticMarketStatistikPage', title: 'STATISTIC PAGE', instanceName: 'statisticMarketStatistikPage'},
                    {className: 'TopBrokerMarketStatistikPage', title: 'TOP BROKER PAGE', instanceName: 'topBrokerMarketStatistikPage'},
                    {className: 'NewResearchMarketStatistikPage', title: 'NEW & RESEARCH PAGE', instanceName: 'newResearchMarketStatistikPage'},
                ]
            }>
            {/*<BIPSAppProvider>*/}
            <WSConnectionAction />
            <div className="col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 pb-1 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab linkTitles={
                        {
                            marketStatistikPage: 'SUMMARY',
                            indiceMarketStatistikPage: 'INDICES',
                            statisticMarketStatistikPage: 'STATISTIC',
                            topBrokerMarketStatistikPage: 'TOP BROKER',
                            newResearchMarketStatistikPage: 'NEWS & RESEARCH',
                        }
                    }/>
                </div>
            </div>
            <AppFrame headerComponent={MarketStatistikFrameHeader}/>
            <AppModal/>
            {/*</BIPSAppProvider>*/}
        </AppFrameProvider>
    );
}

const MarketStatistikFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

class MarketStatistik extends React.PureComponent {
    //hanya memanggil headernya saja
    render () {
        return (
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

class MarketStatistikPage extends React.PureComponent {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    constructor(props) {
        super(props);

    }

    state = {
        top: "topactive"
    }

    render () {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                {/*<div className="card card-tab-trading bg-black-trading f-12">
                    <div className="card-header bg-grey">

                        <div className="col-sm-12 px-0 mx-0 row">
                            <div className="col-mbl-radio px-0 mx-0 row">
                                <ul className="ul-radio col-sm-12 px-0 mx-0 row">
                                    <li className="li-radio col-radio px-0 mx-0" onClick={
                                        (e) => {
                                            this.setState({
                                                top : "topactive"
                                            })
                                        }
                                    }>
                                        <input type="radio" id="ta-options" name="top" checked={this.state.top == "topactive" ? true : false}/>
                                        <label htmlFor="ta-options" className="no-wrap">Top Active</label>

                                        <div className="check"></div>
                                    </li>

                                    <li className="li-radio col-radio px-0 mx-0" onClick={
                                        (e) => {
                                            this.setState({
                                                top : "topgainers"
                                            })
                                        }
                                    }>
                                        <input type="radio" id="tg-options" name="top" checked={this.state.top == "topgainers" ? true : false}/>
                                        <label htmlFor="tg-options" className="no-wrap">Top Gainers</label>

                                        <div className="check"></div>
                                    </li>

                                    <li className="li-radio col-radio px-0 mx-0" onClick={
                                        (e) => {
                                            this.setState({
                                                top : "toploosers"
                                            })
                                        }
                                    }>
                                        <input type="radio" id="tl-options" name="top" checked={this.state.top == "toploosers" ? true : false}/>
                                        <label htmlFor="tl-options" className="no-wrap">Top Loosers</label>

                                        <div className="check"></div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-mbl-radio-o px-0 mx-0">
                                <div className="col-sm-12 row mx-0 px-0">
                                    <div className="col-sm-3 mx-0 px-0 title-radio">
                                        <SelectChoose/>
                                    </div>
                                    <div className="col-sm-9 mx-0 px-0 title-radio text-right">
                                        <Button size="sm" className="bg-grey text-white col-sm-6 p-2 button-border-grey">
                                            <i className="fa fa-plus"></i> Add Finnancial Column
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body scrollable">
                        <TableBS responsive borderless size="sm" className="text-center align-middle align-self-center">
                            <thead className="text-white t-border-bottom">
                            <tr>
                                <th>#</th>
                                <th>Code</th>
                                <th>Prev.</th>
                                <th>Lost</th>
                                <th></th>
                                <th colSpan="2">Change (%)</th>
                                <th>Open</th>
                                <th>Low</th>
                                <th>High</th>
                                <th>Avg.</th>
                                <th>T.Vol(B)</th>
                                <th>T.Vol</th>
                                <th>Freq</th>
                                <th>F.Buy</th>
                                <th>F.Sell</th>
                                <th>F.Net</th>
                                <th colSpan="2" className="text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-white text-center no-wrap">
                            <tr>
                                <td>1</td>
                                <td className="text-primary">TLKM</td>
                                <td className="text-right text-warning">4,000</td>
                                <td className="text-right text-danger">7,400</td>
                                <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                <td className="text-right text-danger">-20</td>
                                <td className="text-right text-danger">-0.35</td>
                                <td className="text-right text-success">4,200</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-center"><Button size="sm" color="danger" className="col-sm-12" onClick={this.buttonClickBuy}>Buy</Button></td>
                                <td className="text-center"><Button size="sm" color="success" className="col-sm-12" onClick={this.buttonClickSell}>Sell</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td className="text-primary">BBCA</td>
                                <td className="text-right text-warning">4,000</td>
                                <td className="text-right text-danger">7,400</td>
                                <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                <td className="text-right text-danger">-20</td>
                                <td className="text-right text-danger">-0.35</td>
                                <td className="text-right text-success">4,200</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-center"><Button size="sm" color="danger" className="col-sm-12" onClick={this.buttonClickBuy}>Buy</Button></td>
                                <td className="text-center"><Button size="sm" color="success" className="col-sm-12" onClick={this.buttonClickSell}>Sell</Button></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td className="text-primary">BMRI</td>
                                <td className="text-right text-warning">4,000</td>
                                <td className="text-right text-danger">7,400</td>
                                <td className="text-warning text-right"><i className="fa fa-circle"></i></td>
                                <td className="text-right text-warning">0</td>
                                <td className="text-right text-warning">0</td>
                                <td className="text-right text-success">4,200</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-warning">3,100</td>
                                <td className="text-right text-warning">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-center"><Button size="sm" color="danger" className="col-sm-12" onClick={this.buttonClickBuy}>Buy</Button></td>
                                <td className="text-center"><Button size="sm" color="success" className="col-sm-12" onClick={this.buttonClickSell}>Sell</Button></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td className="text-primary">AALI</td>
                                <td className="text-right text-warning">4,000</td>
                                <td className="text-right text-danger">7,400</td>
                                <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                <td className="text-right text-success">20</td>
                                <td className="text-right text-success">0.35</td>
                                <td className="text-right text-success">4,200</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-center"><Button size="sm" color="danger" className="col-sm-12" onClick={this.buttonClickBuy}>Buy</Button></td>
                                <td className="text-center"><Button size="sm" color="success" className="col-sm-12" onClick={this.buttonClickSell}>Sell</Button></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td className="text-primary">WSKT</td>
                                <td className="text-right text-warning">5,200</td>
                                <td className="text-right text-danger">3,200</td>
                                <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                <td className="text-right text-success">12</td>
                                <td className="text-right text-success">0.35</td>
                                <td className="text-right text-success">4,200</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right text-danger">3,100</td>
                                <td className="text-right text-success">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-right">3,100</td>
                                <td className="text-center"><Button size="sm" color="danger" className="col-sm-12" onClick={this.buttonClickBuy}>Buy</Button></td>
                                <td className="text-center"><Button size="sm" color="success" className="col-sm-12" onClick={this.buttonClickSell}>Sell</Button></td>
                            </tr>
                            </tbody>
                        </TableBS>
                    </div>
                </div>*/}
                <MarketStatistikGrid typegrid="summary" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
            </>
        );
    }
}

class IndiceMarketStatistikPage extends React.PureComponent{
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickBuy = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: BuyModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickSell = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: SellModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />

                <div className="card card-320 bg-black-trading f-12">
                    <MarketIndicesGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                </div>

                <div className="card card-295 bg-black-trading f-12">
                    <MarketStatistikGrid typegrid="indices" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                </div>
            </>
        );
    }
}

class StatisticMarketStatistikPage extends React.PureComponent {
    render(){
        return(
            <>
                <style>{'' +
                'thead.t-statistic th {' +
                '    border-bottom: 0.7px solid var(--warna-d-border)!important' +
                '}' +
                'tbody.tb-statistic tr td, ' +
                'tfoot.tb-statistic tr th {' +
                '    padding-top: 10px;' +
                '    padding-bottom: 10px;' +
                '}' +
                ''}
                </style>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="px-1 mx-0 col-sm-12 row f-12">
                    <div className="col-sm-7 px-1 py-2 d-border-table-right">
                        <div className="card card-600 bg-black-trading">
                            <div className="card-header py-3">
                                <div className="col-sm-12 mb-4 row">
                                    <div className="col-sm-3 text-white f-25">6,384.90</div>
                                    <div className="col-sm-4 text-success f-16">+5.21 (0.082%) <i className="icofont icofont-caret-up"></i></div>
                                </div>
                                <div className="col-sm-12 f-14">
                                    Jun 2, 16:15 GMT +7 Disclaimer
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="col-sm-12">
                                    <div className="card card-475 text-white bg-trading-gray">
                                        <StreamChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-5 px-1 py-2 d-border-table-left">
                        <div className="card card-600 bg-black-trading text-white">
                            <div className="card-body px-3">
                                <TableBS responsive borderless size="sm" className="text-center align-self-center align-middle">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th>BOARD</th>
                                        <th>VALUE(T)</th>
                                        <th>LOT(M)</th>
                                        <th>FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap tb-statistic">
                                    <tr>
                                        <td className="text-center">Reguler</td>
                                        <td className="text-right">6.35</td>
                                        <td className="text-right">100.3</td>
                                        <td className="text-right">403,040 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">Negotiated</td>
                                        <td className="text-right">2.64</td>
                                        <td className="text-right">55.41</td>
                                        <td className="text-right">870 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">Cash</td>
                                        <td className="text-right">0</td>
                                        <td className="text-right">0</td>
                                        <td className="text-right">0 </td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="tb-statistic">
                                    <tr>
                                        <th className="text-primary text-center">TOTAL</th>
                                        <th className="text-primary text-right">8.99</th>
                                        <th className="text-primary text-right">156.15</th>
                                        <th className="text-primary text-right">403,914 </th>
                                    </tr>
                                    </tfoot>
                                </TableBS>
                                <div className="bg-grey-0 text-center py-4"><a className="text-white text-underline">FOREIGN ACTIVITY</a></div>
                                <TableBS responsive borderless size="sm" className="text-center align-self-center align-middle">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th>FOREIGN</th>
                                        <th>VALUE</th>
                                        <th>LOT</th>
                                        <th>FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap tb-statistic">
                                    <tr>
                                        <td className="text-center">F.Buy</td>
                                        <td className="text-danger text-right">2.29 T</td>
                                        <td className="text-danger text-right">11.68 M</td>
                                        <td className="text-danger text-right">63,578 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">F.Sell</td>
                                        <td className="text-success text-right">3.02 T</td>
                                        <td className="text-success text-right">11.44 M</td>
                                        <td className="text-success text-right">84,982 </td>
                                    </tr>
                                    </tbody>
                                    <tfoot className="tb-statistic">
                                    <tr>
                                        <th className="text-center text-white">F.TOTAL</th>
                                        <th className="text-right text-primary">5.31 T</th>
                                        <th className="text-right text-primary">23.13 M</th>
                                        <th className="text-right text-primary">148,560 </th>
                                    </tr>
                                    <tr className="tb-statistic">
                                        <th className="text-center text-white">F.NET</th>
                                        <th className="text-right text-primary">-731.36 B</th>
                                        <th className="text-right text-primary">241,671</th>
                                        <th className="text-right text-primary">-21,404 </th>
                                    </tr>
                                    </tfoot>
                                </TableBS>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class TopBrokerMarketStatistikPage extends React.PureComponent {
    render(){
        return(
            <div className="f-12 px-3">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="card card-215 bg-black-trading f-12">
                    <TobBrokerGrid/>
                </div>
                <div className="card card-200 bg-black-trading f-12">
                    <TobBrokerBGrid/>
                </div>
                <div className="card card-180 bg-black-trading f-12">
                    <TobBrokerSGrid/>
                </div>
            </div>
        );
    }
}

class NewResearchMarketStatistikPage extends React.PureComponent {
    render(){
        return(
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction"></AppFrameAction>
                <main>
                    <div className="container-fluid">
                        <div className="container px-1 mx-0 col-sm-12 row">
                            {/* General */}
                            <div className="col-md-6 px-1 py-2">
                                <div className="bg-black-inactive card card-trading">
                                    <div className="f-16 px-4 py-4">General News</div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Research */}
                            <div className="col-md-6 px-1 py-2">
                                <div className="bg-black-inactive card card-trading">
                                    <div className="f-16 px-4 py-4">Research</div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stock News */}
                            <div className="col-md-6 px-1 py-2">
                                <div className="bg-black-inactive card card-trading">
                                    <div className="f-16 px-4 py-4">Stock News</div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mutual Fund News*/}
                            <div className="col-md-6 px-1 py-2">
                                <div className="bg-black-inactive card card-trading">
                                    <div className="f-16 px-4 py-4">Mutual Fund News</div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 row px-4 py-4 mx-0 my-0">
                                        <div className="col-sm-2">
                                            <img src={AmendArrow} alt="amend-arrow" width="100%" height="auto"/>
                                        </div>
                                        <div className="col-sm-10">
                                            <div className="f-14 text-underline">TOP LOSER : Saham Matahari Department Store Anjlok 22,01%</div>
                                            <div className="f-12">Berdasarkan data Bursa Efek Indonesia (BEI),...</div>
                                            <div className="f-12 text-muted py-1">ANTARA.com - 24 minutes ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

const option = [
    { value: 'choose', label: 'Choose' },
];

class SelectChoose extends React.Component {
    selectStyleNight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#181717',
            neutral20 : '#565252',
            neutral30 : '#565252',
            neutral40 : '#cccccc',
            neutral80 : '#FFFFFF',
            primary75 : '#FFFFFF',
            primary50 : '#4D4D4E',
            primary25 : '#4D4D4E',
            primary : '#0363A7',
        },
    });

    selectStyleLight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#E7E7E7',
            neutral20 : '#9A9A9A',
            neutral30 : '#9A9A9A',
            neutral40 : '#767676',
            neutral80 : '#888888',
            primary75 : '#888888',
            primary50 : '#F3F3F3',
            primary25 : '#F3F3F3',
            primary : '#0363A7',
        },
    });

    render() {
        return (
            <div className="col-md-12 bg-black-grey px-0 text-center text-white">
                <Select
                    className="f-12"
                    defaultValue={option[0]}
                    label="Single select"
                    options={option}
                    theme={this.selectStyleNight}
                />
            </div>
        );
    }
}

class BuyModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <ModalBuy/>
            </>
        );
    }
}

class SellModal extends React.Component  {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <ModalSell/>
            </>
        );
    }
}

class MarketStatistikGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "no", title: "#"},
                { name: "code", title: "Code"},
                { name: "prev", title: "Prev."},
                { name: "last", title: "Last" },
                { name: "change", title: "Change" },
                { name: "persen", title: "/%" },
                { name: "open", title: "Open" },
                { name: "low", title: "Low" },
                { name: "high", title: "High" },
                { name: "avg", title: "Avg." },
                { name: "val", title: "Val(Bn)" },
                { name: "vol", title: "Vol" },
                { name: "freq", title: "Freq" },
                { name: "fbuy", title: "F.Buy" },
                { name: "fsell", title: "F.Sell" },
                { name: "fnet", title: "F.Net" },
                { name: "financial", title: "Financial" },
                { name: "action", title: "Action" },
            ],
            rows: [
                {
                    no : 1,
                    code : "TLKM",
                    prev : "4,010",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "-0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 2,
                    code : "AALI",
                    prev : "29,550",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 3,
                    code : "BBCA",
                    prev : "7,950",
                    last : <div>27,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-circle f-11'></i></div>,
                    change : "0",
                    persen : "0",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 4,
                    code : "WSKT",
                    prev : "4,330",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 5,
                    code : "BBRI",
                    prev : "1,980",
                    last : <div>27,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-circle f-11'></i></div>,
                    change : "0",
                    persen : "0",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 6,
                    code : "WIKA",
                    prev : "2,240",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 7,
                    code : "ASRI",
                    prev : "2,350",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                { no : 8,
                    code : "PPTP",
                    prev : "1,160",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 9,
                    code : "BMRI",
                    prev : "346",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                { no : 10,
                    code : "CTRA",
                    prev : "1,075",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "-0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 11,
                    code : "TLKM",
                    prev : "4,010",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "-0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 12,
                    code : "AALI",
                    prev : "29,550",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 13,
                    code : "BBCA",
                    prev : "7,950",
                    last : <div>27,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-circle f-11'></i></div>,
                    change : "0",
                    persen : "0",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 14,
                    code : "WSKT",
                    prev : "4,330",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 15,
                    code : "BBRI",
                    prev : "1,980",
                    last : <div>27,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-circle f-11'></i></div>,
                    change : "0",
                    persen : "0",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 16,
                    code : "WIKA",
                    prev : "2,240",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 17,
                    code : "ASRI",
                    prev : "2,350",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                { no : 18,
                    code : "PPTP",
                    prev : "1,160",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 19,
                    code : "BMRI",
                    prev : "346",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                { no : 20,
                    code : "CTRA",
                    prev : "1,075",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "-0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 21,
                    code : "TLKM",
                    prev : "4,010",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "-0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 22,
                    code : "AALI",
                    prev : "29,550",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 23,
                    code : "BBCA",
                    prev : "7,950",
                    last : <div>27,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-circle f-11'></i></div>,
                    change : "0",
                    persen : "0",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 24,
                    code : "WSKT",
                    prev : "4,330",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 25,
                    code : "BBRI",
                    prev : "1,980",
                    last : <div>27,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='fa fa-circle f-11'></i></div>,
                    change : "0",
                    persen : "0",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 26,
                    code : "WIKA",
                    prev : "2,240",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 27,
                    code : "ASRI",
                    prev : "2,350",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                { no : 28,
                    code : "PPTP",
                    prev : "1,160",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                {
                    no : 29,
                    code : "BMRI",
                    prev : "346",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-up'></i></div>,
                    change : "+720",
                    persen : "+1.27",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
                { no : 30,
                    code : "CTRA",
                    prev : "1,075",
                    last : <div>7,400 &nbsp;&nbsp;&nbsp;&nbsp;<i className='icofont icofont-caret-down'></i></div>,
                    change : "-20",
                    persen : "-0.35",
                    open : "4,200",
                    low : "3,100",
                    high : "3,100",
                    avg : "3,100",
                    val : "3,100",
                    vol : "3,100",
                    freq : "3,100",
                    fbuy : "3,100",
                    fsell : "3,100",
                    fnet : "3,100",
                    financial : "3,000,000,000,000",
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>
                },
            ],
            defaultColumnWidths: [
                { columnName: 'no', align:'center', width: 70},
                { columnName: 'code', align:'center', width: 70},
                { columnName: 'prev', align:'right', width: 70},
                { columnName: 'last', align:'right', width: 70},
                { columnName: 'change', align:'right', width: 70},
                { columnName: 'persen', align:'right', width: 70},
                { columnName: 'open', align:'right', width: 70},
                { columnName: 'low', align:'right', width: 70},
                { columnName: 'high', align:'right', width: 70},
                { columnName: 'avg', align:'right', width: 70},
                { columnName: 'val', align:'right', width: 70},
                { columnName: 'vol', align:'right', width: 70},
                { columnName: 'freq', align:'right', width: 70},
                { columnName: 'fbuy', align:'right', width: 70},
                { columnName: 'fsell', align:'right', width: 70},
                { columnName: 'fnet', align:'right', width: 70},
                { columnName: 'financial', align:'right', width: 70},
                { columnName: 'action', align:'center', width: 70},
            ],
            defaultHiddenColumnNames: ['financial'],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={this.props.typegrid == 'summary' ? "bg-grey pt-2 pb-3 f-12" : "bg-black-trading py-0 px-2 f-12"}
            />
        );

        const ColvisContainer = ({ ...restProps }) => (
            <ColumnChooser.Container
                {...restProps}
                className="bg-grey-mystic f-12"
            />
        );

        const ColvisItem = ({ ...restProps }) => (
            <ColumnChooser.Item
                {...restProps}
                className="bg-grey-mystic text-white f-12"
            />
        );

        const ColvisButton = ({ ...restProps }) => (
            <ColumnChooser.ToggleButton
                {...restProps}
                className="bg-grey-mystic text-white f-12"
                style={{height:'35px'}}
            />
        );

        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={this.props.typegrid == 'summary' ? "scroll-tbody-tab bg-black-trading table-borderless table-responsive scrollable px-5 f-12" : "scroll-tbody-220 bg-black-trading table-borderless table-responsive scrollable px-2 f-12"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={this.props.typegrid == 'summary' ? "bg-black-trading f-12" : "bg-black-trading f-12 indices-statistic"}
            />
        );

        const CodeCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12 text-primary"}>
                {value}
            </Table.Cell>
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = ({ column, value, style, ...restProps }) => {
            //compare
            var prev, open, low, high, avg = 0.0;

            //global color
            if (column.name == 'code') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-primary"}>{value}</Table.Cell>;
            }
            else if (column.name == 'prev') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-warning "}>{value}</Table.Cell>;
            }
            else if (column.name == 'no' || column.name == 'freq' || column.name == 'fbuy' || column.name == 'fsell' || column.name == 'fnet') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-white"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12"}>{value}</Table.Cell>;
            }
        };

        const TableRow = ({ row, ...restProps }) => {

            return(
                <Table.Row
                    {...restProps}
                    // eslint-disable-next-line no-alert
                    className={row.change.includes('+') ? "text-success" :
                        row.change.includes('-') ? "text-danger" : "text-warning"}
                />
            )
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames } = this.state;
        return (
            <>
                <style>{'' +
                'thead.indices-statistic th {' +
                '    border-bottom: 0!important;' +
                '    background-color: var(--warna-bg-trading-gray) !important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'no', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} rowComponent={TableRow} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['no', 'code', 'prev', 'last', 'change', 'persen', 'open', 'low', 'high', 'avg', 'val', 'vol', 'freq', 'fbuy', 'fsell', 'fnet', 'financial', 'action']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarMarketStatistik headertype={this.props.typegrid}/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarMarketStatistik extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        top: "topactive"
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className={this.props.headertype == 'summary'? "f-14 px-0 mx-0 py-4 col-sm-12" : "f-14 px-0 mx-0 py-0 col-sm-12"}>
                        <div className={this.props.headertype == 'summary'? "row col-sm-12 px-0 mx-0 py-4" : "row col-sm-12 px-0 mx-0 py-0"}>
                            <div className="col-mbl-radio px-0 mx-0 row align-self-center">
                                {
                                    this.props.headertype == 'summary' ?
                                        <ul className="ul-radio col-sm-12 px-0 mx-0 row">
                                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                                (e) => {
                                                    this.setState({
                                                        top : "topactive"
                                                    })
                                                }
                                            }>
                                                <input type="radio" id="ta-options" name="top" checked={this.state.top == "topactive" ? true : false}/>
                                                <label htmlFor="ta-options" className="no-wrap">Top Active</label>

                                                <div className="check"></div>
                                            </li>

                                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                                (e) => {
                                                    this.setState({
                                                        top : "topgainers"
                                                    })
                                                }
                                            }>
                                                <input type="radio" id="tg-options" name="top" checked={this.state.top == "topgainers" ? true : false}/>
                                                <label htmlFor="tg-options" className="no-wrap">Top Gainers</label>

                                                <div className="check"></div>
                                            </li>

                                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                                (e) => {
                                                    this.setState({
                                                        top : "toploosers"
                                                    })
                                                }
                                            }>
                                                <input type="radio" id="tl-options" name="top" checked={this.state.top == "toploosers" ? true : false}/>
                                                <label htmlFor="tl-options" className="no-wrap">Top Loosers</label>

                                                <div className="check"></div>
                                            </li>
                                        </ul>
                                    :
                                        <div className="col-sm-5 px-0 mx-0 bg-gray-tradding text-center">
                                            <button className="btn btn-sm btn-primary col-sm-12 px-0 mx-0 text-center">FINANCE</button>
                                        </div>
                                }
                            </div>
                            <div className="col-mbl-radio-o px-0 mx-0 align-self-center">
                                {
                                    this.props.headertype == 'summary' ?

                                        <div className="col-sm-12 px-0 mx-0 my-3 row">
                                            <div className="col-sm-4">
                                                <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>
                                            </div>
                                            <div className="col-sm-8 row">
                                                <TemplatePlaceholder/>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-sm-12 px-0 mx-0 my-3 row">
                                            <TemplatePlaceholder/>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}


class MarketIndicesGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "sector", title: "Sector"},
                { name: "last", title: "Last"},
                { name: "change", title: "Change"},
                { name: "persen", title: "%" },
                { name: "prevclosed", title: "Prev. Closed" },
                { name: "open", title: "Open" },
                { name: "high", title: "High" },
                { name: "low", title: "Low" },
                { name: "volume", title: "Volume" },
                { name: "value", title: "Value" },
                { name: "fbuy", title: "F.Buy" },
                { name: "fsell", title: "F.Sell" },
                { name: "fnet", title: "F.Net" },
            ],
            rows: [
                {
                    sector : "AGRI",
                    last : "1,450,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "BASIC-IND",
                    last : "750,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "CONSUMER",
                    last : "750,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "FINANCE",
                    last : "750,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "INFRASTUCTUR",
                    last : "750,000",
                    change : "-10,137",
                    persen : "-2.10",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "MINING",
                    last : "750,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "MISC-IND",
                    last : "750,000",
                    change : "-10,137",
                    persen : "-2.10",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "PROPERTY",
                    last : "750,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "TRADE",
                    last : "750,000",
                    change : "12,137",
                    persen : "12",
                    prevclosed : "1,467.73",
                    open : "4.323",
                    high: "4,500",
                    low : "4,100",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
            ],
            defaultColumnWidths: [
                { columnName: 'sector', align:'center', width: 95},
                { columnName: 'last', align:'right', width: 95},
                { columnName: 'change', align:'right', width: 95},
                { columnName: 'persen', align:'right', width: 95},
                { columnName: 'prevclosed', align:'right', width: 95},
                { columnName: 'open', align:'right', width: 95},
                { columnName: 'high', align:'right', width: 95},
                { columnName: 'low', align:'right', width: 95},
                { columnName: 'volume', align:'right', width: 95},
                { columnName: 'value', align:'right', width: 95},
                { columnName: 'fbuy', align:'right', width: 95},
                { columnName: 'fsell', align:'right', width: 95},
                { columnName: 'fnet', align:'right', width: 95},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-black-trading py-0 px-2 f-12"}
            />
        );

        const ColvisContainer = ({ ...restProps }) => (
            <ColumnChooser.Container
                {...restProps}
                className="bg-grey-mystic f-12"
            />
        );

        const ColvisItem = ({ ...restProps }) => (
            <ColumnChooser.Item
                {...restProps}
                className="bg-grey-mystic text-white f-12"
            />
        );

        const ColvisButton = ({ ...restProps }) => (
            <ColumnChooser.ToggleButton
                {...restProps}
                className="bg-grey-mystic text-white f-12"
                style={{height:'35px'}}
            />
        );

        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody-245 bg-black-trading table-borderless table-responsive table-striped-odd scrollable px-2 f-12"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const CodeCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12 text-primary"}>
                {value}
            </Table.Cell>
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = ({ column, value, style, ...restProps }) => {
            //global color
            if (column.name == 'sector') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-primary"}>{value}</Table.Cell>;
            }
            else if (column.name == 'open') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-warning "}>{value}</Table.Cell>;
            }
            else if (column.name == 'value' || column.name == 'volume' || column.name == 'fbuy' || column.name == 'fsell' || column.name == 'fnet') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-white"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12"}>{value}</Table.Cell>;
            }
        };

        const TableRow = ({ row, ...restProps }) => {

            return(
                <Table.Row
                    {...restProps}
                    // eslint-disable-next-line no-alert
                    className={row.change.includes('-') ? "text-danger" : "text-success"}
                />
            )
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames } = this.state;
        return (
            <>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'sector', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} rowComponent={TableRow} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['sector', 'last', 'change', 'persen', 'prevclosed', 'open', 'high', 'low', 'volume', 'value', 'fbuy', 'fsell', 'fnet']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarMarketIndices />
                </Grid>
            </>
        );
    }
}

class CustomToolbarMarketIndices extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        top: "topactive"
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className={"f-14 px-0 mx-0 py-0 col-sm-12"}>
                        <div className={"row col-sm-12 px-0 mx-0 py-0"}>
                            <div className="col-mbl-radio px-0 mx-0 row align-self-center"></div>
                            <div className="col-mbl-radio-o px-0 mx-0 align-self-center">
                                <div className="col-sm-12 px-0 mx-0 my-3 row">
                                    <TemplatePlaceholder/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class TobBrokerGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "no", title: "#"},
                { name: "code", title: " "},
                { name: "company", title: "Company"},
                { name: "tval", title: "T. Val(B)"},
                { name: "bval", title: "B. Val(Bn)"},
                { name: "sval", title: "S. Val(Bn)" },
                { name: "tvol", title: "T. Vol(Mn)" },
                { name: "tfreq", title: "T. Freq" },
            ],
            rows: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 6,
                    code: "AK",
                    company: "UBS Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 7,
                    code: "YP",
                    company: "Mirae Asset Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 8,
                    code: "CC",
                    company: "Mandiri Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
            ],
            defaultColumnWidths: [
                { columnName: "no", align:'center', width: 10},
                { columnName: "code", align:'center', width: 200},
                { columnName: "company", align:'center', width: 250},
                { columnName: "tval", align:'right', width: 135},
                { columnName: "bval", align:'right', width: 135},
                { columnName: "sval", align:'right', width: 135},
                { columnName: "tvol", align:'right', width: 135},
                { columnName: "tfreq", align:'right', width: 135},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const ColvisContainer = ({ ...restProps }) => (
            <ColumnChooser.Container
                {...restProps}
                className="bg-grey-mystic f-12"
            />
        );

        const ColvisItem = ({ ...restProps }) => (
            <ColumnChooser.Item
                {...restProps}
                className="bg-grey-mystic text-white f-12"
            />
        );

        const ColvisButton = ({ ...restProps }) => (
            <ColumnChooser.ToggleButton
                {...restProps}
                className="bg-grey-mystic text-white f-12"
                style={{height:'35px'}}
            />
        );

        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody bg-black-trading table-borderless table-responsive scrollable"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = ({ column, value, style, ...restProps }) => {
            //compare
            var prev, open, low, high, avg = 0.0;

            //global color
            if (column.name == 'bval') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-danger"}>{value}</Table.Cell>;
            }
            else if (column.name == 'sval') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12"}>{value}</Table.Cell>;
            }
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'no', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={[ 'no','code','company','tval','bval','sval','tvol','tfreq' ]}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarTopBroker />
                </Grid>
            </>
        );
    }
}

class CustomToolbarTopBroker extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className={"f-14 px-0 mx-0 py-0 col-sm-12"}>
                        <div className={"row col-sm-12 px-0 mx-0 py-0"}>
                            <div className="col-mbl-radio px-0 mx-0 row align-self-center"></div>
                            <div className="col-mbl-radio-o px-0 mx-0 align-self-center">
                                <div className="col-sm-12 px-0 mx-0 my-3 row">
                                    <TemplatePlaceholder/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class TobBrokerBGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "no", title: "#"},
                { name: "code", title: " "},
                { name: "company", title: "Company"},
                { name: "tval", title: "T. Val(B)"},
                { name: "bval", title: "B. Val(Bn)"},
                { name: "tvol", title: "T. Vol(Mn)" },
                { name: "tfreq", title: "T. Freq" },
            ],
            rows: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    bval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    bval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
            ],
            defaultColumnWidths: [
                { columnName: "no", align:'center', width: 10},
                { columnName: "code", align:'center', width: 200},
                { columnName: "company", align:'center', width: 300},
                { columnName: "tval", align:'right', width: 160},
                { columnName: "bval", align:'right', width: 160},
                { columnName: "tvol", align:'right', width: 160},
                { columnName: "tfreq", align:'right', width: 160},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const ColvisContainer = ({ ...restProps }) => (
            <ColumnChooser.Container
                {...restProps}
                className="bg-grey-mystic f-12"
            />
        );

        const ColvisItem = ({ ...restProps }) => (
            <ColumnChooser.Item
                {...restProps}
                className="bg-grey-mystic text-white f-12"
            />
        );

        const ColvisButton = ({ ...restProps }) => (
            <ColumnChooser.ToggleButton
                {...restProps}
                className="bg-grey-mystic text-white f-12"
                style={{height:'35px'}}
            />
        );

        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody-120 bg-black-trading table-borderless table-responsive scrollable"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = ({ column, value, style, ...restProps }) => {
            //compare
            var prev, open, low, high, avg = 0.0;

            //global color
            if (column.name == 'bval') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-danger"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12"}>{value}</Table.Cell>;
            }
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'no', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={[ 'no','code','company','tval','bval','tvol','tfreq' ]}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarTopBrokerB />
                </Grid>
            </>
        );
    }
}

class CustomToolbarTopBrokerB extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className={"f-14 px-0 mx-0 py-0 col-sm-12"}>
                        <div className={"row col-sm-12 px-0 mx-0 py-0"}>
                            <div className="col-mbl-radio px-0 mx-0 row align-self-center">
                                Top Buyer
                            </div>
                            <div className="col-mbl-radio-o px-0 mx-0 align-self-center">
                                <div className="col-sm-12 px-0 mx-0 my-3 row">
                                    <TemplatePlaceholder/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class TobBrokerSGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "no", title: "#"},
                { name: "code", title: " "},
                { name: "company", title: "Company"},
                { name: "tval", title: "T. Val(B)"},
                { name: "sval", title: "S. Val(Bn)"},
                { name: "tvol", title: "T. Vol(Mn)" },
                { name: "tfreq", title: "T. Freq" },
            ],
            rows: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    sval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    sval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "61.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
            ],
            defaultColumnWidths: [
                { columnName: "no", align:'center', width: 10},
                { columnName: "code", align:'center', width: 200},
                { columnName: "company", align:'center', width: 300},
                { columnName: "tval", align:'right', width: 160},
                { columnName: "sval", align:'right', width: 160},
                { columnName: "tvol", align:'right', width: 160},
                { columnName: "tfreq", align:'right', width: 160},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const ColvisContainer = ({ ...restProps }) => (
            <ColumnChooser.Container
                {...restProps}
                className="bg-grey-mystic f-12"
            />
        );

        const ColvisItem = ({ ...restProps }) => (
            <ColumnChooser.Item
                {...restProps}
                className="bg-grey-mystic text-white f-12"
            />
        );

        const ColvisButton = ({ ...restProps }) => (
            <ColumnChooser.ToggleButton
                {...restProps}
                className="bg-grey-mystic text-white f-12"
                style={{height:'35px'}}
            />
        );

        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody-120 bg-black-trading table-borderless table-responsive scrollable"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading f-12"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = ({ column, value, style, ...restProps }) => {
            //compare
            var prev, open, low, high, avg = 0.0;

            //global color
            if (column.name == 'sval') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12"}>{value}</Table.Cell>;
            }
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'no', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={[ 'no','code','company','tval','sval','tvol','tfreq' ]}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarTopBrokerS />
                </Grid>
            </>
        );
    }
}

class CustomToolbarTopBrokerS extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className={"f-14 px-0 mx-0 py-0 col-sm-12"}>
                        <div className={"row col-sm-12 px-0 mx-0 py-0"}>
                            <div className="col-mbl-radio px-0 mx-0 row align-self-center">
                                Top Seller
                            </div>
                            <div className="col-mbl-radio-o px-0 mx-0 align-self-center">
                                <div className="col-sm-12 px-0 mx-0 my-3 row">
                                    <TemplatePlaceholder/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

export default MarketStatistikPage;
export {CustomFrameHeaderMarketStatistik, MarketStatistik};
