import React from "react";
import {Input, Checkbox, Dropdown} from "semantic-ui-react";
import {AppFrameAction} from "../appframe";
import ID from ".././img/img-sign_up/ID.png";
import Bank from ".././img/img-sign_up/bank.png";

//datepicker
import $ from 'jquery';
import '../bootstrap-3.3.7/bootstrap-datepicker.min.css';

class FormDocument extends React.PureComponent{
    render(){
        
        return(
            <div className="f-12">
                <AppFrameAction ref="frameAction" />      
                <div className="col-sm-3">ID Card</div>
                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                        <div className="form-group">
                            <div className="input-group input-file" name="Fichier1">
                                <input type="text" class="form-control black" placeholder='Choose a file' />			
                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-choose" type="button">Browse</button>
                                </span>
                            </div>
	                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 mx-0 mb-3 ">
                    <div class="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <img src={ID} alt="Logo" width="250px"/>;
                    </div>
                </div>
                

                <div class="col-sm-3">Bank Account</div>
                <div className="form-group row mb-0">
                    <div className="col-sm-5 mx-0 mb-2 ">
                        <div className="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                        <div class="form-group">
                            <div className="input-group input-file" name="Fichier1">
                                <input type="text" class="form-control black" placeholder='Choose a file' />			
                                <span className="input-group-btn">
                                    <button className="btn btn-primary btn-choose" type="button">Browse</button>
                                </span>
                            </div>
	                        </div>
                           
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 mx-0 mb-3 ">
                    <div class="ui small input col-sm-12 px-0 f-12 text-center align-self-center black">
                        <img src={Bank} alt="Logo" width="250px"/>;
                    </div>
                </div>
            </div>
        );
    }
}

export default FormDocument;