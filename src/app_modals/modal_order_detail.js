import React from "react";
import {AppFrameAction} from "./../appframe";
import {Table} from "react-bootstrap";

class ModalOrderDetail extends React.PureComponent{
    render() {
        return (
            <>
                <style>{'' +
                'thead.orderdetail th {' +
                '    background-color: var(--warna-header-card)!important;' +
                '}' +
                ''}
                </style>
                <div className="col-sm-12 text-white px-0 mx-0 py-2 f-12">
                    <div className="col-sm-12 row mx-0 px-0">
                        <Table size="sm" responsive bordered className="text-white">
                            <thead></thead>
                            <tbody className="f-12">
                            <tr><td colSpan="2" className="f-14 bg-gray-tradding text-center font-weight-bold">ORDER DETAIL</td></tr>
                            <tr>
                                <td>Order Number</td>
                                <td>001682</td>
                            </tr>
                            <tr>
                                <td>Market Order Number</td>
                                <td>MKT021</td>
                            </tr>
                            <tr>
                                <td>Code</td>
                                <td>AALI [Astra Argo Lestari Tbk.]</td>
                            </tr>
                            <tr>
                                <td>Command</td>
                                <td className="text-danger">Buy</td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>Day</td>
                            </tr>
                            <tr>
                                <td>Market</td>
                                <td>RG</td>
                            </tr>
                            <tr>
                                <td>Total Match Volume (Lot)</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>Match Value</td>
                                <td>88,550,000</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-sm-12 text-white px-0 mx-0 py-2">
                    <div className="card card-trading bg-grey">
                        <div className="card-body scrollable mx-0 px-0 my-0 py-0">
                            <Table size="sm" responsive borderless className="text-white">
                                <thead className="no-wrap f-12 t-border orderdetail">
                                <tr>
                                    <th className="align-middle text-center" rowSpan="2">Date</th>
                                    <th className="align-middle text-center" rowSpan="2">Time</th>
                                    <th className="align-middle text-center" rowSpan="2">Action</th>
                                    <th className="align-middle text-center" rowSpan="2">Status</th>
                                    <th className="align-middle text-center" rowSpan="2">Remark</th>
                                    <th className="align-middle text-center t-border-bottom" colSpan="2">Vol</th>
                                    <th className="align-middle text-center" rowSpan="2">Price</th>
                                    <th className="align-middle text-center t-border-bottom" colSpan="2">Match Vol</th>
                                    <th className="align-middle text-center" rowSpan="2">Match Price</th>
                                    <th className="align-middle text-center" rowSpan="2">Amount</th>
                                </tr>
                                <tr>
                                    <th className="align-middle text-center">Lot</th>
                                    <th className="align-middle text-center">Share</th>
                                    <th className="align-middle text-center">Lot</th>
                                    <th className="align-middle text-center">Share</th>
                                </tr>
                                </thead>
                                <tbody className="f-12">
                                <tr>
                                    <td className="py-3 align-middle text-center">04/07/2019</td>
                                    <td className="py-3 align-middle text-center">11:22:17</td>
                                    <td className="py-3 align-middle text-center">WITHDRAW</td>
                                    <td className="py-3 align-middle text-center">Done</td>
                                    <td className="py-3 align-middle text-center"></td>
                                    <td className="py-3 align-middle text-right">10</td>
                                    <td className="py-3 align-middle text-right">1,000</td>
                                    <td className="py-3 align-middle text-right">12,650</td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right">12,650,000</td>
                                </tr>
                                <tr className="bg-gray-tradding">
                                    <td className="py-3 align-middle text-center">04/07/2019</td>
                                    <td className="py-3 align-middle text-center">11:12:10</td>
                                    <td className="py-3 align-middle text-center"></td>
                                    <td className="py-3 align-middle text-center">Partial</td>
                                    <td className="py-3 align-middle text-center"></td>
                                    <td className="py-3 align-middle text-right">30</td>
                                    <td className="py-3 align-middle text-right">3,000</td>
                                    <td className="py-3 align-middle text-right">12,650</td>
                                    <td className="py-3 align-middle text-right">20</td>
                                    <td className="py-3 align-middle text-right">2,000</td>
                                    <td className="py-3 align-middle text-right">12,600</td>
                                    <td className="py-3 align-middle text-right">25,300,000</td>
                                </tr>
                                <tr>
                                    <td className="py-3 align-middle text-center">04/07/2019</td>
                                    <td className="py-3 align-middle text-center">11:10:17</td>
                                    <td className="py-3 align-middle text-center">AMEND</td>
                                    <td className="py-3 align-middle text-center">Done</td>
                                    <td className="py-3 align-middle text-center"></td>
                                    <td className="py-3 align-middle text-right">30</td>
                                    <td className="py-3 align-middle text-right">3,000</td>
                                    <td className="py-3 align-middle text-right">12,650</td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right">37,950,000</td>
                                </tr>
                                <tr className="bg-gray-tradding">
                                    <td className="py-3 align-middle text-center">04/07/2019</td>
                                    <td className="py-3 align-middle text-center">11:02:17</td>
                                    <td className="py-3 align-middle text-center"></td>
                                    <td className="py-3 align-middle text-center">Partial</td>
                                    <td className="py-3 align-middle text-center">Partial Match</td>
                                    <td className="py-3 align-middle text-right">100</td>
                                    <td className="py-3 align-middle text-right">10,000</td>
                                    <td className="py-3 align-middle text-right">12,650</td>
                                    <td className="py-3 align-middle text-right">50</td>
                                    <td className="py-3 align-middle text-right">5,000</td>
                                    <td className="py-3 align-middle text-right">12,600</td>
                                    <td className="py-3 align-middle text-right">63,250,000</td>
                                </tr>
                                <tr>
                                    <td className="py-3 align-middle text-center">04/07/2019</td>
                                    <td className="py-3 align-middle text-center">11:00:12</td>
                                    <td className="py-3 align-middle text-center">BUY</td>
                                    <td className="py-3 align-middle text-center">Done</td>
                                    <td className="py-3 align-middle text-center"></td>
                                    <td className="py-3 align-middle text-right">100</td>
                                    <td className="py-3 align-middle text-right">10,000</td>
                                    <td className="py-3 align-middle text-right">12,650</td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right"></td>
                                    <td className="py-3 align-middle text-right">126,500,000</td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ModalOrderDetail;