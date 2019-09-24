import React from 'react';
import { ContextConnector } from './appcontext.js';
import { AppFrameContext } from './appframe.js';
import { Menu, Input, Dropdown } from 'semantic-ui-react';
import Select from 'react-select';
import user_avatar from './img/man.png';
import {cssmode} from "./App";
import { Table, Navbar, Collapse } from 'react-bootstrap';
import ModalPortofolio from "./app_modals/modal_portofolio";
import ModalChangePassPin from "./app_modals/modal_changepasspin";
import { AppFrame, AppFrameAction, AppFrameProvider, AppModal } from "./appframe";

const options = [
    { value: 'compositeindex', label: 'Composite Index' },
    { value: 'compositethome', label: 'Composite Home' }
];

const option = [
    { value: 'indonesia', label: 'Indonesia (IDX)' }
];

class MenuHeader extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                {
                    Object.keys(this.props.id.instances).map((k) => {
                            var e = this.props.id.instances[k];
                            return (
                                <Menu.Item
                                    className = "col-sm-tab"
                                    key={e.instanceName}
                                    name={e.instanceName}
                                    active={this.props.id.activeInstance === e}
                                    onClick={
                                        () => this.props.id.activateFrame(e.instanceName)
                                    }
                                >
                                    {
                                        this.props.id.linkTitles[e.instanceName] || e.title
                                    }
                                </Menu.Item>
                            )
                        }
                    )
                }
            </>
        );
    }
}

class MenuHeaderScale extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <>
                {
                    Object.keys(this.props.id.instances).map((k) => {
                            var e = this.props.id.instances[k];
                            return (
                                <Menu.Item
                                    className = "col-sm-tab-scale"
                                    key={e.instanceName}
                                    name={e.instanceName}
                                    active={this.props.id.activeInstance === e}
                                    onClick={
                                        () => this.props.id.activateFrame(e.instanceName)
                                    }
                                >
                                    {
                                        this.props.id.linkTitles[e.instanceName] || e.title
                                    }
                                </Menu.Item>
                            )
                        }
                    )
                }
            </>
        );
    }
}

const UISelectionTab_Base = (props) => {
  // expected in props:
  // instances: array of pageInstance object
  // activeInstance: current pageInstance object
  // activateFrame: (instanceName) => {} hook to activate selected frame ID
  // linkTitles: object, mapping instanceName to link title
  return (
    <div>

        <div className="d-xxl-none d-xxl-block d-border-bottom-bold mb-1">
            <Menu className="row">
                <div className="col-hd-1 ml-2 mr-3 px-0 text-center align-middle align-self-center text-white click-pointer">
                    <Navbar.Brand href="/" className="text-white"><h2>BIPS</h2></Navbar.Brand>
                </div>
                <div className="d-border-left d-border-right row col-hd-9 px-0 mr-2">
                    <MenuHeader id={props}/>

                    <Menu.Menu className="col-sm-2 px-0 ml-nav align-self-center">
                        <SelectItem1 thememode={props.modeoftheme}/>
                    </Menu.Menu>

                    <Menu.Menu className="col-sm-2 px-0 mr-nav align-self-center">
                        <SelectItem2 thememode={props.modeoftheme}/>
                    </Menu.Menu>
                </div>

                <div className="col-hd-2 row">
                    <Menu.Menu className="col-sm-8 px-4 mx-0">
                        <InfoCash/>
                    </Menu.Menu>

                    <Menu.Menu className="px-1">
                        <UserInfo/>
                    </Menu.Menu>
                </div>
            </Menu>
        </div>

        <div className="d-sml-none d-sml-block d-border-bottom-bold mb-1">
            <Navbar className="navbar-trading my-0">
                <div className="col-sm-12 px-0 mx-0 row">
                    <div className="col-sm-1 px-0 mx-0 align-self-center text-center click-pointer">
                        <Navbar.Brand href="/" className="mr-auto text-white">
                            <h2>BIPS</h2>
                        </Navbar.Brand>
                    </div>
                    <div className="col-sm-10 px-0 mx-0 align-self-center text-center">
                        <div className="col-sm-12 align-self-center text-center row">
                            <div className="col-sm-8 px-0 mx-0 row">
                                <Menu.Menu className="col-sm-6 px-4 align-self-center">
                                    <SelectItem1 thememode={props.modeoftheme}/>
                                </Menu.Menu>

                                <Menu.Menu className="col-sm-6 px-5 align-self-center">
                                    <SelectItem2 thememode={props.modeoftheme}/>
                                </Menu.Menu>
                            </div>
                            <div className="col-sm-4 px-0 mx-0 row">
                                <Menu.Menu className="col-sm-8 px-4 mx-0">
                                    <InfoCash/>
                                </Menu.Menu>

                                <Menu.Menu className="col-sm-4 px-1 mx-0">
                                    <UserInfo/>
                                </Menu.Menu>
                            </div>
                        </div>
                    </div>
                    <MenuCollapse>
                        <Menu className="row col-sm-12">
                            <MenuHeader id={props}/>
                        </Menu>
                    </MenuCollapse>
                </div>
            </Navbar>
        </div>

        <div className="d-xsml-none d-xsml-block d-border-bottom-bold mb-1">
            <Navbar className="navbar-trading my-0">
                <div className="col-smb-12 px-0 mx-0 row">
                    <div className="col-smb-1 px-0 mx-0 align-self-center text-center click-pointer">
                        <Navbar.Brand href="/" className="mr-auto text-white">
                            <h2>BIPS</h2>
                        </Navbar.Brand>
                    </div>
                    <div className="col-smb-10 px-0 mx-0 align-self-center text-center">
                        <div className="col-smb-12 align-self-center text-center row">
                            <div className="col-smb-7 pr-0 pl-5 mx-0 row">
                                <Menu.Menu className="col-smb-6 pl-2 pr-2 align-self-center">
                                    <SelectItem1 thememode={props.modeoftheme}/>
                                </Menu.Menu>

                                <Menu.Menu className="col-smb-6 pr-2 pl-2 align-self-center">
                                    <SelectItem2 thememode={props.modeoftheme}/>
                                </Menu.Menu>
                            </div>
                            <div className="col-smb-5 px-0 mx-0 row">
                                <Menu.Menu className="col-smb-8 px-4 mx-0">
                                    <InfoCash/>
                                </Menu.Menu>

                                <Menu.Menu className="col-smb-4 px-1 mx-0">
                                    <UserInfo/>
                                </Menu.Menu>
                            </div>
                        </div>
                    </div>
                    <MenuCollapse>
                        <Menu className="row col-smb-12">
                            <MenuHeader id={props}/>
                        </Menu>
                    </MenuCollapse>
                </div>
            </Navbar>
        </div>

        <div className="d-xxsml-none d-xxsml-block d-border-bottom-bold mb-1">
            <Navbar className="navbar-trading my-0">
                <div className="col-smb-12 px-0 mx-0 row">
                    <div className="col-smb-1 px-0 mx-0 align-self-center text-center click-pointer">
                        <Navbar.Brand href="/" className="mr-auto text-white">
                            <h2>BIPS</h2>
                        </Navbar.Brand>
                    </div>
                    <div className="col-smb-10 px-4 mx-0 align-self-center text-center">
                        <div className="col-smb-12 align-self-center text-center row">
                            <div className="col-smb-7 pr-0 pl-5 mx-0 row">
                                <Menu.Menu className="col-smb-6 pl-0 pr-2 align-self-center">
                                    <SelectItem1 thememode={props.modeoftheme}/>
                                </Menu.Menu>

                                <Menu.Menu className="col-smb-6 pr-0 pl-2 align-self-center">
                                    <SelectItem2 thememode={props.modeoftheme}/>
                                </Menu.Menu>
                            </div>
                            <div className="col-smb-5 px-0 mx-0 row">
                                <Menu.Menu className="col-smb-8 px-1 mx-0">
                                    <InfoCash/>
                                </Menu.Menu>

                                <Menu.Menu className="col-smb-4 px-1 mx-0">
                                    <UserInfo/>
                                </Menu.Menu>
                            </div>
                        </div>
                    </div>
                    <MenuCollapse>
                        <Menu className="row col-smb-12">
                            <MenuHeader id={props}/>
                        </Menu>
                    </MenuCollapse>
                </div>
            </Navbar>
        </div>

        <div className="d-xsm-none d-xsm-block d-border-bottom-bold mb-1">
            <Navbar className="navbar-trading my-0">
                <div className="col-smb-12 px-0 mx-0 row text-center align-self-center">
                    <div className="col-smb-3 px-2 text-center align-self-center click-pointer">
                        <Navbar.Brand href="/" className="mr-auto text-white">
                            <h2>BIPS</h2>
                        </Navbar.Brand>
                    </div>
                    <div className="col-smb-4 px-4 text-center align-self-center">
                        <Menu.Menu>
                            <InfoCash/>
                        </Menu.Menu>
                    </div>
                    <div className="col-smb-4 px-3 align-self-center">
                        <Menu.Menu>
                            <UserInfo/>
                        </Menu.Menu>
                    </div>

                    <MenuCollapse>
                        <Menu className="row col-smb-12">
                            <MenuHeader id={props}/>
                        </Menu>
                    </MenuCollapse>
                </div>

                <div className="col-smb-12 px-0 mx-0 row text-center align-self-center">
                    <Menu.Menu className="col-smb-6 px-2 align-self-center text-center">
                        <SelectItem1 thememode={props.modeoftheme}/>
                    </Menu.Menu>

                    <Menu.Menu className="col-smb-6 px-2 align-self-center text-center align-self-center">
                        <SelectItem2 thememode={props.modeoftheme}/>
                    </Menu.Menu>
                </div>
            </Navbar>
        </div>

    </div>
  )
};

const UISelectionTab_Base_Scale = (props) => {
    // expected in props:
    // instances: array of pageInstance object
    // activeInstance: current pageInstance object
    // activateFrame: (instanceName) => {} hook to activate selected frame ID
    // linkTitles: object, mapping instanceName to link title
    return (
        <div>

            <div className="d-xxl-none d-xxl-block d-border-bottom-bold mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-sm-12 px-0 mx-0 row">
                        <div className="col-sm-1 px-0 mx-0 align-self-center text-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-sm-10 px-0 mx-0 align-self-center text-center">
                            <div className="col-sm-12 align-self-center text-center row">
                                <div className="col-sm-8 px-0 mx-0 row">
                                    <Menu.Menu className="col-sm-6 px-4 align-self-center">
                                        <SelectItem1 thememode={props.modeoftheme}/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-sm-6 px-5 align-self-center">
                                        <SelectItem2 thememode={props.modeoftheme}/>
                                    </Menu.Menu>
                                </div>
                                <div className="col-sm-4 px-0 mx-0 row">
                                    <Menu.Menu className="col-sm-8 px-4 mx-0">
                                        <InfoCash/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-sm-4 px-1 mx-0">
                                        <UserInfo/>
                                    </Menu.Menu>
                                </div>
                            </div>
                        </div>
                        <MenuCollapse>
                            <Menu className="row col-sm-12">
                                <MenuHeaderScale id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>
                </Navbar>
            </div>

            <div className="d-sml-none d-sml-block d-border-bottom-bold mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-sm-12 px-0 mx-0 row">
                        <div className="col-sm-1 px-0 mx-0 align-self-center text-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-sm-10 px-0 mx-0 align-self-center text-center">
                            <div className="col-sm-12 align-self-center text-center row">
                                <div className="col-sm-8 px-0 mx-0 row">
                                    <Menu.Menu className="col-sm-6 px-4 align-self-center">
                                        <SelectItem1 thememode={props.modeoftheme}/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-sm-6 px-5 align-self-center">
                                        <SelectItem2 thememode={props.modeoftheme}/>
                                    </Menu.Menu>
                                </div>
                                <div className="col-sm-4 px-0 mx-0 row">
                                    <Menu.Menu className="col-sm-8 px-4 mx-0">
                                        <InfoCash/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-sm-4 px-1 mx-0">
                                        <UserInfo/>
                                    </Menu.Menu>
                                </div>
                            </div>
                        </div>
                        <MenuCollapse>
                            <Menu className="row col-sm-12">
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>
                </Navbar>
            </div>

            <div className="d-xsml-none d-xsml-block d-border-bottom-bold mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-smb-12 px-0 mx-0 row">
                        <div className="col-smb-1 px-0 mx-0 align-self-center text-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-smb-10 px-0 mx-0 align-self-center text-center">
                            <div className="col-smb-12 align-self-center text-center row">
                                <div className="col-smb-7 pr-0 pl-5 mx-0 row">
                                    <Menu.Menu className="col-smb-6 pl-2 pr-2 align-self-center">
                                        <SelectItem1 thememode={props.modeoftheme}/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-smb-6 pr-2 pl-2 align-self-center">
                                        <SelectItem2 thememode={props.modeoftheme}/>
                                    </Menu.Menu>
                                </div>
                                <div className="col-smb-5 px-0 mx-0 row">
                                    <Menu.Menu className="col-smb-8 px-4 mx-0">
                                        <InfoCash/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-smb-4 px-1 mx-0">
                                        <UserInfo/>
                                    </Menu.Menu>
                                </div>
                            </div>
                        </div>
                        <MenuCollapse>
                            <Menu className="row col-smb-12">
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>
                </Navbar>
            </div>

            <div className="d-xxsml-none d-xxsml-block d-border-bottom-bold mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-smb-12 px-0 mx-0 row">
                        <div className="col-smb-1 px-0 mx-0 align-self-center text-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-smb-10 px-4 mx-0 align-self-center text-center">
                            <div className="col-smb-12 align-self-center text-center row">
                                <div className="col-smb-7 pr-0 pl-5 mx-0 row">
                                    <Menu.Menu className="col-smb-6 pl-0 pr-2 align-self-center">
                                        <SelectItem1 thememode={props.modeoftheme}/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-smb-6 pr-0 pl-2 align-self-center">
                                        <SelectItem2 thememode={props.modeoftheme}/>
                                    </Menu.Menu>
                                </div>
                                <div className="col-smb-5 px-0 mx-0 row">
                                    <Menu.Menu className="col-smb-8 px-1 mx-0">
                                        <InfoCash/>
                                    </Menu.Menu>

                                    <Menu.Menu className="col-smb-4 px-1 mx-0">
                                        <UserInfo/>
                                    </Menu.Menu>
                                </div>
                            </div>
                        </div>
                        <MenuCollapse>
                            <Menu className="row col-smb-12">
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>
                </Navbar>
            </div>

            <div className="d-xsm-none d-xsm-block d-border-bottom-bold mb-1">
                <Navbar className="navbar-trading my-0">
                    <div className="col-smb-12 px-0 mx-0 row text-center align-self-center">
                        <div className="col-smb-3 px-2 text-center align-self-center click-pointer">
                            <Navbar.Brand href="/" className="mr-auto text-white">
                                <h2>BIPS</h2>
                            </Navbar.Brand>
                        </div>
                        <div className="col-smb-4 px-4 text-center align-self-center">
                            <Menu.Menu>
                                <InfoCash/>
                            </Menu.Menu>
                        </div>
                        <div className="col-smb-4 px-3 align-self-center">
                            <Menu.Menu>
                                <UserInfo/>
                            </Menu.Menu>
                        </div>

                        <MenuCollapse>
                            <Menu className="row col-smb-12">
                                <MenuHeader id={props}/>
                            </Menu>
                        </MenuCollapse>
                    </div>

                    <div className="col-smb-12 px-0 mx-0 row text-center align-self-center">
                        <Menu.Menu className="col-smb-6 px-2 align-self-center text-center">
                            <SelectItem1 thememode={props.modeoftheme}/>
                        </Menu.Menu>

                        <Menu.Menu className="col-smb-6 px-2 align-self-center text-center align-self-center">
                            <SelectItem2 thememode={props.modeoftheme}/>
                        </Menu.Menu>
                    </div>
                </Navbar>
            </div>

        </div>
    )
};

const UISelectionTab = ContextConnector(AppFrameContext,
  (v, act, props) => ({
    instances: v.pageInstances,
    activeInstance: v.activeInstance,
    activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
  })
)(UISelectionTab_Base);

const UISelectionTab_Scale = ContextConnector(AppFrameContext,
  (v, act, props) => ({
    instances: v.pageInstances,
    activeInstance: v.activeInstance,
    activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
  })
)(UISelectionTab_Base_Scale);

class SelectItem1 extends React.Component {
    constructor(props) {
        super(props);
    }

    /*selectStyleNight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0: '#181717',
            neutral20 : '#565252',
            neutral30 : '#565252',
            neutral40 : '#cccccc',
            neutral80 : '#FFFFFF',
            primary75 : '#FFFFFF',
            primary50 : '#4D4D4E',
            primary25 : '#4D4D4E',
            /!*primary : '#808282',*!/
            primary : '#0071BC',
        },
    });

    selectStyleLight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#F8F9F9',
            neutral20 : '#DDDDDD',
            neutral30 : '#DDDDDD',
            neutral40 : '#767676',
            neutral80 : '#999999',
            primary75 : '#999999',
            primary50 : '#F3F3F3',
            primary25 : '#F3F3F3',
            /!*primary : '#CCCCCC',*!/
            primary : '#0071BC',
        },
    });*/

    render() {
        return (
            <div className="nav-link col-sm-12 px-0 mx-0 py-3 text-white">
                <div className="col-md-12 bg-black-trading px-0 text-center">
                    <Select
                        className="f-12-fix"
                        defaultValue={option[0]}
                        label="Single select"
                        options={option}
                        theme={this.props.thememode}
                    />
                </div>
                <label className="col-md-12 f-11-center">11/03/2019 | 09.45 <span className="text-success"> Open</span></label>
            </div>
        );
    }
}

class SelectItem2 extends React.Component {
    constructor(props) {
        super(props);
    }

    /*selectStyleNight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#181717',
            neutral20 : '#565252',
            neutral30 : '#565252',
            neutral40 : '#cccccc',
            neutral80 : '#FFFFFF',
            primary75 : '#FFFFFF',
            primary50 : '#4D4D4E',
            primary25 : '#4D4D4E',
            /!*primary : '#808282',*!/
            primary : '#0071BC',
        },
    });

    selectStyleLight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            neutral0  : '#F8F9F9',
            neutral20 : '#DDDDDD',
            neutral30 : '#DDDDDD',
            neutral40 : '#767676',
            neutral80 : '#999999',
            primary75 : '#999999',
            primary50 : '#F3F3F3',
            primary25 : '#F3F3F3',
            /!*primary : '#CCCCCC',*!/
            primary : '#0071BC',
        },
    });*/

    render() {
        return (
            <div className="nav-link col-sm-12 px-0 mx-0 py-3 text-white">
                <div className="col-md-12 bg-black-trading px-0">
                    <Select
                        className="f-12-fix"
                        defaultValue={options[0]}
                        label="Single select"
                        options={options}
                        theme={this.props.thememode}
                    />
                </div>
                <label className="col-md-12 f-11-center text-success">6,453,98 +68.8 (+1.08%)</label>
            </div>
        );
    }
}

class InfoCash extends React.Component {
    render() {
        return (
            <div className="nav-link px-0 mx-0 pt-4 pb-0 text-white align-self-center">
                <Dropdown icon={null} text={
                    <div>
                        <Table size="sm" className="text-white cursor-menu py-0 my-0">
                            <thead></thead>
                            <tbody>
                            <tr className="f-12-fix text-center">
                                <td className="text-success"><i className="fa fa-square"></i></td>
                                <td>Cash Balance</td>
                                <td rowSpan="2" className="py-2"><i className="f-11-center text-gray-tradding oi oi-caret-bottom"></i></td>
                            </tr>
                            <tr className="f-16 text-primary">
                                <td colSpan="2" className="text-center">15,911,198</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                } className="text-white align-self-center">
                    <Dropdown.Menu className={'bg-black-trading f-14 w-100 d-border'}>
                        <Dropdown.Item className="item-hover text-white text-left px-2" text={
                            <div>
                                Cash Balance
                                <div className="text-primary text-right">5,911,198</div>
                            </div>
                        } />
                        <Dropdown.Divider className='d-border' />
                        <Dropdown.Item className="item-hover text-white text-left px-2" text={
                            <div>
                                Buy Limit
                                <div className="text-primary text-right">15,000,981</div>
                            </div>
                        } />
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

class UserInfo extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    buttonClickPortofolio = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'fullscreen',
            contentClass: PortofolioModal,
            onClose: (result) => { console.log('Modal 1 result = ', result) }
        })
    }

    buttonClickChangePassPin = (e) => {
        this.refs.frameAction.showModal({
            headerClass: () => <div className="text-right"><i className="icofont icofont-close text-icofont-close text-border click-pointer"
                                                              onClick={this.closeClick}></i></div>,
            size: 'mini',
            contentClass: ChangePassPinModal,
            onClose: (result) => {console.log('Modal 1 result = ', result)}
        })
    }

    render(){
        return(
            <div className="nav-link px-0 mx-0 py-3 text-white">
                <AppFrameAction ref="frameAction" />
                <Dropdown icon={null} text={
                    <div className="cursor-menu py-2">
                        <img src={user_avatar} alt="User" className="img-avatar d-border mr-2"/><i className="f-11-center text-gray-tradding oi oi-caret-bottom"></i>
                    </div>
                } className="text-white align-self-center">
                    <Dropdown.Menu className={'bg-black-trading f-14 w-300 d-border'} style={{ left: 'auto', right: 0 }}>
                        <Dropdown.Header className="bg-gray-tradding text-white py-3 text-transform-none" content={
                            <Table size="sm" className="py-0 my-0 px-2 bg-gray-tradding">
                                <thead></thead>
                                <tbody>
                                <tr><td className="py-0 my-0 f-18">Mr. John Du</td></tr>
                                <tr><td className="py-0 my-0 f-14">001-01-008538</td></tr>
                                <tr><td className="py-0 my-0 f-11">john.du@gmail.com</td></tr>
                                </tbody>
                            </Table>
                        }/>
                            <table className="w-100">
                                <thead></thead>
                                <tbody className="text-center">
                                <tr>
                                    <td>
                                        <Dropdown.Item className="item-hover text-white active-menu text-center" text={
                                            <div>Regular <br/> Account</div>
                                        }/>
                                    </td>
                                    <td>
                                        <Dropdown.Item className="item-hover text-white text-center" text={
                                            <div>Margin <br/> Account</div>
                                        }/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickPortofolio} text={
                            <div>
                                <i className="oi oi-pie-chart"></i>&nbsp;&nbsp; Portofolio & Balance
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" text={
                            <div>
                                <i className="fa fa-stopwatch"></i>&nbsp;&nbsp; Historical Trade List
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" text={
                            <div>
                                <i className="ion ion-ios-cash"></i>&nbsp;&nbsp; Fund Transfer
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" text={
                           <div>
                               <i className="fa fa-stopwatch"></i>&nbsp;&nbsp; Transaction History
                           </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" text={
                           <div>
                               <i className="fa fa-user-ninja"></i>&nbsp;&nbsp; Inquiry Of Account
                           </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" onClick={this.buttonClickChangePassPin} text={
                           <div>
                               <i className="ion ion-ios-lock"></i>&nbsp;&nbsp; Change Password/PIN
                           </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" text={
                            <div>
                                <i className="fa fa-cog"></i>&nbsp;&nbsp; Settings
                            </div>
                        }/>
                        <Dropdown.Divider className="d-border py-0 my-0" />
                        <Dropdown.Item className="item-hover text-white text-left" text={
                          <div>
                              <i className="oi oi-power-standby"></i>&nbsp;&nbsp; Logout
                          </div>
                        }/>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
}

class PortofolioModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalPortofolio />
            </>
        );
    }
}

class ChangePassPinModal extends React.Component {
    closeClick = (e) => {
        this.refs.frameAction.closeModal(100);
    }

    render() {
        return (
            <>
                <AppFrameAction ref="frameAction" />
                <ModalChangePassPin />
            </>
        );
    }
}

class MenuCollapse extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };
    }

    render() {
        return (
            <>
                <div className="col-sm-1 col-smb-1 px-0 mx-0 align-self-center text-center">
                    <div onClick={() => this.setState({ open: !this.state.open })} className="click-pointer">
                        <div className="d-border toggler-menu">
                            <i className="fas fa-bars f-18 text-white"></i>
                        </div>
                    </div>
                </div>
                <Collapse in={this.state.open} className="w-100">
                    <div>
                        {this.props.children}
                    </div>
                </Collapse>
            </>
        );
    }
}

export default UISelectionTab;
export {UISelectionTab_Scale};