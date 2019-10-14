import React from 'react';
import { AppFrameAction } from '../appframe.js';

import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";

import {AppFrame, AppFrameProvider, AppModal} from "../appframe";
import {WSConnectionAction} from "../appnetwork";
import FillHeaderTab from "../tabheaderfill";

import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

import './chatSupport.css';

import $ from 'jquery';
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');



class CustomFrameHeaderChatSupportPage_Base extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppFrameProvider
                initialClasses={{ ChatListPage, ChatActionPage, }}
                initialFrames={
                    [
                        {className: 'ChatListPage', title: 'List Message', instanceName: 'ChatListPage'},
                        {className: 'ChatActionPage', title: 'Message', instanceName: 'ChatActionPage'},
                    ]
                }
            >
                {/*<BIPSAppProvider>*/}
                <WSConnectionAction />
                <div className="col-sm-12 px-0 mx-0 align-self-center row">
                    <div className="col-sm-4 pb-0 px-0 mx-0 d-border-bottom">
                        <FillHeaderTab linkTitles={
                            {
                                ChatListPage: 'List Of Chats',
                                ChatActionPage: 'Message',
                            }
                        }/>
                        <AppFrame headerComponent={ChatSuppportPageFrameHeader}/>

                    </div>
                    <div className="col-sm-8 px-0">
                        <ChatBotFrame/>
                        {/*<AppFrame headerComponent={ChatSuppportPageFrameHeader}/>*/}
                    </div>
                </div>
                <AppModal/>
                {/*</BIPSAppProvider>*/}
            </AppFrameProvider>
        );
    }
}


class ChatBotFrame_Base extends React.Component{
    constructor(props){
        super(props);
    }

    render() {

        const theme = {
            background: '#4D4E4E',
            fontFamily: 'Open Sans',
            headerBgColor: '#000000',
            headerFontColor: '#fff',
            headerFontSize: '12px',
            botBubbleColor: '#fff',
            botFontColor: '#000',
            userBubbleColor: '#2cf871',
            userFontColor: '#000',
        };

        const steps = [
            {
                id:'1',
                message:'Hello, What`s your name?',
                trigger:'1.2',
            },
            {
                id:'1.2',
                user:true,
                trigger: '2',
            },
            {
                id: '2',
                message: 'Hey {previousValue}, What number I am thinking?',
                trigger: '3',
            },
            {
                id: '3',
                options: [
                    { value: 1, label: 'Number 1', trigger: '5' },
                    { value: 2, label: 'Number 2', trigger: '4' },
                    { value: 3, label: 'Number 3', trigger: '4' },
                ],
            },
            {
                id: '4',
                message: 'Wrong answer, try again.',
                trigger: '3',
            },
            {
                id: '5',
                message: 'Awesome! You are a telepath master!',
                end: true,
            },
        ];
        var logo = "/static/media/man.3e62c017.png";

        const HeaderTitleProvider = () => {
            return (
                <div className="rsc-header">
                    <div className="row">
                        <div className="col-md-1">
                            <img src={logo} alt="User" className="img-avatar d-border mr-2"/>
                        </div>
                        <div className="col-md-11 divStatusChat">
                            <span className="textTitleChat">{this.props.chatId}</span>
                            <span className="textStatusChat">Online</span>

                        </div>
                    </div>
                </div>
            )
        };
        const validateChat = () => {
            if (this.props.chatId !== "") {
                return <ThemedExample/>
            }else{
                return <></>
            }
        };

        const ThemedExample = () => (
            <ThemeProvider theme={theme}>
                <ChatBot
                    steps={steps}
                    headerTitle="Support"
                    hideBotAvatar="true"
                    hideUserAvatar="true"
                    width="100%"
                    headerComponent={HeaderTitleProvider()}
                />
            </ThemeProvider>
        );
        return(
            <div className="bg-grey">
                <div style={{ display : this.props.chatId !== '' ? "none" : "block"}}><ChatListEmpty/></div>
                {validateChat()}
            </div>
        )
    }

}

const ChatSuppportPageFrameHeader = (props) => {
    return (
        <>
        </>
    );
}

//parent
class ChatListPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
        }
        this.doParentToggle = this.doParentToggle.bind(this);
    }
    doParentToggle(_counterFromChild){
        this.setState({
            activeIndex: _counterFromChild,
        });
        console.log(_counterFromChild);
        this.props.changeIdChatBot(_counterFromChild)
    }
    render(){
        const ChatMessage = [
            {
                'id':'budiantara@gmail',
                'from':'budiantara@gmail',
                'message':'Hello dude - test',
                'status':'active',
                'new':'6',
                'time':'09.00'
            },
            {
                'id':'asep@support',
                'from':'asep@support',
                'message':'Hello dude2',
                'status':'active',
                'new':'6',
                'time':'08.00'
            },
            {
                'id':'iantara@ceo',
                'from':'iantara@ceo',
                'message':'Hello dude3',
                'status':'active',
                'new':'1',
                'time':'07.55',
            },{
                'id':'tatangsutarma@gmail',
                'from':'tatangsutarma@gmail',
                'message':'Hello dude - test',
                'status':'active',
                'new':'6',
                'time':'09.00'
            },
            {
                'id':'oding@support',
                'from':'oding@support',
                'message':'Hello dude2',
                'status':'active',
                'new':'6',
                'time':'08.00'
            },
            {
                'id':'sigarantang@ceo',
                'from':'sigarantang@ceo',
                'message':'Hello dude3',
                'status':'active',
                'new':'1',
                'time':'07.55',
            },{
                'id':'amirbudiardjo@gmail',
                'from':'amirbudiardjo@gmail',
                'message':'Hello dude - test',
                'status':'active',
                'new':'6',
                'time':'09.00'
            },
            {
                'id':'wiranto@support',
                'from':'wiranto@support',
                'message':'Hello dude2',
                'status':'active',
                'new':'6',
                'time':'08.00'
            },
            {
                'id':'emilembamba@ceo',
                'from':'emilembamba@ceo',
                'message':'Hello dude3',
                'status':'active',
                'new':'1',
                'time':'07.55',
            },{
                'id':'udjangudha@gmail',
                'from':'udjangudha@gmail',
                'message':'Hello dude - test',
                'status':'active',
                'new':'6',
                'time':'09.00'
            },
            {
                'id':'rohmatulloh@support',
                'from':'rohmatulloh@support',
                'message':'Hello dude2',
                'status':'active',
                'new':'6',
                'time':'08.00'
            },
            {
                'id':'ulisulistia@ceo',
                'from':'ulisulistia@ceo',
                'message':'Hello dude3',
                'status':'active',
                'new':'1',
                'time':'07.55',
            }
        ];
        const checkActive = (key) => {
            if(key === this.state.activeIndex){
                return "active"
            }else{
                return key
            }
        }
        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll d-border-top">
                <nav className="nav flex-column">
                    {ChatMessage.map((charx, index) => {

                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            time={charx.time}
                            active={checkActive(charx.id)}
                            parentToggle={this.doParentToggle}
                        />
                    })}
                </nav>
            </div>

        )
    }
}
//child
class Square extends React.PureComponent {
    constructor(props){
        super(props);
        this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
        this.id= this.props.id;
    }
    doParentToggleFromChild(){
        this.props.parentToggle(this.id)
    }
    render() {
        const logo = "/static/media/man.3e62c017.png";
        const badgeDiv = (newno) => {
            let v = parseInt(newno);
            if(v > 0){
                return <span className="badge textPesanBadge">{v}</span>
            }else{
                return <span></span>
            }
        };
        const classNameActive = (indexNo) => {
            if(indexNo === "active"){
                return "container-fluid divChatList nav-link row active"
            }else{
                return "container-fluid divChatList nav-link row"
            }
        }
        return (
            <div className={classNameActive(this.props.active)} onClick={ this.doParentToggleFromChild }>
                <div className="col-sm-3 divImgListChat">
                    <img src={logo} alt="User" className="img-avatar d-border mr-2"/>
                </div>
                <div className="col-sm-7 divBodyListChat">
                    <span className="textPesanTitle"> {this.props.from}</span>
                    <span className="textPesan">{this.props.message}</span>
                </div>
                <div className="col-sm-2 divAttrListChat" >
                    <span className="textPesanTimeMessage">{this.props.time}</span>
                    {badgeDiv(this.props.new)}
                </div>
            </div>
        )
    }
}
class ChatListEmpty extends  React.PureComponent{
    render(){
        return(
            <>
                <div className="card-body card-667 align-self-center text-center bg-grey f-14 py-3">
                    <div className="py-5 my-5">
                        <div className="py-5 my-5">
                            <i className="icofont icofont-warning-alt f-25"></i>
                            <div className="py-3">Empty</div>
                            <div>Please choose one person to send a message</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
class ChatActionPage extends React.PureComponent {
    render(){
        const ChatMessage = [
            {
                'id':'1',
                'message':'Hello dude',
                'status':'active',
                'new':'6'
            },
            {
                'id':'2',
                'message':'Hello dude2',
                'status':'active',
                'new':'6'
            },
            {
                'id':'3',
                'message':'Hello dude3',
                'status':'active',
                'new':'6'
            },
            {
                'id':'4',
                'message':'Hello dude4',
                'status':'active',
                'new':'0'
            },
            {
                'id':'5',
                'message':'Hello dude5',
                'status':'active',
                'new':'1'
            },
        ];
        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll d-border-top">
                <nav className="nav flex-column">
                    {ChatMessage.map((charx, index) => {
                        /*return <Square value={charx.message} newNo={charx.new} className="col-sm-12"/>*/
                        return ''
                    })}
                    <div>Develop On Progress</div>
                </nav>

            </div>

        )
    }
}

class ChatSupportPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <ChatSupport/>
        )
    }
}
class ChatSupport extends React.PureComponent {
    render () {

        return (
            //hanya memanggil headernya saja
            <div className="bg-black-trading px-0 mx-0">
            </div>
        );
    }
}

class Child extends React.Component {
    constructor(props){
        super(props);
        this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
        this.counter= this.props.counter;
        this.number = this.props.number;
    }
    doParentToggleFromChild(){
        this.props.parentToggle(this.number)
    }
    render() {
        return(

            <div>
                {this.props.counter}

                I am a child
                <button onClick={ this.doParentToggleFromChild }>Toggle</button>
            </div>

        )
    }
}
class Parent extends React.Component {
    constructor(){
        super();
        this.state = {
            counter:0
        }
        this.doParentToggle = this.doParentToggle.bind(this);
    }
    doParentToggle(_counterFromChild){
        this.setState({
            counter: _counterFromChild
        })
    }
    render() {
        return(

            <div>
                <Child counter={this.state.counter} parentToggle={this.doParentToggle} number="9"/>
            </div>

        )
    }
}

const CustomFrameHeaderChatSupportPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(CustomFrameHeaderChatSupportPage_Base);
const ChatListPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatListPage_Base);
const ChatBotFrame = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatBotFrame_Base);

export default ChatSupportPage;
export {CustomFrameHeaderChatSupportPage, ChatSupport};
