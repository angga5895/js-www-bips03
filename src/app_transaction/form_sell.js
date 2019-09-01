import React from "react";
import {Button, InputGroup, Table} from "react-bootstrap";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import Select from "react-select";
import {AppFrameAction} from "./../appframe";
import VerifyPIN, {tanggal} from "../app_pages/verifyPin";

const stateOptions = [
    { key: 'rg', value: 'rg', text: 'RG' },
    { key: 'day', value: 'day', text: 'Day' },
];

class FormSell extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickPIN = (e) => {
        var frameAction = this.refs.frameAction;
        frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            contentClass: PINVerify,
            onClose: (result) => console.log('Second modal result = ', result),
            size: "mini"
        });
    }

    render(){
        return(
            <div className="f-12">
                <AppFrameAction ref="frameAction" />
                <div className="form-group row">
                    <div className="col-sm-6 f-18 text-success">Sell</div>
                    <div className="col-sm-6 text-right"><i className="fa fa-calendar-alt"></i> {tanggal()}</div>
                </div>
                <div className="form-group row mb-0">
                    <div className="col-sm-2">Code</div>
                    <div className="col-sm-10 mr-0 pr-0 row">
                        <Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-3 pl-0 pr-2 text-center align-self-center"/>
                        <Input label={{ color: 'bg-gold', content: '90%' }} defaultValue='Argo Astra Lestari Tbk.'
                               labelPosition='left' placeholder='Code' size='small' className="col-sm-7 px-2 align-self-center"/>
                        <Checkbox label='Prevent same order' className="f-12 text-white my-3" />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-2">Price</div>
                    <div className="col-sm-10 mr-0 pr-0 row">
                        <Input defaultValue='12,600' placeholder='Price' size='small' className="col-sm-6 pl-0 pr-2 f-12 text-center align-self-center"/>
                        <Checkbox label='Auto Last' className="f-12 text-white col-sm-5 px-4 my-0" />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-2">Vol</div>
                    <div className="col-sm-10 mr-0 pr-0 row">
                        <Input defaultValue='10' placeholder='Vol' size='small' className="col-sm-6 pl-0 pr-2 f-12 text-center align-self-center"/>
                        <label className="col-sm-2 bg-dark-grey py-2">Lot</label>
                        <Checkbox label='All' className="f-12 text-white col-sm-2 my-0" />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-2">Mkt.</div>
                    <div className="col-sm-10 mr-0 pr-0 row">
                        <div className="col-sm-6 pl-0 pr-2">
                            <Dropdown placeholder='Mkt' search selection options={stateOptions} className="col-sm-12 f-12" defaultValue="rg"/>
                        </div>
                        <Checkbox label='Order Booking' className="f-12 text-white col-sm-6 px-4 my-0" />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <div className="col-sm-7 mx-0 px-0 row">
                        <div className="col-sm-3">Expire</div>
                        <div className="col-sm-9 mx-0 px-2 mb-3 form-select">
                            <Dropdown placeholder='Expire' search selection options={stateOptions} className="col-sm-12 f-12" defaultValue="day"/>
                        </div>

                        <div className="col-sm-3">Value</div>
                        <div className="col-sm-9 mx-0 px-2 mb-3 form-select">
                            <Input defaultValue='12,600' placeholder='Value' size='small' className="col-sm-12 px-0 f-12 text-center align-self-center"/>
                        </div>
                    </div>

                    <div className="col-sm-5 mx-0 px-2 text-center align-middle align-self-center">
                        <Button size="sm" className="btn btn-lg btn-success col-sm-8" onClick={this.buttonClickPIN}>
                            <i className="icon-icon-sell-btn fa-2x"></i>
                            <br/>Sell
                        </Button>
                    </div>
                </div>

                <Table responsive borderless size="sm" className="text-white pb-0 mb-0 d-border-table">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td className="bg-gray-tradding d-border-tr-black">Cash On <br/> T+2</td>
                        <td className="d-border-tr-gray">5,911,198</td>
                        <td className="bg-gray-tradding d-border-tr-black">Remain <br/> Trade Limit</td>
                        <td className="d-border-tr-gray">15,000,980</td>
                    </tr>
                    <tr>
                        <td className="bg-gray-tradding d-border-tr-black">Investment)</td>
                        <td className="d-border-tr-gray">7,545,000</td>
                        <td className="bg-gray-tradding d-border-tr-black">% Change</td>
                        <td className="d-border-tr-gray">-1.18%</td>
                    </tr>
                    <tr>
                        <td className="bg-gray-tradding">Vol</td>
                        <td>6</td>
                        <td className="bg-gray-tradding">P/L</td>
                        <td>-90,240</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

class PINVerify extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'sell'/>
            </>
        );
    }
}

export default FormSell;