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
                        <ActionPageFrame/>
                        {/*<AppFrame headerComponent={ChatSuppportPageFrameHeader}/>*/}
                    </div>
                </div>
                <AppModal/>
                {/*</BIPSAppProvider>*/}
            </AppFrameProvider>
        );
    }
}


class ActionPageFrame_Base extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            steps: [
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
                    message: 'Hey {previousValue}, Greatings!',
                    trigger: 'next2',
                },
                {
                    id: 'next2',
                    message: 'Can I help you?',
                    trigger: '3',
                },
                {
                    id: '3',
                    options: [
                        { value: "Error Text", label: 'Chat Issue', trigger: '3.1' },
                        { value: "What is trading?", label: 'Trade Issue', trigger: '3.2' },
                        { value: "Error Chart", label: 'Chart Issue', trigger: '3.1' },
                    ],
                },
                {
                    id: '3.1',
                    message: 'Maybe this can help you.',
                    trigger: '3.1.2',
                },
                {
                    id: '3.1.2',
                    component: (
                        <div> You can open and reload the page </div>
                    ),
                    trigger: 'next2',
                },
                {
                    id: '3.2',
                    message: 'Trading is ..',
                    trigger: 'next2',
                },
            ],
        }
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
        var logo = "/static/media/man.3e62c017.png";

        const HeaderTitleProviderEmail = () => {
            return (
                <div className="sc-iwsKbI hTPkh rsc-container">
                    <div className="rsc-header">
                        <div className="row">
                            <div className="col-md-1">
                                <img src={logo} alt="User" className="img-avatar d-border mr-2"/>
                            </div>
                            <div className="col-md-11 divStatusChat ">
                                <span className="textTitleChat">From: {this.props.chatId}</span>
                                <span className="textStatusChat">To: {this.props.chatId}</span>

                            </div>
                        </div>
                    </div>
                    <div className="sc-gZMcBi fBGGBn rsc-content content-read-email">
                        <div>Hello</div>
                        <span>Saya {this.props.chatId} dari perusahaan bella corp</span>
                        <br/> <br/> <br/> <br/> <br/>
                        <br/> <br/> <br/> <br/> <br/>
                        <br/> <br/> <br/> <br/> <br/>
                        <hr/>
                        <div>Telp: 14045</div>
                        <div>website: www.directtrading.com</div>
                    </div>
                </div>
            )
        };
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
            // validasi untuk pengecekan apakah pesan atau percakapan
            if (this.props.chatId !== "") {
                if(this.props.chatId.length >= 18){
                    return <ThemedExampleEmail/>
                }else{
                    return <ThemedExample/>
                }
            }else{
                return <></>
            }
        };

        const ThemedExample = () => (
            <ThemeProvider theme={theme}>
                <ChatBot
                    steps={this.state.steps}
                    headerTitle="Support"
                    hideBotAvatar="true"
                    hideUserAvatar="true"
                    width="100%"
                    headerComponent={HeaderTitleProvider()}
                />
            </ThemeProvider>
        );

        const ThemedExampleEmail = () => (
            <ThemeProvider theme={theme}>
                <HeaderTitleProviderEmail/>
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
        <></>
    );
}

//parent
class ChatListPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            chatMessage: [
                {
                    'id':'budi@gmail',
                    'from':'budiantara@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'asep@gmail.com',
                    'from':'asep@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'ian@gmail.com',
                    'from':'iantara@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'tat@gmail.com',
                    'from':'tatangsutarma@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'odid@gmail.com',
                    'from':'oding@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'sigara@gmail.com',
                    'from':'sigarantang@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'amir@gmail.com',
                    'from':'amirbudiardjo@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'wiranto@gmail.com',
                    'from':'wiranto@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'emil@gmail.com',
                    'from':'emilembamba@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',
                },{
                    'id':'jangs@gmail.com',
                    'from':'udjangudha@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'rohmat@support',
                    'from':'rohmatulloh@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',
                },
                {
                    'id':'ulil@support',
                    'from':'ulisulistia@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',
                }
            ]
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
        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll d-border-top">
                <nav className="nav flex-column">
                    {this.state.chatMessage.map((charx, index) => {

                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            img={charx.img}
                            time={charx.time}
                            active={(charx.id == this.state.activeIndex) ? "active" : ""}
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
        return (
            <div
                className={`container-fluid divChatList nav-link row ${this.props.active}`}
                onClick={ this.doParentToggleFromChild }>
                <div className="col-sm-3 divImgListChat">
                    <img src={this.props.img} alt="User" className="img-avatar d-border mr-2"/>
                </div>
                <div className="col-sm-7 divBodyListChat">
                    <span className="textPesanTitle"> {this.props.from}</span>
                    <span className="textPesan">{this.props.message}</span>
                </div>
                <div className="col-sm-2 divAttrListChat" >
                    <span className="textPesanTimeMessage">{this.props.time}</span>
                    <span className={(parseInt(this.props.new) > 0) ? "badge textPesanBadge" : ""}>{this.props.new}</span>

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
class ChatActionPage_Base extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: -1,
            chatMessage: [
                {
                    'id':'budibudibuiantara@gmail',
                    'from':'budiantara@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'asepsupriadibalap@support',
                    'from':'asep@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'iantaracintadanduka@ceo',
                    'from':'iantara@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                },{
                    'id':'tatangsutarmasihsama@gmail',
                    'from':'tatangsutarma@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'odingdingdangding@support',
                    'from':'oding@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'sigarantangdinatarang@ceo',
                    'from':'sigarantang@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                },{
                    'id':'amirbudiardjojobu@gmail.com',
                    'from':'amirbudiardjo@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'wirantokenapanto@support',
                    'from':'wiranto@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'emilembambabilo@ceo',
                    'from':'emilembamba@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                },{
                    'id':'udjangjjangmirna@gmail',
                    'from':'udjangudha@gmail',
                    'message':'Hello dude - test',
                    'status':'active',
                    'new':'6',
                    'time':'09.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'rohmatullohirahmin@support',
                    'from':'rohmatulloh@support',
                    'message':'Hello dude2',
                    'status':'active',
                    'new':'6',
                    'time':'08.00',
                    'img': '/static/media/man.3e62c017.png',

                },
                {
                    'id':'ulisulistiawastid@ceo',
                    'from':'ulisulistia@ceo',
                    'message':'Hello dude3',
                    'status':'active',
                    'new':'1',
                    'time':'07.55',
                    'img': '/static/media/man.3e62c017.png',

                }
            ],
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
        return(

            <div className="container-fluid px-1 mx-0 col-sm-12 scroll d-border-top">
                <nav className="nav flex-column">
                    {this.state.chatMessage.map((charx, index) => {

                        return <Square
                            from={charx.from}
                            message={charx.message}
                            new={charx.new}
                            id={charx.id}
                            img={charx.img}
                            time={charx.time}
                            active={(charx.id == this.state.activeIndex) ? "active" : ""}
                            parentToggle={this.doParentToggle}
                        />
                    })}
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
const ChatActionPage = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ChatActionPage_Base);
const ActionPageFrame = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        chatId : vars.chatId,
        changeIdChatBot : (chatId) => {actions.sendAction('changeIdChatBot', {chatId})}
    }),
)(ActionPageFrame_Base);

export default ChatSupportPage;
export {CustomFrameHeaderChatSupportPage, ChatSupport};
