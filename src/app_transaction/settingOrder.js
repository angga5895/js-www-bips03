import React from "react";
import {AppFrameAction} from "../appframe";
import {WSConnectionAction} from "../appnetwork";
import TableInfoTransaction from "./tableInfoTransaction";
import {Dropdown, Input} from "semantic-ui-react";
import NumberInput from "../numberinput";

const stateOptionsLp = [
    { key: 'lastprice', value: 'lastprice', text: 'Last Price' },
    { key: 'bestofferprice', value: 'bestofferprice', text: 'Best Offer Price' },
    { key: 'bestbidprice', value: 'bestbidprice', text: 'Best Bid Price' },
];

const stateOptionsOperator = [
    { key: 'lebihkecil', value: 'lebihkecil', text: '< =' },
    { key: 'lebihbesar', value: 'lebihbesar', text: '> =' },
];

class SettingOrder extends React.Component{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction /> {/* websocket connection component */}
                <div className="col sm-8 px-0 mx-0 row">
                    <div className="col-sm-6 pr-3 pl-0 mt-4 f-12">
                        <TableInfoTransaction lotshare="buyPage" />
                    </div>
                    <div className="col-sm-6 mt-4 d-border-active bg-dark-grey pb-3 px-0">
                        <div className="cssmenumodal bg-dark-grey pb-4 col-sm-12 mx-0 px-0">
                            <ul>
                                <li className={ this.state.activeTab === '1' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('1'); }}><a><span className="f-11">&nbsp; Buy</span></a></li>
                                <li className={ this.state.activeTab === '2' ? 'd-border-bottom active click-pointer col-sm-6 px-0 mx-0 f-12 text-center' : 'd-border-bottom text-white click-pointer col-sm-6 px-0 mx-0 f-12 text-center' } onClick={() => { this.toggle('2'); }}><a><span className="f-11">&nbsp; Sell</span></a></li>
                            </ul>
                        </div>
                        <div className={this.state.activeTab === '1' ? 'd-block f-12' : 'd-none'}>
                            <div className="d-border-transparent-grey">
                                <div className="d-border-bottom mb-3">
                                    <div className="form-group mb-3 px-4 py-form">
                                        <label aria-label="code" className="text-white">Code</label>
                                        <div id="code" className="col-sm-12 px-0 mx-0 row">
                                            <Input readonly defaultValue='AALI' placeholder='Code' icon={
                                                <i aria-hidden="true" className="search icon text-white"></i>
                                            } size='small' className="col-sm-5 px-0 text-center align-self-center"/>
                                            <Input readonly defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-7 pl-4 pr-0 text-center align-self-center"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 px-0 mx-0 row mb-3 px-4">
                                        <div className="col-sm-3 pl-0 text-danger f-11">12,750</div>
                                        <div className="col-sm-1 px-0 text-danger f-11"><i className="icofont icofont-caret-down"></i></div>
                                        <div className="col-sm-3 pr-0 text-danger f-11">-60,240</div>
                                        <div className="col-sm-2 pr-0 text-danger f-11">-0,40%</div>
                                    </div>
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="condition" className="text-white">Set Condition</label>
                                        <div id="condition" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-4 mr-0 px-0">
                                                <Dropdown placeholder='Last Price' search selection options={stateOptionsLp} className={"f-12 text-center align-self-center col-sm-12 px-2"} defaultValue="lastprice"/>
                                            </div>
                                            <div className="col-sm-3 mr-0 px-3">
                                                <Dropdown placeholder='< =' search selection options={stateOptionsOperator} className={"f-12 text-center align-self-center col-sm-12 px-2"} defaultValue="lebihkecil"/>
                                            </div>
                                            <div className="col-sm-5 mr-0 px-0">
                                                <NumberInput idclassname={this.props.lpSetting} name="buy_laspricesetting" placeholder="Value" size="small" defaultValue={"12600"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-border-bottom mb-3">
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="ordervol" className="text-white">Order Vol</label>
                                        <div id="ordervol" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-4 mr-0 px-0">
                                                <NumberInput idclassname={this.props.volSetting} name="buy_volsetting" placeholder="Value" size="small" defaultValue={"10"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                            </div>
                                            <div className="col-sm-3 mr-0 ml-3 px-3 align-self-center">
                                                <label className="mb-0">Lot</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-border-bottom mb-3">
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="orderprice" className="text-white">Order Price</label>
                                        <div id="orderprice" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-5 mr-0 px-0">
                                                <Dropdown placeholder='Last Price' search selection options={stateOptionsLp} className={"f-12 text-center align-self-center col-sm-12"} defaultValue="lastprice"/>
                                            </div>
                                            <div className="col-sm-2 mr-0 px-3 align-self-center text-center">
                                                <label className="mb-0">IDR</label>
                                            </div>
                                            <div className="col-sm-5 mr-0 px-0">
                                                <NumberInput idclassname={this.props.opSetting} name="buy_orderpricesetting" placeholder="Value" size="small" defaultValue={"12650"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="expiredate" className="text-white">Expire date</label>
                                        <div id="expiredate" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-5 mr-0 px-0">
                                                <Input defaultValue='27/11/2019' placeholder='Expire date' size='small' className="col-sm-12 px-0 mx-0 align-self-center" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mx-4 row py-form">
                                        <div className="col-sm-8 px-0 mx-0"></div>
                                        <div className="col-sm-4 px-0 mx-0">
                                            <button className="d-border mx-1 pull-right col-sm-12 btn btn-sm btn-primary"><span><i className="icofont icofont-save"></i> Save Setting</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.activeTab === '2' ? 'd-block f-12' : 'd-none'}>
                            <div className="d-border-transparent-grey">
                                <div className="d-border-bottom mb-3">
                                    <div className="form-group mb-3 px-4 py-form">
                                        <label aria-label="code" className="text-white">Code</label>
                                        <div id="code" className="col-sm-12 px-0 mx-0 row">
                                            <Input readonly defaultValue='AALI' placeholder='Code' icon={
                                                <i aria-hidden="true" className="search icon text-white"></i>
                                            } size='small' className="col-sm-5 px-0 text-center align-self-center"/>
                                            <Input readonly defaultValue='Astra Argo Lestari Tbk.' placeholder='Name' size='small' className="col-sm-7 pl-4 pr-0 text-center align-self-center"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 px-0 mx-0 row mb-3 px-4">
                                        <div className="col-sm-3 pl-0 text-success f-11">65,750</div>
                                        <div className="col-sm-1 px-0 text-success f-11"><i className="icofont icofont-caret-up"></i></div>
                                        <div className="col-sm-3 pr-0 text-success f-11">+15,650</div>
                                        <div className="col-sm-2 pr-0 text-success f-11">+1,75%</div>
                                    </div>
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="condition" className="text-white">Set Condition</label>
                                        <div id="condition" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-4 mr-0 px-0">
                                                <Dropdown placeholder='Last Price' search selection options={stateOptionsLp} className={"f-12 text-center align-self-center col-sm-12 px-2"} defaultValue="lastprice"/>
                                            </div>
                                            <div className="col-sm-3 mr-0 px-3">
                                                <Dropdown placeholder='< =' search selection options={stateOptionsOperator} className={"f-12 text-center align-self-center col-sm-12 px-2"} defaultValue="lebihkecil"/>
                                            </div>
                                            <div className="col-sm-5 mr-0 px-0">
                                                <NumberInput idclassname={this.props.slpSetting} name="buy_laspricesetting" placeholder="Value" size="small" defaultValue={"12600"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-border-bottom mb-3">
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="ordervol" className="text-white">Order Vol</label>
                                        <div id="ordervol" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-4 mr-0 px-0">
                                                <NumberInput idclassname={this.props.svolSetting} name="buy_volsetting" placeholder="Value" size="small" defaultValue={"10"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                            </div>
                                            <div className="col-sm-3 mr-0 ml-3 px-3 align-self-center">
                                                <label className="mb-0">Lot</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-border-bottom mb-3">
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="orderprice" className="text-white">Order Price</label>
                                        <div id="orderprice" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-5 mr-0 px-0">
                                                <Dropdown placeholder='Last Price' search selection options={stateOptionsLp} className={"f-12 text-center align-self-center col-sm-12"} defaultValue="lastprice"/>
                                            </div>
                                            <div className="col-sm-2 mr-0 px-3 align-self-center text-center">
                                                <label className="mb-0">IDR</label>
                                            </div>
                                            <div className="col-sm-5 mr-0 px-0">
                                                <NumberInput idclassname={this.props.sopSetting} name="buy_orderpricesetting" placeholder="Value" size="small" defaultValue={"12650"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="form-group px-4 py-form">
                                        <label aria-label="expiredate" className="text-white">Expire date</label>
                                        <div id="expiredate" className="col-sm-12 px-0 mx-0 row">
                                            <div className="col-sm-5 mr-0 px-0">
                                                <Input defaultValue='27/11/2019' placeholder='Expire date' size='small' className="col-sm-12 px-0 mx-0 align-self-center" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group mx-4 row py-form">
                                        <div className="col-sm-8 px-0 mx-0"></div>
                                        <div className="col-sm-4 px-0 mx-0">
                                            <button className="d-border mx-1 pull-right col-sm-12 btn btn-sm btn-primary"><span><i className="icofont icofont-save"></i> Save Setting</span></button>
                                        </div>
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

export default SettingOrder;