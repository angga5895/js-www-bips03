import React from 'react';
import ReactDOM from 'react-dom';

// internal framework libraries
import { AppFrameAction } from '../appframe.js';
import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import { NetAppProvider, WSConnection } from '../appnetwork';
import { BIPSAppContext } from '../AppData.js';
import { ContextConnector } from '../appcontext.js';
// application-logic libraries
import FillHeaderTab from "../tabheaderfill";
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

// import frames goes here
import ModalBuy from './../app_modals/modal_buy';
import ModalSell from "./../app_modals/modal_sell";
import ModalAmend from "./../app_modals/modal_amend";
import VerifyPIN from "./verifyPin";
import ModalOrderDetail from "./../app_modals/modal_order_detail";
import ReactTooltip from "react-tooltip";

const CustomFrameHeaderLanding_Base = (props) =>{
    // console.log(props.isGrid)
    return (
        <AppFrameProvider
            initialClasses={{
                LandingPage,
                OrderList,
                FixedIncome,
                MutualFund,
            }}
            initialFrames={
                [
                    {className: 'LandingPage', title: 'LANDING PAGE', instanceName: 'landingPageInvboard'},
                    {className: 'OrderList', title: 'ORDER LIST PAGE', instanceName: 'orderListPageInvboard'},
                    {className: 'FixedIncome', title: 'FIXED INCOME PAGE', instanceName: 'fixIncomePageInvboard'},
                    {className: 'MutualFund', title: 'MUTUAL FUND PAGE', instanceName: 'mutualFundPageInvboard'},
                ]
            }>
            {/* <BIPSAppProvider> */}
            <div className="row col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-10 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab linkTitles={
                        {
                            landingPageInvboard: 'PORTOFOLIO',
                            orderListPageInvboard: 'ORDER LIST',
                            fixIncomePageInvboard: 'FIXED INCOME',
                            mutualFundPageInvboard: 'MUTUAL FUND'
                        }
                    }/>
                </div>
                <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                    <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleView(props.isGrid)}}>{props.isGrid ? "Tabview" : "GridView"}</button>
                </div>
            </div>
            <AppFrame headerComponent={LandingFrameHeader}/>
            <AppModal/>
            {/* </BIPSAppProvider> */}
        </AppFrameProvider>
    );
}

const LandingFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

class Landing extends React.PureComponent {

  render () {
    return (
        //hanya memanggil headernya saja
        <div className="bg-black-trading px-0 mx-0">
        </div>
    );
  }
}

class LandingPage_Base extends React.PureComponent {
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

    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render () {
        // console.log(this.props.isGrid)
        return (
            <>
                {this.props.isGrid ?
                    (<>
                        <style>{'' +
                            'thead tr:nth-child(2) th {' +
                            '    position: -webkit-sticky!important;' +
                            '    position: sticky!important;' +
                            '    top: 28.25px!important;' +
                            '    text-align: center!important;' +
                            '    border-top: #ffffff solid 1px!important;' +
                            '}' +
                            ''}
                        </style>
                        <div className="bg-black-trading">
                        <AppFrameAction ref="frameAction"></AppFrameAction>
                        <main>
                            <div className="container-fluid">
                                <div className="container px-1 mx-0 col-sm-12 row">
                                    {/* portofolio */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="d-border-active-tab card card-trading">
                                            <PortofolioGrid gridView="grid" classView="f-9" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5" />
                                        </div>
                                    </div>

                                    {/* FixedIncome */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <FixedIncomeGrid gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                    {/* order list */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                    {/* Mutual Funs */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <MutualFundGrid gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div></>)
                    :
                    (<>
                        <style>{'' +
                            'thead tr:nth-child(2) th {' +
                            '    position: -webkit-sticky!important;' +
                            '    position: sticky!important;' +
                            '    top: 33px!important;' +
                            '    text-align: center!important;' +
                            '    border-top: #ffffff solid 1px!important;' +
                            '}' +
                            ''}
                        </style>

                        <div className="card card-75">
                            <AppFrameAction ref="frameAction" />
                            <PortofolioGrid gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5" />
                        </div>
                    </>)
                }
            </>
        );
    }
}

class OrderList_Base extends React.Component{
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

    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render() {
        return (
            <>
                {this.props.isGrid ?
                    (<div className="bg-black-trading">
                        <style>{'' +
                        'thead tr:nth-child(2) th {' +
                        '    position: -webkit-sticky!important;' +
                        '    position: sticky!important;' +
                        '    top: 28.25px!important;' +
                        '    text-align: center!important;' +
                        '    border-top: #ffffff solid 1px!important;' +
                        '}' +
                        ''}
                        </style>
                        <AppFrameAction ref="frameAction"></AppFrameAction>
                        <main>
                            <div className="container-fluid">
                                <div className="container px-1 mx-0 col-sm-12 row">
                                    {/* portofolio */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <PortofolioGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                    {/* FixedIncome */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <FixedIncomeGrid gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                    {/* OrderList */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="d-border-active-tab card card-trading">
                                            <OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                    {/* Mutual Funs */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <MutualFundGrid gridView="grid" classView="f-9" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </main>
                    </div>)
                    :
                    (<>
                        <style>{'' +
                        'thead tr:nth-child(2) th {' +
                        '    position: -webkit-sticky!important;' +
                        '    position: sticky!important;' +
                        '    top: 33px!important;' +
                        '    text-align: center!important;' +
                        '    border-top: #ffffff solid 1px!important;' +
                        '}' +
                        ''}
                        </style>

                        <div className="card card-75">
                            <AppFrameAction ref="frameAction" />
                            <OrderListGrid clickorderdetail={this.buttonClickOrderDetail} gridView="tab" classView="f-12" clickwithdraw={this.buttonClickWithdraw} clickamend={this.buttonClickAmend} tp1="otooltip1" tp2="otooltip2" tp3="otooltip3" tp4="otooltip4" tp5="otooltip5" />
                        </div>
                    </>)
                }
            </>
        );
    }
}

class FixedIncome_Base extends React.PureComponent {
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

    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render () {
        return (<>
                { this.props.isGrid ?
                    (<div className="bg-black-trading">
                            <AppFrameAction ref="frameAction" />
                            <main>
                                <div className="container-fluid">
                                    <div className="container px-1 mx-0 col-sm-12 row">

                                        {/* portofolio */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="bg-black-inactive card card-trading">
                                                <PortofolioGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} gridView="grid" classView="f-9" />
                                            </div>
                                        </div>

                                        {/* FixedIncome */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="d-border-active-tab card card-trading">
                                                <FixedIncomeGrid gridView="grid" classView="f-9" />
                                            </div>
                                        </div>

                                        {/* order list */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="bg-black-inactive card card-trading">
                                                <OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />
                                            </div>
                                        </div>

                                        {/* Mutual Funs */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="bg-black-inactive card card-trading">
                                                <MutualFundGrid gridView="grid" classView="f-9" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </main>
                        </div>
                    )
                    :
                    (<>
                        <div className="card card-75">
                            <AppFrameAction ref="frameAction" />
                            <FixedIncomeGrid gridView="tab" classView="f-12"  />
                        </div>
                    </>)
                }
            </>
        );
    }
}

class MutualFund_Base extends React.PureComponent {
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

    buttonClickAmend = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'large',
            contentClass: AmendModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickWithdraw = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: WithdrawModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickOrderDetail = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () =>
                <div className="col-sm-12 px-0 mx-0 text-right">
                    <i className="icofont icofont-close text-icofont-close text-border click-pointer" onClick={this.closeClick}></i>
                </div>,
            size: 'large',
            contentClass: OrderDetailModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render () {
        return (<>
            {this.props.isGrid ?
                (<div className="bg-black-trading">
                    <AppFrameAction ref="frameAction"></AppFrameAction>
                    <main>
                        <div className="container-fluid">
                            <div className="container px-1 mx-0 col-sm-12 row">
                                {/* portofolio */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="bg-black-inactive card card-trading">
                                        <PortofolioGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} gridView="grid" classView="f-9" />
                                    </div>
                                </div>

                                {/* FixedIncome */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="bg-black-inactive card card-trading">
                                        <FixedIncomeGrid gridView="grid" classView="f-9" />
                                    </div>
                                </div>

                                {/* Order list */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="bg-black-inactive card card-trading">
                                        <OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />
                                    </div>
                                </div>

                                {/* Mutual Funs */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="d-border-active-tab card card-trading">
                                        <MutualFundGrid gridView="grid" classView="f-9" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </main>
                </div>)
                :
                (<>
                    <div className="card card-75">
                        <AppFrameAction ref="frameAction" />
                        <MutualFundGrid gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5" />
                    </div>
                </>)
            }
        </>);
    }
}

// tabel Portofolio
const PortofolioTable = (props) => {
    return(
        <div>
        </div>
    )
}

// tabel orderlist
const OrderListTable = (props) =>{
    return(
        <div></div>
    )
}

// FixedIncomeTable
const FixedIncomeTable = (props) => {
    return(
        <div></div>
    )
}

// Mutual Fund table
const MutualFundTable = (props) => {
    return(
        <div></div>
    )
}


class PortofolioGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "code", title: "Code"},
                { name: "avgprice", title: "Avg. Price"},
                { name: "lastprice", title: "Last Price"},
                { name: "lot", title: "Vol.Lot" },
                { name: "shares", title: "Vol. Shares" },
                { name: "stockval", title: "Stock Val" },
                { name: "pl", title: "P/L" },
                { name: "remark", title: "Remark" },
                { name: "action", title: "Action" },
            ],
            colspan: [{
                title: 'Vol',
                align : 'center',
                children: [
                    { columnName: 'lot' },
                    { columnName: 'shares' },
                ],
            }],
            rows: [
                { code: "AALI",
                    avgprice: <div className="text-danger">12,650</div>,
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -60,240 &nbsp; -0,40%</div>,
                    remark: <i class="fa fa-info-circle text-danger" id="ptooltip1" data-tip data-for='errorTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ADHI",
                    avgprice: <div className="text-danger">1,529</div>,
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -15,000 &nbsp; -1,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ANTM",
                    avgprice: <div className="text-danger">1,025</div>,
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -25,000 &nbsp; -2,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ASII",
                    avgprice: <div className="text-danger">7,125</div>,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -50,000 &nbsp; -5,78%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "BBCA",
                    avgprice: <div className="text-success">27,400</div>,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: <div className="text-success"><i className="icofont icofont-caret-down"></i>&nbsp; +250,650 &nbsp; +2,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},{ code: "AALI",
                    avgprice: <div className="text-danger">12,650</div>,
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -60,240 &nbsp; -0,40%</div>,
                    remark: <i class="fa fa-info-circle text-danger" id="ptooltip1" data-tip data-for='errorTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ADHI",
                    avgprice: <div className="text-danger">1,529</div>,
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -15,000 &nbsp; -1,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ANTM",
                    avgprice: <div className="text-danger">1,025</div>,
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -25,000 &nbsp; -2,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ASII",
                    avgprice: <div className="text-danger">7,125</div>,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -50,000 &nbsp; -5,78%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "BBCA",
                    avgprice: <div className="text-success">27,400</div>,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: <div className="text-success"><i className="icofont icofont-caret-down"></i>&nbsp; +250,650 &nbsp; +2,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},{ code: "AALI",
                    avgprice: <div className="text-danger">12,650</div>,
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -60,240 &nbsp; -0,40%</div>,
                    remark: <i class="fa fa-info-circle text-danger" id="ptooltip1" data-tip data-for='errorTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ADHI",
                    avgprice: <div className="text-danger">1,529</div>,
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -15,000 &nbsp; -1,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ANTM",
                    avgprice: <div className="text-danger">1,025</div>,
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -25,000 &nbsp; -2,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "ASII",
                    avgprice: <div className="text-danger">7,125</div>,
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -50,000 &nbsp; -5,78%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
                { code: "BBCA",
                    avgprice: <div className="text-success">27,400</div>,
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: <div className="text-success"><i className="icofont icofont-caret-down"></i>&nbsp; +250,650 &nbsp; +2,50%</div>,
                    remark: <i class="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button><button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button></div>},
            ],
            defaultColumnWidths: [
                { columnName: 'code', align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'avgprice', align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'lastprice', align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'lot', align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'shares', align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'stockval', align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'pl', align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'remark', align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: 'action', align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
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
                className={"bg-grey "+this.props.classView}
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
                className={this.props.gridView == "grid" ? "scroll-tbody bg-black-trading table-borderless table-responsive scrollable px-5 "+this.props.classView : "scroll-tbody-tab bg-black-trading table-borderless table-responsive scrollable px-5 "+this.props.classView}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading "+this.props.classView}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"t-border-bottom grid-table "+this.props.classView}>
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
                <ReactTooltip id='errorTooltip' place="bottom" type="error" effect="solid" getContent={(dataTip) => 'Not yet submit annual financial report'}/>
                <ReactTooltip id='infoTooltip' place="bottom" type="info" effect="solid" getContent={(dataTip) => 'Not issue'}/>
                <Grid rows={rows} columns={columns} className={"bg-primary "+this.props.classView}>
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
                        defaultOrder={['code', 'avgprice', 'lastprice', 'lot', 'shares', 'stockval', 'pl', 'remark', 'action']}
                    />
                    <TableHeaderRow showSortingControls />
                    {/*<TableBandHeader
                        columnBands={colspan}
                    />*/}
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarPortofolio gridIs={this.props.gridView}/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarPortofolio extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-4 col-sm-12">
                        <div className={this.props.gridIs == 'grid' ? "row col-sm-12 px-0 mx-0 py-3" : "row col-sm-12 px-4 mx-0 py-3"}>
                            <div className="col-sm-10 px-0 mx-0">{this.props.gridIs == 'grid' ? 'PORTOFOLIO EQUITY' : ''}</div>
                            <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                <i className="f-18 ion ion-md-sync click-pointer"></i>
                            </div>
                        </div>
                        <div className="row col-sm-12 px-0 mx-0 py-3">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary">15,234,000</span>
                                <br/> Stock Val
                            </div>
                            <div className="col-sm-4 px-0 mx-0 text-center">
                                <span className="text-success">+1,496,198 (+7.50%)</span>
                                <br/> P/L
                            </div>
                            <div className="col-sm-6 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class OrderListGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "order", title: "Order#"},
                { name: "marketorder", title: "Market Order#"},
                { name: "code", title: "Code"},
                { name: "cmd", title: "Cmd" },
                { name: "status", title: "Status" },
                { name: "remark", title: "Remark" },
                { name: "type", title: "Type" },
                { name: "mkt", title: "Mkt" },
                { name: "vlot", title: "Vol. Lot" },
                { name: "vshares", title: "Vol. Shares" },
                { name: "price", title: "Price" },
                { name: "mlot", title: "Match Vol. Lot" },
                { name: "mshares", title: "Match Vol. Shares" },
                { name: "avgmatchprice", title: "Avg. Match Price" },
                { name: "amount", title: "Amount" },
                { name: "time", title: "Time" },
                { name: "action", title: "Action" },
            ],
            colspan: [{
                title: 'Vol',
                align : 'center',
                children: [
                    { columnName: 'vlot' },
                    { columnName: 'vshares' },
                ],
            },{
                title: 'Match Vol',
                align : 'center',
                children: [
                    { columnName: 'mlot' },
                    { columnName: 'mshares' },
                ],
            }],
            rows: [
                {order :<div className="text-primary click-pointer" onClick={props.clickorderdetail}>001682</div>,
                    marketorder :"MKT021",
                    code :<div className="text-primary">AALI</div>,
                    cmd :<div className="text-danger">BUY</div>,
                    status :"Done",
                    remark : <div><i className="fa fa-check text-success"></i> &nbsp;&nbsp; Amended</div>,
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"100",
                    price :"12,625",
                    mlot :"10",
                    mshares :"100",
                    avgmatchprice :"12,625",
                    amount :"12,625,000",
                    time :"11:22:17",
                    action:<div className="px-4"><button className="btn btn-sm btn-primary mx-1 f-9 w-50" onClick={props.clickamend}>Amend</button><button className="btn btn-sm btn-brown mx-1 f-9 w-50" onClick={props.clickwithdraw}>Withdraw</button></div>},
                {order :<div className="text-primary click-pointer" onClick={props.clickorderdetail}>001681</div>,
                    marketorder :"-",
                    code :<div className="text-primary">AALI</div>,
                    cmd :<div className="text-success">SELL</div>,
                    status :"Sending...",
                    remark : <div><i className="fas fa-hourglass-half text-tosca"></i> &nbsp;&nbsp; to Server</div>,
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:22:10",
                    action:<div className="px-4"><button className="btn btn-sm btn-primary mx-1 f-9 w-50" onClick={props.clickamend}>Amend</button><button className="btn btn-sm btn-brown mx-1 f-9 w-50" onClick={props.clickwithdraw}>Withdraw</button></div>},
                {order :<div className="text-primary click-pointer" onClick={props.clickorderdetail}>001680</div>,
                    marketorder :"MKT012",
                    code :<div className="text-primary">AALI</div>,
                    cmd :<div className="text-success">SELL</div>,
                    status :"Done",
                    remark : <div><i className="fa fa-check text-success"></i> &nbsp;&nbsp;</div>,
                    type :"Day",
                    mkt :"RG",
                    vlot :"10",
                    vshares :"1000",
                    price :"12,650",
                    mlot :"10",
                    mshares :"1000",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:20:17",
                    action:<div className="px-4"><button className="btn btn-sm btn-primary mx-1 f-9 w-50" onClick={props.clickamend}>Amend</button><button className="btn btn-sm btn-brown mx-1 f-9 w-50" onClick={props.clickwithdraw}>Withdraw</button></div>},
                {order :<div className="text-primary click-pointer" onClick={props.clickorderdetail}>001679</div>,
                    marketorder :"MKT010",
                    code :<div className="text-primary">AALI</div>,
                    cmd :<div className="text-danger">BUY</div>,
                    status :"Partial",
                    remark : <div><i className="fa fa-check text-success"></i> &nbsp;&nbsp; Amended</div>,
                    type :"Day",
                    mkt :"RG",
                    vlot :"15",
                    vshares :"1500",
                    price :"12,650",
                    mlot :"5",
                    mshares :"500",
                    avgmatchprice :"12,650",
                    amount :"12,650,000",
                    time :"11:19:17",
                    action:<div className="px-4"><button className="btn btn-sm btn-primary mx-1 f-9 w-50" onClick={props.clickamend}>Amend</button><button className="btn btn-sm btn-brown mx-1 f-9 w-50" onClick={props.clickwithdraw}>Withdraw</button></div>},
                {order :<div className="text-primary click-pointer" onClick={props.clickorderdetail}>001678</div>,
                    marketorder :"MKT009",
                    code :<div className="text-primary">BBCA</div>,
                    cmd :<div className="text-danger">BUY</div>,
                    status :"Open",
                    remark : <div><i className="fa fa-check text-success"></i> &nbsp;&nbsp; Amended</div>,
                    type :"Day",
                    mkt :"RG",
                    vlot :"8",
                    vshares :"0",
                    price :"29,500",
                    mlot :"0",
                    mshares :"0",
                    avgmatchprice :"29,500",
                    amount :"23,600,000",
                    time :"11:10:12",
                    action:<div className="px-4"><button className="btn btn-sm btn-primary mx-1 f-9 w-50" onClick={props.clickamend}>Amend</button><button className="btn btn-sm btn-brown mx-1 f-9 w-50" onClick={props.clickwithdraw}>Withdraw</button></div>},
            ],
            defaultColumnWidths: [
                { columnName: "order", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "marketorder", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "code", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "cmd", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "status", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "remark", align:'left', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "type", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "mkt", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "vlot", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "vshares", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "price", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "mlot", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "mshares", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "avgmatchprice", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "amount", align:'right', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "time", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
                { columnName: "action", align:'center', width: this.props.gridView == 'grid' ? 10 : 135},
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
                className={"bg-grey "+this.props.classView}
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
                className={this.props.gridView == "grid" ? "scroll-tbody bg-black-trading table-borderless table-responsive table-striped scrollable px-5 "+this.props.classView : "scroll-tbody-tab bg-black-trading table-borderless table-responsive table-striped scrollable px-5 "+this.props.classView}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading "+this.props.classView}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table "+this.props.classView}>
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
                <Grid rows={rows} columns={columns} className={"bg-primary "+this.props.classView}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'order', direction: 'desc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['order', 'marketorder', 'code', 'cmd', 'status', 'remark', 'type', 'mkt', 'vlot',
                            'vshares', 'price', 'mlot', 'mshares', 'avgmatchprice', 'amount', 'time', 'action']}
                    />
                    <TableHeaderRow showSortingControls />
                    {/*<TableBandHeader
                        columnBands={colspan}
                    />*/}
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarOrderList gridIs={this.props.gridView}/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarOrderList extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-4 col-sm-12">
                        <div className={this.props.gridIs == 'grid' ? "row col-sm-12 px-0 mx-0 py-3" : "row col-sm-12 px-4 mx-0 py-3"}>
                            <div className="col-sm-10 px-0 mx-0">{this.props.gridIs == 'grid' ? 'ORDER LIST' : ''}</div>
                            <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                <i className="f-18 ion ion-md-sync click-pointer"></i>
                            </div>
                        </div>
                        <div className="row col-sm-12 px-0 mx-0 py-3">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary"></span>
                                <br/>
                            </div>
                            <div className="col-sm-4 px-0 mx-0 text-center">
                                <span className="text-success"></span>
                                <br/>
                            </div>
                            <div className="col-sm-6 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class MutualFundGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "code", title: "Code"},
                { name: "nav", title: "NAV"},
                { name: "navdate", title: "NAV Date"},
                { name: "currency", title: "Currency" },
                { name: "potentialpl", title: "Potential P/L" },
                { name: "action", title: "Action" },
            ],
            rows: [
                { code: <div><span class="font-weight-bold">000D7Q</span><br /><span>RDPT BUMN Fund...</span></div>,
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -60,240 &nbsp; -0,40%</div>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { code: <div><span class="font-weight-bold">000D7T</span><br /><span>Reksa Dana Penyataan...</span></div>,
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -15,000 &nbsp; -1,50%</div>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { code: <div><span className="font-weight-bold">000D7Q</span><br/><span>RDPT BUMN Fund...</span></div>,
                    nav: "1,025",
                    navdate: "06/03/2019",
                    currency: "1,025,000",
                    potentialpl: <div className="text-success"><i className="icofont icofont-caret-up"></i>&nbsp; +250,660 &nbsp; +2,50%</div>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { code: <div><span className="font-weight-bold">000D7T</span><br/><span>Reksa Dana Penyataan...</span></div>,
                    nav: "7,125",
                    navdate: "06/03/2019",
                    currency: "7,125,000",
                    potentialpl: <div className="text-success"><i className="icofont icofont-caret-up"></i>&nbsp; +175 &nbsp; +1,75%</div>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { code: <div><span className="font-weight-bold">000D7Q</span><br/><span>RDPT BUMN Fund...</span></div>,
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -60,240 &nbsp; -0,40%</div>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { code: <div><span className="font-weight-bold">000D7T</span><br/><span>Reksa Dana Penyataan...</span></div>,
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: <div className="text-danger"><i className="icofont icofont-caret-down"></i>&nbsp; -15,000 &nbsp; -1,50%</div>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
            ],
            defaultColumnWidths: [
                { columnName: "code", align:'left', width: this.props.gridView == 'grid' ? 10 : 200},
                { columnName: "nav", align:'right', width: this.props.gridView == 'grid' ? 10 : 200},
                { columnName: "navdate", align:'center', width: this.props.gridView == 'grid' ? 10 : 200},
                { columnName: "currency", align:'right', width: this.props.gridView == 'grid' ? 10 : 200},
                { columnName: "potentialpl", align:'right', width: this.props.gridView == 'grid' ? 10 : 200},
                { columnName: "action", align:'center', width: this.props.gridView == 'grid' ? 10 : 200},
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
                className={"bg-grey "+this.props.classView}
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
                className={this.props.gridView == "grid" ? "scroll-tbody bg-black-trading table-borderless table-responsive scrollable px-5 "+this.props.classView : "scroll-tbody-tab bg-black-trading table-borderless table-responsive scrollable px-5 "+this.props.classView}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading "+this.props.classView}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table "+this.props.classView}>
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
                <Grid rows={rows} columns={columns} className={"bg-primary "+this.props.classView}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'navdate', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['code', 'nav', 'navdate', 'currency', 'potentialpl', 'action']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarMutualFund gridIs={this.props.gridView}/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarMutualFund extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-4 col-sm-12">
                        <div className={this.props.gridIs == 'grid' ? "row col-sm-12 px-0 mx-0 py-3" : "row col-sm-12 px-4 mx-0 py-3"}>
                            <div className="col-sm-10 px-0 mx-0">{this.props.gridIs == 'grid' ? 'MUTUAL FUND' : ''}</div>
                            <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                <i className="f-18 ion ion-md-sync click-pointer"></i>
                            </div>
                        </div>
                        <div className="row col-sm-12 px-0 mx-0 py-3">
                            <div className="col-sm-2 px-0 mx-0 text-center">
                                <span className="text-primary">4,088,802</span>
                                <br/> Invested
                            </div>
                            <div className="col-sm-4 px-0 mx-0 text-center">
                                <span className="text-success">+496,198 (+9.50%)</span>
                                <br/> P/L
                            </div>
                            <div className="col-sm-6 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
        );
    }
}

class FixedIncomeGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "no", title: "#"},
                { name: "serial", title: "Serial"},
                { name: "nominal", title: "Nominal (IDR)"},
                { name: "coupon", title: "Coupon" },
                { name: "couponpdate", title: "Coupon Payment Date" },
                { name: "duedate", title: "Due Date" },
                { name: "detail", title: "Detail" },
                { name: "action", title: "Action" },
            ],
            rows: [
                { no: "1",
                    serial: "SUNMP15042019",
                    nominal: "7,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 20 every month",
                    duedate: "02 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { no: "2",
                    serial: "SUNMP16042019",
                    nominal: "5,000,000",
                    coupon: "7,0%",
                    couponpdate: "date 21 every month",
                    duedate: "03 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { no: "3",
                    serial: "SUNMP17042019",
                    nominal: "2,000,000",
                    coupon: "5,0%",
                    couponpdate: "date 22 every month",
                    duedate: "04 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { no: "4",
                    serial: "SUNMP18042019",
                    nominal: "6,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 23 every month",
                    duedate: "05 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { no: "5",
                    serial: "SUNMP19042019",
                    nominal: "4,000,000",
                    coupon: "9,0%",
                    couponpdate: "date 24 every month",
                    duedate: "06 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { no: "6",
                    serial: "SUNMP20042019",
                    nominal: "12,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 25 every month",
                    duedate: "07 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
                { no: "7",
                    serial: "SUNMP21042019",
                    nominal: "10,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 26 every month",
                    duedate: "08 Jan 2021",
                    detail: <i class="fa fa-search click-pointer text-danger"></i>,
                    action:<div className="px-4"><button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button><button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button></div>},
            ],
            defaultColumnWidths: [
                { columnName: "no", align:'center', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "serial", align:'center', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "nominal", align:'right', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "coupon", align:'right', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "couponpdate", align:'center', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "duedate", align:'center', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "detail", align:'center', width: this.props.gridView == 'grid' ? 10 : 140},
                { columnName: "action", align:'center', width: this.props.gridView == 'grid' ? 10 : 140},
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
                className={"bg-grey "+this.props.classView}
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
                className={this.props.gridView == "grid" ? "scroll-tbody bg-black-trading table-borderless table-responsive table-striped scrollable px-5 "+this.props.classView : "scroll-tbody-tab bg-black-trading table-borderless table-responsive table-striped scrollable px-5 "+this.props.classView}
            />
        );

        const HeadComponent = ({ ...restProps }) => (
            <Table.TableHead
                {...restProps}
                className={"bg-black-trading "+this.props.classView}
            />
        );

        const HighlightedCell = ({ value, style, ...restProps }) => (
            <Table.Cell
                {...restProps}
                className={"grid-table "+this.props.classView}>
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
                <Grid rows={rows} columns={columns} className={"bg-primary "+this.props.classView}>
                    <SearchState defaultValue="" />
                    <IntegratedFiltering />
                    <SortingState
                        defaultSorting={[{ columnName: 'serial', direction: 'asc' }]}
                    />
                    <IntegratedSorting />
                    <DragDropProvider />
                    <Table height={300} headComponent={HeadComponent} tableComponent={TableComponent} cellComponent={Cell} columnExtensions={defaultColumnWidths} />
                    <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                    <TableColumnReordering
                        defaultOrder={['no', 'serial', 'nominal', 'coupon', 'couponpdate', 'duedate', 'detail', 'action']}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableColumnVisibility
                        defaultHiddenColumnNames={defaultHiddenColumnNames}
                    />
                    <Toolbar rootComponent={toolbarStyle} />
                    <ColumnChooser containerComponent={ColvisContainer} itemComponent={ColvisItem} toggleButtonComponent={ColvisButton} />
                    <SearchPanel inputComponent={searchStyle} />

                    <CustomToolbarFixedIncome gridIs={this.props.gridView}/>
                </Grid>
            </>
        );
    }
}

class CustomToolbarFixedIncome extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Plugin name="customToolbarMarkup">
                <Template name="toolbarContent">
                    <div className="f-14 px-0 mx-0 py-4 col-sm-12">
                        <div className={this.props.gridIs == 'grid' ? "row col-sm-12 px-0 mx-0 py-3" : "row col-sm-12 px-4 mx-0 py-3"}>
                            <div className="col-sm-10 px-0 mx-0">{this.props.gridIs == 'grid' ? 'FIXED INCOME' : ''}</div>
                            <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                <i className="f-18 ion ion-md-sync click-pointer"></i>
                            </div>
                        </div>
                        <div className="row col-sm-12 px-0 mx-0 py-3">
                            <div className="col-sm-6 px-0 mx-0 text-center">
                                <span className="text-primary">46,000,000</span>
                                <br/> Total Nominal
                            </div>
                            <div className="col-sm-6 px-0 mx-0 row">
                                <TemplatePlaceholder/>
                            </div>
                        </div>
                    </div>
                </Template>
            </Plugin>
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
                <ModalBuy/>
            </>
        );
    }
}

class SellModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalSell/>
            </>
        );
    }
}

class AmendModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalAmend/>
            </>
        );
    }
}

class WithdrawModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'withdraw'/>
            </>
        );
    }
}


class OrderDetailModal extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalOrderDetail/>
            </>
        );
    }
}

const CustomFrameHeaderLanding = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
        handleView:(isGrid)=>{actions.sendAction('handleView',{isGrid})}
    })
)(CustomFrameHeaderLanding_Base);

const LandingPage = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(LandingPage_Base);

const OrderList = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(OrderList_Base);

const FixedIncome = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(FixedIncome_Base);

const MutualFund = ContextConnector(BIPSAppContext,
    (vars, actions, props) => ({
        isGrid:vars.isGrid,
    })
)(MutualFund_Base);

export { CustomFrameHeaderLanding, Landing };
export default LandingPage;
