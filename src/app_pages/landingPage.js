import React from 'react';
import ReactDOM from 'react-dom';

// internal framework libraries
import { Popup } from 'semantic-ui-react';
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
import {AgGridReact} from "ag-grid-react";

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
                            landingPageInvboard: 'PORTFOLIO',
                            orderListPageInvboard: 'PEGADAIAN',
                            fixIncomePageInvboard: 'FIXED INCOME',
                            mutualFundPageInvboard: 'MUTUAL FUND'
                        }
                    }/>
                </div>
                <div className="col-sm-2 pr-4 mx-0 text-right d-border-bottom d-border-left cssmenu">
                    <button className="my-2 mx-0 col-sm-12 btn btn-md btn-dark" onClick={()=>{props.handleView(props.isGrid)}}>{props.isGrid ? "Tab View" : "Grid View"}</button>
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
                            <div className="container-fluid px-1">
                                <div className="container px-1 mx-0 col-sm-12 row">
                                    {/* portofolio */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="d-border-active-tab card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-2">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PORTFOLIO EQUITY</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                    </div>
                                                </div>
                                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        Stock Val : <span className="text-primary">15,234,000</span>
                                                    </div>
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <PortofolioAgGrid gridView="grid" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                            </div>
                                            {/*<PortofolioGrid gridView="grid" classView="f-9" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5" />*/}
                                        </div>
                                    </div>

                                    {/* FixedIncome */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-2">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">FIXED INCOME</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                    </div>
                                                </div>
                                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        Total Nominal : <span className="text-primary">46,000,000</span>
                                                    </div>
                                                    <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <FixedIncomeAgGrid gridView="grid" classView="f-12" />
                                            </div>
                                            {/*<FixedIncomeGrid gridView="grid" classView="f-9" />*/}
                                        </div>
                                    </div>

                                    {/* order list */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-0">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PEGADAIAN</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        <i className="f-18 ion ion-md-sync click-pointer"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body card-249 align-self-center text-center bg-grey f-12 py-5">
                                                <div className="py-5">
                                                    <div className="py-5">
                                                        <i className="icofont icofont-warning-alt f-16"></i>
                                                        <p>Not Available</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />*/}
                                        </div>
                                    </div>

                                    {/* Mutual Funs */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-2">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">MUTUAL FUND</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                    </div>
                                                </div>
                                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        Invested : <span className="text-primary">4,088,802</span>
                                                    </div>
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <MutualFundAgGrid gridView="grid" classView="f-12" />
                                            </div>
                                            {/*<MutualFundGrid gridView="grid" classView="f-9" />*/}
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
                            <div className="card-header bg-grey">
                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                    <div className="col-sm-4 px-4 mx-0 f-14">
                                        Stock Val : <span className="text-primary">15,234,000</span>
                                    </div>
                                    <div className="col-sm-4 px-4 mx-0 f-14">
                                        P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <PortofolioAgGrid gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                            </div>
                            {/*<PortofolioGrid gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5" />*/}
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
                            <div className="container-fluid px-1">
                                <div className="container px-1 mx-0 col-sm-12 row">
                                    {/* portofolio */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-2">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PORTFOLIO EQUITY</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                    </div>
                                                </div>
                                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        Stock Val : <span className="text-primary">15,234,000</span>
                                                    </div>
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <PortofolioAgGrid gridView="grid" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                            </div>
                                            {/*<PortofolioGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} gridView="grid" classView="f-9" />*/}
                                        </div>
                                    </div>

                                    {/* FixedIncome */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-2">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">FIXED INCOME</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                    </div>
                                                </div>
                                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        Total Nominal : <span className="text-primary">46,000,000</span>
                                                    </div>
                                                    <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <FixedIncomeAgGrid gridView="grid" classView="f-12" />
                                            </div>
                                            {/*<FixedIncomeGrid gridView="grid" classView="f-9" />*/}
                                        </div>
                                    </div>

                                    {/* OrderList */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="d-border-active-tab card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-0">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PEGADAIAN</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        <i className="f-18 ion ion-md-sync click-pointer"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body card-249 align-self-center text-center bg-grey f-12 py-5">
                                                <div className="py-5">
                                                    <div className="py-5">
                                                        <i className="icofont icofont-warning-alt f-16"></i>
                                                        <p>Not Available</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />*/}
                                        </div>
                                    </div>

                                    {/* Mutual Funs */}
                                    <div className="col-md-6 px-1 py-2">
                                        <div className="bg-black-inactive card card-trading">
                                            <div className="card-header bg-grey">
                                                <div className="row col-sm-12 px-0 mx-0 py-2">
                                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">MUTUAL FUND</div>
                                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                        {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                    </div>
                                                </div>
                                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        Invested : <span className="text-primary">4,088,802</span>
                                                    </div>
                                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                                        P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <MutualFundAgGrid gridView="grid" classView="f-12" />
                                            </div>
                                            {/*<MutualFundGrid gridView="grid" classView="f-9" />*/}
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
                            <div className="card-header bg-grey">
                                <div className="row col-sm-12 px-0 mx-0 py-3">
                                    <div className="col-sm-10 px-0 mx-0 f-14 align-self-center"></div>
                                    <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                        <i className="f-18 ion ion-md-sync click-pointer"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body card-550 align-self-center text-center bg-grey f-16 py-5">
                                <div className="py-5">
                                    <div className="py-5">
                                        <i className="icofont icofont-warning-alt f-18"></i>
                                        <p>Not Available</p>
                                    </div>
                                </div>
                            </div>
                            {/*<OrderListGrid clickorderdetail={this.buttonClickOrderDetail} gridView="tab" classView="f-12" clickwithdraw={this.buttonClickWithdraw} clickamend={this.buttonClickAmend} tp1="otooltip1" tp2="otooltip2" tp3="otooltip3" tp4="otooltip4" tp5="otooltip5" />*/}
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
                                <div className="container-fluid px-1">
                                    <div className="container px-1 mx-0 col-sm-12 row">

                                        {/* portofolio */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="bg-black-inactive card card-trading">
                                                <div className="card-header bg-grey">
                                                    <div className="row col-sm-12 px-0 mx-0 py-2">
                                                        <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PORTFOLIO EQUITY</div>
                                                        <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                            {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                        </div>
                                                    </div>
                                                    <div className="row col-sm-12 px-0 mx-0 py-1">
                                                        <div className="col-sm-5 px-4 mx-0 f-14">
                                                            Stock Val : <span className="text-primary">15,234,000</span>
                                                        </div>
                                                        <div className="col-sm-5 px-4 mx-0 f-14">
                                                            P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <PortofolioAgGrid gridView="grid" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                                </div>
                                                {/*<PortofolioGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} gridView="grid" classView="f-9" />*/}
                                            </div>
                                        </div>

                                        {/* FixedIncome */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="d-border-active-tab card card-trading">
                                                <div className="card-header bg-grey">
                                                    <div className="row col-sm-12 px-0 mx-0 py-2">
                                                        <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">FIXED INCOME</div>
                                                        <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                            {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                        </div>
                                                    </div>
                                                    <div className="row col-sm-12 px-0 mx-0 py-1">
                                                        <div className="col-sm-5 px-4 mx-0 f-14">
                                                            Total Nominal : <span className="text-primary">46,000,000</span>
                                                        </div>
                                                        <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <FixedIncomeAgGrid gridView="grid" classView="f-12" />
                                                </div>
                                                {/*<FixedIncomeGrid gridView="grid" classView="f-9" />*/}
                                            </div>
                                        </div>

                                        {/* order list */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="bg-black-inactive card card-trading">
                                                <div className="card-header bg-grey">
                                                    <div className="row col-sm-12 px-0 mx-0 py-0">
                                                        <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PEGADAIAN</div>
                                                        <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                            <i className="f-18 ion ion-md-sync click-pointer"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body card-249 align-self-center text-center bg-grey f-12 py-5">
                                                    <div className="py-5">
                                                        <div className="py-5">
                                                            <i className="icofont icofont-warning-alt f-16"></i>
                                                            <p>Not Available</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />*/}
                                            </div>
                                        </div>

                                        {/* Mutual Funs */}
                                        <div className="col-md-6 px-1 py-2">
                                            <div className="bg-black-inactive card card-trading">
                                                <div className="card-header bg-grey">
                                                    <div className="row col-sm-12 px-0 mx-0 py-2">
                                                        <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">MUTUAL FUND</div>
                                                        <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                            {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                        </div>
                                                    </div>
                                                    <div className="row col-sm-12 px-0 mx-0 py-1">
                                                        <div className="col-sm-5 px-4 mx-0 f-14">
                                                            Invested : <span className="text-primary">4,088,802</span>
                                                        </div>
                                                        <div className="col-sm-5 px-4 mx-0 f-14">
                                                            P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <MutualFundAgGrid gridView="grid" classView="f-12" />
                                                </div>
                                                {/*<MutualFundGrid gridView="grid" classView="f-9" />*/}
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
                            <div className="card-header bg-grey">
                                <div className="row col-sm-12 px-0 mx-0 py-1">
                                    <div className="col-sm-5 px-4 mx-0 f-14">
                                        Total Nominal : <span className="text-primary">46,000,000</span>
                                    </div>
                                    <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                </div>
                            </div>
                            <div className="card-body">
                                <FixedIncomeAgGrid gridView="tab" classView="f-12"/>
                            </div>
                            {/*<FixedIncomeGrid gridView="tab" classView="f-12"  />*/}
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
                        <div className="container-fluid px-1">
                            <div className="container px-1 mx-0 col-sm-12 row">
                                {/* portofolio */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="bg-black-inactive card card-trading">
                                        <div className="card-header bg-grey">
                                            <div className="row col-sm-12 px-0 mx-0 py-2">
                                                <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PORTFOLIO EQUITY</div>
                                                <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                    {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                </div>
                                            </div>
                                            <div className="row col-sm-12 px-0 mx-0 py-1">
                                                <div className="col-sm-5 px-4 mx-0 f-14">
                                                    Stock Val : <span className="text-primary">15,234,000</span>
                                                </div>
                                                <div className="col-sm-5 px-4 mx-0 f-14">
                                                    P/L : <span className="text-success">+1,496,198 (+7.50%)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <PortofolioAgGrid gridView="grid" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5"/>
                                        </div>
                                        {/*<PortofolioGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} gridView="grid" classView="f-9" />*/}
                                    </div>
                                </div>

                                {/* FixedIncome */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="bg-black-inactive card card-trading">
                                        <div className="card-header bg-grey">
                                            <div className="row col-sm-12 px-0 mx-0 py-2">
                                                <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">FIXED INCOME</div>
                                                <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                    {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                </div>
                                            </div>
                                            <div className="row col-sm-12 px-0 mx-0 py-1">
                                                <div className="col-sm-5 px-4 mx-0 f-14">
                                                    Total Nominal : <span className="text-primary">46,000,000</span>
                                                </div>
                                                <div className="col-sm-5 px-4 mx-0 f-14"></div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <FixedIncomeAgGrid gridView="grid" classView="f-12" />
                                        </div>
                                        {/*<FixedIncomeGrid gridView="grid" classView="f-9" />*/}
                                    </div>
                                </div>

                                {/* Order list */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="bg-black-inactive card card-trading">
                                        <div className="card-header bg-grey">
                                            <div className="row col-sm-12 px-0 mx-0 py-0">
                                                <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">PEGADAIAN</div>
                                                <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                    <i className="f-18 ion ion-md-sync click-pointer"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body card-249 align-self-center text-center bg-grey f-12 py-5">
                                            <div className="py-5">
                                                <div className="py-5">
                                                    <i className="icofont icofont-warning-alt f-16"></i>
                                                    <p>Not Available</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/*<OrderListGrid clickorderdetail={this.buttonClickOrderDetail} clickamend={this.buttonClickAmend} clickwithdraw={this.buttonClickWithdraw} gridView="grid" classView="f-9" />*/}
                                    </div>
                                </div>

                                {/* Mutual Funs */}
                                <div className="col-md-6 px-1 py-2">
                                    <div className="d-border-active-tab card card-trading">
                                        <div className="card-header bg-grey">
                                            <div className="row col-sm-12 px-0 mx-0 py-2">
                                                <div className="col-sm-10 px-0 mx-0 f-14 align-self-center">MUTUAL FUND</div>
                                                <div className="col-sm-2 text-right font-weight-bold px-0 mx-0">
                                                    {/*<i className="f-18 ion ion-md-sync click-pointer"></i>*/}
                                                </div>
                                            </div>
                                            <div className="row col-sm-12 px-0 mx-0 py-1">
                                                <div className="col-sm-5 px-4 mx-0 f-14">
                                                    Invested : <span className="text-primary">4,088,802</span>
                                                </div>
                                                <div className="col-sm-5 px-4 mx-0 f-14">
                                                    P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <MutualFundAgGrid gridView="grid" classView="f-12" />
                                        </div>
                                        {/*<MutualFundGrid gridView="grid" classView="f-9" />*/}
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
                        <div className="card-header bg-grey">
                            <div className="row col-sm-12 px-0 mx-0 py-1">
                                <div className="col-sm-4 px-4 mx-0 f-14">
                                    Invested : <span className="text-primary">4,088,802</span>
                                </div>
                                <div className="col-sm-4 px-4 mx-0 f-14">
                                    P/L : <span className="text-success">+496,198 (+9.50%)</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <MutualFundAgGrid gridView="tab" classView="f-12" />
                        </div>
                        {/*<MutualFundGrid gridView="tab" classView="f-12" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} tp1="ptooltip1" tp2="ptooltip2" tp3="ptooltip3" tp4="ptooltip4" tp5="ptooltip5" />*/}
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
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },{ code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },{ code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: "",
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: "",
                    action: ""},
                { code: "ASII",
                    avgprice: "7,125",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
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

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

            if(row.pl.includes('-') === true) {
                //global color
                if (column.name == 'avgprice') {
                    return <Table.Cell
                        {...restProps}
                        className={"text-danger t-border-bottom grid-table " + this.props.classView}>{value}&nbsp;&nbsp;&nbsp;
                        <i className="icofont icofont-caret-down text-danger"></i></Table.Cell>;
                } else if (column.name == 'pl') {
                    return <Table.Cell
                        {...restProps}
                        className={"text-danger t-border-bottom grid-table " + this.props.classView}>{value}</Table.Cell>;
                } else if (column.name == 'action') {
                    return <Table.Cell
                        {...restProps}
                        className={"t-border-bottom grid-table " + this.props.classView}>
                        <div className="px-4">
                            <button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button>
                            <button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button>
                        </div>
                    </Table.Cell>;
                } else if (column.name == 'remark') {
                    return <Table.Cell
                        {...restProps}
                        className={"t-border-bottom grid-table " + this.props.classView}>
                        {
                            (row.code.includes('AALI') === true ?
                                <i className="fa fa-info-circle text-danger" id="ptooltip1" data-tip data-for='errorTooltip'></i> :
                                <i className="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>)
                        }
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"t-border-bottom grid-table " + this.props.classView}>{value}</Table.Cell>;

                }
            } else{
                //global color
                if (column.name == 'avgprice') {
                    return <Table.Cell
                        {...restProps}
                        className={"text-success t-border-bottom grid-table " + this.props.classView}>{value} &nbsp;&nbsp;&nbsp;
                        <i className="icofont icofont-caret-up text-success"></i></Table.Cell>;
                } else if (column.name == 'pl') {
                    return <Table.Cell
                        {...restProps}
                        className={"text-success t-border-bottom grid-table " + this.props.classView}>{value}</Table.Cell>;
                } else if (column.name == 'action') {
                    return <Table.Cell
                        {...restProps}
                        className={"t-border-bottom grid-table " + this.props.classView}>
                        <div className="px-4">
                            <button className="btn btn-sm btn-danger mx-1 f-9 w-50" onClick={this.props.clickbuy}>Buy more</button>
                            <button className="btn btn-sm btn-success mx-1 f-9 w-50" onClick={this.props.clicksell}>Sell</button>
                        </div>
                    </Table.Cell>;
                } else if (column.name == 'remark') {
                    return <Table.Cell
                        {...restProps}
                        className={"t-border-bottom grid-table " + this.props.classView}>
                        {
                            (row.code.includes('AALI') === true ?
                                <i className="fa fa-info-circle text-danger" id="ptooltip1" data-tip data-for='errorTooltip'></i> :
                                <i className="fa fa-info-circle text-info" id="ptooltip1" data-tip data-for='infoTooltip'></i>)
                        }
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"t-border-bottom grid-table " + this.props.classView}>{value}</Table.Cell>;

                }
            }
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
                            <div className="col-sm-10 px-0 mx-0">{this.props.gridIs == 'grid' ? 'PORTFOLIO EQUITY' : ''}</div>
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
                {order : "001682",
                    marketorder :"MKT021",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Done",
                    remark : "Amended",
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
                    action: "",},
                {order : "001681",
                    marketorder :"-",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Sending...",
                    remark : "to Server",
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
                    action: "",},
                {order : "001680",
                    marketorder :"MKT012",
                    code : "AALI",
                    cmd : "SELL",
                    status :"Done",
                    remark : "",
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
                    action: "",},
                {order : "001679",
                    marketorder :"MKT010",
                    code : "AALI",
                    cmd : "BUY",
                    status :"Partial",
                    remark : "Amended",
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
                    action: "",},
                {order : "001678",
                    marketorder :"MKT009",
                    code : "BBCA",
                    cmd : "BUY",
                    status :"Open",
                    remark : "Amended",
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
                    action: "",},
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

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

                //global color
                if (column.name == 'order') {
                    return <Table.Cell
                        {...restProps}
                        onClick={this.props.clickorderdetail} className={"text-primary grid-table click-pointer "+this.props.classView}>{value}</Table.Cell>;
                } else if (column.name == 'code') {
                    return <Table.Cell
                        {...restProps}
                        className={"text-primary grid-table "+this.props.classView}>{value}</Table.Cell>;
                } else if (column.name == 'action') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table " + this.props.classView}>
                        <div className="px-4">
                            <button className="btn btn-sm btn-primary mx-1 f-9 w-50" onClick={this.props.clickamend}>Amend</button>
                            <button className="btn btn-sm btn-brown mx-1 f-9 w-50" onClick={this.props.clickwithdraw}>Withdraw</button>
                        </div>
                    </Table.Cell>;
                } else if (column.name == 'cmd') {
                    return <Table.Cell
                        {...restProps}
                        className={value == 'BUY' ? "grid-table text-danger " + this.props.classView : "grid-table text-success " + this.props.classView}>
                            {value}
                        </Table.Cell>;
                } else if (column.name == 'remark') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table " + this.props.classView}>
                        {
                            (row.status.includes('Sending') === true ?
                                <div><i className="fas fa-hourglass-half text-tosca"></i> &nbsp;&nbsp; {value}</div>:
                                <div><i className="fa fa-check text-success"></i> &nbsp;&nbsp; {value}</div> )
                        }
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table " + this.props.classView}>{value}</Table.Cell>;

                }
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
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "1,025",
                    navdate: "06/03/2019",
                    currency: "1,025,000",
                    potentialpl: "+250,660"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "7,125",
                    navdate: "06/03/2019",
                    currency: "7,125,000",
                    potentialpl: "+175"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+1,75%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
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

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

            if(row.potentialpl.includes('-') === true){
                //global color
                if (column.name == 'code') {
                    var data = value.split('-');
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table "+this.props.classView}>
                        <span className="font-weight-bold">{data[0]}</span>
                        <br /><span>{data[1]}</span>
                    </Table.Cell>;
                } else if (column.name == 'currency') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table "+this.props.classView}>
                        {value} &nbsp;&nbsp;&nbsp; <i className="icofont icofont-caret-down text-danger"></i>
                    </Table.Cell>;
                } else if (column.name == 'potentialpl') {
                    return <Table.Cell
                        {...restProps}
                        className={value.includes('-') === true ? "text-danger grid-table "+this.props.classView : "text-success grid-table "+this.props.classView}>
                        {value}
                    </Table.Cell>;
                } else if (column.name == 'action') {
                    var data = value.split('-');
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table "+this.props.classView}>
                        <div className="px-4">
                            <button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button>
                            <button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>
                        </div>
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table " + this.props.classView}>{value}</Table.Cell>;

                }
            } else {
                //global color
                if (column.name == 'code') {
                    var data = value.split('-');
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table "+this.props.classView}>
                        <span className="font-weight-bold">{data[0]}</span>
                        <br /><span>{data[1]}</span>
                    </Table.Cell>;
                } else if (column.name == 'currency') {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table "+this.props.classView}>
                        {value} &nbsp;&nbsp;&nbsp; <i className="icofont icofont-caret-up text-success"></i>
                    </Table.Cell>;
                } else if (column.name == 'potentialpl') {
                    return <Table.Cell
                        {...restProps}
                        className={value.includes('-') === true ? "text-danger grid-table "+this.props.classView : "text-success grid-table "+this.props.classView}>
                        {value}
                    </Table.Cell>;
                } else if (column.name == 'action') {
                    var data = value.split('-');
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table "+this.props.classView}>
                        <div className="px-4">
                            <button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button>
                            <button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>
                        </div>
                    </Table.Cell>;
                } else {
                    return <Table.Cell
                        {...restProps}
                        className={"grid-table " + this.props.classView}>{value}</Table.Cell>;

                }
            }
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
                    detail: "",
                    action: ""},
                { no: "2",
                    serial: "SUNMP16042019",
                    nominal: "5,000,000",
                    coupon: "7,0%",
                    couponpdate: "date 21 every month",
                    duedate: "03 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "3",
                    serial: "SUNMP17042019",
                    nominal: "2,000,000",
                    coupon: "5,0%",
                    couponpdate: "date 22 every month",
                    duedate: "04 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "4",
                    serial: "SUNMP18042019",
                    nominal: "6,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 23 every month",
                    duedate: "05 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "5",
                    serial: "SUNMP19042019",
                    nominal: "4,000,000",
                    coupon: "9,0%",
                    couponpdate: "date 24 every month",
                    duedate: "06 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "6",
                    serial: "SUNMP20042019",
                    nominal: "12,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 25 every month",
                    duedate: "07 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "7",
                    serial: "SUNMP21042019",
                    nominal: "10,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 26 every month",
                    duedate: "08 Jan 2021",
                    detail: "",
                    action: ""},
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

        const Cell = ({ row, column, value, style, ...restProps }) => {
            //compare

            //global color
            if (column.name == 'detail') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table "+this.props.classView}><i
                    className="fa fa-search click-pointer text-danger"></i></Table.Cell>;
            } else if (column.name == 'action') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table "+this.props.classView}>
                    <div className="px-4">
                        <button className="btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button>
                        <button className="btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>
                    </div>
                </Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table " + this.props.classView}>{value}</Table.Cell>;

            }
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

class PortofolioAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 150,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }, suppressSizeToFit: true
                },
                { field: "avgprice", headerName: "Avg. Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 206,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "lastprice", headerName: "Last Price", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 92 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12" :
                            "text-success text-right  grid-table f-12";
                    }
                },
                { field: "indicator", headerName: "", sortable: true, filter: false, resizable: false, width: this.props.gridView == 'grid' ? 15 : 30,
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? '<i class="icofont icofont-caret-down text-danger"></i>' :
                            '<i class="icofont icofont-caret-up text-success"></i>';
                    }
                },
                { field: "lot", headerName: "Lot", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 58 : 124,
                            cellClass : function (params) {
                                return " text-right grid-table f-12";
                            }
                        },
                { field: "shares", headerName: "Shares", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 76 :124,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    },
                },
                { field: "stockval", headerName: "Stock Val", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 90 : 207,
                    cellClass : function (params) {
                        return " text-right grid-table f-12";
                    }
                },
                { field: "pl", headerName: "P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 207,
                    cellClass : function (params) {
                        var pl = params.data.pl;
                        return pl.includes('-') === true ? "text-danger text-right  grid-table f-12":
                            "text-success text-right  grid-table f-12";
                    }
                },
                { field: "remark", headerName: "Remark", sortable: false, resizable: true, width: this.props.gridView == 'grid' ? 82 : 179,
                    tooltip: (params) => {
                        var code = params.data.code;

                        if (code.includes('AALI') === true){
                            var toltp = 'Not yet submit annual financial report';
                        } else{
                            var toltp = 'Not Issue';
                        }

                        return toltp;
                    },
                    cellClass : function (params) {
                        return " text-center grid-table f-12";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var eDiv = document.createElement('div');

                        if (code.includes('AALI') === true){
                            eDiv.innerHTML = '<span>' +
                                '<i class="tolTipRemaks fa fa-info-circle text-danger" id="ptooltip1" data-tip="true" data-for="errorTooltip"></i>' +
                                '</span>';
                        } else {
                            eDiv.innerHTML = '<span>' +
                                '<i class="tolTipRemaks fa fa-info-circle text-info" id="ptooltip1" data-tip="true" data-for="infoTooltip"></i>' +
                                '</span>';
                        }

                        /*var bTooltip = eDiv.querySelectorAll('.tolTipRemaks')[0];
                        bTooltip.addEventListener('mouseover', function () {
                            return '<span></span>';
                        });*/

                        return eDiv;
                    }
                },
                { field: "action", headerName: "Action", sortable: false, width: this.props.gridView == 'grid' ? 150 : 150, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy more</button>' +
                            '<button class="btn-cellsell btn btn-sm btn-success mx-1 f-9 w-50">Sell</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellsell')[0];

                        bButton.addEventListener('click', self.props.clickbuy);
                        sButton.addEventListener('click', self.props.clicksell);

                        return eDiv;
                    }, suppressSizeToFit: true
                },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { code: "AALI",
                avgprice: "12,650",
                lastprice: "12,650",
                lot: "12",
                shares: "122",
                stockval: "12,650,000",
                pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                remark: ""   ,
                action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    indicator : "",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: "",
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    indicator : "",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    indicator : "",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "AALI",
                    avgprice: "12,650",
                    indicator : "",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: ""   ,
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    indicator : "",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    indicator : "",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""   },{ code: "AALI",
                    avgprice: "12,650",
                    lastprice: "12,650",
                    lot: "12",
                    shares: "122",
                    stockval: "12,650,000",
                    pl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    remark: "",
                    action:""   },
                { code: "ADHI",
                    avgprice: "1,529",
                    indicator : "",
                    lastprice: "1,429",
                    lot: "10",
                    shares: "100",
                    stockval: "1,529,000",
                    pl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    remark: ""   ,
                    action:""   },
                { code: "ANTM",
                    avgprice: "1,025",
                    indicator : "",
                    lastprice: "1,025",
                    lot: "2",
                    shares: "210",
                    stockval: "1,025,000",
                    pl: "-25,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-2,50%",
                    remark: "",
                    action: ""},
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                },
                { code: "ASII",
                    avgprice: "7,125",
                    indicator : "",
                    lastprice: "7,125",
                    lot: "9",
                    shares: "930",
                    stockval: "7,125,000",
                    pl: "-50,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-5,78%",
                    remark: ""   ,
                    action:""   },
                { code: "BBCA",
                    avgprice: "27,400",
                    indicator : "",
                    lastprice: "27,400",
                    lot: "4",
                    shares: "410",
                    stockval: "27,400,000",
                    pl: "+250,650"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    remark: ""   ,
                    action:""
                }
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={this.props.gridView == 'grid' ? "card-235 ag-theme-balham-dark ag-bordered" : "card-580 ag-theme-balham-dark ag-bordered"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class FixedIncomeAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, filter: "agTextColumnFilter", width: this.props.gridView == 'grid' ? 25 : 56,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    }},
                { field: "serial", headerName: "Serial", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 100 : 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },suppressSizeToFit: true},
                { field: "nominal", headerName: "Nominal (IDR)", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 118 : 239,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    }},
                { field: "coupon", headerName: "Coupon", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 84 : 239,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    } },
                { field: "couponpdate", headerName: "Coupon Payment Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 164 : 282,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    } },
                { field: "duedate", headerName: "Due Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 91 : 239,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    } },
                { field: "detail", headerName: "Detail", resizable: true, width: this.props.gridView == 'grid' ? 72 : 170,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },
                    cellRenderer : function (params) {
                        return '<i class="fa fa-search click-pointer text-danger"></i>'
                    } },
                { field: "action", headerName: "Action", width: this.props.gridView == 'grid' ? 175 : 200, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy</button>' +
                            '<button class="btn-cellredemption btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellredemption')[0];

                        /*bButton.addEventListener('click', function () {});
                        sButton.addEventListener('click', function () {});*/

                        return eDiv;
                    },suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { no: "1",
                    serial: "SUNMP15042019",
                    nominal: "7,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 20 every month",
                    duedate: "02 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "2",
                    serial: "SUNMP16042019",
                    nominal: "5,000,000",
                    coupon: "7,0%",
                    couponpdate: "date 21 every month",
                    duedate: "03 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "3",
                    serial: "SUNMP17042019",
                    nominal: "2,000,000",
                    coupon: "5,0%",
                    couponpdate: "date 22 every month",
                    duedate: "04 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "4",
                    serial: "SUNMP18042019",
                    nominal: "6,000,000",
                    coupon: "8,0%",
                    couponpdate: "date 23 every month",
                    duedate: "05 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "5",
                    serial: "SUNMP19042019",
                    nominal: "4,000,000",
                    coupon: "9,0%",
                    couponpdate: "date 24 every month",
                    duedate: "06 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "6",
                    serial: "SUNMP20042019",
                    nominal: "12,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 25 every month",
                    duedate: "07 Jan 2021",
                    detail: "",
                    action: ""},
                { no: "7",
                    serial: "SUNMP21042019",
                    nominal: "10,000,000",
                    coupon: "6,0%",
                    couponpdate: "date 26 every month",
                    duedate: "08 Jan 2021",
                    detail: "",
                    action: ""},
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={this.props.gridView == 'grid' ? "card-235 ag-theme-balham-dark ag-striped-odd" : "card-580 ag-theme-balham-dark ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class MutualFundAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {
            columnDefs: [
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 69 : 170,
                    cellClass : function (params) {
                        return " grid-table text-left f-12";
                    },
                    cellRenderer : function (params) {
                        var code = params.data.code;
                        var scode = code.split("-");

                        return '<span className="font-weight-bold">'+scode[0]+'</span>' +
                            '<br /><span>'+scode[1]+'</span>';
                    }, suppressSizeToFit: true },
                { field: "nav", headerName: "NAV", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 65 : 274,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    } },
                { field: "navdate", headerName: "NAV Date", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 94 : 274,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    } },
                { field: "currency", headerName: "Currency", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 89 : 274,
                    cellClass : function (params) {
                        return " grid-table text-right f-12";
                    }  },
                { field: "indicator", headerName: "", width: this.props.gridView == 'grid' ? 15 : 50,
                    cellClass : function (params) {
                        return " grid-table text-center f-12";
                    },
                    cellRenderer : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? '<i class="icofont icofont-caret-down text-danger"></i>' :
                            '<i class="icofont icofont-caret-up text-success"></i>';
                    } },
                { field: "potentialpl", headerName: "Potential P/L", sortable: true, filter: "agTextColumnFilter", resizable: true, width: this.props.gridView == 'grid' ? 120 : 331,
                    cellClass : function (params) {
                        var pl = params.data.potentialpl;
                        return pl.includes('-') === true ? 'grid-table text-right f-12 text-danger' :
                            'grid-table text-right f-12 text-success'
                    } },
                { field: "action", headerName: "Action", sortable: false, width: this.props.gridView == 'grid' ? 175 : 200, pinned: "right", lockPosition: true, lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table text-center f-12 locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy Fund</button>' +
                            '<button class="btn-cellredemption btn btn-sm btn-primary mx-1 f-9 w-50">Redemption</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellredemption')[0];

                        /*bButton.addEventListener('click', function(){});
                        sButton.addEventListener('click', function(){});*/

                        return eDiv;
                    }, suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight: function (params) {
                return 40;
            },
            rowData: [
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    indicator : "",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    indicator : "",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "1,025",
                    navdate: "06/03/2019",
                    currency: "1,025,000",
                    indicator : "",
                    potentialpl: "+250,660"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+2,50%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "7,125",
                    navdate: "06/03/2019",
                    currency: "7,125,000",
                    indicator : "",
                    potentialpl: "+175"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"+1,75%",
                    action:""},
                { code: "000D7Q-RDPT BUMN Fund...",
                    nav: "12,650",
                    navdate: "06/03/2019",
                    currency: "12,650,000",
                    indicator : "",
                    potentialpl: "-60,240"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-0,40%",
                    action:""},
                { code: "000D7T-Reksa Dana Penyataan...",
                    nav: "1,529",
                    navdate: "06/03/2019",
                    currency: "1,529,000",
                    indicator : "",
                    potentialpl: "-15,000"+ "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +"-1,50%",
                    action:""},
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
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={this.props.gridView == 'grid' ? "card-235 ag-theme-balham-dark" : "card-580 ag-theme-balham-dark"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        defaultColDef={this.state.defaultColDef}
                        getRowHeight={this.state.getRowHeight}
                        onGridReady={this.onGridReady}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}>
                    </AgGridReact>
                </div>
            </div>
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
