import React from 'react';

// internal framework libraries
import { WSConnectionAction } from '../appnetwork.js';
import { AppFrameAction } from '../appframe.js';
import { ContextConnector } from '../appcontext.js';
import { BIPSAppContext } from '../AppData.js';

import { CommentActions } from 'semantic-ui-react';
import $ from "jquery";

class DisclaimerModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <div className="text-white f-12">
                    <p className="text-justify px-5 mx-5 py-1">
                        Proses akses terhadap efek, eksekusi perdagangan serta kinerja dan respon dari system
                        trading bisa terpengaruh, termasuk timbulnya keterlambatan dan kegagalan, oleh volatilitas,
                        volume perdagangan efek tinggi, fluktuasi pasar lainnya, tidak likuidnya suatu efek,
                        resiko dan kondisi pasar lainnya, keterlambatan informasi, kesalahan system, dan perangkat
                        lunak, permasalahan dengan system internet yang terkait dengan volume dan kepasitas
                        lalu - lintas internet, dan faktor - faktor lainnya. Salah satu atau lebih dari
                        faktor - faktor tersebut bisa terjadi sebelum atau sesudah transaksi di-input di dalam system,
                        sehingga menyebabkan keterlambatan atau kegagalan permasalahan order, perubahan order,
                        eksekusi transaksi dan/atau salah satu dari tindakan tersebut di atas. Anda menyatakan
                        telah mengetahui resiko - resiko tersebut, dan membebaskan Bahana Sekuritas dari tanggungjawab
                        terhadap hal tersebut.
                    </p>
                    <p className="text-justify px-5 mx-5 py-1">
                        Account access, trade execution and system response and performance may adversely affected,
                        including delays and failures, as a result of market volatility, high share volume,
                        other market fluctuations, illiquidity, other market conditions and risks, quote delays,
                        system and software errors, Internet system problems relating to Internet traffic volume
                        and capacity or other causes, and other factors. One or more of these factors may occur
                        before or after you place a trade, resulting in delayed or failed order placement, order
                        cancellation, trade execution and/or acknowledgement of any of those actions. Solely you
                        assume those risks, and give indemnity to PT. Bahana Securities.
                    </p>
                    <div className="text-center">
                            <button className="btn btn-primary col-sm-3" onClick={this.closeClick}>Close</button>
                    </div>
                </div>
            </>
        );
    }
}

class ForgotModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction ref="wsAction" />
                <label className="col-sm-12 px-5 py-2 col-form-label text-gray-tradding">Forgot Password</label>
                <div className="text-white f-12">
                    <div className="form-group">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Enter your email address and we'll
                        send link to reset your password
                        </label>
                    </div>
                    <div className="form-group mb-0">
                        <label className="col-sm-12 px-5 py-2 col-form-label">Email</label>
                        <div className="col-sm-12 px-5 py-0">
                            <input type="email" className="text-white input-login col-sm-12"/>
                        </div>
                    </div>

                    <div className="form-group py-3">
                        <div className="justify-content-center align-items-center d-flex py-0 px-5">
                            <button type="submit" className="btn btn-primary form-control py-0">
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="form-group text-center">
                        <label className="col-sm-12 px-5 py-2 col-form-label">
                            <span className="click-pointer btn btn-link text-primary" onClick={this.closeClick}> Back to Login Page</span>
                        </label>
                    </div>
                </div>
            </>
        );
    }
}

class SignUpModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
            </>
        );
    }
}

class LoginUserPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          passlogin : 'password'
        };
    }


    buttonClickDisclaimer = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center">Disclaimer</div>,
            closeIcon: false,
            contentClass: DisclaimerModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    buttonClickForgot = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-white text-center"><h1 className="text-center">BIPS</h1></div>,
            closeIcon: false,
            size : "mini",
            contentClass: ForgotModal,
            onClose: (result) => {console.log('Modal 2 result = ', result)}
        })
    }

    buttonClickSignUp = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-danger font-weight-bold text-center">Sign Up Belum Tersedia</div>,
            closeIcon: true,
            size : "mini",
            contentClass: SignUpModal,
            onClose: (result) => {console.log('Modal 3 result = ', result)}
        })
    }

    buttonClickLogin = () => {
        var r = this.refs;
        var p = this.props;

        /*p.onLogin(r.userID.value, r.password.value);*/
        // console.log(r)

        var user = $("#inputuser").val();
        var pass = $("#inputpass").val();

        if (user === '' && pass === ''){
            $("#input-user").addClass("d-border-danger");
            $("#input-pass").addClass("d-border-danger");

            $("#req_user").text("required");
            $("#req_user").css("display","block");
            $("#req_pass").text("required");
            $("#req_pass").css("display","block");
        } else if(user === ''){
            $("#input-user").addClass("d-border-danger");

            $("#req_user").text("required");
            $("#req_user").css("display","block");
        } else if (pass === ''){
            $("#input-pass").addClass("d-border-danger");

            $("#req_pass").text("required");
            $("#req_pass").css("display","block");
        } else {
            if (pass !== "123456") {
                $("#alert-wrong").removeClass("fade-out");
                $("#alert-wrong").addClass("fade-in");
            } else {
                $("#alert-wrong").removeClass("fade-in");
                $("#alert-wrong").addClass("fade-out");
            }
        }
    }

    onMouseDownPass = (e) => {
        this.setState({
            passlogin: 'text'
        })
    }

    onMouseUpPass = (e) => {
        this.setState({
            passlogin: 'password'
        })
    }

    onChangeUser = (e) => {
        $("#input-user").removeClass("d-border-danger");
        $("#req_user").css("display", "none");
    }

    onChangePass = (e) => {
        $("#input-pass").removeClass("d-border-danger");
        $("#req_pass").css("display", "none");
    }

    render () {
        return (
            <div className="bg-black-trading f-12">
                <AppFrameAction ref="frameAction" />
                <WSConnectionAction  ref="wsAction" />
                <main>
                    <div className="container-fluid p-login text-center">
                        <div className="card card-body bg-dark-grey d-border-active">
                            <h1 className="text-center my-4">BIPS</h1>
                            <div className="form-group mb-4">
                                {/*<label className="col-sm-12 px-5 py-2 col-form-label">User ID</label>*/}
                                <div className="col-sm-12 px-5 py-2">
                                    {/*<input type="text" ref="userID" className="text-white input-login col-sm-12"/>*/}
                                    <div id="input-user" className="ui left icon input col-sm-12 text-white px-0 dark">
                                        <input type="text" ref="userID" placeholder="User ID" id="inputuser" onChange={this.onChangeUser}/>
                                        <i aria-hidden="true" className="icon p-3">
                                            <i className="icon-icon-user-login"></i>&nbsp;&nbsp;|
                                        </i>
                                    </div>
                                    <div className="text-right">
                                        <small className="text-danger" id="req_user" style={{"display":"none"}}></small>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-0">
                                {/*<label className="col-sm-12 px-5 py-2 col-form-label">Password</label>*/}
                                <div className="col-sm-12 px-5 py-0">
                                    {/*<input type="password" ref="password" className="text-white input-login col-sm-12"/>*/}
                                    <div className="buttonInside">
                                        <div id="input-pass" className="ui left icon input col-sm-12 text-white px-0 dark">
                                            <input type={this.state.passlogin} ref="password" placeholder="Password" id="inputpass" onChange={this.onChangePass}/>
                                            <i aria-hidden="true" className="icon p-3">
                                                <i className="icon-icon-lock-login"></i>&nbsp;&nbsp;|
                                            </i>
                                        </div>
                                        <button className="button-inside-input-login btn-dark" onMouseDown={this.onMouseDownPass} onMouseUp={this.onMouseUpPass}><i className="fa fa-eye"></i></button>
                                    </div>
                                    <div className="text-right">
                                        <small className="text-danger" id="req_pass" style={{"display":"none"}}></small>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group text-center mb-5">
                                <small className="col-sm-12 px-5 py-2 col-form-label">Forgot your password?
                                    <span className="click-pointer btn btn-link" onClick={this.buttonClickForgot}> <small className="text-primary"> Click here</small></span>
                                </small>
                            </div>

                            <div className="form-group py-0 mb-0">
                                <div className="justify-content-center align-items-center d-flex py-0 px-5">
                                    <button type="submit" onClick={this.buttonClickLogin} className="btn btn-primary form-control py-0">
                                        Login
                                    </button>
                                </div>
                            </div>

                            <div className="form-group py-0 mt-0 mb-4 text-center">
                                <small className="py-0 px-5 col-form-label">
                                    <span className="click-pointer px-0 btn btn-link" onClick={this.buttonClickDisclaimer}>
                                        <small className="text-primary">Disclaimer</small>
                                    </span>
                                </small>
                            </div>

                            <div className="form-group py-0 my-0 text-center">
                                <small className="col-sm-12 px-5 py-2 col-form-label">New BIPS?
                                    <span className="click-pointer btn btn-link" onClick={this.buttonClickSignUp}> <small className="text-primary"> Sign Up</small></span>
                                </small>
                            </div>
                        </div>

                        <div id="alert-wrong" className={"col-sm-12 text-center fade-out mt-2 px-5"}>
                            <div id="content-alert" className={"px-4 py-2 text-white bg-danger "}>The user ID or password did not match our records.
                                Please try again</div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default LoginUserPage;
