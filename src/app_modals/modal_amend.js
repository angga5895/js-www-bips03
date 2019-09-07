import React from "react";
import {AppFrameAction} from "./../appframe";
import TableInfoTransaction from "./../app_transaction/tableInfoTransaction";
import FormAmend from "../app_transaction/form_amend";

class ModalAmend extends React.Component{
    render(){
        return(
            <>
                <AppFrameAction ref="frameAction" />
                <div className="text-white f-12">
                    <div className="col sm-8 px-0 mx-0 row">
                        <div className="col-sm-6 pr-3 pl-0 mt-4">
                            <TableInfoTransaction lotshare="modalamend" />
                        </div>
                        <div className="col-sm-6 mt-4 d-border-active">
                            <FormAmend cb1="checkbox1amendmodal" cb2="checkbox2amendmodal" cb3="checkbox3amendmodal"/>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

export default ModalAmend;