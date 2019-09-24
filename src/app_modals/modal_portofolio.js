import React from "react";
import { AppFrameAction } from "./../appframe";
import user_avatar from './../img/man.png';
// import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
// import FormBuy from "./../app_transaction/form_buy";

class ModalPortofolio extends React.Component {
    render() {

        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
        };

        const paddingParagraph = {
            padding: '10px'
        }

        const divMargin = {
            marginBottom: '15px'
        }

        const imgUser = {
            margin: 'auto',
            backgroundColor: '#3c3c3c',
            borderBottom: '2px solid #1A1A1A'
        }

        return (
            <>
                <AppFrameAction ref="frameAction" />
                {/* <div classNameName="text-white f-12">
                    <div classNameName="col sm-8 px-0 mx-0 row">
                        <div classNameName="col-sm-6 pr-3 pl-0 mt-4">
                            <TableInfoTransaction lotshare="modalbuy" />
                        </div>
                        <div classNameName="col-sm-6 mt-4 d-border-active">
                            <FormBuy cb1="checkbox1modalbuy" cb2="checkbox2modalbuy" cb3="checkbox3modalbuy" />
                        </div>
                    </div>
                </div> */}

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12" style={divMargin}>
                            <h4>Portofolio & Balance</h4>
                        </div>
                    </div>
                    <div className="row f-12">
                        <div className="col-md-4">
                            <div className="row" style={imgUser}>
                                <div className="col-md-12" style={imgdisplay}>
                                    <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" /><p style={paddingParagraph}>Mr. John Doe<br /><i>001-01-008538</i></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="list-group f-14">
                                        <li className="list-group-item-portofolio">Cash and Balance <span className="text-primary pull-right">5,911,198</span></li>
                                        <li className="list-group-item-portofolio">P/L <span className="text-success pull-right">1,496,198</span></li>
                                        <li className="list-group-item-portofolio">P/L Ratio <span className="text-success pull-right">+7.50%</span></li>
                                        <li className="list-group-item-portofolio">Cash Ballance T+2 <span className="text-primary pull-right">4,500,000</span></li>
                                        <li className="list-group-item-portofolio">Buy Limit <span className="pull-right">15,980,000</span></li>
                                        <li className="list-group-item-portofolio">Stock Value <span className="pull-right">15,234,000</span></li>
                                        <li className="list-group-item-portofolio">Unsettled Amt <span className="pull-right">?</span></li>
                                        <li className="list-group-item-portofolio">Mkt. Value <span className="pull-right">4,400,000</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Payment Taken</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>TB - Monthly</td>
                                                <td>01/04/2012</td>
                                                <td>Default</td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>TB - Monthly</td>
                                                <td>01/04/2012</td>
                                                <td>Approved</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p className="text-left">Settlement</p>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <table className="table text-white d-border-table bg-dark-grey table-sm table-borderless">
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Date</td>
                                                            <td className="d-border-tr-gray-all py-1">22/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-1">23/6/2019</td>
                                                            <td className="d-border-tr-gray-all py-1">24/6/2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Receiveable</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Payable</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Tax + Fee</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">-30</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Penalty</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Settlement Amount</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">- 1,411,168</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Cash Balance</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="no-wrap bg-gray-tradding d-border-tr-black">Total</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">5,911,198</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                            <td className="d-border-tr-gray-all text-right py-1">4,500,000</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
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

export default ModalPortofolio;