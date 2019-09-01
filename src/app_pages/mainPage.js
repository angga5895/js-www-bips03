import React from 'react';

// internal framework libraries
import { AppFrameAction, AppFrame, AppModal } from '../appframe.js';

// application-logic libraries
import { BIPSAppContext } from '../AppData.js';

// application-common-UI libraries goes here
import UISelectionTab from '../selectiontab.js';
import { ContextConnector } from '../appcontext.js';
import SideBar from "../SideBar";

const CustomFrameHeader = (props) => {
  return (
    <div className="bg-black-trading d-border-top d-border-bottom">
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
      thememode:'night'
  }

  componentDidMount () {

  }

  doLogin = (userID, password) => {
    this.props.doLogin(userID, password);
  }

  changeThemeModeNight = () => {
      this.setState({
          thememode : 'night'
      })
  }

  changeThemeModeLight = () => {
      this.setState({
          thememode : 'light'
      })
  }

  openContentFullscreen = () => {
      /* let elem = document.querySelector('.content'); */
      /* Access the element of "full screen" div: */
      /*const elem = this.fullscreenModal.current;*/
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

  selectSelectionTab = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : this.state.thememode == 'night' ? '#181717':'#F8F9F9',
            neutral20 : this.state.thememode == 'night' ? '#565252':'#DDDDDD',
            neutral30 : this.state.thememode == 'night' ? '#565252':'#DDDDDD',
            neutral40 : this.state.thememode == 'night' ? '#cccccc':'#767676',
            neutral80 : this.state.thememode == 'night' ? '#FFFFFF':'#999999',
            primary75 : this.state.thememode == 'night' ? '#FFFFFF':'#999999',
            primary50 : this.state.thememode == 'night' ? '#4D4D4E':'#F3F3F3',
            primary25 : this.state.thememode == 'night' ? '#4D4D4E':'#F3F3F3',
            primary   : '#0071BC',
        },
    });

  selectStyleGroup = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : this.state.thememode == 'night' ? '#3D3E3F' : '#CDCDCE',
            neutral20 : this.state.thememode == 'night' ? '#333332' : '#DDDDDD',
            neutral30 : this.state.thememode == 'night' ? '#333332' : '#DDDDDD',
            neutral40 : this.state.thememode == 'night' ? '#1A1A1A' : '#767676',
            neutral80 : this.state.thememode == 'night' ? '#FFFFFF' : '#999999',
            primary75 : this.state.thememode == 'night' ? '#FFFFFF' : '#999999',
            primary50 : this.state.thememode == 'night' ? '#4D4D4E' : '#F3F3F3',
            primary25 : this.state.thememode == 'night' ? '#4D4D4E' : '#F3F3F3',
            primary   : '#0071BC',
        },
    });

  render () {
      document.body.style.setProperty('--warna-dasar', this.state.thememode == 'night' ? "#010101" : "#FCFCFC");
      document.body.style.setProperty('--warna-header-card', this.state.thememode == 'night' ? "#181818" : "#E7E8E8");
      document.body.style.setProperty('--warna-text-basic', this.state.thememode == 'night' ? "#FFFFFF" : "#878787");
      document.body.style.setProperty('--warna-black-white', this.state.thememode == 'night' ? "#000000" : "#FCFCFC");
      document.body.style.setProperty('--warna-black-white-gradient', this.state.thememode == 'night' ? "#212121" : "#F9FAFB");
      document.body.style.setProperty('--warna-cssmenu', this.state.thememode == 'night' ? "#F7F7F7" : "#878787");
      document.body.style.setProperty('--warna-gray', this.state.thememode == 'night' ? "#4D4E4E" : "#999999");
      document.body.style.setProperty('--warna-inactive-gradient', this.state.thememode == 'night' ? "#0F0F10" : "#F9FAFB");
      document.body.style.setProperty('--warna-btn-dark', this.state.thememode == 'night' ? "#3D3E3F" : "#CDCDCE");
      document.body.style.setProperty('--warna-btn-dark-hover', this.state.thememode == 'night' ? "#333332" : "#CDCDDD");
      document.body.style.setProperty('--warna-scroll', this.state.thememode == 'night' ? "#4D4343" : "#B3B4B4");
      document.body.style.setProperty('--warna-black-white-semantic', this.state.thememode == 'night' ? "#FFFFFF" : "#010101");
      document.body.style.setProperty('--warna-background-semantic', this.state.thememode == 'night' ? "#333332" : "#FEFEFE");
      document.body.style.setProperty('--warna-background-semantic-gradient', this.state.thememode == 'night' ? "#010101" : "#FFFFFF");
      document.body.style.setProperty('--warna-d-border', this.state.thememode == 'night' ? "#565252" : "#999999");
      document.body.style.setProperty('--warna-d-border-bold', this.state.thememode == 'night' ? "#FFFFFF" : "#999999");
      document.body.style.setProperty('--warna-d-border-black', this.state.thememode == 'night' ? "#010101" : "#E7E7E7");
      document.body.style.setProperty('--warna-bg-dark-grey', this.state.thememode == 'night' ? "#1A1A1A" : "#E9E9E9");
      document.body.style.setProperty('--warna-bg-trading-gray', this.state.thememode == 'night' ? "#262626" : "#E3E3E3");
      document.body.style.setProperty('--warna-text-menu', this.state.thememode == 'night' ? "#FFFFFF" : "#E7E7E7");
      document.body.style.setProperty('--warna-hover-menu', this.state.thememode == 'night' ? "#111111" : "#CCCCCC");
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
        <div style={{display: props.networkState && props.loginState ? "block" : "none"}}>*/}
          <UISelectionTab modeoftheme={this.selectSelectionTab} linkTitles={
                {
                    landingPage:
                        <div className="text-align-center">
                            <i className="icon-icon-investment-board fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips">INVESTMENT<br/>BOARD</span>
                        </div>,
                    marketstatistikPage:
                        <div className="text-align-center">
                            <i className="icon-icon-market-statistic fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips" style={{padding:"0px 6.5px"}}>MARKET &</span><br/>
                            <span className="fs-text-bips">STATISTIC</span>
                        </div>,
                    stockPage:
                        <div className="text-align-center">
                            <i className="icon-icon-stock-page fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips" style={{padding:"0px 15.3px"}}>
                              STOCK
                            </span>
                        </div>,
                    tradePage:
                        <div className="text-align-center">
                            <i className="icon-icon-trade-page fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips" style={{padding:"0px 15.3px"}}>
                              TRADE
                            </span>
                        </div>,
                    analyticPage:
                        <div className="text-align-center">
                            <i className="icon-icon-analytic_page fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips" style={{padding:"0px 7.8px"}}>ANALYTIC</span>
                        </div>,
                    chatsupportPage:
                        <div className="text-align-center">
                            <i className="icon-icon-chat-support fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips" style={{padding:"0px 11.1px"}}>CHATS &</span><br/>
                            <span className="fs-text-bips">SUPPORT</span>
                        </div>,
                    livetradePage:
                        <div className="text-align-center">
                            <i className="icon-icon-live-trade fs-icon-bips"></i> <br/>
                            <span className="fs-text-bips" style={{padding:"0px 21.09px"}}>LIVE</span><br/>
                            <span className="fs-text-bips">TRADE</span>
                        </div>
                }
              } 
          />
          <div className="row col-lg-12 px-0 mx-0">
              <SideBar thememode={this.selectStyleGroup}/>
              <div className="col-lg-11 px-0 mx-0">
                  <AppFrame headerComponent={CustomFrameHeader}/>
              </div>
          </div>
          <i onClick={this.state.fullscreenmode == false ? this.openContentFullscreen : this.closeContentFullscreen}
             className={this.state.fullscreenmode == false ? "icon-icon-fullscreen-in myBtn" : "icon-exit-fullscreen myBtn"}></i>
          <div onClick={this.state.thememode == 'light' ? this.changeThemeModeNight : this.changeThemeModeLight}
             className="modeTheme">{this.state.thememode == 'light'? "Night Mode" : "Light Mode"}</div>
          <AppModal />
        {/*</div>*/}
      </div>
    );
  }
}

const MainPage = ContextConnector(BIPSAppContext, 
  (vars, actions) => ({
    loginState: vars.loginState,
    networkState: vars.networkState,
    doLogin: (userID, password) => {actions.sendAction('doLogin', {userID, password})}
  }), 
  ["doLogin"]
)(MainPage_Base);

export default MainPage;

