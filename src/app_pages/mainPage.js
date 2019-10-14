import React from 'react';

// internal framework libraries
import { AppFrameAction, AppFrame, AppModal } from '../appframe.js';

// application-logic libraries
import { BIPSAppContext } from '../AppData.js';

// application-common-UI libraries goes here
import UISelectionTab from '../selectiontab.js';
import { ContextConnector } from '../appcontext.js';
import SideBar from "../SideBar";
import './../bootstrap-3.3.7/dark_chart_style.min';
import LoginUserPage from './loginPage';
import $ from 'jquery';
window.$ = window.jQuery = $;

const CustomFrameHeader = (props) => {
  return (
    <div className="bg-black-trading d-border-top">
      <h2>{props.title}</h2>
    </div>
  );
}

class LoginPage extends React.Component {
  /*
    expected props: onLogin(uid, password)
  */

  onButtonClick = () => {
    this.props.onLogin(this.refs.userID.value, this.refs.password.value);
  }

  render () {

    return <div>
        <h1>Login to BIPS</h1>
        <p>&nbsp;</p>
        <label>User ID&nbsp;&nbsp;</label><input ref="userID" /><br />
        <br />
        <label>Password&nbsp;&nbsp;</label><input ref="password" type="password"/><br />
        <br />
        <button onClick={this.onButtonClick}>LOGIN</button>
      </div>

  }
}

class MainPage_Base extends React.Component {
  constructor (props) {
    super(props);

    /*
      expected props:

      loginState,
      networkState,
      doLogin,
    */

  }

  state = {
      fullscreenmode:false,
  }

  componentDidMount () {

  }

  doLogin = (userID, password) => {
    this.props.doLogin(userID, password);
  }

  openContentFullscreen = () => {
      /* let elem = document.querySelector('.content'); */
      /* Access the element of "full screen" div: */
      /*const elem = this.fullscreenModal.current;*/
      var elem = document.getElementById("bipsFullscreen");

      /* Interact with it as a normal DOM element: */
      if (elem.requestFullscreen) {
          document.documentElement.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
            elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { //IE/Edge
            elem.msRequestFullscreen();
      }

      this.setState({
          fullscreenmode : true
      })
  }

  closeContentFullscreen = () => {
      /* let elem = document.querySelector('.content'); */
      /* Access the element of "full screen" div: */
      /*const elem = this.fullscreenModal.current;*/

      /* Interact with it as a normal DOM element: */
      if (document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement) {
          // can use exitFullscreen
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          }
          this.setState({
              fullscreenmode : false
          })
      } else {
          var elem = document.getElementById("bipsFullscreen");

          /* Interact with it as a normal DOM element: */
          if (elem.requestFullscreen) {
              elem.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { // Firefox
              elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
              elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { //IE/Edge
              elem.msRequestFullscreen();
          }

          this.setState({
              fullscreenmode : true
          })
      }

  }

  render () {
      document.body.style.setProperty('--warna-dasar', this.props.thememode === true  ? "#010101" : "#FCFCFC");
      document.body.style.setProperty('--warna-header-card', this.props.thememode === true  ? "#181818" : "#E7E8E8");
      document.body.style.setProperty('--warna-text-basic', this.props.thememode === true  ? "#FFFFFF" : "#878787");
      document.body.style.setProperty('--warna-black-white', this.props.thememode === true  ? "#000000" : "#FCFCFC");
      document.body.style.setProperty('--warna-black-white-gradient', this.props.thememode === true  ? "#212121" : "#F9FAFB");
      document.body.style.setProperty('--warna-cssmenu', this.props.thememode === true  ? "#F7F7F7" : "#878787");
      document.body.style.setProperty('--warna-gray', this.props.thememode === true  ? "#4D4E4E" : "#999999");
      document.body.style.setProperty('--warna-inactive-gradient', this.props.thememode === true  ? "#0F0F10" : "#F9FAFB");
      document.body.style.setProperty('--warna-btn-dark', this.props.thememode === true  ? "#3D3E3F" : "#CDCDCE");
      document.body.style.setProperty('--warna-btn-dark-hover', this.props.thememode === true  ? "#333332" : "#CDCDDD");
      document.body.style.setProperty('--warna-scroll', this.props.thememode === true  ? "#676767" : "#B3B4B4");
      document.body.style.setProperty('--warna-black-white-semantic', this.props.thememode === true  ? "#FFFFFF" : "#010101");
      document.body.style.setProperty('--warna-background-semantic', this.props.thememode === true  ? "#333332" : "#FEFEFE");
      document.body.style.setProperty('--warna-background-semantic-gradient', this.props.thememode === true  ? "#010101" : "#FFFFFF");
      document.body.style.setProperty('--warna-d-border', this.props.thememode === true  ? "#565252" : "#999999");
      document.body.style.setProperty('--warna-d-border-bold', this.props.thememode === true  ? "#FFFFFF" : "#999999");
      document.body.style.setProperty('--warna-d-border-black', this.props.thememode === true  ? "#010101" : "#E7E7E7");
      document.body.style.setProperty('--warna-bg-dark-grey', this.props.thememode === true  ? "#1A1A1A" : "#E9E9E9");
      document.body.style.setProperty('--warna-bg-trading-gray', this.props.thememode === true  ? "#262626" : "#E3E3E3");
      document.body.style.setProperty('--warna-text-menu', this.props.thememode === true  ? "#FFFFFF" : "#E7E7E7");
      document.body.style.setProperty('--warna-hover-menu', this.props.thememode === true  ? "#111111" : "#CCCCCC");
      document.body.style.setProperty('--warna-table-striped', this.props.thememode === true  ? "#272727" : "#E7E8E8");
    /*
      Important system components:

      AppFrame: frame viewer
      AppModal: modal viewer
    */

    var props = this.props;
    return (
      <div>
        {/*<div style={{display: !props.networkState ? "block" : "none"}}>
          <h1>Connecting...</h1>
        </div>
        <div style={{display: props.networkState && !props.loginState ? "block" : "none"}}>
          <LoginPage onLogin={this.doLogin} />
        </div>
        <div style={{display: props.networkState && props.loginState ? "block" : "none"}}>*/
            <div style={{display: !props.loginState ? "block" : "none"}}>
                <LoginUserPage/>
            </div>
        }{
              <div style={{display: props.loginState ? "block" : "none"}}>
                      <UISelectionTab linkTitles={
                          {
                              landingPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-investment-board fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips">INVESTMENT<br/>BOARD</span>
                                  </div>,
                              marketstatistikPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-market-statistic fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 6.5px"}}>MARKET &</span><br/>
                                      <span className="fs-text-bips">STATISTIC</span>
                                  </div>,
                              stockPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-stock-page fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 15.3px"}}>
                                  STOCK
                                </span>
                                  </div>,
                              tradePage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-trade-page fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 15.3px"}}>
                                  TRADE
                                </span>
                                  </div>,
                              analyticPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-analytic_page fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 7.8px"}}>ANALYTIC</span>
                                  </div>,
                              chatsupportPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-chat-support fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 11.1px"}}>CHATS &</span><br/>
                                      <span className="fs-text-bips">SUPPORT</span>
                                  </div>,
                              livetradePage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-live-trade fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 21.09px"}}>LIVE</span><br/>
                                      <span className="fs-text-bips">TRADE</span>
                                  </div>
                          }
                      }
                      />

                  <div className="row col-sm-12 px-0 mx-0 card card-667">
                      <SideBar/>
                      <div className="col-sm-contentbar px-0 mx-0 d-border-bottom">
                          <AppFrame headerComponent={CustomFrameHeader}/>
                      </div>
                  </div>
                  <i onClick={this.state.fullscreenmode == false ? this.openContentFullscreen : this.closeContentFullscreen}
                     className={this.state.fullscreenmode == false ? "icon-icon-fullscreen-in myBtn" : "icon-exit-fullscreen myBtn"}></i>
                  <AppModal/>
              </div>
          }
      </div>
    );
  }
}

const MainPage = ContextConnector(BIPSAppContext,
  (vars, actions) => ({
    loginState: vars.loginState,
    networkState: vars.networkState,
    doLogin: (userID, password) => {actions.sendAction('doLogin', {userID, password})},
    thememode : vars.thememode,
  }),
  ["doLogin"]
)(MainPage_Base);

export default MainPage;

