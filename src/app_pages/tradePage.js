import React from 'react';
import {AppFrame, AppFrameAction, AppFrameProvider, AppModal} from "../appframe";
import { NetAppContext, WSConnectionAction } from '../appnetwork.js';
import FillHeaderTab from "../tabheaderfill";
import MenuOfContent from "../menuofcontent";
import {AddGroupCodeAgGrid, AmendGroupCodeAgGrid, AmendGroupNameAgGrid, RegisterAmendModal} from "./stockPage";
import { ContextConnector } from '../appcontext.js';
import {BIPSAppContext, BIPSAppProvider} from "../AppData";
import {Dropdown, Input} from 'semantic-ui-react';
import {AgGridReact} from "ag-grid-react";
import {TableInfoTransactionWithButton} from './../app_transaction/tableInfoTransaction';
import TableInfoTransaction from "../app_transaction/tableInfoTransaction";
import FormBuy from "../app_transaction/form_buy";
import FormSell from "../app_transaction/form_sell";
import NumberInput from "../numberinput";
import SettingOrder from "../app_transaction/settingOrder";


const CustomFrameHeaderTrade_Base = (props) => {
    return(
        <>
            <div className={props.isManual ? "d-block" : "d-none"}>
                <AppFrameProvider
                initialClasses={{ TradeWatchlist, OrderbookPage}}
                initialFrames={
                    [
                        {className: 'TradeWatchlist', title: 'WATCHLIST PAGES', instanceName: 'tradePageWatchlist'},
                        {className: 'OrderbookPage', title: 'ORDERBOOK PAGE', instanceName: 'tradePageOrderbook'},
                    ]
                }
                initActions={[
                    ['switchPage', {instanceName: 'tradePageOrderbook'}],
                ]}
            >
                {/* <BIPSAppProvider> */}
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 align-self-center row">
                    <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                        <FillHeaderTab linkTitles={
                            {
                                tradePageWatchlist : 'WATCHLIST',
                                tradePageOrderbook: 'ORDERBOOK',
                            }
                        } />
                    </div>
                    <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                        <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleManual(props.isManual)}}>{"Manual Order"}</button>
                    </div>
                </div>
                <AppFrame headerComponent={TradeFrameHeader}/>
                <AppModal/>
                {/* </BIPSAppProvider> */}
            </AppFrameProvider>
            </div>
            <div className={props.isManual? "d-none" : "d-block"}>
                <AppFrameProvider
                initialClasses={{ ATradeWatchlist, ATradeDaily, ATradeTick}}
                initialFrames={
                    [
                        {className: 'ATradeWatchlist', title: 'WATCHLIST PAGES', instanceName: 'automaticOWatchlistTrade'},
                        {className: 'ATradeTick', title: 'TICK PAGE', instanceName: 'automaticOTickTrade'},
                        {className: 'ATradeDaily', title: 'DAILY PAGE', instanceName: 'automaticODailyTrade'},
                    ]
                }
                initActions={[
                    ['switchPage', {instanceName: 'automaticOrderDailyTrade'}],
                ]}
            >
                {/* <BIPSAppProvider> */}
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 align-self-center row">
                    <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                        <FillHeaderTab linkTitles={
                            {
                                automaticOWatchlistTrade : 'WATCHLIST',
                                automaticOTickTrade : 'TICK',
                                automaticODailyTrade : 'DAILY',
                            }
                        } />
                    </div>
                    <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                        <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleManual(props.isManual)}}>{"Automatic Order"}</button>
                    </div>
                </div>
                <AppFrame headerComponent={TradeFrameHeader}/>
                <AppModal/>
                {/* </BIPSAppProvider> */}
            </AppFrameProvider>
            </div>
        </>
    );
}

const TradeFrameHeader = (props) => {
    return (
        <></>
    );
}

const ManualOrdered = (props) => {
    return(
        <>
            <AppFrameProvider
                initialClasses={{ TradeWatchlist, OrderbookPage, AmendGroupNameAgGrid, AmendGroupCodeAgGrid}}
                initialFrames={
                    [
                        {className: 'AmendGroupNameAgGrid', title: 'WATCHLIST PAGES', instanceName: 'amendWatchlist'},
                        {className: 'AmendGroupCodeAgGrid', title: 'ORDERBOOK PAGE', instanceName: 'amendOrderbook'},
                        {className: 'TradeWatchlist', title: 'WATCHLIST PAGES', instanceName: 'tradePageWatchlist'},
                        {className: 'OrderbookPage', title: 'ORDERBOOK PAGE', instanceName: 'tradePageOrderbook'},
                    ]
                }
                initActions={[
                    ['switchPage', {instanceName: 'tradePageOrderbook'}],
                ]}
            >
                {/* <BIPSAppProvider> */}
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 align-self-center row">
                    <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                        <FillHeaderTab linkTitles={
                            {
                                tradePageWatchlist : 'WATCHLIST',
                                tradePageOrderbook: 'ORDERBOOK',
                                amendOrderbook : 'Amend 1',
                                amendWatchlist : 'Amend 2',
                            }
                        } />
                    </div>
                    <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                        <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleView(props.isGrid)}}>{"Manual Order"}</button>
                    </div>
                </div>
                <AppFrame headerComponent={TradeFrameHeader}/>
                <AppModal/>
                {/* </BIPSAppProvider> */}
            </AppFrameProvider>
        </>
    );
}

const AutomaticOrdered = (props) => {
    return(
        <>
            <AppFrameProvider
                initialClasses={{ TradeWatchlist, OrderbookPage}}
                initialFrames={
                    [
                        {className: 'TradeWatchlist', title: 'WATCHLIST PAGES', instanceName: 'tradePageWatchlist'},
                        {className: 'OrderbookPage', title: 'ORDERBOOK PAGE', instanceName: 'tradePageOrderbook'},
                    ]
                }
                initActions={[
                    ['switchPage', {instanceName: 'tradePageOrderbook'}],
                ]}
            >
                {/* <BIPSAppProvider> */}
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 align-self-center row">
                    <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                        <FillHeaderTab linkTitles={
                            {
                                tradePageWatchlist : 'WATCHLIST',
                                tradePageOrderbook: 'Test',
                            }
                        } />
                    </div>
                    <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                        <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleView(props.isGrid)}}>{"Manual Order"}</button>
                    </div>
                </div>
                <AppFrame headerComponent={TradeFrameHeader}/>
                <AppModal/>
                {/* </BIPSAppProvider> */}
            </AppFrameProvider>
        </>
    );
}

class Trade extends React.PureComponent {
    //hanya memanggil headernya saja
    render () {
        return (
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

class OrderbookPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

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

    render() {
        return (
            <div className="col-sm-12 pl-2 mx-0 pt-1">
                <WSConnectionAction ref="wsAction" /> {/* websocket connection component */}
                <div className="bg-black-trading f-12">
                    <AppFrameAction ref="frameAction" />
                    <div className="d-border-bottom">
                        <div className="col-sm-4 px-0 row">
                            <div className="col-sm-6 px-0 mx-0 text-left pt-3 pb-2">
                                <Dropdown text={
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
                            </div>
                            <div className="col-sm-6 px-0 mx-0 text-right pt-3 pb-1">
                                <button className="btn btn-sm btn-grey" onClick={this.buttonClickAmendRegister}>Register/Amend</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-530 col-sm-12 pt-3 pr-2 mr-0 row scrollable">
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="AALI"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="TLKM"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="BMRI"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="WSKT"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="ADHI"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="CTRA"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="BBRI"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="BBCA"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="INDF"/>
                            </div>
                        </div>
                        <div className="col-sm-4 pl-4 pr-0">
                            <div className="bg-grey pt-1">
                                <TableInfoTransactionWithButton saham="SMGR"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const TradeWatchlistFrameHeader = (props) => {
    return (
        <></>
    );
}

const TradeWatchlist = (props) => {
    return(
        <AppFrameProvider
            initialClasses={{BuyPage, SellPage}}
            initialFrames={
                [
                    {className: 'BuyPage', title: 'TRADE WATCHLIST BUY', instanceName: 'stockWatchlistBuy'},
                    {className: 'SellPage', title: 'TRADE WATCHLIST SELL', instanceName: 'stockWatchlistSell'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 pl-2 mx-0 pt-1">
                <div className="col-sm-4 px-0 mx-0">
                    <AppModal/>
                    <TableTradeWatchlist/>
                </div>
                <div className="col-sm-8 px-0 mx-0">
                    <div className="col-sm-12 px-2 d-border-bottom">
                        <MenuOfContent linkTitles={
                            {
                                stockWatchlistBuy : 'BUY',
                                stockWatchlistSell: 'SELL',
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2 pt-4">
                        <AppFrame headerComponent={TradeWatchlistFrameHeader}/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const ATradeWatchlist = (props) => {
    return(
        <AppFrameProvider
            initialClasses={{SettingInWatchlist, OrderHistoryAgGrid}}
            initialFrames={
                [
                    {className: 'SettingInWatchlist', title: 'TRADE WATCHLIST BUY', instanceName: 'autoPageSetting'},
                    {className: 'OrderHistoryAgGrid', title: 'TRADE WATCHLIST SELL', instanceName: 'autoPageHistory'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 pl-2 mx-0 pt-1">
                <div className="col-sm-4 px-0 mx-0">
                    <AppModal/>
                    <TableTradeWatchlist/>
                </div>
                <div className="col-sm-8 px-0 mx-0">
                    <div className="col-sm-12 px-2 d-border-bottom">
                        <MenuOfContent linkTitles={
                            {
                                autoPageSetting : 'ORDER SETTING',
                                autoPageHistory: 'AUTOMATIC ORDER HISTORY',
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2 pt-4">
                        <AppFrame headerComponent={TradeWatchlistFrameHeader}/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const ATradeTick = (props) => {
    return(
        <AppFrameProvider
            initialClasses={{SettingInTick, OrderHistoryAgGrid}}
            initialFrames={
                [
                    {className: 'SettingInTick', title: 'TRADE WATCHLIST BUY', instanceName: 'autoPageSetting'},
                    {className: 'OrderHistoryAgGrid', title: 'TRADE WATCHLIST SELL', instanceName: 'autoPageHistory'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 pl-2 mx-0 pt-1">
                <div className="col-sm-4 px-0 mx-0">
                    <AppModal/>
                    <TableTradeWatchlist/>
                </div>
                <div className="col-sm-8 px-0 mx-0">
                    <div className="col-sm-12 px-2 d-border-bottom">
                        <MenuOfContent linkTitles={
                            {
                                autoPageSetting : 'ORDER SETTING',
                                autoPageHistory: 'AUTOMATIC ORDER HISTORY',
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2 pt-4">
                        <AppFrame headerComponent={TradeWatchlistFrameHeader}/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const ATradeDaily = (props) => {
    return(
        <AppFrameProvider
            initialClasses={{SettingInDaily, OrderHistoryAgGrid}}
            initialFrames={
                [
                    {className: 'SettingInDaily', title: 'TRADE WATCHLIST BUY', instanceName: 'autoPageSetting'},
                    {className: 'OrderHistoryAgGrid', title: 'TRADE WATCHLIST SELL', instanceName: 'autoPageHistory'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 pl-2 mx-0 pt-1">
                <div className="col-sm-4 px-0 mx-0">
                    <AppModal/>
                    <TableTradeWatchlist/>
                </div>
                <div className="col-sm-8 px-0 mx-0">
                    <div className="col-sm-12 px-2 d-border-bottom">
                        <MenuOfContent linkTitles={
                            {
                                autoPageSetting : 'ORDER SETTING',
                                autoPageHistory: 'AUTOMATIC ORDER HISTORY',
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2 pt-4">
                        <AppFrame headerComponent={TradeWatchlistFrameHeader}/>
                    </div>
                </div>
            </div>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}


class SettingInWatchlist extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <SettingOrder lpSetting="setWatchlist" volSetting="volsetWatchlist" opSetting="opsetWatchlist" slpSetting="ssetWatchlist" svolSetting="svolsetWatchlist" sopSetting="sopsetWatchlist"/>
            </>
        );
    }

}

class SettingInTick extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <SettingOrder lpSetting="setTick" volSetting="volsetTick" opSetting="opsetTick" slpSetting="ssetTick" svolSetting="svolsetTick" sopSetting="sopsetTick"/>
            </>
        );
    }

}

class SettingInDaily extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <SettingOrder lpSetting="setDaily" volSetting="volsetDaily" opSetting="opsetDaily" slpSetting="ssetDaily" svolSetting="svolsetDaily" sopSetting="sopsetDaily"/>
            </>
        );
    }

}

/*const TableTradeWatchlist = ContextConnector(BIPSAppContext,
    (vars, actions, props)=>({
        subscribeMsg: vars.subscribeMsg,
        stockSummary:vars.stockSummary,
        sessionID:vars.sessionID,
        subscribeStock:(sessionID) => {actions.sendAction('subscribeStock', {sessionID})}
    })
)(TableTradeWatchlist_Base)*/

// TableTradeWatchlist_Base
class TableTradeWatchlist extends React.Component{
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
                <AppFrameAction ref="frameAction" />
                <div className="d-border-bottom">
                    <div className="col-sm-12 px-0 row">
                        <div className="col-sm-6 px-0 mx-0 text-left pt-3 pb-2">
                            <Dropdown text={
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
                        </div>
                        <div className="col-sm-6 px-0 mx-0 text-right pt-3 pb-1">
                            <button className="btn btn-sm btn-grey" onClick={this.buttonClickAmendRegister}>Register/Amend</button>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-4">
                    <TradeWatchlistAgGrid />
                </div>
            </div>
        </>);
    }
}

const CustomFrameHeaderTrade = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isManual:vars.isManual,
        handleManual:(isManual)=>{actions.sendAction('handleManual',{isManual})}
    })
)(CustomFrameHeaderTrade_Base);

class TradeWatchlistAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 69,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
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
                { field: "accumulated", headerName: "Accumulated Foreign Vol.", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 120,
                    cellClass : function (params) {
                        return "text-right grid-table f-12";
                    } },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 94,
                    cellClass : function (params) {
                        return "text-right grid-table f-12";
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
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "ANTM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BBCA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "TLKM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BBRI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "ASII",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BBMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "WSKT",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "AGII",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "ADHI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SMGR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "EMTK",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "MREI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "PTSP",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "TCPI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BRAM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "INDF",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "JECC",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "RDTX",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "DUTI",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "FASW",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "IBST",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SMMA",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "TKIM",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "JSMR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SONA",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "AMFG",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "SCCO",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "BYAN",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "UNTR",
                    price: "3,870",
                    change: "50",
                    persen: "0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "GGRM",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
                { code: "UNVR",
                    price: "3,870",
                    change: "-50",
                    persen: "-0.2",
                    tvol: "156,450", accumulated: "1,500",
                    avgprice: "6,950"},
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

    render() {
        return (
            <>
                <div
                    className="card-530 ag-theme-balham-dark ag-header-border d-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}>
                    </AgGridReact>
                </div>
            </>
        );
    }
}

class BuyPage extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 mt-4 f-12">
                        <TableInfoTransaction lotshare="buyPage" />
                    </div>
                    <div className="col-sm-6 mt-4 d-border-active bg-dark-grey pb-3">
                        <FormBuy idPrice="tradeBuyPrice" idVol="tradeBuyVol" idValue="tradeBuyValue" columnSm="col-sm-12"/>
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
                    <div className="col-sm-6 pr-3 pl-0 mt-4 f-12">
                        <TableInfoTransaction lotshare="sellPage" />
                    </div>
                    <div className="col-sm-6 mt-4 d-border-active bg-dark-grey pb-3">
                        <FormSell idPrice="tradeSellPrice" idVol="tradeSellVol" idValue="tradeSellValue" columnSm="col-sm-12"/>
                    </div>
                </div>
            </>
        );
    }

}

class OrderHistoryAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "cmd", headerName: "Cmd", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 70,
                    cellClass : function (params) {
                        var cmd = params.data.cmd;
                        return cmd.includes('BUY') === true ? "text-center grid-table f-12 text-danger" : "text-center grid-table f-12 text-success";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 70,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },},
                { field: "condition", headerName: "Condition", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 135,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },},
                { field: "vol", headerName: "Vol", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 90,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }, },
                { field: "price", headerName: "Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 100,
                    cellClass : function (params) {
                        return "text-right grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        return "IDR "+ params.data.price;
                    }},
                { field: "expiredate", headerName: "Expire Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 120,
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    }, },
                { field: "action", headerName: "Action", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 120, pinned : "right",
                    cellClass : function (params) {
                        return "text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        return '<div class="text-center"><a class="text-primary click-pointer">Edit</a> | <a class="text-danger click-pointer">Delete</a></div>'
                    }},
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
                headerCheckboxSelection: isFirstColumn,
                checkboxSelection: isFirstColumn,

            },
            rowSelection: "multiple",
            getRowHeight : function(params){
                return 27;
            },
            rowData: [
                { cmd: "BUY",
                    code: "AALI",
                    condition: "Last Price <= 12,750",
                    vol: "10 lot",
                    price: "12,750,000",
                    expiredate: "18 November 2019",
                    action: "",
                },
                { cmd: "SELL",
                    code: "TLKM",
                    condition: "Last Price <= 3,000",
                    vol: "5 lot",
                    price: "1,500,000",
                    expiredate: "2 Agustus 2019",
                    action: "",
                },
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

        function isFirstColumn(params) {
            var displayedColumns = params.columnApi.getAllDisplayedColumns();
            var thisIsFirstColumn = displayedColumns[0] === params.column;
            return thisIsFirstColumn;
        }
    }

    render() {
        return (
            <>
                <button className="d-border mr-3 mb-3 col-sm-2 btn btn-sm btn-danger"><span>ALL ON</span></button>
                <button className="d-border mr-3 mb-3 col-sm-2 btn btn-sm btn-dark"><span>ALL OFF</span></button>
                <div
                    className="card card-xmini ag-theme-balham-dark ag-header-border"
                    style={{
                        width: 'auto' }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        rowSelection={this.state.rowSelection}>
                    </AgGridReact>

                    <button className="d-border mr-3 mb-3 col-sm-2 btn btn-sm btn-dark"><span><i className="fa fa-trash-alt"></i>&nbsp; Delete All</span></button>
                </div>
            </>
        );
    }
}

export {CustomFrameHeaderTrade, Trade};
