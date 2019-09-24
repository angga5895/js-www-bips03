import React from 'react';
import { AppFrameAction } from '../appframe.js';
import {WSConnectionAction} from "../appnetwork";
import ModalBuy from "./../app_modals/modal_buy";
import ModalSell from "./../app_modals/modal_sell";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import {
    ColumnChooser,
    DragDropProvider,
    Grid, SearchPanel,
    Table, TableBandHeader,
    TableColumnReordering,
    TableColumnResizing, TableColumnVisibility, TableHeaderRow, Toolbar
} from "@devexpress/dx-react-grid-bootstrap4";
import {IntegratedFiltering, IntegratedSorting, SearchState, SortingState} from "@devexpress/dx-react-grid";
import {AgGridReact} from "ag-grid-react";
import $ from 'jquery';
window.$ = window.jQuery = $;

class LiveTradePage extends React.PureComponent {
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
        value: "watchlist"
    }

    render () {
        return (
            <div>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 row">
                    <div className="col-mbl-radio px-0 mx-0 row">
                        <ul className="ul-radio col-sm-12 px-0 mx-0 row">

                            <li className="li-radio col-title-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "all"
                                    })
                                }
                            }>
                                <input type="radio" id="a-option" name="selector" checked={this.state.value == "all" ? true : false}/>
                                <label htmlFor="a-option">All</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "watchlist"
                                    })
                                }
                            }>
                                <input type="radio" id="f-option" name="selector" checked={this.state.value == "watchlist" ? true : false}/>
                                <label htmlFor="f-option">Watchlist</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "foreign"
                                    })
                                }
                            }>
                                <input type="radio" id="s-option" name="selector" checked={this.state.value == "foreign" ? true : false}/>
                                <label htmlFor="s-option">Foreign</label>

                                <div className="check"></div>
                            </li>

                            <li className="li-radio col-radio px-0 mx-0" onClick={
                                (e) => {
                                    this.setState({
                                        value : "tick"
                                    })
                                }
                            }>
                                <input type="radio" id="t-option" name="selector" checked={this.state.value == "tick" ? true : false}/>
                                <label htmlFor="t-option">Tick</label>

                                <div className="check"></div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-mbl-radio-o px-0 mx-0">
                        <div className="title-radio-right col-sm-12 pull-right text-right">
                            <button className="d-border mx-1 col-sm-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                            <button className="d-border mx-1 col-sm-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 row px-0 mx-0 row">
                    <div className="col-sm-7 px-2 mx-0">
                        <div className="bg-trading-gray card-592">
                            {/*<TableBS responsive borderless size="sm" className="text-center align-middle align-self-center f-12">
                                <thead className="text-white t-border-bottom-bold t-border-top-bold h-live-trade">
                                <tr>
                                    <th>Code</th>
                                    <th>Price</th>
                                    <th></th>
                                    <th colSpan="2">Change (%)</th>
                                    <th>T.Vol</th>
                                    <th colSpan="2">Buyer</th>
                                    <th colSpan="2">Seller</th>
                                    <th>Board</th>
                                </tr>
                                </thead>
                                <tbody className="text-white text-center t-live-trade">
                                <tr>
                                    <td>TLKM</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>BBCA</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>AALI</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>BBRI</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>WSKT</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>BBCA</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>TLKM</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>AALI</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>PTPP</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>BBCA</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>WKST</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>CCLA</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>WSKT</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>BBCA</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>TLKM</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>AALI</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>PTPP</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>BBCA</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>WKST</td>
                                    <td className="text-right">3,760</td>
                                    <td className="text-success text-right"><i className="icofont icofont-caret-up"></i></td>
                                    <td className="text-right text-success">50</td>
                                    <td className="text-right text-success">0.35</td>
                                    <td className="text-right text-success">326,000</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td className="text-warning">D</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                <tr>
                                    <td>AALI</td>
                                    <td className="text-right">2,000</td>
                                    <td className="text-danger text-right"><i className="icofont icofont-caret-down"></i></td>
                                    <td className="text-right text-danger">-20</td>
                                    <td className="text-right text-danger">-0.35</td>
                                    <td className="text-right text-danger">156,000</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td className="text-success">F</td>
                                    <td>DE</td>
                                    <td>RG</td>
                                </tr>
                                </tbody>
                            </TableBS>*/}
                            <LiveTradeAgGrid />
                        </div>
                    </div>
                    <div className="col-sm-5 px-2 mx-0 pb-3">
                        <TableInfoTransaction lotshare="infoLiveTradePage"/>
                    </div>
                </div>
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

class LiveTradeGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "time", title: "Time"},
                { name: "code", title: "Code"},
                { name: "price", title: "Price"},
                { name: "change", title: "Change" },
                { name: "percent", title: "%" },
                { name: "vol", title: "Vol"},
                { name: "buyer", title: "Buyer" },
                { name: "seller", title: "Seller" },
                { name: "board", title: "Board" },
            ],
            rows: [
                { time: "09:13:37",
                    code: "TLKM",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "AALI",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ASRI",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "PPTP",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BBCA",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "WSKT",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BBRI",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "CTRA",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ANTM",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ASII",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "PTSP",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "GGRM",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BYAN",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "INDF",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "RDTX",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "TCPI",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "SMMA",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "FASW",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "UNTR",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "UNVR",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
            ],
            defaultColumnWidths: [
                { columnName: "time", align:'center', width: 77},
                { columnName: "code", align:'center', width: 77},
                { columnName: "price", align:'right', width: 77},
                { columnName: "change", align:'right', width: 79},
                { columnName: "percent", align:'right', width: 77},
                { columnName: "vol", align:'right', width: 77},
                { columnName: "buyer", align:'center', width: 77},
                { columnName: "seller", align:'center', width: 77},
                { columnName: "board", align:'center', width: 77},
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
                className={"bg-grey f-12"}
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
                className={"bg-trading-gray table-borderless table-responsive"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-trading-gray f-12 h-live-trade"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"t-live-trade f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

            if(row.change.includes('-')){
                //global color3
                if (column.name == 'percent' || column.name == 'change'|| column.name == 'vol'|| column.name == 'price') {
                    return <Table.Cell
                        {...restProps}
                        className={"t-live-trade f-12 text-danger"}>{value}</Table.Cell>;
                } else if (column.name == 'buyer' || column.name == 'seller') {
                    var data = value.split("-");
                    return <Table.Cell
                        {...restProps}
                        className={"t-live-trade f-12"}>
                            <span className={data[0].includes('F') ? "text-success" : "text-warning"}>{data[0]}</span>
                            &nbsp;&nbsp;&nbsp;<span>{data[1]}</span>
                        </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"t-live-trade f-12"}>{value}</Table.Cell>;
                }
            } else{
                //global color
                if (column.name == 'percent' || column.name == 'change'|| column.name == 'vol'|| column.name == 'price') {
                    return <Table.Cell
                        {...restProps}
                        className={"t-live-trade f-12 text-success"}>{value}</Table.Cell>;
                } else if (column.name == 'buyer' || column.name == 'seller') {
                    var data = value.split("-");
                    return <Table.Cell
                        {...restProps}
                        className={"t-live-trade f-12"}>
                        <span className={data[0].includes('F') ? "text-success" : "text-warning"}>{data[0]}</span>
                        &nbsp;&nbsp;&nbsp;<span>{data[1]}</span>
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"t-live-trade f-12"}>{value}</Table.Cell>;
                }
            }

        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <style>{'' +
                '.t-live-trade{' +
                '    padding-top: 5px!important;' +
                '    padding-bottom: 5.5px!important;' +
                '}' +
                'thead.h-live-trade th {' +
                '    border-top: var(--warna-d-border-bold) solid 2px!important;' +
                '    background-color: var(--warna-bg-trading-gray) !important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'time', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['time', 'code', 'price', 'change', 'percent', 'vol', 'buyer', 'seller', 'board']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                </Grid>
            </>
        );
    }
}

class LiveTradeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "time", headerName: "Time", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 85,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 70,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 70,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    }},
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 85,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    }},
                { field: "percent", headerName: "%", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 60,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    } },
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 67,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    }},
                { field: "buyer", headerName: "Buyer", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 85,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        var buyer = params.data.buyer;
                        var sBuyer = buyer.split('-');

                        return sBuyer[0].includes('F') === true ? '<span class="text-success">'+sBuyer[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sBuyer[1] :
                            '<span class="text-warning">'+sBuyer[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sBuyer[1];
                    } },
                { field: "seller", headerName: "Seller", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 85,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        var seller = params.data.seller;
                        var sSeller = seller.split('-');

                        return sSeller[0].includes('F') === true ? '<span class="text-success">'+sSeller[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sSeller[1] :
                            '<span class="text-warning">'+sSeller[0]+'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+sSeller[1];
                    } },
                { field: "board", headerName: "Board", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 85,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function (params) {
                return 27.5;
            },
            rowData: [
                { time: "09:13:37",
                    code: "TLKM",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "AALI",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ASRI",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "PPTP",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BBCA",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "WSKT",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BBRI",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "CTRA",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ANTM",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "ASII",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "PTSP",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "D-DE",
                    seller: "D-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "GGRM",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "BYAN",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "INDF",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "RDTX",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "TCPI",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "SMMA",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "FASW",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "UNTR",
                    price: "3,879",
                    change: "+20",
                    percent: "+0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },
                { time: "09:13:37",
                    code: "UNVR",
                    price: "3,879",
                    change: "-20",
                    percent: "-0.5",
                    vol: "156,450",
                    buyer: "F-DE",
                    seller: "F-DE",
                    board: "RG" },],
            sideBar: {
                toolPanels: [
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: {
                            suppressRowGroups: true,
                            suppressValues: true,
                            suppressPivots: true,
                            suppressPivotMode: true,
                            suppressSideButtons: true,
                            suppressColumnFilter: true,
                            suppressColumnSelectAll: true,
                            suppressColumnExpandAll: true
                        },
                    }, {
                        id: "filters",
                        labelDefault: "Filters",
                        labelKey: "filters",
                        iconKey: "filter",
                        toolPanel: "agFiltersToolPanel"
                    }
                ],
                defaultToolPanel: ""
            },
        }
    }

    render() {
        return (
            <>
                <div
                    className="card-592 ag-theme-balham-dark ag-header-border-gray-live-trade"
                    style={{
                        width: 'auto' }}>
                    <span id="myLiveTrade">
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            defaultColDef={this.state.defaultColDef}
                            getRowHeight={this.state.getRowHeight}>
                        </AgGridReact>
                    </span>
                </div>
            </>
        );
    }
}

export default LiveTradePage;
