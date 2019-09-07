import React from "react";
import {AppFrameAction} from "./../appframe";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import FormSell from "./../app_transaction/form_sell";

class ModalSell extends React.Component{
    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row">
                        <div className="col-sm-6 pr-3 pl-0 mt-4">
                            <TableInfoTransaction lotshare="modalSell" />
                        </div>
                        <div className="col-sm-6 mt-4 d-border-active">
                            <FormSell cb1="checkbox1modalsell" cb2="checkbox2modalsell" cb3="checkbox3modalsell" cb4="checkbox4modalsell"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ModalSell;