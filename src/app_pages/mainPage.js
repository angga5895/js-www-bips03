import React from 'react';

// internal framework libraries
import { AppFrameAction, AppFrame, AppModal } from '../appframe.js';

// application-logic libraries
import { BIPSAppContext } from '../AppData.js';

// application-common-UI libraries goes here
import UISelectionTab, {UISelectionTab_Scale} from '../selectiontab.js';
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
      thememode:'night',
      scalemode: 1,
  }

  componentDidMount () {

  }

  doLogin = (userID, password) => {
    this.props.doLogin(userID, password);
  }

  changeScale80 = () => {
      var zoomLevelL = 1.26;
      $('#myLiveTrade').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });
      $('#mySideBar').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });


      var zoomLevel = 0.8;
      $('body').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });

      document.body.style.setProperty('--column-col-sm-3-6', "25%");
      document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

      document.body.style.setProperty('--card-667', "855px");
      document.body.style.setProperty('--card-trading', "390px");
      document.body.style.setProperty('--card-213', "295px");
      document.body.style.setProperty('--card-249', "330px");
      document.body.style.setProperty('--card-75', "805px");
      document.body.style.setProperty('--card-515', "680px");
      document.body.style.setProperty('--card-295', "300px");
      document.body.style.setProperty('--card-292', "470px");
      document.body.style.setProperty('--card-600', "790px");
      document.body.style.setProperty('--card-199', "260px");
      document.body.style.setProperty('--card-225', "285px");
      document.body.style.setProperty('--card-170', "228px");
      document.body.style.setProperty('--card-550', "725px");
      document.body.style.setProperty('--card-grafik', "480px");
      document.body.style.setProperty('--card-530', "720px");
      document.body.style.setProperty('--card-500', "680px");
      document.body.style.setProperty('--card-160', "218px");
      document.body.style.setProperty('--card-592', "780px");
      document.body.style.setProperty('--py-2-scale', '14px');
      document.body.style.setProperty('--card-470', '650px');
      document.body.style.setProperty('--card-558', '748px');
      this.setState({
          scalemode : zoomLevel,
      })
  }

  changeScale90 = () => {
      var zoomLevelL = 1.1;
      $('#myLiveTrade').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });
      $('#mySideBar').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });

      var zoomLevel = 0.9;
      $('body').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });

      document.body.style.setProperty('--column-col-sm-3-6', "25%");
      document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

      document.body.style.setProperty('--card-667', "750px");
      document.body.style.setProperty('--card-trading', "335px");
      document.body.style.setProperty('--card-213', "245px");
      document.body.style.setProperty('--card-249', "280px");
      document.body.style.setProperty('--card-75', "700px");
      document.body.style.setProperty('--card-515', "590px");
      document.body.style.setProperty('--card-295', "300px");
      document.body.style.setProperty('--card-292', "370px");
      document.body.style.setProperty('--card-600', "690px");
      document.body.style.setProperty('--card-199', "230px");
      document.body.style.setProperty('--card-225', "240px");
      document.body.style.setProperty('--card-170', "200px");
      document.body.style.setProperty('--card-550', "630px");
      document.body.style.setProperty('--card-grafik', "390px");
      document.body.style.setProperty('--card-530', "620px");
      document.body.style.setProperty('--card-500', "580px");
      document.body.style.setProperty('--card-160', "185px");
      document.body.style.setProperty('--card-592', "655px");
      document.body.style.setProperty('--py-2-scale', '9.5px');
      document.body.style.setProperty('--card-470', '550px');
      document.body.style.setProperty('--card-558', '642px');
      this.setState({
          scalemode : zoomLevel,
      })
  }

  changeScale100 = () => {
      var zoomLevelL = 1;
      $('#myLiveTrade').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });
      $('#mySideBar').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });

      var zoomLevel = 1;
      $('body').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });

      document.body.style.setProperty('--column-col-sm-3-6', "25%");
      document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

      document.body.style.setProperty('--card-667', '667px');
      document.body.style.setProperty('--card-trading', '300px');
      document.body.style.setProperty('--card-213', '213px');
      document.body.style.setProperty('--card-249', '249px');
      document.body.style.setProperty('--card-75', '620px');
      document.body.style.setProperty('--card-515', '515px');
      document.body.style.setProperty('--card-295', '295px');
      document.body.style.setProperty('--card-292', '292px');
      document.body.style.setProperty('--card-600', '600px');
      document.body.style.setProperty('--card-199', '199px');
      document.body.style.setProperty('--card-225', '225px');
      document.body.style.setProperty('--card-170', '170px');
      document.body.style.setProperty('--card-550', '550px');
      document.body.style.setProperty('--card-grafik', "310px");
      document.body.style.setProperty('--card-530', "540px");
      document.body.style.setProperty('--card-500', "500px");
      document.body.style.setProperty('--card-160', "160px");
      document.body.style.setProperty('--card-592', "592px");
      document.body.style.setProperty('--py-2-scale', '.5rem');
      document.body.style.setProperty('--card-470', '470px');
      document.body.style.setProperty('--card-558', '558px');
      this.setState({
          scalemode : zoomLevel,
      })
  }

  changeScale110 = () => {
      var zoomLevelL = 1;
      $('#myLiveTrade').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });
      $('#mySideBar').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });

      var zoomLevel = 1.1;
      $('body').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });

      document.body.style.setProperty('--column-col-sm-3-6', "50%");
      document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");

      document.body.style.setProperty('--card-667', '667px');
      document.body.style.setProperty('--card-trading', '300px');
      document.body.style.setProperty('--card-213', '213px');
      document.body.style.setProperty('--card-249', '249px');
      document.body.style.setProperty('--card-75', '620px');
      document.body.style.setProperty('--card-515', '515px');
      document.body.style.setProperty('--card-295', '295px');
      document.body.style.setProperty('--card-292', '292px');
      document.body.style.setProperty('--card-600', '600px');
      document.body.style.setProperty('--card-199', '199px');
      document.body.style.setProperty('--card-225', '225px');
      document.body.style.setProperty('--card-170', '170px');
      document.body.style.setProperty('--card-550', '550px');
      document.body.style.setProperty('--card-grafik', "310px");
      document.body.style.setProperty('--card-530', "540px");
      document.body.style.setProperty('--card-500', "500px");
      document.body.style.setProperty('--card-160', "160px");
      document.body.style.setProperty('--card-592', "592px");
      document.body.style.setProperty('--py-2-scale', '.5rem');
      document.body.style.setProperty('--card-470', '470px');
      document.body.style.setProperty('--card-558', '558px');
      this.setState({
          scalemode : zoomLevel,
      })
  }

  changeScale120 = () => {
      var zoomLevelL = 1;
      $('#myLiveTrade').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });
      $('#mySideBar').css({ zoom: zoomLevelL, '-moz-transform': 'scale(' + zoomLevelL + ')' });

      var zoomLevel = 1.2;
      $('body').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });


      document.body.style.setProperty('--column-col-sm-3-6', "50%");
      document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");

      document.body.style.setProperty('--card-667', '667px');
      document.body.style.setProperty('--card-trading', '300px');
      document.body.style.setProperty('--card-213', '213px');
      document.body.style.setProperty('--card-249', '249px');
      document.body.style.setProperty('--card-75', '620px');
      document.body.style.setProperty('--card-515', '515px');
      document.body.style.setProperty('--card-295', '295px');
      document.body.style.setProperty('--card-292', '292px');
      document.body.style.setProperty('--card-600', '600px');
      document.body.style.setProperty('--card-199', '199px');
      document.body.style.setProperty('--card-225', '225px');
      document.body.style.setProperty('--card-170', '170px');
      document.body.style.setProperty('--card-550', '550px');
      document.body.style.setProperty('--card-grafik', "310px");
      document.body.style.setProperty('--card-530', "540px");
      document.body.style.setProperty('--card-500', "500px");
      document.body.style.setProperty('--card-160', "160px");
      document.body.style.setProperty('--card-592', "592px");
      document.body.style.setProperty('--py-2-scale', '.5rem');
      document.body.style.setProperty('--card-470', '470px');
      document.body.style.setProperty('--card-558', '558px');
      this.setState({
          scalemode : zoomLevel,
      })
  }

  changeThemeModeNight = () => {
      this.setState({
          thememode : 'night',
          chartstyle:'dark_chart_style.min',
      })
  }

  changeThemeModeLight = () => {
      this.setState({
          thememode : 'light',
          chartstyle:'light_chart_style.min',
      })
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
      document.body.style.setProperty('--warna-scroll', this.state.thememode == 'night' ? "#676767" : "#B3B4B4");
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
      document.body.style.setProperty('--warna-table-striped', this.state.thememode == 'night' ? "#272727" : "#E7E8E8");
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
        <div style={{display: props.networkState && props.loginState ? "block" : "none"}}>
            <LoginUserPage/>*/
        }
          {
              this.state.scalemode <= 1 ?
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
              :
                  <UISelectionTab_Scale modeoftheme={this.selectSelectionTab} linkTitles={
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
          }

          <div className="row col-lg-12 px-0 mx-0 card card-667">
              <SideBar thememode={this.selectStyleGroup}/>
              <div className="col-lg-11 px-0 mx-0 d-border-bottom">
                  <AppFrame headerComponent={CustomFrameHeader}/>
              </div>
          </div>
          <i onClick={this.state.fullscreenmode == false ? this.openContentFullscreen : this.closeContentFullscreen}
             className={this.state.fullscreenmode == false ? "icon-icon-fullscreen-in myBtn" : "icon-exit-fullscreen myBtn"}></i>
          <div onClick={this.state.thememode == 'light' ? this.changeThemeModeNight : this.changeThemeModeLight}
             className="modeTheme">{this.state.thememode == 'light'? "Night Mode" : "Light Mode"}</div>
          <div onClick={this.changeScale80}
             className="scale80">Scale 80</div>
          <div onClick={this.changeScale90}
             className="scale90">Scale 90</div>
          <div onClick={this.changeScale100}
             className="scale100">Scale 100</div>
          <div onClick={this.changeScale110}
             className="scale110">Scale 110</div>
          <div onClick={this.changeScale120}
             className="scale120">Scale 120</div>
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

