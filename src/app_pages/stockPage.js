import React from 'react';
import Select from 'react-select';
/*import {Button, Table, InputGroupText, Input,
    DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown,
    CustomInput, InputGroup, InputGroupAddon, FormGroup, Form, TabContent, TabPane } from "reactstrap";*/
import {AppFrame, AppFrameAction, AppFrameProvider, AppModal} from "../appframe";
import {Dropdown, Input} from 'semantic-ui-react';
import {Table as TableBS} from 'react-bootstrap';


import {BIPSAppProvider, BIPSAppContext } from "../AppData";
import FillHeaderTab from "../tabheaderfill";
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import { ContextConnector } from '../appcontext.js';

import ModalBuy from "./../app_modals/modal_buy";
import ModalSell from "./../app_modals/modal_sell";
import MenuOfContent from "./../menuofcontent";
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
import {Plugin, Template, TemplatePlaceholder} from "@devexpress/dx-react-core";
/*import FormAmend from "./app_transaction/form_amend";
import FormSell from "./app_transaction/form_sell";*/
import FormBuy from "./../app_transaction/form_buy";
import FormSell from "../app_transaction/form_sell";
import StockChart from "./stockChart";

//datepicker
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';
import $ from 'jquery';
import {AgGridReact} from "ag-grid-react";
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');
require('../bootstrap-3.3.7/bootstrap-datepicker.standalone.min.css');
require('../../node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');


const CustomFrameHeaderStock = (props) => {
    return (
        <AppFrameProvider
            initialClasses={{ StockWatchlist, StockHistoryPage, StockPage}}
            initialFrames={
                [
                    {className: 'StockPage', title: 'STOCK PAGES', instanceName: 'stockPage'},
                    {className: 'StockWatchlist', title: 'STOCK WATCHLIST PAGE', instanceName: 'stockWatchlistPage'},
                    {className: 'StockHistoryPage', title: 'STOCK HISTORY PAGE', instanceName: 'stockHistoryPage'},
                ]
            }
            initActions={[
                ['switchPage', {instanceName: 'stockWatchlistPage'}],
            ]}
        >
            {/* <BIPSAppProvider> */}
            <WSConnectionAction />
            <div className="col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab linkTitles={
                        {
                            stockPage : 'STOCK INFO',
                            stockWatchlistPage: 'STOCK WATCHLIST',
                            stockHistoryPage: 'STOCK TRADE HISTORY'
                        }
                    } />
                </div>
            </div>
            <AppFrame headerComponent={StockFrameHeader}/>
            <AppModal/>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const StockFrameHeader = (props) => {
    return (
        <></>
    );
}

class Stock extends React.PureComponent {
    //hanya memanggil headernya saja
    render () {
        return (
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

const StockInfo = (props) => {
    return(
        <AppFrameProvider
            initialClasses={{TableStockInfo, TableProfil, TableCorpAction}}
            initialFrames={
                [
                    {className: 'TableStockInfo', title: 'STOCK INFO', instanceName: 'stockInfoTable'},
                    {className: 'TableProfil', title: 'PROFIL', instanceName: 'profilTable'},
                    {className: 'TableCorpAction', title: 'CORP ACTION', instanceName: 'corpActionTable'},
                ]
            }>
            {/*<BIPSAppProvider>*/}
            <WSConnectionAction />
            <div className="row col-sm-12 px-0 mx-0 pt-1">
                <div className="col-sm-12 px-2">
                    <MenuOfContent linkTitles={
                        {
                            stockInfoTable : 'STOCK INFO',
                            profilTable : 'PROFIL',
                            corpActionTable : 'CORP ACTION'
                        }
                    } />
                </div>
                <div className="col-sm-12 px-2">
                    <AppFrame headerComponent={StockInfoFrameHeader}/>
                </div>
            </div>
            {/*</BIPSAppProvider>*/}
        </AppFrameProvider>
    );
}

class TableStockInfo extends React.PureComponent{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <TableBS responsive size="sm" className="text-white my-2 d-border-table bg-dark-grey" borderless>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Listed</td>
                        <td className="py-1 text-primary d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">IPO</td>
                        <td className="py-1 text-primary d-border-tr-gray">1,550</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Tradeable</td>
                        <td className="py-1 text-primary d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Base</td>
                        <td className="py-1 text-primary d-border-tr-gray">1,230</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Fg Avail</td>
                        <td className="py-1 text-primary d-border-tr-gray">19,246,883</td>
                        <td className="py-1 bg-gray-tradding">Board</td>
                        <td className="py-1 text-primary d-border-tr-gray">Main</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Mkt. Capital(M)</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">24.299T</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Corp. Action</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">No Corporation Action</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding d-border-tr-black">Marginable</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">Marginable and Shirt Selling</td>
                    </tr>
                    <tr>
                        <td className="py-1 bg-gray-tradding">Sub Sector</td>
                        <td className="py-1 text-primary d-border-tr-gray text-right" colSpan="3">Plantation</td>
                    </tr>
                    </tbody>
                </TableBS>
            </>
        );
    }
}

class TableProfil extends React.PureComponent{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <TableBS responsive size="sm" className="text-white my-2" borderless>
                    <thead></thead>
                    <tbody>
                        <tr className="py-3"><td>Corporate Governance</td></tr>
                        <tr className="py-3">
                            <td>
                                PT Astra Agro Lestari Tbk’s ISS Governance Quality
                                Score as of N/A is N/A. The pillar scores are Audit: N/A; Board: N/A;
                                Shareholder Rights: N/A; Compensation: N/A.
                            </td>
                        </tr>
                        <tr className="py-3">
                            <td>
                                Corporate governance scores courtesy of Institutional Shareholder Services (ISS). 
                                Scores indicate decile rank relative to index or region. A decile score of 1 indicates
                                lower governance risk, while a 10 indicates higher governance risk.
                            </td>
                        </tr>
                    </tbody>
                </TableBS>
            </>
        );
    }
}

class TableCorpAction extends React.PureComponent{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <main>
                    <div className="container px-0 mx-0 col-sm-12">
                        <div className="bg-black-inactive card card-small">
                            <CorpActionAgGrid />
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

const StockInfoFrameHeader = (props) => {
    return (
        <></>
    );
}

class StockPage extends React.PureComponent {
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

    render () {
        return (
            <div className="bg-black-trading card card-75">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component*/}
                <main>
                    <div className="container-fluid f-12">
                        <div className="py-2">
                            <div className="px-1 mx-0 my-2 col-sm-12 row">
                                <div className="col-sm-2 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-2 px-0 mx-0">Code</label>
                                    <Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>
                                    <div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-6 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                    <label className="col-sm-3 f-13 f-xs-14 align-middle align-self-center px-2 text-left">
                                        Last <span className="text-danger">12,650</span>
                                    </label>
                                    <label className="col-sm-3 text-danger f-13 f-xs-14 align-middle align-self-center px-0 text-left">
                                        <i className="oi oi-caret-bottom"></i>
                                        -175 (-1.36%)
                                    </label>
                                </div>
                                <div className="col-sm-4 align-self-center mx-0 px-0">
                                    <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-success" onClick={this.buttonClickSell}><span>Sell</span></button>
                                    <button className="d-border mx-1 pull-right col-sm-5 col-md-3 btn btn-danger" onClick={this.buttonClickBuy}><span>Buy</span></button>
                                </div>
                            </div>
                            {/*<div className="px-1 mx-0 my-2 col-sm-12 row">
                                <div className="col-sm-2 pl-0">
                                    <div className="col-sm-2 px-0 mx-0">
                                        <Input label={{ color: 'bg-gold', content: '90%' }} defaultValue='AALI'
                                               labelPosition='right' placeholder='Code' size='small' className="w-input"/>
                                    </div>
                                </div>
                            </div>*/}
                            <div className="px-1 mx-0 col-sm-12 row">
                                <div className="col-md-7 px-1 py-2">
                                    <div className="card card-grafik bg-trading-gray">
                                        <StockChart/>
                                    </div>
                                    <StockInfo/>
                                </div>
                                <div className="col-md-5 px-1 py-2">
                                    <TableInfoTransaction lotshare="stockInfoBuy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

class StockHistoryPage extends React.PureComponent {

    componentDidMount() {
        $(document).ready(function() {
            var sd = new Date(), ed = new Date();
            var isRtl = $('html').attr('dir') === 'rtl';
            $('.input-daterange').datepicker({
                orientation: isRtl ? 'auto right' : 'auto left',
                format: "dd/mm/yyyy",
                changeMonth: true,
                changeYear: true,
                startDate: '01/01/1920',
                autoclose: true,
                endDate : sd,
                todayHighlight: true,
                todayBtn: "linked",
            });
        });

        $("#btn-clear-date").click(function () {
            $(".date-clear").datepicker("clearDates");
        })
    }

    render () {
        return (
            <div className="bg-black-trading">
                <AppFrameAction ref="frameAction" />
                <main>
                    <div className="container-fluid f-12">
                        <div className="py-2">
                            <div className="px-1 mx-0 my-2 col-sm-12 row">
                                <div className="col-sm-2 px-0 mx-0 row">
                                    <label className="align-self-center col-sm-2 px-0 mx-0">Code</label>
                                    <Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-8 text-center align-self-center"/>
                                    <div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>
                                    {/*<Input defaultValue='Arga Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-3 align-self-center"/>*/}
                                </div>
                                <div className="col-sm-6 row mx-0 px-0 align-self-center">
                                    <label className="col-sm-12 f-13 f-xs-14 align-middle align-self-center pr-0">
                                        Astra Argo Lestari Tbk.
                                    </label>
                                </div>
                            </div>

                            <div className="px-2 mx-0 mt-3 col-sm-12 mb-3 row">
                                <div className="col-sm-4 px-0 mx-0">
                                    <div className="input-group input-daterange">
                                        <span className="input-group-addon">Start</span>
                                        <input placeholder="dd/mm/yyyy" id="startDate1" name="startDate1" type="text" className="form-control date-clear" readOnly="readonly" />
                                        <span className="input-group-addon">
                                            <span className="fa fa-calendar-alt"></span>
                                        </span>
                                        <span className="input-group-addon">to</span>
                                        <input placeholder="dd/mm/yyyy" id="endDate1" name="endDate1" type="text" className="form-control date-clear" readOnly="readonly" />
                                        <span className="input-group-addon">
                                            <span className="fa fa-calendar-alt"></span>
                                        </span>
                                        <span id="btn-clear-date" className="input-group-addon bg-gold click-pointer hover-gold">
                                            <span className="ion ion-ios-close"></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-sm-8 px-2 mx-0 align-self-center">
                                    <TableBS borderless responsive size="sm" className="bg-black-trading mb-0">
                                        <thead></thead>
                                        <tbody className="t-border-top t-border-bottom">
                                        <tr>
                                            <td>
                                                Last <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                Change(%) &nbsp;
                                                <span className="text-danger">
                                                    <i className="icofont icofont-caret-down"></i> 3,870
                                                </span>
                                            </td>
                                            <td>
                                                High <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                Low <span className="text-danger"> 3,870</span>
                                            </td>
                                            <td>
                                                T.Vol <span className="text-danger"> 156</span>
                                            </td>
                                            <td>
                                                Value(Tn) <span className="text-danger"> 156,000</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </TableBS>
                                </div>
                            </div>

                            <div className="px-1 mx-0 col-sm-12 row">
                                <div className="col-sm-8 px-1 py-2">
                                    <div className="bg-trading-gray">
                                        <HistoryBrokerAgGrid/>
                                    </div>
                                </div>

                                <div className="col-sm-4 px-1 py-2">
                                    <div className="bg-trading-gray mb-3">
                                        <HistoryPriceAgGrid/>
                                    </div>
                                    <div className="bg-trading-gray mb-3">
                                        <HistoryBuyerAgGrid/>
                                    </div>
                                    <div className="bg-trading-gray mb-3">
                                        <HistorySellerAgGrid/>
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

// StockWatchlist
const StockWatchlist = (props) => {
    return(
        <AppFrameProvider
            initialClasses={{BuyPage, SellPage}}
            initialFrames={
                [
                    {className: 'BuyPage', title: 'STOCK WATCHLIST BUY', instanceName: 'stockWatchlistBuy'},
                    {className: 'SellPage', title: 'STOCK WATCHLIST SELL', instanceName: 'stockWatchlistSell'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 pl-2 mx-0 pt-1">
                <div className="col-sm-4 px-0 mx-0">
                    <AppModal/>
                    <TableStockWatchlist/>
                </div>
                <div className="col-sm-8 px-0 mx-0">
                    {/*<div className="col-sm-12 px-2 d-border-bottom">*/}
                    <div className="col-sm-12 px-2 row mx-0">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6 px-0">
                            <MenuOfContent linkTitles={
                                {
                                    stockWatchlistBuy : 'BUY',
                                    stockWatchlistSell: 'SELL',
                                }
                            } />
                        </div>
                    </div>
                    <div className="col-sm-12 px-2 pt-4">
                        <AppFrame headerComponent={StockWatchlistFrameHeader}/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const StockWatchlistFrameHeader = (props) => {
    return (
        <></>
    );
}

// tael Watchlist
class TableStockWatchlist_Base extends React.Component{
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickAmendRegister = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'tiny',
            contentClass: RegisterAmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render(){
        return(<>
            <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
            <div className="bg-black-trading f-12">
                {/*<button onClick={this.handleSubcribeMsg}>subscribe</button>*/}
                <AppFrameAction ref="frameAction" />
                {/*<div className="d-border-bottom">*/}
                <div>
                    <div className="col-sm-12 px-0">
                        {/*<div className="col-sm-6 px-0 mx-0 text-left pt-3 pb-2">*/}
                            {/*<UncontrolledDropdown setActiveFromChild>
                                <DropdownToggle tag="a">
                                    <label className="ml-3 btn btn-sm btn-grey col-md-9">
                                        Order by <i className="icofont icofont-caret-down"></i>
                                    </label>
                                </DropdownToggle>
                                <DropdownMenu className="menu-dropdown" left>
                                    <DropdownItem tag="a" href="#" className="item-hover text-white">Code</DropdownItem>
                                    <DropdownItem tag="a" href="#" className="item-hover text-white">Price</DropdownItem>
                                    <DropdownItem tag="a" href="#" className="item-hover text-white">T.Vol</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>*/}
                            {/*<Dropdown text={
                                <label className="col-sm-9">
                                    Order by
                                </label>
                            } className="text-white align-self-center btn btn-sm btn-grey ml-5 pt-2 pb-0">
                                <Dropdown.Menu className={'bg-black-trading w-100 d-border'}>
                                    <Dropdown.Item className="f-12 item-hover text-white text-left px-2" text={"Code"} />
                                    <Dropdown.Item className="f-12 item-hover text-white text-left px-2" text={"Price"} />
                                    <Dropdown.Item className="f-12 item-hover text-white text-left px-2" text={"T.Vol"} />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>*/}
                        {/*<div className="col-sm-6 px-0 mx-0 text-right pt-3 pb-1">*/}
                        <div className="col-sm-12 mx-0 pt-3 pb-2">
                            <button className="btn btn-sm btn-grey" onClick={this.buttonClickAmendRegister}>Modify Watchlist</button>
                        </div>
                    </div>
                </div>
                <div className="pl-4 pr-2 py-4">
                    <StockWatchlistAgGrid />
                </div>
            </div>
        </>);
    }
}

class BuyPage extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 mt-0 f-12">
                        <TableInfoTransaction lotshare="buyPage" />
                    </div>
                    <div className="col-sm-6 mt-0 d-border-active bg-dark-grey pb-3 px-3">
                        <FormBuy idPrice="stockBuyPrice" idVol="stockBuyVol" idValue="stockBuyValue" columnSm="col-sm-12" />
                    </div>
                </div>
            </>
        );
    }

}

class SellPage extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 mt-0 f-12">
                        <TableInfoTransaction lotshare="sellPage" />
                    </div>
                    <div className="col-sm-6 mt-0 d-border-active bg-dark-grey pb-3 px-3">
                        <FormSell idPrice="stockSellPrice" idVol="stockSellVol" idValue="stockSellValue" columnSm="col-sm-12"/>
                    </div>
                </div>
            </>
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

const TableStockWatchlist = ContextConnector(BIPSAppContext,
    (vars, actions, props)=>({
        subscribeMsg: vars.subscribeMsg,
        stockSummary:vars.stockSummary,
        sessionID:vars.sessionID,
        subscribeStock:(sessionID) => {actions.sendAction('subscribeStock', {sessionID})}
    })
)(TableStockWatchlist_Base)

class RegisterAmendModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div>
                    <div className="cssmenumodal bg-grey pb-4 col-sm-12 mx-0 px-0">
                        <ul>
                            <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Amend Group</span></a></li>
                            <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Add Group</span></a></li>
                        </ul>
                    </div>
                    <div className="card-475">
                        <div className={this.state.activeTab === '1' ? 'card card-475 d-border d-block f-12' : 'd-none'}>
                            <div className="card card-375 d-border-transparent-grey">
                                <div className="card card-xmini bg-grey">
                                    <AmendGroupNameAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                                    <div className="col-sm-5">
                                        <label className="col-sm-12">Name</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input defaultValue='Group A' placeholder='Group Name' size='small' className="gray col-sm-12 align-self-center"/>
                                    </div>
                                </div>
                                <div className="card card-xs bg-grey">
                                    <AmendGroupCodeAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                                    <div className="col-sm-7">
                                        <Input defaultValue='BBCA' placeholder='Code' size='small' className="gray pl-0 col-sm-12 align-self-center"/>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <i className="fa fa-search click-pointer f-18"></i>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row col-sm-12 px-0 mx-0 mt-5 pt-5 text-white">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stock list</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm bg-gray-tradding border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.activeTab === '2' ? 'card card-475 d-border d-block f-12' : 'd-none'}>
                            <div className="card card-375 d-border-transparent-grey">
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                                    <div className="col-sm-5">
                                        <label className="col-sm-12">Group Name</label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input defaultValue='Group A' placeholder='Group Name' size='small' className="gray col-sm-12 align-self-center"/>
                                    </div>
                                </div>
                                <div className="card card-xs bg-grey">
                                    <AddGroupCodeAgGrid />
                                </div>
                                <div className="form-group row col-sm-12 px-0 mx-0 my-4 py-3 text-white">
                                    <div className="col-sm-7">
                                        <Input defaultValue='BBCA' placeholder='Code' size='small' className="gray pl-0 col-sm-12 align-self-center"/>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <i className="fa fa-search click-pointer f-18"></i>
                                    </div>
                                    <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                        <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row col-sm-12 px-0 mx-0 mt-5 pt-5 text-white">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stock list</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm bg-gray-tradding border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>
                        {/*<div className={this.state.activeTab === "1" ? "d-border d-block" : "d-none"}>
                            <div className="card card-xmini bg-grey">
                                <div className="card-body scrollable">
                                    <TableBS responsive size="sm" borderless className="text-white text-center">
                                        <thead className="t-border-bottom-bold">
                                        <tr>
                                            <th>Group Name</th>
                                            <th>Total Member</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-primary">Group A</td>
                                            <td>5</td>
                                            <td><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></td>
                                        </tr>
                                        <tr>
                                            <td className="text-primary">Group B</td>
                                            <td>12</td>
                                            <td><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></td>
                                        </tr>
                                        <tr>
                                            <td className="text-primary">Group C</td>
                                            <td>15</td>
                                            <td><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></td>
                                        </tr>
                                        <tr>
                                            <td className="text-primary">Group D</td>
                                            <td>26</td>
                                            <td><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></td>
                                        </tr>
                                        <tr>
                                            <td className="text-primary">Group E</td>
                                            <td>27</td>
                                            <td><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></td>
                                        </tr>
                                        </tbody>
                                    </TableBS>
                                </div>
                            </div>

                            <div className="form-group row col-sm-12 px-0 mx-0 my-4 text-white">
                                <div className="col-sm-5">
                                    <label className="col-sm-12">Name</label>
                                </div>
                                <div className="col-sm-7">
                                    <Input className="col-sm-12 bg-gray-tradding border-gray-tradding" type="text" value="Group A"/>
                                </div>
                            </div>

                            <div className="card card-xs bg-grey">
                                <div className="card-body scrollable">
                                    <TableBS responsive size="sm" borderless className="text-white">
                                        <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Price</th>
                                            <th>Change/%</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-primary no-wrap align-middle align-self-center">
                                                <div className="form-group row col-sm-12 my-0 align-middle align-self-center">
                                                    <Input className="bg-gray-tradding border-gray-tradding col-sm-4" size="sm" readonly value="AALI"/>
                                                    &nbsp;<label className="text-white my-0 align-middle align-self-center f-9"> Astra Argo Lestari Tbk.</label>
                                                </div>
                                            </td>
                                            <td className="no-wrap align-middle align-self-center">12,650</td>
                                            <td className="no-wrap align-middle align-self-center text-danger"><i className="icofont icofont-caret-down"></i> -175(-1.36%)</td>
                                            <td className="no-wrap align-middle align-self-center"><button className="btn btn-sm btn-danger">
                                                <i className="fa fa-minus"></i>
                                            </button></td>
                                        </tr>
                                        <tr>
                                            <td className="text-primary no-wrap align-middle align-self-center">
                                                <div className="form-group row col-sm-12 my-0 align-middle align-self-center">
                                                    <Input className="bg-gray-tradding border-gray-tradding col-sm-4" size="sm" readonly value="TLKM"/>
                                                    &nbsp;<label className="text-white my-0 align-middle align-self-center f-9"> Telekomunikasi Indonesia Tbk.</label>
                                                </div>
                                            </td>
                                            <td className="no-wrap align-middle align-self-center">15,650</td>
                                            <td className="no-wrap align-middle align-self-center text-success"><i className="icofont icofont-caret-up"></i> +175(+1.36%)</td>
                                            <td className="no-wrap align-middle align-self-center"><button className="btn btn-sm btn-danger">
                                                <i className="fa fa-minus"></i>
                                            </button></td>
                                        </tr>
                                        </tbody>
                                    </TableBS>
                                </div>
                            </div>

                            <div className="form-group row col-sm-12 px-0 mx-0 my-3 text-white">
                                <div className="col-sm-7">
                                    <Input className="col-sm-12 bg-gray-tradding border-gray-tradding" value="BBCA"/>
                                </div>
                                <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                    <i className="fa fa-search click-pointer f-18"></i>
                                </div>
                                <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                    <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                </div>
                            </div>

                            <div className="form-group row col-sm-12 px-0 mx-0 mt-5 pt-5 text-white">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stock list</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm bg-gray-tradding border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.activeTab === "2" ? "d-border d-block" : "d-none"}>
                            <div className="form-group row col-sm-12 px-0 mx-0 my-4 text-white">
                                <div className="col-sm-5">
                                    <label className="col-sm-12">Group Name</label>
                                </div>
                                <div className="col-sm-7">
                                    <Input className="col-sm-12 bg-gray-tradding border-gray-tradding" type="text" value="Group A"/>
                                </div>
                            </div>

                            <div className="card card-xs bg-grey">
                                <div className="card-body scrollable">
                                    <Table responsive size="sm" borderless className="text-white">
                                        <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Price</th>
                                            <th>Change/%</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-primary no-wrap align-middle align-self-center">
                                                <div className="form-group row col-sm-12 my-0 align-middle align-self-center">
                                                    <Input className="bg-gray-tradding border-gray-tradding col-sm-4" size="sm" readonly value="AALI"/>
                                                    &nbsp;<label className="text-white my-0 align-middle align-self-center f-9"> Astra Argo Lestari Tbk.</label>
                                                </div>
                                            </td>
                                            <td className="no-wrap align-middle align-self-center">12,650</td>
                                            <td className="no-wrap align-middle align-self-center text-danger"><i className="icofont icofont-caret-down"></i> -175(-1.36%)</td>
                                        </tr>
                                        <tr>
                                            <td className="text-primary no-wrap align-middle align-self-center">
                                                <div className="form-group row col-sm-12 my-0 align-middle align-self-center">
                                                    <Input className="bg-gray-tradding border-gray-tradding col-sm-4" size="sm" readonly value="TLKM"/>
                                                    &nbsp;<label className="text-white my-0 align-middle align-self-center f-9"> Telekomunikasi Indonesia Tbk.</label>
                                                </div>
                                            </td>
                                            <td className="no-wrap align-middle align-self-center">15,650</td>
                                            <td className="no-wrap align-middle align-self-center text-success"><i className="icofont icofont-caret-up"></i> +175(+1.36%)</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <div className="form-group row col-sm-12 px-0 mx-0 my-3 text-white">
                                <div className="col-sm-7">
                                    <Input className="col-sm-12 bg-gray-tradding border-gray-tradding" value="BBCA"/>
                                </div>
                                <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                    <i className="fa fa-search click-pointer f-18"></i>
                                </div>
                                <div className="col-sm-1 px-0 mx-0 align-self-center align-middle">
                                    <button className="btn btn-sm bg-gray-tradding border-gray-tradding"><i className="fa fa-plus"></i></button>
                                </div>
                            </div>

                            <br/><br/><br/><br/><br/><br/>
                            <div className="form-group row col-sm-12 px-0 mx-0 mt-5 pt-5 text-white">
                                <div className="col-sm-9 align-self-center align-middle">
                                    <label className="text-muted">Max Group is 10 group with 45 stock list</label>
                                </div>
                                <div className="col-sm-3 align-self-center align-middle">
                                    <button className="btn btn-sm bg-gray-tradding border-gray-tradding col-sm-12">Save</button>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </>
        );
    }
}

class StockWatchlistGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "code", title: "Code"},
                { name: "price", title: "Price"},
                { name: "change", title: "Change" },
                { name: "persen", title: "(%)" },
                { name: "tvol", title: "T. Vol" },
            ],
            rows: [
                { code: "AALI",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ANTM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TLKM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "BBRI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "ASII",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "WSKT",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AGII",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ADHI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMGR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "EMTK",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "MREI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "PTSP",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TCPI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BRAM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "INDF",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JECC",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "RDTX",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "DUTI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "FASW",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "IBST",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMMA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TKIM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JSMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SONA",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AMFG",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SCCO",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BYAN",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "UNTR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "GGRM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "UNVR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
            ],
            defaultColumnWidths: [
                { columnName: "code", align:'center', width: 70},
                { columnName: "price", align:'right', width: 70},
                { columnName: "change", align:'right', width: 70},
                { columnName: "persen", align:'right', width: 70},
                { columnName: "tvol", align:'right', width: 70}
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search mr-0"
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
                className="scroll-tbody bg-black-trading table-borderless table-responsive scrollable f-12 d-border card card-500"
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className="bg-black-trading f-12"
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className="grid-table f-12">
                {value}
            </Table.Cell>
        );

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //global color

            if(row.change.includes('-')){
                if (column.name == 'code') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12"}>{value}</Table.Cell>;
                } else if (column.name == 'price') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-danger"}>
                            {value} &nbsp;&nbsp;&nbsp; <i className="icofont icofont-caret-down"></i>
                        </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-danger"}>{value}</Table.Cell>;
                }
            } else{
                if (column.name == 'code') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12"}>{value}</Table.Cell>;
                } else if (column.name == 'price') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-success"}>
                        {value} &nbsp;&nbsp;&nbsp; <i className="icofont icofont-caret-up"></i>
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
                }
            }

            const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
            return (
                <>
                    <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                        <SearchState defaultValue="" />
                        <IntegratedFiltering />
                        <SortingState
                            defaultSorting={[{ columnName: 'code', direction: 'asc' }]}
                        />
                        <IntegratedSorting />
                        <DragDropProvider />
                        <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                        <TableColumnReordering
                            defaultOrder={['code', 'price', 'change', 'persen', 'tvol']}
                        />
                        <TableHeaderRow showSortingControls />
                        <TableColumnVisibility
                            defaultHiddenColumnNames={defaultHiddenColumnNames}
                        />
                        <Toolbar rootComponent={toolbarStyle} />
                        <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                        <SearchPanel inputComponent={searchStyle} />

                        <CustomToolbarStockWatchlist/>
                    </Grid>
                </>
            );
        }

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'code', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['code', 'price', 'change', 'persen', 'tvol']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarStockWatchlist/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarStockWatchlist extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-0 col-sm-12">
                        <div className="row col-sm-12 px-0 mx-0 py-2">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary"></span>
                            </div>
                            <div className="col-sm-10 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class HistoryPriceGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "price", title: "Price"},
                { name: "freq", title: "Freq"},
                { name: "vol", title: "Vol" },
                { name: "value", title: "Value(Tn)" },
            ],
            rows: [
                { price: "10,870",
                    freq: "9",
                    vol: "20",
                    value: "156"},
                { price: "10,860",
                    freq: "8",
                    vol: "21",
                    value: "156"},
                { price: "10,850",
                    freq: "7",
                    vol: "22",
                    value: "156"},
                { price: "10,840",
                    freq: "6",
                    vol: "23",
                    value: "156"},
                { price: "10,830",
                    freq: "5",
                    vol: "24",
                    value: "156"},
                { price: "10,820",
                    freq: "4",
                    vol: "25",
                    value: "156"},
                { price: "10,810",
                    freq: "3",
                    vol: "26",
                    value: "156"},
                { price: "10,800",
                    freq: "2",
                    vol: "27",
                    value: "156"},
            ],
            defaultColumnWidths: [
                { columnName: "price", align:'right', width: 95},
                { columnName: "freq", align:'right', width: 95},
                { columnName: "vol", align:'right', width: 95},
                { columnName: "value", align:'right', width: 95},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search mr-0"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-trading-gray f-12"}
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
                className="scroll-tbody bg-trading-gray table-borderless table-responsive scrollable f-12 card card-xs"
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className="price-history"
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className="grid-table f-12 text-success">
                {value}
            </Table.Cell>
        );

        const Cell = (props) => {
            const { column } = props;
            return <HighlightedCell {...props} />;
            return <Table.Cell {...props} />;
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <style>{'' +
                'thead.price-history th {' +
                '    border-top: var(--warna-d-border-bold) solid 2px!important;' +
                '    background-color: var(--warna-bg-trading-gray) !important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'price', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['price', 'freq', 'vol', 'value']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarHistoryPrice/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarHistoryPrice extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-0 col-sm-12">
                        <div className="row col-sm-12 px-0 mx-0 py-2">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary"></span>
                            </div>
                            <div className="col-sm-10 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class HistoryBuyerGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "buyer", title: "Buyer"},
                { name: "volume", title: "Volume"},
                { name: "freq", title: "Freq" },
                { name: "avg", title: "Avg" },
            ],
            rows: [
                { buyer: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { buyer: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { buyer: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { buyer: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { buyer: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { buyer: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { buyer: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { buyer: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
            ],
            defaultColumnWidths: [
                { columnName: "buyer", align:'center', width: 95},
                { columnName: "volume", align:'right', width: 95},
                { columnName: "freq", align:'right', width: 95},
                { columnName: "avg", align:'right', width: 95},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search mr-0"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-trading-gray f-12"}
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
                className="scroll-tbody bg-trading-gray table-borderless table-responsive scrollable f-12 card card-xs"
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className="buyer-history"
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className="grid-table f-12">
                {value}
            </Table.Cell>
        );

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

            var volume = parseInt(row.volume);
            if (volume < 22 || volume > 26){
                if (column.name == 'buyer') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-warning"}>{value}</Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
                }
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
            }

        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <style>{'' +
                'thead.buyer-history th {' +
                '    border-top: var(--warna-d-border-bold) solid 2px!important;' +
                '    background-color: var(--warna-bg-trading-gray) !important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'buyer', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['buyer', 'volume', 'freq', 'avg']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarHistoryBuyer/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarHistoryBuyer extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-0 col-sm-12">
                        <div className="row col-sm-12 px-0 mx-0 py-2">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary"></span>
                            </div>
                            <div className="col-sm-10 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class HistorySellerGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "seller", title: "Seller"},
                { name: "volume", title: "Volume"},
                { name: "freq", title: "Freq" },
                { name: "avg", title: "Avg" },
            ],
            rows: [
                { seller: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { seller: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { seller: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { seller: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { seller: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { seller: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { seller: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { seller: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
            ],
            defaultColumnWidths: [
                { columnName: "seller", align:'center', width: 95},
                { columnName: "volume", align:'right', width: 95},
                { columnName: "freq", align:'right', width: 95},
                { columnName: "avg", align:'right', width: 95},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search mr-0"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-trading-gray f-12"}
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
                className="scroll-tbody bg-trading-gray table-borderless table-responsive scrollable f-12 card card-xs"
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className="seller-history"
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className="grid-table f-12">
                {value}
            </Table.Cell>
        );

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

            var volume = parseInt(row.volume);
            if (volume < 22 || volume > 26){
                if (column.name == 'seller') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-warning"}>{value}</Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
                }
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
            }

        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <style>{'' +
                'thead.seller-history th {' +
                '    border-top: var(--warna-d-border-bold) solid 2px!important;' +
                '    background-color: var(--warna-bg-trading-gray) !important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'seller', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['seller', 'volume', 'freq', 'avg']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarHistorySeller/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarHistorySeller extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-0 col-sm-12">
                        <div className="row col-sm-12 px-0 mx-0 py-2">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary"></span>
                            </div>
                            <div className="col-sm-10 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class HistoryBrokerGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: 'broker', title: "Broker"},
                { name: 'bidvol', title: "Bid Vol"},
                { name: 'bidval', title: "Bid Val (Bn)" },
                { name: 'avgbid', title: "Avg. Bid" },
                { name: 'sellvol', title: "Sell Vol"},
                { name: 'sellval', title: "Sell Val (Bn)"},
                { name: 'avgsell', title: "Avg. Sell" },
                { name: 'netval', title: "Net Val (Bn)" }
            ],
            rows: [
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
    ],
            defaultColumnWidths: [
                { columnName: "broker", align:'center', width: 95},
                { columnName: "bidvol", align:'right', width: 95},
                { columnName: "bidval", align:'right', width: 95},
                { columnName: "avgbid", align:'right', width: 95},
                { columnName: "sellvol", align:'right', width: 95},
                { columnName: "sellval", align:'right', width: 95},
                { columnName: "avgsell", align:'right', width: 95},
                { columnName: "netval", align:'right', width: 95},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const searchStyle = ({ ...restProps }) => (
            <SearchPanel.Input
                {...restProps}
                className="bg-grey-mystic text-white f-12 w-search mr-0"
            />
        );

        const toolbarStyle = ({ ...restProps }) => (
            <Toolbar.Root
                {...restProps}
                className={"bg-trading-gray f-12"}
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
                className="scroll-tbody bg-trading-gray table-borderless table-responsive scrollable f-12 card card-430"
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className="broker-history"
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className="grid-table f-12">
                {value}
            </Table.Cell>
        );

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //global color

            if (column.name == 'broker') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-warning"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table f-12 text-success"}>{value}</Table.Cell>;
            }
        }


        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <style>{'' +
                'thead.broker-history th {' +
                '    border-top: var(--warna-d-border-bold) solid 2px!important;' +
                '    background-color: var(--warna-bg-trading-gray) !important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'broker', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['broker', 'bidvol', 'bidval', 'avgbid', 'sellvol', 'sellval', 'avgsell', 'netval']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarHistoryBroker/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarHistoryBroker extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-0 col-sm-12">
                        <div className="row col-sm-12 px-0 mx-0 py-2">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary"></span>
                            </div>
                            <div className="col-sm-10 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class CorpActionGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "type", title: "Type"},
                { name: "cumdate", title: "Cum Date"},
                { name: "distdate", title: "Dist. Date"},
                { name: "ratio", title: "Ratio" },
                { name: "exprice", title: "Ex. Price" },
            ],
            rows: [
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-17",
                    distdate: "2018-05-09",
                    ratio: "1.00 : 322.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-20",
                    distdate: "2018-05-12",
                    ratio: "1.00 : 322.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-19",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 370.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-21",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 370.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-22",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 472.00",
                    exprice: "0.00" },
            ],
            defaultColumnWidths: [
                { columnName: "type", align:'center', width: 135},
                { columnName: "cumdate", align:'center', width: 135},
                { columnName: "distdate", align:'center', width: 135},
                { columnName: "ratio", align:'center', width: 135},
                { columnName: "exprice", align:'center', width: 135},
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
                className={"scroll-tbody bg-black-trading table-borderless table-responsive table-striped scrollable"}
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

        const Cell = (props) => {
            const { column } = props;
            return <HighlightedCell {...props} />;
            return <Table.Cell {...props} />;
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'type', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['type', 'cumdate', 'distdate', 'ratio', 'exprice']}
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

class AmendGroupNameGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "groupname", title: "Group Name"},
                { name: "totalmember", title: "Total Member"},
                { name: "action", title: "Action"}
            ],
            rows: [
                { groupname: <div className="text-primary">Group A</div>,
                    totalmember: "5",
                    action: <div><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></div> },

                { groupname: <div className="text-primary">Group B</div>,
                    totalmember: "15",
                    action: <div><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></div> },

                { groupname: <div className="text-primary">Group C</div>,
                    totalmember: "27",
                    action: <div><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></div> },

                { groupname: <div className="text-primary">Group D</div>,
                    totalmember: "18",
                    action: <div><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></div> },

                { groupname: <div className="text-primary">Group E</div>,
                    totalmember: "45",
                    action: <div><a className="text-primary click-pointer">Edit</a> | <a className="text-danger click-pointer">Delete</a></div> },
            ],
            defaultColumnWidths: [
                { columnName: "groupname", align:'center', width: 155},
                { columnName: "totalmember", align:'center', width: 155},
                { columnName: "action", align:'center', width: 155},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody bg-grey table-borderless table-responsive scrollable px-4 f-12"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-grey f-12 amend-groupname"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table-p5 f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = (props) => {
            const { column } = props;
            return <HighlightedCell {...props} />;
            return <Table.Cell {...props} />;
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames, colspan } = this.state;
        return (
            <>
                <style>{'' +
                'thead.amend-groupname th {' +
                '    background-color: var(--warna-header-card)!important;' +
                '}' +
                '.grid-table-p5 {' +
                '    padding: 5px!important;' +
                '    line-height: 1.42857143!important;' +
                '    vertical-align: middle!important;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'groupname', direction: 'desc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['groupname', 'totalmember', 'action']}
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

class AmendGroupCodeGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "code", title: "Code"},
                { name: "price", title: "Price"},
                { name: "change", title: "Change/%"}
            ],
            rows: [
                { code: <div className="f-9">
                        <Input defaultValue='AALI' placeholder='Code' size='small' className="gray col-sm-4 align-self-center px-0" disabled/>
                        &nbsp; Astra Argo Lestari Tbk.</div>,
                    price: "12,650",
                    change: <div className="text-danger"><i className="icofont icofont-caret-down"></i> -175(-1.36%) <button className="btn btn-sm btn-danger">
                        <i className="fa fa-minus"></i>
                    </button></div> },
                { code: <div className="f-9">
                        <Input defaultValue='TLKM' placeholder='Code' size='small' className="gray col-sm-4 align-self-center px-0" disabled/>
                        &nbsp; Telekomunikasi Indonesia Tbk.</div>,
                    price: "15,600",
                    change: <div className="text-success"><i className="icofont icofont-caret-up"></i> +175(+1.36%) <button className="btn btn-sm btn-danger">
                        <i className="fa fa-minus"></i>
                    </button></div> },
            ],
            defaultColumnWidths: [
                { columnName: "code", align:'left', width: 10},
                { columnName: "price", align:'right', width: 10},
                { columnName: "change", align:'right', width: 10},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody-xs bg-grey table-borderless table-responsive scrollable px-4 f-12"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-grey f-12 amend-codename"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = (props) => {
            const { column } = props;
            return <HighlightedCell {...props} />;
            return <Table.Cell {...props} />;
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames } = this.state;
        return (
            <>
                <style>{'' +
                'thead.amend-codename th {' +
                '    background-color: var(--warna-header-card)!important;' +
                '    border-bottom: 0!important' +
                '}' +
                '.scroll-tbody-xs {' +
                '    display: inline-block;' +
                '    height: 90px;' +
                '    overflow: auto;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'code', direction: 'desc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['code', 'price', 'change']}
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

class AddGroupCodeGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "code", title: "Code"},
                { name: "price", title: "Price"},
                { name: "change", title: "Change/%"}
            ],
            rows: [
                { code: <div className="f-9">
                        <Input defaultValue='AALI' placeholder='Code' size='small' className="gray col-sm-4 align-self-center px-0" disabled/>
                        &nbsp; Astra Argo Lestari Tbk.</div>,
                    price: "12,650",
                    change: <div className="text-danger"><i className="icofont icofont-caret-down"></i> -175(-1.36%)</div> },
                { code: <div className="f-9">
                        <Input defaultValue='TLKM' placeholder='Code' size='small' className="gray col-sm-4 align-self-center px-0" disabled/>
                        &nbsp; Telekomunikasi Indonesia Tbk.</div>,
                    price: "15,600",
                    change: <div className="text-success"><i className="icofont icofont-caret-up"></i> +175(+1.36%)</div> },
            ],
            defaultColumnWidths: [
                { columnName: "code", align:'left', width: 10},
                { columnName: "price", align:'right', width: 10},
                { columnName: "change", align:'right', width: 10},
            ],
            defaultHiddenColumnNames: [''],
        };
    }

    render() {
        const TableComponent = ({ ...restProps }) => (
            <Table.Table
                {...restProps}
                className={"scroll-tbody-xs bg-grey table-borderless table-responsive scrollable px-4 f-12"}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-grey f-12 amend-codename"}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table f-12"}>
                {value}
            </Table.Cell>
        );

        const Cell = (props) => {
            const { column } = props;
            return <HighlightedCell {...props} />;
            return <Table.Cell {...props} />;
        };

        const { rows, columns, defaultColumnWidths, defaultHiddenColumnNames } = this.state;
        return (
            <>
                <style>{'' +
                'thead.amend-codename th {' +
                '    background-color: var(--warna-header-card)!important;' +
                '    border-bottom: 0!important' +
                '}' +
                '.scroll-tbody-xs {' +
                '    display: inline-block;' +
                '    height: 90px;' +
                '    overflow: auto;' +
                '}' +
                ''}
                </style>
                <Grid rows={rows} columns={columns} className={"bg-primary f-12"}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'code', direction: 'desc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['code', 'price', 'change']}
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

class StockWatchlistAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 69, lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 locked-col locked-visible";
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 67,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    }},
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 82,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    } },
                { field: "persen", headerName: "(%)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 59,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    } },
                { field: "tvol", headerName: "T. Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 69,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right grid-table f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { code: "AALI",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ANTM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TLKM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "BBRI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "ASII",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BBMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "WSKT",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AGII",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "ADHI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMGR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "EMTK",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "MREI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "PTSP",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TCPI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BRAM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "INDF",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JECC",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "RDTX",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "DUTI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "FASW",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "IBST",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SMMA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "TKIM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "JSMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SONA",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "AMFG",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "SCCO",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "BYAN",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "UNTR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450"},
                { code: "GGRM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
                { code: "UNVR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450"},
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card-537 ag-theme-balham-dark ag-header-border d-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class AmendGroupNameAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "groupname", headerName: "Group Name", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 160, lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-primary locked-col locked-visible";
                    }},
                { field: "totalmember", headerName: "Total Member",  sortable: true, filter: "agTextColumnFilter", resizable: true, width: 160,
                    cellClass : function (params) {
                        return "text-right grid-table f-12";
                    }},
                { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 160,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        return '<div><a class="text-primary click-pointer">Edit</a> | <a class="text-danger click-pointer">Delete</a></div>'
                    }},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { groupname: "Group A",
                    totalmember: "5",
                    action: "" },
                { groupname: "Group B",
                    totalmember: "15",
                    action: "" },
                { groupname: "Group C",
                    totalmember: "27",
                    action: "" },
                { groupname: "Group D",
                    totalmember: "18",
                    action: "" },
                { groupname: "Group E",
                    totalmember: "45",
                    action: "" },],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card-xmini ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class AmendGroupCodeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 220, lockPosition:true, lockVisible:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-left grid-table f-12 locked-col locked-visible";
                    }, cellRenderer : function (params) {
                        var code = params.data.code;
                        var sCode = code.split('-');

                        return '<div class="ui small disabled input gray col-sm-4 align-self-center px-0">' +
                            '<input placeholder="Code" disabled="" type="text" tabindex="-1" value="'+sCode[0]+'">' +
                            '</div>&nbsp; '+sCode[1];
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 70,
                    cellClass : function (params) {
                        return "text-right grid-table f-12";
                    }},
                { field: "indicator", headerName: "#", sortable: true, filter: "agTextColumnFilter", width: 30,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },
                    cellRenderer : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? '<i class="icofont icofont-caret-down text-danger"></i>' :
                            '<i class="icofont icofont-caret-up text-success"></i>'
                    }},
                { field: "change", headerName: "Change/%", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            change.includes('+') === true ? "text-success text-right grid-table f-12" :
                                "text-warning text-right grid-table f-12";
                    } },
                { field: "action", headerName: "", sortable: true, filter: "agTextColumnFilter", width: 50, pinned : "right",
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }, cellRenderer : function (params) {
                        return '<button class="btn btn-sm btn-danger">' +
                            '<i class="fa fa-minus"></i>';
                    }},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { code: "AALI-Astra Argo Lestari Tbk.",
                    price: "12,650",
                    indicator: "",
                    change: "+175(+1.36%)",
                    action: "" },
                { code: "TLKM-Telekomunikasi Indonesia Tbk.",
                    price: "15,600",
                    indicator: "",
                    change: "-175(-1.36%)",
                    action: "" },
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card-xs ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class AddGroupCodeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 220, lockPosition:true, lockVisible:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-left grid-table f-12 locked-col locked-visible";
                    }, cellRenderer : function (params) {
                        var code = params.data.code;
                        var sCode = code.split('-');

                        return '<div class="ui small disabled input gray col-sm-4 align-self-center px-0">' +
                            '<input placeholder="Code" disabled="" type="text" tabindex="-1" value="'+sCode[0]+'">' +
                            '</div>&nbsp; '+sCode[1];
                    }},
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 70,
                    cellClass : function (params) {
                        return "text-right grid-table f-12";
                    }},
                { field: "indicator", headerName: "#", sortable: true, filter: "agTextColumnFilter", width: 30,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },
                    cellRenderer : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? '<i class="icofont icofont-caret-down text-danger"></i>' :
                            '<i class="icofont icofont-caret-up text-success"></i>'
                    }},
                { field: "change", headerName: "Change/%", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        var change = params.data.change;
                        return change.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            change.includes('+') === true ? "text-success text-right grid-table f-12" :
                                "text-warning text-right grid-table f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { code: "AALI-Astra Argo Lestari Tbk.",
                    price: "12,650",
                    indicator: "",
                    change: "+175(+1.36%)" },
                { code: "TLKM-Telekomunikasi Indonesia Tbk.",
                    price: "15,600",
                    indicator: "",
                    change: "-175(-1.36%)"},
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card-xs ag-theme-balham-dark ag-header-border-grey d-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class HistoryBrokerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: 'broker', headerName: "Broker", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    lockVisible:true, lockPosition:true, suppressSizeToFit:true,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-warning locked-position locked-visible";
                    },},
                { field: 'bidvol', headerName: "Bid Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    },},
                { field: 'bidval', headerName: "Bid Val (Bn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: 'avgbid', headerName: "Avg. Bid", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: 'sellvol', headerName: "Sell Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    },},
                { field: 'sellval', headerName: "Sell Val (Bn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    },},
                { field: 'avgsell', headerName: "Avg. Sell", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: 'netval', headerName: "Net Val (Bn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27.5;
            },
            rowData: [
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},
                { broker: "DX",
                    bidvol: "2,000",
                    bidval: "2,000",
                    avgbid: "10,800",
                    sellvol: "3,000",
                    sellval: "3,000",
                    avgsell: "2,100",
                    netval: "500,000"},],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card card-500 ag-theme-balham-dark ag-header-border-gray"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class HistoryPriceAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [

                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success locked-visible locked-col";
                    },},
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    },},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: "value", headerName: "Value(Tn)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { price: "10,870",
                    freq: "9",
                    vol: "20",
                    value: "156"},
                { price: "10,860",
                    freq: "8",
                    vol: "21",
                    value: "156"},
                { price: "10,850",
                    freq: "7",
                    vol: "22",
                    value: "156"},
                { price: "10,840",
                    freq: "6",
                    vol: "23",
                    value: "156"},
                { price: "10,830",
                    freq: "5",
                    vol: "24",
                    value: "156"},
                { price: "10,820",
                    freq: "4",
                    vol: "25",
                    value: "156"},
                { price: "10,810",
                    freq: "3",
                    vol: "26",
                    value: "156"},
                { price: "10,800",
                    freq: "2",
                    vol: "27",
                    value: "156"},
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card card-160 ag-theme-balham-dark ag-header-border-gray"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class HistoryBuyerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "buyer", headerName: "Buyer", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    suppressSizeToFit:true, lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { buyer: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { buyer: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { buyer: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { buyer: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { buyer: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { buyer: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { buyer: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { buyer: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card card-160 ag-theme-balham-dark ag-header-border-gray"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class HistorySellerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "seller", headerName: "Seller", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    suppressSizeToFit:true, lockPosition:true, lockVisible:true,
                    cellClass : function (params) {
                        var volume = parseInt(params.data.volume);
                        if (volume < 22 || volume > 26) {
                            var value = 'text-center grid-table f-12 text-warning locked-col locked-visible';
                        } else {
                            var value = 'text-center grid-table f-12 text-warning locked-col locked-visible';
                        }

                        return value;
                    }, },
                { field: "volume", headerName: "Volume", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
                { field: "avg", headerName: "Avg", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 95,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 text-success";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { seller: "DX",
                    volume: "20",
                    freq: "5",
                    avg: "10,820"},
                { seller: "DX",
                    volume: "21",
                    freq: "6",
                    avg: "10,830"},
                { seller: "DX",
                    volume: "22",
                    freq: "7",
                    avg: "10,840"},
                { seller: "DX",
                    volume: "23",
                    freq: "8",
                    avg: "10,850"},
                { seller: "DX",
                    volume: "24",
                    freq: "9",
                    avg: "10,860"},
                { seller: "DX",
                    volume: "25",
                    freq: "4",
                    avg: "10,870"},
                { seller: "DX",
                    volume: "26",
                    freq: "3",
                    avg: "10,880"},
                { seller: "DX",
                    volume: "27",
                    freq: "2",
                    avg: "10,890"},
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card card-160 ag-theme-balham-dark ag-header-border-gray"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class CorpActionAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "type", headerName: "Type", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    suppressSizeToFit:true, lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return "text-center grid-table f-12 locked-col locked-visible";
                    },},
                { field: "cumdate", headerName: "Cum Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },},
                { field: "distdate", headerName: "Dist. Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },},
                { field: "ratio", headerName: "Ratio", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }, },
                { field: "exprice", headerName: "Ex. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }, },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-17",
                    distdate: "2018-05-09",
                    ratio: "1.00 : 322.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-20",
                    distdate: "2018-05-12",
                    ratio: "1.00 : 322.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-19",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 370.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-21",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 370.00",
                    exprice: "0.00" },
                { type: "CASH DIVIDEND",
                    cumdate: "2018-04-22",
                    distdate: "2018-05-15",
                    ratio: "1.00 : 472.00",
                    exprice: "0.00" },
            ],
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

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        params.api.sizeColumnsToFit();
        window.addEventListener("resize", function() {
            setTimeout(function() {
                params.api.sizeColumnsToFit();
            });
        });

        params.api.sizeColumnsToFit();
    };

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        return (
            <>
                <div
                    className="card card-small ag-theme-balham-dark ag-striped-odd ag-header-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

export { CustomFrameHeaderStock, Stock, BuyPage, SellPage, AmendGroupNameAgGrid, AmendGroupCodeAgGrid, AddGroupCodeAgGrid, BuyModal, SellModal, RegisterAmendModal };
export default StockPage;
