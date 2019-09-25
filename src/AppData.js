import React from 'react';
import { ContextProvider, ContextConnector } from './appcontext.js';
import { NetAppContext, WSConnectionAction } from './appnetwork.js';

const SERVER_URL = 'ws://bahana.ihsansolusi.co.id:5050';
const RECONNECT_TIME = 1000;

var BIPSAppVars = {
  // Login
  loginState: false,
  loginRequestID: 0,
  networkState: false,
  loginErrState: false,
  loginErrReason: '',
  networkAPI: {
    send: (msg) => {},
    disconnect: () => {},
  },
  userID: '',
  sessionID: '',

  // subscibe Stock Summary
  subscribeMsg : {
    action_type:'SUBSCRIBE',
    sub_type:'STOCK_SUMMARY',
    session_id:'',
    data:['TLKM', 'AALI','HOME', 'BBMR','ANTM' ],
  },
  isSubcribe:false,

  // Stock Summary
  stockSummary: {
    'AALI': {
      prev_price: 0,
      last_price: 0,
      open_price: 0,
      low_price: 0,
      high_price: 0,
      traded_volume: 0,
      traded_frequency: 0,
      change: 0,
      chg_prcntg:0,
      vol:0,
      val:0,
      freq:0,

    }
  },

  // warna className
  colorClass:"text-dark",

  // investment Board
  portofolios :[
    {code: 'AALI', avgPrice: '12,650', lastPrice: '12,550', lot: '12', share: '122', stock: '12,650,000', iconPl:'icofont icofont-caret-down', p: ' -60,240', l: '-0.40%'},
    {code: 'ADHI', avgPrice: '1,529', lastPrice: '1,429', lot: '10', share: '100', stock: '1,529,000', iconPl:'icofont icofont-caret-down', p: ' -15,000', l: '-1.50%'},
    {code: 'ANTM', avgPrice: '1,025', lastPrice: '1,025', lot: '2', share: '210', stock: '1,025,000', iconPl:'icofont icofont-caret-down', p: ' -25,000', l: '-2.50%'},
    {code: 'ASII', avgPrice: '7,125', lastPrice: '7,025', lot: '9', share: '930', stock: '7,125,000', iconPl:'icofont icofont-caret-down', p: ' -50,000', l: '-5.78%'},
    {code: 'BBCA', avgPrice: '27,400', lastPrice: '27,800', lot: '4', share: '410', stock: '27,400,000', iconPl:'icofont icofont-caret-up', p: ' +250,660', l: '2.50%'},
  ],
  // orders:[
  //   {orderID:'1682', marketId:'MKT021', code:'AALI', cmd:'BUY', status:'Done', remark:'', type:'Day', mkt:'RG', volLot:'10', volShare:'100', price:'12,625', matchLot:'10', matchShare:'100', avgMatchPrice:'12,625', amount:'12,625,000', time:'11:22:17'},
  //   {orderID:'', marketId:'', code:'', cmd:'' , status:'', remark:'',  type:'', mkt:'', volLot:'', volShare:'', price:'', matchLot:'', matchShare:'', avgMatchPrice:'', amount:'', time:''}, 
  //   {orderID:'1681', marketId:'-', code:'AALI', cmd:'SELL', status:'Sending...',  remark:'to Server', type:'Day', mkt:'RG', volLot:'10', volShare:'1000', price:'12,650', matchLot:'0', matchShare:', 0', avgMatchPrice:'12,650', amount:'12,650,000', time:'11:22:10'},
  //   {orderID:'1680', marketId:'MKT012', code:'AALI', cmd:'SELL', status:'Done', remark:'' , type:'Day', mkt:'RG', volLot:'10', volShare:'1000', price:'12,650', matchLot:'10', matchShare:'1000', avgMatchPrice:'12,650', amount:'12,650,000', time:'11:20:17'},
  //   {orderID:'1679', marketId:'MKT010', code:'AALI', cmd:'BUY', status:'Partial', remark:'Amended', type:'Day', mkt:'RG', volLot:'15', volShare:'1500', price:'12,650', matchLot:'5', matchShare:', 500', avgMatchPrice:'12,650', amount:'12,650,000', time:'11:12:17'},
  //   {orderID:'1678', marketId:'MKT009', code:'BBCA', cmd:'BUY', status:'Open', remark:'Amended', type:'Day', mkt:'RG', volLot:'8', volShare:'', price:'29,500', matchLot:'0', matchShare:', 0', avgMatchPrice:'29,500', amount:'23,600,000', time:'11:10:12'},
  // ],
  // incomes:[
  //   {serial:'SUNMP15042019',  nominal:'7,000,000',  coupun:'8,0%',  couponDate:'date 20 every month',  dueDate:'2-Jan-21'},
  //   {serial:'SUNMP16042019',  nominal:'5,000,000',  coupun:'7,0%',  couponDate:'date 21 every month',  dueDate:'3-Jan-21'},
  //   {serial:'SUNMP17042019',  nominal:'2,000,000',  coupun:'5,0%',  couponDate:'date 22 every month',  dueDate:'4-Jan-21'},
  //   {serial:'SUNMP18042019',  nominal:'6,000,000',  coupun:'8,0%',  couponDate:'date 23 every month',  dueDate:'5-Jan-21'},
  //   {serial:'SUNMP19042019',  nominal:'4,000,000',  coupun:'9,0%',  couponDate:'date 24 every month',  dueDate:'6-Jan-21'},
  //   {serial:'SUNMP20042019',  nominal:'12,000,000', coupun:'6,0%',  couponDate:'date 25 every month',  dueDate:'7-Jan-21'},
  //   {serial:'SUNMP21042019',  nominal:'10,000,000', coupun:'6,0%',  couponDate:'date 26 every month',  dueDate:'8-Jan-21'},
  // ],
  // mutuals:[
  //   {code:'000D7Q RDPT BUMN Fund…', nav:'12,650', navDate:'6/3/2019:', currency:'12,650,000', potP:'-60,240', potL:'-0.40%'},
  //   {code:'0007DT Reksa Dana Penyetaan…', nav:'1,529', navDate:'6/3/2019', currency:'1,529,000', potP:'-15,000', potL:'-1.50%'},
  //   {code:'000D7Q RDPT BUMN Fund…', nav:'1,025', navDate:'6/3/2019', currency:'1,025,000', potP:'+250,66', potL:'2.50%'},
  //   {code:'0007DT Reksa Dana Penyetaan…', nav:'7,125', navDate:'6/3/2019:', currency:'7,125,000', potP:'+175:', potL:'1.75%'},
  //   {code:'000D7Q RDPT BUMN Fund…', nav:'12,650', navDate:'6/3/2019:', currency:'12,650,000:', potP:' -60,240:', potL:'-0.40%'},
  //   {code:'0007DT Reksa Dana Penyetaan…', nav:'1,529', navDate:'6/3/2019', currency:'1,529,000', potP:'-15,000', potL:'-1.50%'},


  //     {id:1, code:'AAL', nav:12650, navdate:'06/03/2019', currency:12650000, potP:'-1400', potL:'-0.4%', viewDetail:'sell'},
  //     {id:2, code:'ALA', nav:1650, navdate:'06/03/2019', currency:1650000, potP:'-1500', potL:'-1.4%', viewDetail:'sell'},
  //     {id:3, code:'LAA', nav:1250, navdate:'06/03/2019', currency:1250000, potP:'-2500', potL:'-2.4%', viewDetail:'sell'},
  //     {id:4, code:'LAL', nav:2650, navdate:'06/03/2019', currency:2650000, potP:'-5000', potL:'-3.4%', viewDetail:'sell'},
  // ],
  isGrid:true,
  isManual:true,
  signupState : false

}

var BIPSAppActions = {
  // login action
  setNetworkAPI: (vars, {send, disconnect}) => ({...vars, networkAPI: {send, disconnect}}),
  networkDisconnected: (vars) => ({...vars, loginState: false, networkState: false}),
  networkConnected: (vars) => ({...vars, loginState: false, networkState: true}),
  doLogin: (vars, {userID, password}) => {
    var message = JSON.stringify({action_type: 'LOGIN', user: userID, password: password});
    vars.networkAPI.send(message);
  },
  loginSuccessful: (vars, {sessionID}) => ({...vars, sessionID: sessionID, loginState: true, loginErrState: false, loginErrReason: ''}),
  loginFail: (vars, {reason}) => ({...vars, loginState: false, loginErrState: true, loginErrReason: reason}),
  getLoginRequestID: (vars, {cbRequestID}) => {
    var cid = vars.loginRequestID;
    cbRequestID(cid);
    return {...vars, loginRequestID: cid + 1}
  },

  // action Landing
  handleView:(vars, {isGrid})=>({...vars, isGrid:!vars.isGrid}),

  // action trade
  handleManual:(vars, {isManual})=>({...vars, isManual:!vars.isManual}),

  // action login
  getLogin:(vars, {loginState})=>({...vars, loginState:!vars.loginState}),

  // state signup
  isSignup:(vars, {signupState})=>({...vars, signupState:!vars.signupState}),

// subscribe
  subscribeMsgSukses:(vars,{mess})=>{
    return({
      ...mess,
      mess:mess
    })
  },

  subscribeStock: (vars, {sessionID}) => {
    var message = JSON.stringify({
      action_type:'SUBSCRIBE',
      sub_type:'STOCK_SUMMARY',
      session_id:sessionID,
      data:['TLKM', 'AALI','HOME', 'BBMR','ANTM' ],});
    vars.networkAPI.send(message);
  },

  handleSubscribe:(vars, {isSubcribe})=>({...vars, isSubcribe:!vars.isSubcribe}),

  // Stock Summary
  updateStock: (vars, {stock_code, data}) => ({
    ...vars,
    stockSummary: {
      ...vars.stockSummary,
      [stock_code]: data
    }
  }),
}

const BIPSAppContext = React.createContext({});

class BIPSAppProvider_Base extends React.Component {

  constructor (props) {
    super(props);
    this.appProvider = null; // will be set when ContextProvider is rendered
  }

  messageHandler = (msg) => {
    console.log('BISAppProvider.messageHandler(). Message = ', msg);
    var msgData;
    try {
      msgData = JSON.parse(msg);
    }
    catch {
      console.log('Invalid JSON: ', msg);
      return;
    }

    if (msgData.action_type == 'UPDATE') {
      if (msgData.sub_type == 'STOCK_SUMMARY') 
        this.appProvider.sendAction('updateStock', {stock_code: msgData.stock_code, data: msgData.data || {}});
    }
    else if (msgData.action_type == 'LOGIN-RESPONSE') {
      if (msgData.status == 'OK') {
        this.appProvider.sendAction('loginSuccessful', {sessionID: msgData.session_id});
      }
      else
        this.appProvider.sendAction('loginFail', {reason: msgData.reason});
    }

    // use this.appProvider.sendAction, 
    // to access vars of this provider
  }

  connectionState = (isConnected, url) => {
    console.log('BISAppProvider.connectionState invoked ', isConnected ? 'Connected' : 'Disconnected');
    // if fall to disconnected state then retry connection
    if (!isConnected) {
      this.appProvider.sendAction('networkDisconnected');
      console.log(`Reconnecting in ${RECONNECT_TIME / 1000} seconds...`);
      window.setTimeout(() => this.props.netConnect(), RECONNECT_TIME);
    }
    else {
      this.appProvider.sendAction('networkConnected');
    }
    // use this.appProvider.sendAction, 
    // to access vars of this provider
  }

  componentDidMount () {

    /* make link to certain net APIs */
    this.appProvider.sendAction('setNetworkAPI', {send: this.props.netSend, disconnect: this.props.netDisconnect})

    /* set network event handlers here */
    this.props.netSetEventHandlers({
      onMessageHandler: this.messageHandler, 
      onConnectionState: this.connectionState
      });

    /* init connection to host */
    this.props.netConnect();
  }

  render () {
    console.log('BIPSAppProvider rendered');
    return (
      <ContextProvider ref={(value) => {this.appProvider = value;}} context={BIPSAppContext} vars={BIPSAppVars} actions={BIPSAppActions}>
        <WSConnectionAction ref="wsAction"/>
        {this.props.children}
      </ContextProvider>
    );
  };
} 

const BIPSAppProvider = ContextConnector(NetAppContext, 
  (vars, actions, props) => ({
    netConnect: () => {actions.sendAction('createAndConnect', {url: SERVER_URL})},
    netSend: (msg) => {actions.sendAction('send', {text: msg}) },
    netDisconnect: () => {actions.sendAction('disconnect', {}) },
    netSetEventHandlers: ({onMessageHandler, onConnectionState}) => {
      actions.sendAction('setEventHandlers', {onMessageHandler, onConnectionState})
    }
  }), 
  ['netConnect', 'netSend', 'netDisconnect', 'netSetEventHandlers']
)(BIPSAppProvider_Base);


export { BIPSAppProvider, BIPSAppContext };
