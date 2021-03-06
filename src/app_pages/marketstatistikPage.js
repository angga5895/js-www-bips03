import React from 'react';
import {Dropdown, Input} from 'semantic-ui-react';
import { AppFrameAction } from '../appframe.js';
import StreamChart from './streamChart.js';
import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import {BIPSAppContext, BIPSAppProvider} from "../AppData";
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
import {AgGridReact} from "ag-grid-react";
import MenuOfContent from "../menuofcontent";
import newsImg1 from './../img/noimage.png';
import newsImg2 from './../img/noimage.png';
import newsImg3 from './../img/noimage.png';
import newsImg4 from './../img/noimage.png';
import newsImg5 from './../img/noimage.png';
import {ContextConnector} from "../appcontext";

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
                    {className: 'StatisticMarketStatistikPage', title: 'STATISTIC PAGE', instanceName: 'statisticMarketStatistikPage'},
                    {className: 'IndiceMarketStatistikPage', title: 'INDICES PAGE', instanceName: 'indiceMarketStatistikPage'},
                    {className: 'TopBrokerMarketStatistikPage', title: 'TOP BROKER PAGE', instanceName: 'topBrokerMarketStatistikPage'},
                    {className: 'NewResearchMarketStatistikPage', title: 'NEW & RESEARCH PAGE', instanceName: 'newResearchMarketStatistikPage'},
                ]
            }>
            {/*<BIPSAppProvider>*/}
            <WSConnectionAction />
            <div className="col-sm-12 px-0 mx-0 align-self-center">
                <div className="col-sm-12 pb-0 px-0 mx-0 d-border-bottom">
                    <FillHeaderTab linkTitles={
                        {
                            marketStatistikPage: 'SUMMARY',
                            statisticMarketStatistikPage: 'MARKET INDEX',
                            indiceMarketStatistikPage: 'SECTORAL INDEX',
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
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth < 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth < 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth < 2030){
            return "s75";
        }else if(window.innerWidth > 2045 && window.innerWidth < 2700){
            return "s67";
        }else if(window.innerWidth > 2701){
            return "s50";
        }else{
            return "s100";
        }
    }
    render () {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="card card-527">
                    <div className="card-header h-49 bg-grey py-0">
                        <div className="f-14 px-0 mx-0 py-0 col-sm-12 h-49">
                            <div className="row col-sm-12 px-0 mx-0">
                                <div className="col-mbl-radio px-0 mx-0 row align-self-center">
                                    <ul className="ul-radio col-sm-12 px-0 mx-0 row h-49">
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
                                            <label htmlFor="tl-options" className="no-wrap">Top Losers</label>

                                            <div className="check"></div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-mbl-radio-o px-0 mx-0 align-self-center">
                                    <div className="col-sm-12 px-0 mx-0 row text-right h-49 py-2">
                                        <div className="col-sm-8"></div>
                                        <div className="col-sm-4">
                                            <Dropdown placeholder='Choose' search selection options={stateOptions} className="col-sm-12 f-12"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <MarketStatistikAgGrid typegrid="summary" size={this.ceksize()} clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                    </div>
                </div>
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
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth < 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth < 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth < 2030){
            return "s75";
        }else if(window.innerWidth > 2045 && window.innerWidth < 2700){
            return "s67";
        }else if(window.innerWidth > 2701){
            return "s50";
        }else{
            return "s100";
        }
    }
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />

                <div className="card grid-294 bg-black-trading f-12">
                    <MarketIndicesAgGrid size={this.ceksize()}/>
                    {/*<MarketIndicesGrid clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>

                <div className="card card-233 bg-black-trading f-12">
                    <div className="card-header px-0 py-0">
                        <div className="col-sm-12 px-0 mx-0 bg-gray-tradding text-center">
                            <div className="bg-grey col-sm-12 px-0 mx-0 text-center py-3 h-30">FINANCE</div>
                        </div>
                    </div>
                    <div className="card-body">
                        <MarketStatistikAgGrid typegrid="indices" size={this.ceksize()} clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />
                    </div>
                    {/*<MarketStatistikGrid typegrid="indices" clickbuy={this.buttonClickBuy} clicksell={this.buttonClickSell} />*/}
                </div>
            </>
        );
    }
}

class StatisticMarketStatistikPage_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 5,
        colors: {
            ...theme.colors,
            neutral0: this.props.thememode === true ? '#3D3E3F' : '#CDCDCE',
            neutral20: this.props.thememode === true ? '#333332' : '#E9E9E9',
            neutral30: this.props.thememode === true ? '#333332' : '#E9E9E9',
            neutral40: this.props.thememode === true ? '#1A1A1A' : '#1A1A1A',
            neutral80: this.props.thememode === true ? '#FFFFFF' : '#878787',
            primary75: this.props.thememode === true ? '#FFFFFF' : '#FFFFFF',
            primary50: this.props.thememode === true ? '#4D4D4E' : '#4D4D4E',
            primary25: this.props.thememode === true ? '#202020' : '#ece9ea',
            primary: '#0071BC',
        },
    });

    render(){
        const stockOptions = [
            { value: 'agri', label: 'AGRI' },
            { value: 'composite', label: 'COMPOSITE' },
            { value: 'mining', label: 'MINING' },
        ];

        const customStyles = {
            control: (base, state) => ({
                ...base,
                // match with the menu
                borderRadius: 0,
                border: "var(--warna-d-border) 1px solid"
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
            }),
            menuList: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0
            })
        };

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
                <div className="px-1 mx-0 col-sm-12 row f-12 card-527">
                    <div className="col-sm-7 px-1 py-2 d-border-table-right">
                        <div className="card card-515 bg-black-trading">
                            <div className="card-header py-3 pr-0 h-121 n-border-bottom">
                                <div className="col-sm-12 mb-4 row text-left ml-1">
                                    <label className="align-self-center col-sm-2 px-0 mx-0 f-16">Index</label>
                                    {/*<Input defaultValue='AGRI' placeholder='Code' size='small' className="col-sm-7 text-center align-self-center"/>*/}
                                    <div className="col-sm-10 mr-0 pl-0 pr-0 text-left align-self-center">
                                        <Select maxMenuHeight={150} styles={customStyles} size="small" placeholder={<div>Search..</div>} options={stockOptions} className="stockPageSelect" theme={this.selectSelectionTab}/>
                                    </div>
                                    {/*<div className="col-sm-2 text-left align-self-center px-2"><i className="fa fa-search fa-2x click-pointer text-dark"></i></div>*/}
                                </div>
                                <div className="col-sm-12 mb-4 row">
                                    <div className="col-sm-2 text-white f-16">6,384.90</div>
                                    <div className="col-sm-4 text-success f-16">+5.21 (0.082%) <i className="icofont icofont-caret-up"></i></div>
                                </div>
                                <div className="col-sm-12 f-14">
                                    Jun 2, 16:15 GMT +7 Disclaimer
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="col-sm-12">
                                    <div className="card card-523 text-white bg-trading-gray">
                                        <StreamChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-5 px-1 py-2 d-border-table-left">
                        <div className="card card-515 bg-black-trading text-white">
                            <div className="card-body px-3 pt-3">
                                <div className="bg-grey-0 text-center py-4 h-40"><span className="text-white">BOARD SUMMARY</span></div>
                                <TableBS responsive bordered size="sm"
                                         className="table-hover table-striped text-center align-self-center align-middle mb-3 table-market">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th className="py-1 bg-gray-tradding">BOARD</th>
                                        <th className="py-1 bg-gray-tradding">VALUE(T)</th>
                                        <th className="py-1 bg-gray-tradding">LOT(M)</th>
                                        <th className="py-1 bg-gray-tradding">FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap tb-statistic">
                                    <tr>
                                        <td className="text-center py-1">Reguler</td>
                                        <td className="text-right py-1">6.35</td>
                                        <td className="text-right py-1">100.3</td>
                                        <td className="text-right py-1">403,040 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center py-1">Negotiated</td>
                                        <td className="text-right py-1">2.64</td>
                                        <td className="text-right py-1">55.41</td>
                                        <td className="text-right py-1">870 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center py-1">Cash</td>
                                        <td className="text-right py-1">0</td>
                                        <td className="text-right py-1">0</td>
                                        <td className="text-right py-1">0 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-primary text-center py-1">TOTAL</td>
                                        <td className="text-primary text-right py-1">8.99</td>
                                        <td className="text-primary text-right py-1">156.15</td>
                                        <td className="text-primary text-right py-1">403,914 </td>
                                    </tr>
                                    </tbody>
                                </TableBS>
                                <div className="bg-grey-0 text-center py-4 h-40 mt-1">
                                    <span className="text-white">FOREIGN ACTIVITY</span></div>
                                <TableBS
                                    responsive
                                    bordered
                                    size="sm"
                                    className="table-hover table-striped text-center align-self-center align-middle table-market">
                                    <thead className="text-white t-statistic">
                                    <tr>
                                        <th className="py-1 bg-gray-tradding">FOREIGN</th>
                                        <th className="py-1 bg-gray-tradding">VALUE</th>
                                        <th className="py-1 bg-gray-tradding">LOT</th>
                                        <th className="py-1 bg-gray-tradding">FREQ</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white no-wrap tb-statistic">
                                    <tr>
                                        <td className="text-center py-1">F.Buy</td>
                                        <td className="text-danger text-right py-1">2.29 T</td>
                                        <td className="text-danger text-right py-1">11.68 M</td>
                                        <td className="text-danger text-right py-1">63,578 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center text-white py-1">F.Sell</td>
                                        <td className="text-right text-success py-1">3.02 T</td>
                                        <td className="text-right text-success py-1">11.44 M</td>
                                        <td className="text-right text-success py-1">85,982 </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center text-white py-1">F.TOTAL</td>
                                        <td className="text-right text-primary py-1">5.31 T</td>
                                        <td className="text-right text-primary py-1">23.13 M</td>
                                        <td className="text-right text-primary py-1">148,560 </td>
                                    </tr>
                                    <tr className="tb-statistic">
                                        <td className="text-center text-white py-1">F.NET</td>
                                        <td className="text-right text-primary py-1">-731.36 B</td>
                                        <td className="text-right text-primary py-1">241,671</td>
                                        <td className="text-right text-primary py-1">-21,404 </td>
                                    </tr>
                                    </tbody>
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
    ceksize(){
        if(window.innerWidth > 1370 && window.innerWidth < 1520) {
            return "s90";
        }else if(window.innerWidth > 1521 && window.innerWidth < 1800){
            return "s80";
        }else if(window.innerWidth > 1801 && window.innerWidth < 2030){
            return "s75";
        }else if(window.innerWidth > 2045 && window.innerWidth < 2700){
            return "s67";
        }else if(window.innerWidth > 2701){
            return "s50";
        }else{
            return "s100";
        }
    }
    render(){
        return(
            <div className="f-12 px-2">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction />
                <div className="card card-175 bg-black-trading f-12">
                    <TopBrokerAgGrid size={this.ceksize()}/>
                </div>
                <div className="card card-175 bg-black-trading f-12">
                    <div className="card-header bg-grey h-37">
                        TOP BUYER
                    </div>
                    <div className="card-body">
                        <TopBrokerBAgGrid size={this.ceksize()}/>
                    </div>
                </div>
                <div className="card card-175 bg-black-trading f-12">
                    <div className="card-header bg-grey h-37">
                        TOP SELLER
                    </div>
                    <div className="card-body">
                        <TopBrokerSAgGrid size={this.ceksize()}/>
                    </div>
                </div>
            </div>
        );
    }
}

class NewResearchMarketStatistikPage extends React.PureComponent {
    render(){
        return(
            <AppFrameProvider
                initialClasses={{GeneralNewResearchPage, StockNewResearchPage, MutualNewResearchPage, ReseacrhNewResearchPage}}
                initialFrames={
                    [
                        {className: 'GeneralNewResearchPage', title: 'GENERALNEWS', instanceName: 'newsGeneral'},
                        {className: 'StockNewResearchPage', title: 'STOCKNEWS', instanceName: 'newsStock'},
                        {className: 'MutualNewResearchPage', title: 'MUTUALFUNDNEWS', instanceName: 'newsMutualFund'},
                        {className: 'ReseacrhNewResearchPage', title: 'RESEARCH', instanceName: 'newsResearch'},
                    ]
                }>
                {/*<BIPSAppProvider>*/}
                <WSConnectionAction />
                <div className="row col-sm-12 px-0 mx-0 pt-1">
                    <div className="col-sm-12 px-2 h-45">
                        <MenuOfContent linkTitles={
                            {
                                newsGeneral : 'General News',
                                newsStock : 'Stock News',
                                newsMutualFund : 'Mutual Fund News',
                                newsResearch : 'Research'
                            }
                        } />
                    </div>
                    <div className="col-sm-12 px-2">
                        <AppFrame headerComponent={MarketStatistikFrameHeader}/>
                    </div>
                </div>
                {/*</BIPSAppProvider>*/}
            </AppFrameProvider>
        );
    }
}

class GeneralNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                <div className={"text-center align-self-center"}>
                                    <img src={newsImg1} alt="News 1" height={"auto"} width={"50%"} />
                                </div>
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg2} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg3} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg4} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class StockNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                <div className={"text-center align-self-center"}>
                                    <img src={newsImg1} alt="News 1" height={"auto"} width={"50%"} />
                                </div>
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg3} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg2} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg4} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class MutualNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                <div className={"text-center align-self-center"}>
                                    <img src={newsImg1} alt="News 1" height={"auto"} width={"50%"} />
                                </div>
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg3} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg4} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg2} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class ReseacrhNewResearchPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-12 px-0 mx-0 row">
                    <div className="col-sm-8 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-right">
                            <div className="card-header px-3 text-white h-73 d-border-bottom">
                                <h3>
                                    Investor Asing Jual Saham Hampir Rp 2 Triliun,<br />
                                    IHSG Ditutup Turun 56,23 Poin
                                </h3>
                            </div>
                            <div className="card card-body card-406 scrollable px-3">
                                <div className={"text-center align-self-center"}>
                                    <img src={newsImg1} alt="News 1" height={"auto"} width={"50%"} />
                                </div>
                                <div className="py-4 text-white text-justify f-12">
                                    <span className="text-warning">Liputan6.com, Jakarta </span> -  Indeks Harga Saham
                                    Gabungan (IHSG) ditutup melemah pada perdagangan Selasa ini. Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. <br/><br/>
                                    Pada penutupan perdagangan saham Selasa (6/8/2019), IHSG melemah 56,23 poin atau 0,91 persen ke level 6.119,47. Indeks saham LQ45 juga merosot 1,54 persen ke posisi 960,75. <br/><br/>
                                    Sebanyak 207 saham di melemah sehingga mendorong IHSG ke zona merah. Sementara 121 saham menguat dan 128 saham diam di tempat. <br/><br/>
                                    Transaksi perdagangan saham cukup ramai. Total frekuensi perdagangan saham 548.686 kali dengan volume perdagangan 16,8 miliar saham. Nilai transaksi harian saham Rp 10,4 triliun. <br/><br/>
                                    Investor asing jual saham Rp 1,94 triliun di pasar regular. Posisi dolar Amerika Serikat (AS) berada di kisaran Rp 14.265.
                                    Dari 10 sektor pembentuk IHSG, seluruhnya sebagian besar melemah. Pelemahan tersebut dipimpin oleh sektor aneka industri yang turun 2,26 persen,
                                    diikuti sektor keuangan turun 1,90 persen, dan sektor perdagangan turun 1,28 persen.<br/><br/>
                                    Saham-saham yang melemah sehingga mendorong IHSG ke zona merah antara lain MLPT turun 25 persen
                                    ke Rp 525 per saham, YPAS merosot 23,81 persen ke Rp 352 per saham dan OASA turun 12,23 persen ke Rp 244 per saham.<br/><br/>
                                    Sementara saham-saham yang menguat antara lain SDRA yang naik 24,62 persen ke Rp 810 per saham, APEX naik 15 persen
                                    ke Rp 690 per saham dan FIRE naik 14,29 persen ke Rp 2.400 per saham. <br/><br/>
                                    Kepala Riset Valbury Sekuritas Alfiansyah mengatakan, kecemasan perang dagang AS dan
                                    China masih membayangi dan menjadi sentimen negatif bagi IHSG. "Apalagi data ekonomi
                                    Indonesia di bawah ekspektasi. Ini dapat memicu IHSG kembali terkoreksi," ujar Alfiansyah.<br/><br/>
                                    Kebijakan Presiden AS Donald Trump yang akan menerapkan bea masuk sebesar 10 persen
                                    terhadap barang-barang impor China mulai 1 September 2019 mendatang, dinilai akan berdampak
                                    kepada perekonomian global termasuk bagi perekonomian Indonesia.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 px-0 mx-0 f-12">
                        <div className="card card-479 d-border-left">
                            <div className="card card-body card-479 scrollable px-3">
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg3} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            267 Saham Menghijau,
                                            IHSG Ditutup Menguat ke 6,204.19
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg4} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Seluruh Sektor Di Zona Merah,
                                            IHSG Ditutup Terjun Bebas ke 6,175.7
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg5} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            Cara BEI Ajak Pengusaha Kecil
                                            Melantai Di Bursa Efek
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                                <div className="row col-sm-12 px-0 mx-0 d-border-bottom pb-4 mb-4 click-pointer">
                                    <div className="col-sm-6 pl-0 pr-1 mx-0 text-center align-self-center">
                                        <img src={newsImg2} alt="News 1" height={"auto"} width={"100%"} />
                                    </div>
                                    <div className="col-sm-6 pr-0 pl-1 mx-0">
                                        <p className="f-16">
                                            The Fed Pangkas Suku Bunga,
                                            IHSG Dibuka Melemah ke 6,381.98
                                        </p><br/><br/>
                                        <span className="text-warning">Liputan6.com - </span> 27 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
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
                                                <label htmlFor="tl-options" className="no-wrap">Top Losers</label>

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
                className={"grid-table d-border-aggrid-right f-12"}>
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
                    className={"grid-table d-border-aggrid-right f-12 text-danger"}>{value}</Table.Cell>;
            }
            else if (column.name == 'sval') {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table d-border-aggrid-right f-12 text-success"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table d-border-aggrid-right f-12"}>{value}</Table.Cell>;
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
                className={"grid-table d-border-aggrid-right f-12"}>
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
                    className={"grid-table d-border-aggrid-right f-12 text-danger"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table d-border-aggrid-right f-12"}>{value}</Table.Cell>;
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
                className={"grid-table d-border-aggrid-right f-12"}>
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
                    className={"grid-table d-border-aggrid-right f-12 text-success"}>{value}</Table.Cell>;
            } else {
                return <Table.Cell
                    {...restProps}
                    className={"grid-table d-border-aggrid-right f-12"}>{value}</Table.Cell>;
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

class MarketStatistikAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: 60, minWidth: 60,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 90, minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "prev", headerName: "Prev.", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 85, minWidth: 85,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12 text-warning";
                    }},
                { field: "last", headerName: "Last", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 81, minWidth: 81,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    },
                    cellRenderer : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        var lasts = params.data.last;
                        return last < prev ? lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-down text-danger"></i>' :
                            last > prev ? lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-caret-up text-success"></i>' :
                                lasts +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icofont icofont-minus text-warning"></i>';
                    } },
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 105, minWidth: 105,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "persen", headerName: "%", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 73, minWidth: 73,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "open", headerName: "Open", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 91, minWidth: 91,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "low", headerName: "Low", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 82, minWidth: 82,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "high", headerName: "High", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 86, minWidth: 86,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "avg", headerName: "Avg.", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?95:82, minWidth: 82,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "val", headerName: "Val(T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?120:102, minWidth: 102,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "vol", headerName: "Vol (Lot)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?120:110, minWidth: 110,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "freq", headerName: "Freq", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?100:82, minWidth: 82,
                    cellClass : function (params) {
                        var prev = parseFloat(params.data.prev.replace(/,/g,""));
                        var last = parseFloat(params.data.last.replace(/,/g,""));
                        return last < prev ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            last > prev ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    } },
                { field: "fbuy", headerName: "F.Buy (T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?100:90, minWidth: 90,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fsell", headerName: "F.Sell (T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?100:89, minWidth: 89,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fnet", headerName: "F.Net (T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?100:89, minWidth: 89,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "financial", headerName: "Financial (M)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width:s=="s75"?205:140, minWidth: 140,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "action", headerName: "Action", width: 100, minWidth: 100, pinned: "right", lockPosition: true,
                    lockVisible: true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 locked-col locked-visible";
                    },
                    cellRenderer : function (params) {
                        var eDiv = document.createElement('div');
                        eDiv.innerHTML = '<span class="px-1">' +
                            '<button class="btn-cellbuy btn btn-sm btn-danger mx-1 f-9 w-50">Buy</button>' +
                            '<button class="btn-cellsell btn btn-sm btn-success mx-1 f-9 w-50">Sell</button>' +
                            '</span>';
                        var bButton = eDiv.querySelectorAll('.btn-cellbuy')[0];
                        var sButton = eDiv.querySelectorAll('.btn-cellsell')[0];

                        bButton.addEventListener('click', self.props.clickbuy);
                        sButton.addEventListener('click', self.props.clicksell);

                        return eDiv;
                    }, suppressSizeToFit: true },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    no : 1,
                    code : "TLKM",
                    prev : "4,010",
                    last : "3,980",
                    change : "-30",
                    persen : "-0.7",
                    open : "4,020",
                    low : "3,980",
                    high : "4,050",
                    avg : "4,018",
                    val : "225.3",
                    vol : "560,801",
                    freq : "4,010",
                    fbuy : "3,980",
                    fsell : "30",
                    fnet : "3,950",
                    financial : "3,000,000,000,000",
                    action:""
                },
                {
                    no : 2,
                    code : "AALI",
                    prev : "29,550",
                    last : "29,325",
                    change : "-225",
                    persen : "-0.8",
                    open : "29,700",
                    low : "29,300",
                    high : "29,700",
                    avg : "29,440",
                    val : "333.1",
                    vol : "113,160",
                    freq : "29,825",
                    fbuy : "29,325",
                    fsell : "500",
                    fnet : "28,825",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 3,
                    code : "BBCA",
                    prev : "7,950",
                    last : "7,950",
                    change : "0",
                    persen : "0",
                    open : "7,850",
                    low : "7,850",
                    high : "8,000",
                    avg : "7,953",
                    val : "286.8",
                    vol : "350,576",
                    freq : "54,247",
                    fbuy : "7,950",
                    fsell : "46,297",
                    fnet : "38,347",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 4,
                    code : "WSKT",
                    prev : "4,330",
                    last : "4,360",
                    change : "+30",
                    persen : "+0.7",
                    open : "4,330",
                    low : "4,320",
                    high : "4,370",
                    avg : "4,352",
                    val : "447.6",
                    vol : "1.0 M",
                    freq : "6,274",
                    fbuy : "4,350",
                    fsell : "1,924",
                    fnet : "2,426",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 5,
                    code : "BBRI",
                    prev : "1,980",
                    last : "1,945",
                    change : "-35",
                    persen : "-1.8",
                    open : "1,980",
                    low : "1,945",
                    high : "1,985",
                    avg : "1,961",
                    val : "24.9",
                    vol : "126.783",
                    freq : "4,092",
                    fbuy : "1,945",
                    fsell : "2,147",
                    fnet : "-202",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 6,
                    code : "WIKA",
                    prev : "2,240",
                    last : "2,180",
                    change : "-60",
                    persen : "-2.7",
                    open : "2,240",
                    low : "2,150",
                    high : "2,240",
                    avg : "2,186",
                    val : "49.7",
                    vol : "227,402",
                    freq : "2,794",
                    fbuy : "2,170",
                    fsell : "624",
                    fnet : "1,546",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 7,
                    code : "ASRI",
                    prev : "2,350",
                    last : "2,340",
                    change : "-10",
                    persen : "-0.4",
                    open : "2,350",
                    low : "2,300",
                    high : "2,370",
                    avg : "2,337",
                    val : "41.2",
                    vol : "176,162",
                    freq : "3,255",
                    fbuy : "2,330",
                    fsell : "925",
                    fnet : "1,405",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 8,
                    code : "PPTP",
                    prev : "1,160",
                    last : "1,170",
                    change : "+10",
                    persen : "+0.9",
                    open : "1,155",
                    low : "1,155",
                    high : "1,200",
                    avg : "1,182",
                    val : "9.6",
                    vol : "81,047",
                    freq : "1,201",
                    fbuy : "1,170",
                    fsell : "31",
                    fnet : "1,139",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 9,
                    code : "BMRI",
                    prev : "346",
                    last : "346",
                    change : "0",
                    persen : "0",
                    open : "346",
                    low : "338",
                    high : "350",
                    avg : "343",
                    val : "1.9",
                    vol : "54,681",
                    freq : "12,378",
                    fbuy : "344",
                    fsell : "12,034",
                    fnet : "11,690",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 10,
                    code : "CTRA",
                    prev : "1,075",
                    last : "1,065",
                    change : "-10",
                    persen : "-0.9",
                    open : "1,080",
                    low : "1,050",
                    high : "1,115",
                    avg : "1,073",
                    val : "38.2",
                    vol : "355,717",
                    freq : "2,692",
                    fbuy : "1,065",
                    fsell : "1,627",
                    fnet : "-562",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 11,
                    code : "TLKM",
                    prev : "4,010",
                    last : "3,980",
                    change : "-30",
                    persen : "-0.7",
                    open : "4,020",
                    low : "3,980",
                    high : "4,050",
                    avg : "4,018",
                    val : "225.3",
                    vol : "560,801",
                    freq : "4,010",
                    fbuy : "3,980",
                    fsell : "30",
                    fnet : "3,950",
                    financial : "3,000,000,000,000",
                    action:""
                },
                {
                    no : 12,
                    code : "AALI",
                    prev : "29,550",
                    last : "29,325",
                    change : "-225",
                    persen : "-0.8",
                    open : "29,700",
                    low : "29,300",
                    high : "29,700",
                    avg : "29,440",
                    val : "333.1",
                    vol : "113,160",
                    freq : "29,825",
                    fbuy : "29,325",
                    fsell : "500",
                    fnet : "28,825",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 13,
                    code : "BBCA",
                    prev : "7,950",
                    last : "7,950",
                    change : "0",
                    persen : "0",
                    open : "7,850",
                    low : "7,850",
                    high : "8,000",
                    avg : "7,953",
                    val : "286.8",
                    vol : "350,576",
                    freq : "54,247",
                    fbuy : "7,950",
                    fsell : "46,297",
                    fnet : "38,347",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 14,
                    code : "WSKT",
                    prev : "4,330",
                    last : "4,360",
                    change : "+30",
                    persen : "+0.7",
                    open : "4,330",
                    low : "4,320",
                    high : "4,370",
                    avg : "4,352",
                    val : "447.6",
                    vol : "1.0 M",
                    freq : "6,274",
                    fbuy : "4,350",
                    fsell : "1,924",
                    fnet : "2,426",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 15,
                    code : "BBRI",
                    prev : "1,980",
                    last : "1,945",
                    change : "-35",
                    persen : "-1.8",
                    open : "1,980",
                    low : "1,945",
                    high : "1,985",
                    avg : "1,961",
                    val : "24.9",
                    vol : "126.783",
                    freq : "4,092",
                    fbuy : "1,945",
                    fsell : "2,147",
                    fnet : "-202",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 16,
                    code : "WIKA",
                    prev : "2,240",
                    last : "2,180",
                    change : "-60",
                    persen : "-2.7",
                    open : "2,240",
                    low : "2,150",
                    high : "2,240",
                    avg : "2,186",
                    val : "49.7",
                    vol : "227,402",
                    freq : "2,794",
                    fbuy : "2,170",
                    fsell : "624",
                    fnet : "1,546",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 17,
                    code : "ASRI",
                    prev : "2,350",
                    last : "2,340",
                    change : "-10",
                    persen : "-0.4",
                    open : "2,350",
                    low : "2,300",
                    high : "2,370",
                    avg : "2,337",
                    val : "41.2",
                    vol : "176,162",
                    freq : "3,255",
                    fbuy : "2,330",
                    fsell : "925",
                    fnet : "1,405",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 18,
                    code : "PPTP",
                    prev : "1,160",
                    last : "1,170",
                    change : "+10",
                    persen : "+0.9",
                    open : "1,155",
                    low : "1,155",
                    high : "1,200",
                    avg : "1,182",
                    val : "9.6",
                    vol : "81,047",
                    freq : "1,201",
                    fbuy : "1,170",
                    fsell : "31",
                    fnet : "1,139",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 19,
                    code : "BMRI",
                    prev : "346",
                    last : "346",
                    change : "0",
                    persen : "0",
                    open : "346",
                    low : "338",
                    high : "350",
                    avg : "343",
                    val : "1.9",
                    vol : "54,681",
                    freq : "12,378",
                    fbuy : "344",
                    fsell : "12,034",
                    fnet : "11,690",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 20,
                    code : "CTRA",
                    prev : "1,075",
                    last : "1,065",
                    change : "-10",
                    persen : "-0.9",
                    open : "1,080",
                    low : "1,050",
                    high : "1,115",
                    avg : "1,073",
                    val : "38.2",
                    vol : "355,717",
                    freq : "2,692",
                    fbuy : "1,065",
                    fsell : "1,627",
                    fnet : "-562",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 21,
                    code : "TLKM",
                    prev : "4,010",
                    last : "3,980",
                    change : "-30",
                    persen : "-0.7",
                    open : "4,020",
                    low : "3,980",
                    high : "4,050",
                    avg : "4,018",
                    val : "225.3",
                    vol : "560,801",
                    freq : "4,010",
                    fbuy : "3,980",
                    fsell : "30",
                    fnet : "3,950",
                    financial : "3,000,000,000,000",
                    action:""
                },
                {
                    no : 22,
                    code : "AALI",
                    prev : "29,550",
                    last : "29,325",
                    change : "-225",
                    persen : "-0.8",
                    open : "29,700",
                    low : "29,300",
                    high : "29,700",
                    avg : "29,440",
                    val : "333.1",
                    vol : "113,160",
                    freq : "29,825",
                    fbuy : "29,325",
                    fsell : "500",
                    fnet : "28,825",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 23,
                    code : "BBCA",
                    prev : "7,950",
                    last : "7,950",
                    change : "0",
                    persen : "0",
                    open : "7,850",
                    low : "7,850",
                    high : "8,000",
                    avg : "7,953",
                    val : "286.8",
                    vol : "350,576",
                    freq : "54,247",
                    fbuy : "7,950",
                    fsell : "46,297",
                    fnet : "38,347",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 24,
                    code : "WSKT",
                    prev : "4,330",
                    last : "4,360",
                    change : "+30",
                    persen : "+0.7",
                    open : "4,330",
                    low : "4,320",
                    high : "4,370",
                    avg : "4,352",
                    val : "447.6",
                    vol : "1.0 M",
                    freq : "6,274",
                    fbuy : "4,350",
                    fsell : "1,924",
                    fnet : "2,426",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 25,
                    code : "BBRI",
                    prev : "1,980",
                    last : "1,945",
                    change : "-35",
                    persen : "-1.8",
                    open : "1,980",
                    low : "1,945",
                    high : "1,985",
                    avg : "1,961",
                    val : "24.9",
                    vol : "126.783",
                    freq : "4,092",
                    fbuy : "1,945",
                    fsell : "2,147",
                    fnet : "-202",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 26,
                    code : "WIKA",
                    prev : "2,240",
                    last : "2,180",
                    change : "-60",
                    persen : "-2.7",
                    open : "2,240",
                    low : "2,150",
                    high : "2,240",
                    avg : "2,186",
                    val : "49.7",
                    vol : "227,402",
                    freq : "2,794",
                    fbuy : "2,170",
                    fsell : "624",
                    fnet : "1,546",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 27,
                    code : "ASRI",
                    prev : "2,350",
                    last : "2,340",
                    change : "-10",
                    persen : "-0.4",
                    open : "2,350",
                    low : "2,300",
                    high : "2,370",
                    avg : "2,337",
                    val : "41.2",
                    vol : "176,162",
                    freq : "3,255",
                    fbuy : "2,330",
                    fsell : "925",
                    fnet : "1,405",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 28,
                    code : "PPTP",
                    prev : "1,160",
                    last : "1,170",
                    change : "+10",
                    persen : "+0.9",
                    open : "1,155",
                    low : "1,155",
                    high : "1,200",
                    avg : "1,182",
                    val : "9.6",
                    vol : "81,047",
                    freq : "1,201",
                    fbuy : "1,170",
                    fsell : "31",
                    fnet : "1,139",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                {
                    no : 29,
                    code : "BMRI",
                    prev : "346",
                    last : "346",
                    change : "0",
                    persen : "0",
                    open : "346",
                    low : "338",
                    high : "350",
                    avg : "343",
                    val : "1.9",
                    vol : "54,681",
                    freq : "12,378",
                    fbuy : "344",
                    fsell : "12,034",
                    fnet : "11,690",
                    financial : "3,000,000,000,000",
                    action: ""
                },
                { no : 30,
                    code : "CTRA",
                    prev : "1,075",
                    last : "1,065",
                    change : "-10",
                    persen : "-0.9",
                    open : "1,080",
                    low : "1,050",
                    high : "1,115",
                    avg : "1,073",
                    val : "38.2",
                    vol : "355,717",
                    freq : "2,692",
                    fbuy : "1,065",
                    fsell : "1,627",
                    fnet : "-562",
                    financial : "3,000,000,000,000",
                    action: ""
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
    }
    //lagi
    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
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

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    className={this.props.typegrid =="summary" ? "card-478 ag-theme-balham-dark ag-striped-odd" : "card-202 ag-theme-balham-dark ag-striped-odd"}
                    id="myGrid"
                    style={{
                        width: "100%"
                    }}>
                    <AgGridReact
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        rowHeight= "32"
                        defaultColDef={this.state.defaultColDef}
                        onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                        onGridReady={this.onGridReady}>
                    </AgGridReact>
                </div>
            </div>
        );
    }
}

class MarketIndicesAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "sector", headerName: "Sector", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?150:125,
                    lockVisible:true, lockPosition:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12 text-primary locked-col locked-visible";
                    },suppressSizeToFit: true, pinned: 'left'},
                { field: "last", headerName: "Last", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:128,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "change", headerName: "Change", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "persen", headerName: "%" , sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "prevclosed", headerName: "Prev. Closed", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?135:122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "open", headerName: "Open", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?133:122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "high", headerName: "High", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?133:122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "low", headerName: "Low", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?135:122,
                    cellClass : function (params) {
                        var change = parseFloat(params.data.change.replace(/,/g,""));
                        return change < 0 ? "text-danger text-right  grid-table d-border-aggrid-right f-12":
                            change > 0 ? "text-success text-right grid-table d-border-aggrid-right f-12" :
                                "text-warning text-right grid-table d-border-aggrid-right f-12";
                    }},
                { field: "volume", headerName: "Volume", sortable: true, filter: "agTextColumnFilter", resizable: true, width: 122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    } },
                { field: "value", headerName: "Value (T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?162:122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fbuy", headerName: "F.Buy (T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width:s=="s75"?132:122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fsell", headerName: "F.Sell (T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "fnet", headerName: "F.Net (T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?140:122,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                {
                    sector : "AGRI",
                    last : "1,450,595",
                    change : "12,139",
                    persen : "12",
                    prevclosed : "1,462,73",
                    open : "1,462,73",
                    high: "1,488,19",
                    low : "1,450,07",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "BASIC-IND",
                    last : "764,357",
                    change : "8,727",
                    persen : "8",
                    prevclosed : "773,084",
                    open : "773,084",
                    high: "773,837",
                    low : "765,718",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "CONSUMER",
                    last : "2,401,342",
                    change : "3,777",
                    persen : "3",
                    prevclosed : "2,405,119",
                    open : "2,405,119",
                    high: "2,420,738",
                    low : "2,395,573",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "FINANCE",
                    last : "1,289,866",
                    change : "1,492",
                    persen : "1",
                    prevclosed : "1,291,358",
                    open : "1,291,358",
                    high: "1,291,937",
                    low : "1,288,628",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "INFRASTUCTUR",
                    last : "1,184,857",
                    change : "6,146",
                    persen : "6",
                    prevclosed : "1,191,003",
                    open : "1,191,003",
                    high: "1,198,257",
                    low : "1,188,002",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "MINING",
                    last : "16,452",
                    change : "84,267",
                    persen : "8",
                    prevclosed : "1,729,467",
                    open : "1,729,467",
                    high: "1,729,911",
                    low : "1,646,26",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "MISC-IND",
                    last : "1,275,075",
                    change : "-1,017",
                    persen : "-1",
                    prevclosed : "1,274,058",
                    open : "1,274,058",
                    high: "1,283,462",
                    low : "1,261,231",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "PROPERTY",
                    last : "4,883",
                    change : "-1,769",
                    persen : "-17",
                    prevclosed : "486,531",
                    open : "486,531",
                    high: "491,971",
                    low : "485,299",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
                },
                {
                    sector : "TRADE",
                    last : "799,128",
                    change : "3,053",
                    persen : "3",
                    prevclosed : "802,181",
                    open : "802,181",
                    high: "803,575",
                    low : "798,562",
                    volume : "10,454,100",
                    value : "73,000,000,100",
                    fbuy : "6K",
                    fsell : "2K",
                    fnet : "4K",
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
                    className="grid-294 ag-theme-balham-dark ag-striped-even"
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

class TopBrokerAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true,
                    width: 50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 120,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?410:s=="s80"?370:s=="s90"?300:240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?240:s=="s80"?230:s=="s90"?180:150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "bval", headerName: "B. Val(T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?230:s=="s80"?210:s=="s90"?190:170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12 text-danger";
                    }},
                { field: "sval", headerName: "S. Val(T)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?230:s=="s80"?210:s=="s90"?190:175,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12 text-success";
                    } },
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 190,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?320:s=="s80"?210:s=="s90"?190:170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            rowData: [
                { no: 1+s,
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
                    tfreq: "5,040"},],
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
            getRowHeight: function (params) {
                return 23;
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
                    className="card-175 ag-theme-balham-dark ag-striped-odd"
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

class TopBrokerBAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, width: 50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: 120, uppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?410:s=="s80"?370:s=="s90"?300:240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?240:s=="s80"?230:s=="s90"?180:150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "bval", headerName: "B. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?230:s=="s80"?210:s=="s90"?190:170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12 text-danger";
                    }},
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: 260,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?480:s=="s80"?350:s=="s90"?310:275,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 23;
            },
            rowData: [{ no: 1,
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
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
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

class TopBrokerSAgGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        const self = this;
        const s = props.size;
        this.state = {
            columnDefs: [
                { field: "no", headerName: "#", sortable: true, width: 50,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-center f-12";
                    }},
                { field: "code", headerName: "Code", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: 120,
                    suppressSizeToFit:true, lockVisible:true,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12 locked-visible";
                    }},
                { field: "company", headerName: "Company", sortable: true, filter: "agTextColumnFilter", resizable: true,
                    width: s=="s75"?410:s=="s80"?370:s=="s90"?300:240,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-left f-12";
                    }},
                { field: "tval", headerName: "T. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?240:s=="s80"?230:s=="s90"?180:150,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    }},
                { field: "sval", headerName: "S. Val(T)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?230:s=="s80"?210:s=="s90"?190:170,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12 text-success";
                    }},
                { field: "tvol", headerName: "T. Vol(Lot)", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: 260,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
                { field: "tfreq", headerName: "T. Freq", sortable: true, filter: "agTextColumnFilter",
                    resizable: true, width: s=="s75"?480:s=="s80"?350:s=="s90"?310:275,
                    cellClass : function (params) {
                        return " grid-table d-border-aggrid-right text-right f-12";
                    } },
            ],
            defaultColDef: {
                sortable: true,
                filter: true,
            },
            getRowHeight : function(params){
                return 23;
            },
            rowData: [
                { no: 1,
                    code: "DX",
                    company: "Bahana Sekuritas",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 2,
                    code: "MS",
                    company: "Morgan Stanley Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 3,
                    code: "KS",
                    company: "Kresna Sekuritas",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 4,
                    code: "RX",
                    company: "Macquarie Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
                { no: 5,
                    code: "YU",
                    company: "CGS-CIMB Sekuritas Indonesia",
                    tval: "99.64",
                    sval: "38.62",
                    tvol: "104.73",
                    tfreq: "5,040"},
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
                    className="card-138 ag-theme-balham-dark ag-striped-odd"
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

const StatisticMarketStatistikPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode
    }),
)(StatisticMarketStatistikPage_Base);

export default MarketStatistikPage;
export {CustomFrameHeaderMarketStatistik, MarketStatistik};
