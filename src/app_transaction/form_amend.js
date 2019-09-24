import React from "react";
import {Button, InputGroup, Table} from "react-bootstrap";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import Select from "react-select";
import {AppFrameAction} from "./../appframe";
import VerifyPIN, {tanggal} from "../app_pages/verifyPin";
import NumberInput from "../numberinput";

const stateOptions = [
    { key: 'rg', value: 'rg', text: 'RG' },
    { key: 'day', value: 'day', text: 'Day' },
];

class FormAmend extends React.PureComponent{
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
                    <div className="col-sm-6 pl-2 f-18 text-success"><span className="text-primary">Amend</span> [Sell]</div>
                    <div className="col-sm-6 pr-0 text-right"><i className="fa fa-calendar-alt"></i> {tanggal()}</div>
                </div>
                <div className="form-group row mb-0">
                    <div className="col-sm-2 pl-2">Code</div>
                    <div className="col-sm-10 mr-0 pr-0 pl-3 row">
                        <Input defaultValue='AALI' placeholder='Code' size='small' className="col-sm-3 pl-0 pr-2 text-center align-self-center"/>
                        <Input label={{ color: 'bg-gold', content: '90%' }} defaultValue='Argo Astra Lestari Tbk.'
                               labelPosition='left' placeholder='Code' size='small' className="col-sm-7 px-2 align-self-center"/>
                        <Checkbox label='Prevent same order' className="f-12 text-white my-3 align-self-center" />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-7 ml-0 px-0 row">
                        <div className="col-sm-3 pl-2 pr-0">Price</div>
                        <div className="col-sm-8 mr-4 pl-0 pr-4">
                            <NumberInput idclassname={this.props.idPrice} name="sell_price" placeholder="Price" size="small" defaultValue={"12650"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                        </div>
                    </div>
                    <div className="col-sm-4 mr-0 ml-4 px-2 text-center align-middle align-self-center">
                        <Checkbox label='Auto Last' className="f-12 text-white col-sm-11 px-4 my-0 align-self-center" />
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-7 ml-0 px-0 row">
                        <div className="col-sm-3 pl-2 pr-0">Vol</div>
                        <div className="col-sm-8 mr-4 pl-0 pr-4">
                            <NumberInput idclassname={this.props.idVol} name="sell_vol" placeholder="Vol" size="small" defaultValue={"10"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                        </div>
                    </div>
                    <div className="col-sm-4 mr-0 ml-4 pl-3 pr-0 text-center align-middle align-self-center row">
                        <div className="col-sm-6 px-0 mx-0 align-self-center">
                            <label className="col-sm-11 bg-dark-grey py-2 align-self-center">Lot</label>
                        </div>
                        <div className="col-sm-6 px-0 mx-0 align-self-center">
                            <Checkbox label='All' className="f-12 text-white col-sm-12 my-0 align-self-center" />
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-3">
                    <div className="col-sm-7 ml-0 px-0 row">
                        <div className="col-sm-3 pl-2 pr-0">Mkt.</div>
                        <div className={this.props.columnSm === 'col-sm-12' ? "col-sm-9 mr-0 px-0" : "col-sm-9 mr-0 pl-0 pr-3" }>
                            <Dropdown placeholder='Mkt' search selection options={stateOptions} className={"f-12 text-center align-self-center "+this.props.columnSm} defaultValue="rg" disabled/>
                        </div>
                    </div>
                    <div className="col-sm-4 mr-0 ml-5 px-0 text-center align-middle align-self-center">
                        <Checkbox label='Order Booking' className="f-12 text-white col-sm-11 px-2 my-0 align-self-center" />
                    </div>
                </div>

                <div className="form-group row mb-2">
                    <div className="col-sm-7 ml-0 px-0 row">
                        <div className="col-sm-3 pl-2 pr-0 mb-3">Expire</div>
                        <div className={this.props.columnSm === 'col-sm-12' ? "col-sm-9 mr-0 mb-3 px-0" : "col-sm-9 mr-0 mb-3 pl-0 pr-3" }>
                            <Dropdown placeholder='Expire' search selection options={stateOptions} className={"f-12 text-center align-self-center "+this.props.columnSm} defaultValue="day" disabled/>
                        </div>

                        <div className="col-sm-3 pl-2 pr-0 mb-3">Value</div>
                        <div className="col-sm-8 mr-4 pl-0 mb-3 pr-4">
                            <NumberInput idclassname={this.props.idValue} name="sell_value" placeholder="Value" size="small" defaultValue={"12600"} className="col-sm-12 px-0 f-12 text-center align-self-center" />
                        </div>
                    </div>
                    <div className="col-sm-4 mr-0 ml-5 px-0 text-center align-middle align-self-center">
                        <Button size="sm" className="btn btn-lg btn-primary col-sm-10" onClick={this.buttonClickPIN}>
                            <i className="icon-icon-amend-btn fa-2x"></i>
                            <br/>Amend
                        </Button>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <Table responsive borderless size="sm" className="text-white pb-0 mb-0 d-border-table">
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td className="bg-gray-tradding">Cash On <br/> T+2</td>
                            <td className="d-border-tr-gray">5,911,198</td>
                            <td className="bg-gray-tradding">Remain <br/> Trade Limit</td>
                            <td className="d-border-tr-gray">15,000,980</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

class PINVerify extends React.Component {

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <VerifyPIN tipe = 'amend'/>
            </>
        );
    }
}

export default FormAmend;