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

      //zaky
    this.state={
        seconds: 0,
        indexMarquee:0,
        indexData:10,
        timeChange:100,
        rowData: [
            { code: "AALI",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "ANTM",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "BBCA",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "TLKM",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "BBRI",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "ASII",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "BBMR",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "WSKT",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "AGII",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "ADHI",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "SMGR",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "EMTK",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "MREI",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "PTSP",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "TCPI",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "BRAM",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "INDF",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "JECC",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "RDTX",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "DUTI",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "FASW",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "IBST",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "SMMA",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "TKIM",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "JSMR",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "SONA",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "AMFG",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "SCCO",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "BYAN",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "UNTR",
              price: "3,870",
              change: "50",
              persen: "0.2",
              tvol: "156,450"},
            { code: "GGRM",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
            { code: "UNVR",
              price: "3,870",
              change: "-50",
              persen: "-0.2",
              tvol: "156,450"},
        ],
        fullscreenmode:false,
        spanData: [
            {
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },{
              code: "",
              price: "",
              change: "",
              persen: "",
              tvol: ""
            },
        ],
    };
    //zaky
  }

  componentDidMount(){
      this.interval = setInterval(() => this.tick(), 1000);

      var setElementHeight = function () {
          /*alert($('html').height());*/
          var height667 = $('html').height()-$('.header-normal-menu').height()-8;
          $('.card-667').css('min-height', (height667));
          var height32 = $('.card-32').height();
          $('.card-32').css('min-height', (height32));
          var height635 = height667-height32-1;
          $('.card-635').css('min-height', (height635));
          var height590 = height635-45;
          $('.card-590').css('min-height', (height590));
          var height550 = height635-85;
          $('.card-550').css('min-height', (height550));
          var height520 = height635-115;
          $('.card-520').css('min-height', (height520));
          var cardstockcash = height635-106;
          $('.card-stockcash').css('min-height', (cardstockcash));
          var height295 = height590/2;
          $('.card-295').css('min-height', (height295));
          var height560 = height635-75;
          $('.card-560').css('min-height', (height560));
          var height196 = (height635-45)/3;
          $('.card-196').css('min-height', (height196));
          var height121 = (height635/2)-196;
          $('.card-121').css('min-height', (height121));
          var height586 = height635-49;
          $('.card-586').css('min-height', (height586));
          var height501 = height635-115-19;
          $('.card-501').css('min-height', (height501));
          var height221 = ((height635-115-19)/2)-30;
          $('.card-221').css('min-height', (height221));
          var rsccontainer = height635-49;
          $('.rsc-container').css('min-height', (rsccontainer));
          var rsccontent = height635-49-133;
          $('.rsc-content').css('min-height', (rsccontent));
          var rscscroll = height635-49-40;
          $('.rsc-scroll').css('min-height', (rscscroll));

      };

      var setElementMargin = function () {
          var height667 = $('html').height()-$('.header-normal-menu').height()-8;

          if($('html').height() > 2499) {
              var sideMargin = ((height667/440)*100)/13+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 1536 && $('html').height() < 2500) {
              var sideMargin = ((height667/440)*100)/10+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 1319 && $('html').height() < 1537) {
              var sideMargin = ((height667/440)*100)/7.35+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 1100 && $('html').height() < 1320) {
              var sideMargin = ((height667/440)*100)/6.5+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 1042 && $('html').height() < 1099) {
              var sideMargin = ((height667/440)*100)/7.5+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 1023 && $('html').height() < 1043) {
              var sideMargin = ((height667/440)*100)/6.75+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 951 && $('html').height() < 1024) {
              var sideMargin = ((height667/440)*100)/7.5+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 875 && $('html').height() < 950) {
              var sideMargin = ((height667/440)*100)/8+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 772 && $('html').height() < 876) {
              var sideMargin = ((height667/440)*100)/9+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() > 695 && $('html').height() < 773) {
              var sideMargin = ((height667/440)*100)/12.5+'%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else if($('html').height() < 515){
              var sideMargin = '1%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          } else{
              var sideMargin = '13%';
              $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
          }
      };

      var setElementLiveZoom = function () {
          if($('html').height() > 2601)  {
              var liveTrade = 4.4;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '4rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if ($('html').height() > 2201 && $('html').height() < 2600) {
              var liveTrade = 3.5;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '4.5rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 2049 && $('html').height() < 2200) {
              var liveTrade = 3.1;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '4rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 1533 && $('html').height() < 2050) {
              var liveTrade = 2.3;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '3.5rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 1319 && $('html').height() < 1534) {
              var liveTrade = 2.1;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '3rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 1100 && $('html').height() < 1320) {
              var liveTrade = 1.63;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '2.4rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 1042 && $('html').height() < 1099) {
              var liveTrade = 1.5;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '1.9rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 1023 && $('html').height() < 1043) {
              var liveTrade = 1.4;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '1.75rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 951 && $('html').height() < 1024) {
              var liveTrade = 1.31;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '1.4rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 875 && $('html').height() < 950) {
              var liveTrade = 1.29;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '1.15rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else if($('html').height() > 772 && $('html').height() < 876) {
              var liveTrade = 1.14;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '.5rem';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          } else{
              var liveTrade = 1;
              $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
              var pyForm = '0px';
              $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
          }
      };

      $(document).ready(function () {
          setElementLiveZoom();
          setElementMargin();
          var card635 = $('html').height()-$('.header-normal-menu').height()-8-$('.card-32').height();
          if($('html').height() > 2699) {
              setElementHeight();
              var margin67 = (card635-106-80)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-630;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-300;
              $('.card-445').css('min-height', (cardheight445))
              var cardheight490 = card635-255;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-345;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95-30;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-150)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-475;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-75;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-175;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-150;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-600);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-200;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-200);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-345;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+15)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-80;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+240;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+240)/2;
              $('.card-279').css('min-height', (height279));
          } else if($('html').height() > 1899 && $('html').height() < 2700) {
              setElementHeight();
              var margin67 = (card635-106-20)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-470;
              $('.card-330').css('min-height', (height330));
              var cardheight490 = card635-205;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-295;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-130)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-350;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-50;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-150;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-120;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-475);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-120;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-170);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-275;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+9)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-60;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+170;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+170)/2;
              $('.card-279').css('min-height', (height279));
          } else if($('html').height() > 1499 && $('html').height() < 1900) {
              setElementHeight();
              var margin67 = (card635-106-20)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-350;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-190;
              $('.card-445').css('min-height', (cardheight445));
              var cardheight490 = card635-145;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-235;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-105)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-237;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-29;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-120;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-75;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-330);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-21;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-124);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-202;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+14)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-49;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+141;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+141)/2;
              $('.card-279').css('min-height', (height279));
          } else {
              setElementHeight();
              var margin67 = (card635-106)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-305;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-190;
              $('.card-445').css('min-height', (cardheight445));
              var cardheight490 = card635-145;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-235;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-105)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-237;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-29;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-120;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-75;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-330);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-21;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-124);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-202;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+14)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-49;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+141;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+141)/2;
              $('.card-279').css('min-height', (height279));
          }
      }).resize();

      $(window).on("resize", function () {
          setElementLiveZoom();
          setElementMargin();
          var card635 = $('html').height()-$('.header-normal-menu').height()-8-$('.card-32').height();
          if($('html').height() > 2699) {
              setElementHeight();
              var margin67 = (card635-106-80)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-630;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-300;
              $('.card-445').css('min-height', (cardheight445));
              var cardheight490 = card635-255;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-345;
              $('.card-400').css('min-height', (cardheight490));
              var height540 = card635-95-30;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-150)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-475;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-75;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-175;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-150;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-600);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-200;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-200);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-345;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+15)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-80;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+240;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+240)/2;
              $('.card-279').css('min-height', (height279));
          } else if($('html').height() > 1899 && $('html').height() < 2700) {
              setElementHeight();
              var margin67 = (card635-106-20)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-470;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-250;
              $('.card-445').css('min-height', (cardheight445));
              var cardheight490 = card635-205;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-295;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-130)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-350;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-50;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-150;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-120;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-475);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-120;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-170);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-275;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+9)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-60;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+170;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+170)/2;
              $('.card-279').css('min-height', (height279));
          } else if($('html').height() > 1499 && $('html').height() < 1900) {
              setElementHeight();
              var margin67 = (card635-106-20)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-350;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-190;
              $('.card-445').css('min-height', (cardheight445));
              var cardheight490 = card635-145;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-235;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-105)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-237;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-29;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-120;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-75;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-330);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-21;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-124);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-202;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+14)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-49;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+141;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+141)/2;
              $('.card-279').css('min-height', (height279));
          } else {
              setElementHeight();
              var margin67 = (card635-106)/8;
              $('li.list-group-item-portofolio').css('min-height', (margin67));
              var height330 = card635-305;
              $('.card-330').css('min-height', (height330));
              var cardheight445 = card635-190;
              $('.card-445').css('min-height', (cardheight445));
              var cardheight490 = card635-145;
              $('.card-490').css('min-height', (cardheight490));
              var cardheight400 = card635-235;
              $('.card-400').css('min-height', (cardheight400));
              var height540 = card635-95;
              $('.card-540').css('min-height', (height540));
              var height265 = (card635-105)/2;
              $('.card-265').css('min-height', (height265));
              var height398 = card635-237;
              $('.card-398').css('min-height', (height398));
              var height167 = ((card635-45)/3)-29;
              $('.card-167').css('min-height', (height167));
              var height515 = card635-120;
              $('.card-515').css('min-height', (height515));
              var height440 = (card635-120)-75;
              $('.card-440').css('min-height', (height440));
              var height305 = (card635-330);
              $('.card-305').css('min-height', (height305));
              var height297 = (card635/2)-21;
              $('.card-297').css('min-height', (height297));
              var height511 = (card635-124);
              $('.card-511').css('min-height', (height511));
              var cardheight433 = card635-202;
              $('.card-433').css('min-height', (cardheight433));
              var cardheight149 = (cardheight433+14)/3;
              $('.card-149').css('min-height', (cardheight149));
              var height586 = card635-49;
              $('.card-586').css('min-height', (height586));
              var height559 = ((card635/2)-196)+height297+141;
              $('.card-559').css('min-height', (height559));
              var height279 = (((card635/2)-196)+height297+141)/2;
              $('.card-279').css('min-height', (height279));
          }
      }).resize();
  }

  doLogin = (userID, password) => {
    this.props.doLogin(userID, password);
  }

  resizeResponsive = () => {
        var height667 = $('html').height()-$('.header-normal-menu').height()-8;
        $('.card-667').css('min-height', (height667));
        var height32 = $('.card-32').height();
        $('.card-32').css('min-height', (height32));
        var height635 = height667-height32-1;
        $('.card-635').css('min-height', (height635));
        var height590 = height635-45;
        $('.card-590').css('min-height', (height590));
        var height550 = height635-85;
        $('.card-550').css('min-height', (height550));
        var height520 = height635-115;
        $('.card-520').css('min-height', (height520));
        var cardstockcash = height635-106;
        $('.card-stockcash').css('min-height', (cardstockcash));
        var height295 = height590/2;
        $('.card-295').css('min-height', (height295));
        var height560 = height635-75;
        $('.card-560').css('min-height', (height560));
        var height196 = (height635-45)/3;
        $('.card-196').css('min-height', (height196));
        var height121 = (height635/2)-196;
        $('.card-121').css('min-height', (height121));
        var height586 = height635-49;
        $('.card-586').css('min-height', (height586));
        var height501 = height635-115-19;
        $('.card-501').css('min-height', (height501));
        var height221 = ((height635-115-19)/2)-30;
        $('.card-221').css('min-height', (height221));
        var rsccontainer = height635-49;
        $('.rsc-container').css('min-height', (rsccontainer));
        var rsccontent = height635-49-133;
        $('.rsc-content').css('min-height', (rsccontent));
        var rscscroll = height635-49-40;
        $('.rsc-scroll').css('min-height', (rscscroll));

        var card635 = $('html').height()-$('.header-normal-menu').height()-8-$('.card-32').height();
        if($('html').height() > 2699) {
            var margin67 = (card635-106-80)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-630;
            $('.card-330').css('min-height', (height330));
            var cardheight445 = card635-300;
            $('.card-445').css('min-height', (cardheight445))
            var cardheight490 = card635-255;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-345;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95-30;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-150)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-475;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-75;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-175;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-150;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-600);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-200;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-200);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-345;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+15)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-80;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+240;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+240)/2;
            $('.card-279').css('min-height', (height279));
        } else if($('html').height() > 1899 && $('html').height() < 2700) {
            var margin67 = (card635-106-20)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-470;
            $('.card-330').css('min-height', (height330));
            var cardheight490 = card635-205;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-295;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-130)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-350;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-50;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-150;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-120;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-475);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-120;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-170);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-275;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+9)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-60;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+170;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+170)/2;
            $('.card-279').css('min-height', (height279));
        } else if($('html').height() > 1499 && $('html').height() < 1900) {
            var margin67 = (card635-106-20)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-350;
            $('.card-330').css('min-height', (height330));
            var cardheight445 = card635-190;
            $('.card-445').css('min-height', (cardheight445));
            var cardheight490 = card635-145;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-235;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-105)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-237;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-29;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-120;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-75;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-330);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-21;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-124);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-202;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+14)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-49;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+141;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+141)/2;
            $('.card-279').css('min-height', (height279));
        } else {
            var margin67 = (card635-106)/8;
            $('li.list-group-item-portofolio').css('min-height', (margin67));
            var height330 = card635-305;
            $('.card-330').css('min-height', (height330));
            var cardheight445 = card635-190;
            $('.card-445').css('min-height', (cardheight445));
            var cardheight490 = card635-145;
            $('.card-490').css('min-height', (cardheight490));
            var cardheight400 = card635-235;
            $('.card-400').css('min-height', (cardheight400));
            var height540 = card635-95;
            $('.card-540').css('min-height', (height540));
            var height265 = (card635-105)/2;
            $('.card-265').css('min-height', (height265));
            var height398 = card635-237;
            $('.card-398').css('min-height', (height398));
            var height167 = ((card635-45)/3)-29;
            $('.card-167').css('min-height', (height167));
            var height515 = card635-120;
            $('.card-515').css('min-height', (height515));
            var height440 = (card635-120)-75;
            $('.card-440').css('min-height', (height440));
            var height305 = (card635-330);
            $('.card-305').css('min-height', (height305));
            var height297 = (card635/2)-21;
            $('.card-297').css('min-height', (height297));
            var height511 = (card635-124);
            $('.card-511').css('min-height', (height511));
            var cardheight433 = card635-202;
            $('.card-433').css('min-height', (cardheight433));
            var cardheight149 = (cardheight433+14)/3;
            $('.card-149').css('min-height', (cardheight149));
            var height586 = card635-49;
            $('.card-586').css('min-height', (height586));
            var height559 = ((card635/2)-196)+height297+141;
            $('.card-559').css('min-height', (height559));
            var height279 = (((card635/2)-196)+height297+141)/2;
            $('.card-279').css('min-height', (height279));

            //Margin
            if($('html').height() > 2499) {
                var sideMargin = ((height667/440)*100)/13+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1536 && $('html').height() < 2500) {
                var sideMargin = ((height667/440)*100)/10+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1319 && $('html').height() < 1537) {
                var sideMargin = ((height667/440)*100)/7.35+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1100 && $('html').height() < 1320) {
                var sideMargin = ((height667/440)*100)/6.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1042 && $('html').height() < 1099) {
                var sideMargin = ((height667/440)*100)/7.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 1023 && $('html').height() < 1043) {
                var sideMargin = ((height667/440)*100)/6.75+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 951 && $('html').height() < 1024) {
                var sideMargin = ((height667/440)*100)/7.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 875 && $('html').height() < 950) {
                var sideMargin = ((height667/440)*100)/8+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 772 && $('html').height() < 876) {
                var sideMargin = ((height667/440)*100)/9+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() > 695 && $('html').height() < 773) {
                var sideMargin = ((height667/440)*100)/12.5+'%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else if($('html').height() < 515){
                var sideMargin = '1%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            } else{
                var sideMargin = '13%';
                $('.my-sidebar').css({'margin-top':sideMargin, 'margin-bottom':sideMargin});
            }

            //Zoom Padding
            if($('html').height() > 2601)  {
                var liveTrade = 4.4;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '4rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if ($('html').height() > 2201 && $('html').height() < 2600) {
                var liveTrade = 3.5;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '4.5rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 2049 && $('html').height() < 2200) {
                var liveTrade = 3.1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '4rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 1533 && $('html').height() < 2050) {
                var liveTrade = 2.3;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '3.5rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 1319 && $('html').height() < 1534) {
                var liveTrade = 2.1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '3rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 1100 && $('html').height() < 1320) {
                var liveTrade = 1.63;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '2.4rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 1042 && $('html').height() < 1099) {
                var liveTrade = 1.5;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '1.9rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 1023 && $('html').height() < 1043) {
                var liveTrade = 1.4;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '1.75rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 951 && $('html').height() < 1024) {
                var liveTrade = 1.31;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '1.4rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 875 && $('html').height() < 950) {
                var liveTrade = 1.29;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '1.15rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else if($('html').height() > 772 && $('html').height() < 876) {
                var liveTrade = 1.14;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '.5rem';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            } else{
                var liveTrade = 1;
                $('.myLiveTrade').css({'zoom':liveTrade, '-moz-transform':'scale('+liveTrade+')'});
                var pyForm = '0px';
                $('.py-form').css({'padding-top':pyForm, 'padding-bottom':pyForm});
            }
        }
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
          document.documentElement.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
          document.documentElement.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { //IE/Edge
          document.documentElement.msRequestFullscreen();
      }

      this.resizeResponsive();

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

          this.resizeResponsive();
          this.setState({
              fullscreenmode : false
          })
      } else {
          var elem = document.getElementById("bipsFullscreen");

          /* Interact with it as a normal DOM element: */
          if (elem.requestFullscreen) {
              document.documentElement.requestFullscreen();
          } else if (elem.mozRequestFullScreen) { // Firefox
              document.documentElement.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) { //Chrome, Safari & Opera
              document.documentElement.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) { //IE/Edge
              document.documentElement.msRequestFullscreen();
          }

          this.resizeResponsive();
          this.setState({
              fullscreenmode : true
          })
      }

  }
    //zaky
    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));

        if(this.state.seconds === 199){
            this.setState({seconds: 100});
            this.setState({timeChange: 110});
        }

        //inisalisasi
        if(this.state.seconds === 1){
            let s = this.state.spanData.slice();
            s[0] = this.state.rowData[0];
            s[1] = this.state.rowData[1];
            s[2] = this.state.rowData[2];
            s[3] = this.state.rowData[3];
            s[4] = this.state.rowData[4];
            s[5] = this.state.rowData[5];
            s[6] = this.state.rowData[6];
            s[7] = this.state.rowData[7];
            s[8] = this.state.rowData[8];
            s[9] = this.state.rowData[9];
            this.setState({
                spanData: s,
            })
        }
        //merubah data
        if(this.state.seconds === this.state.timeChange){
            this.setState({indexData: (this.state.indexData + 1) % this.state.rowData.length });
            let s = this.state.spanData.slice();
            s[this.state.indexMarquee] = this.state.rowData[this.state.indexData];
            this.setState({spanData: s,})
            this.setState({indexMarquee: (this.state.indexMarquee + 1) % 10});
            this.setState({timeChange: (this.state.timeChange + 10)});
        }


    }
    //zaky
    componentWillUnmount() {
        clearInterval(this.interval);
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
            <div id="login-state" style={{display: !props.loginState ? "block" : "none"}}>
                <LoginUserPage/>
            </div>
        }{
              <div style={{display: props.loginState ? "block" : "none"}}>
                      <UISelectionTab linkTitles={
                          {
                              landingPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-investment-board fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips">MY ACCOUNT</span>
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
                              livetradePage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-live-trade fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 21.09px"}}>LIVE</span><br/>
                                      <span className="fs-text-bips">TRADE</span>
                                  </div>,
                              chatsupportPage:
                                  <div className="text-align-center">
                                      <i className="icon-icon-chat-support fs-icon-bips"></i> <br/>
                                      <span className="fs-text-bips" style={{padding: "0px 11.1px"}}>CHATS &</span><br/>
                                      <span className="fs-text-bips">SUPPORT</span>
                                  </div>
                          }
                      }
                      />

                  <div className="row col-sm-12 px-0 mx-0 card card-667">
                      <SideBar/>
                      <div className="col-sm-contentbar px-0 mx-0 d-border-bottom">
                          <div className="card-635">
                              <AppFrame headerComponent={CustomFrameHeader}/>
                          </div>{/*zaky*/}
                          <div className="d-border-top card-32 runningText">
                              <p className="marquee">
                                  <span>
                                      <kbd>{this.state.spanData[0].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[0].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[0].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[0].change}&nbsp;{this.state.spanData[0].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee2">
                                  <span>
                                      <kbd>{this.state.spanData[1].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[1].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[1].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[1].change}&nbsp;{this.state.spanData[1].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee3">
                                  <span>
                                      <kbd>{this.state.spanData[2].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[2].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[2].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[2].change}&nbsp;{this.state.spanData[2].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee4">
                                  <span>
                                      <kbd>{this.state.spanData[3].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[3].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[3].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[3].change}&nbsp;{this.state.spanData[3].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee5">
                                  <span>
                                      <kbd>{this.state.spanData[4].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[4].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[4].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[4].change}&nbsp;{this.state.spanData[4].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee6">
                                  <span>
                                      <kbd>{this.state.spanData[5].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[5].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[5].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[5].change}&nbsp;{this.state.spanData[5].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee7">
                                  <span>
                                      <kbd>{this.state.spanData[6].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[6].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[6].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[6].change}&nbsp;{this.state.spanData[6].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee8">
                                  <span>
                                      <kbd>{this.state.spanData[7].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[7].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[7].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[7].change}&nbsp;{this.state.spanData[7].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee9">
                                  <span>
                                      <kbd>{this.state.spanData[8].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[8].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[8].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[8].change}&nbsp;{this.state.spanData[8].persen}%
                                      </text>
                                  </span>
                              </p>
                              <p className="marquee marquee10">
                                  <span>
                                      <kbd>{this.state.spanData[9].code}</kbd>&nbsp;
                                      <i
                                          className={(this.state.spanData[9].change.includes("-"))
                                              ?"icofont icofont-caret-down text-danger":
                                              "icofont icofont-caret-up text-success"}>
                                      </i>
                                      <text
                                          className={(this.state.spanData[9].change.includes("-"))?"text-danger":"text-success"}>
                                          {this.state.spanData[9].change}&nbsp;{this.state.spanData[9].persen}%
                                      </text>
                                  </span>
                              </p>
                          </div>
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

