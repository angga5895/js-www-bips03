import React from "react";
import {Button} from "react-bootstrap";
import Select from "react-select";
import {cssmode} from "./App";
import {Dropdown} from "semantic-ui-react";


const option = [
    { key: 'groupA', value: 'groupA', text: 'Group A' },
    { key: 'groupB', value: 'groupB', text: 'Group B' },
    { key: 'groupC', value: 'groupC', text: 'Group C' },
    { key: 'groupD', value: 'groupD', text: 'Group D' },
    { key: 'groupE', value: 'groupE', text: 'Group E' }
];

class SideBar extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
                <div id="mySideBar" className="col-sm-sidebar px-0 mx-0 bg-black-trading d-border">
                    <div className="flex-grow-1">
                        <div className="flex-lg-column mb-1 cssmenu">
                            <div className="align-self-center text-center d-border-bottom col-sm-12 paddingY-2 px-0 mx-0 click-pointer">
                                <i className="fa-2x icon-icon-star-list"></i>
                            </div>
                        </div>
                        <div className="nav flex-lg-column">
                            <div className="nav-link align-self-center text-center px-0 d-border col-sm-12 my-0 py-0">
                                <Dropdown placeholder='Group' search selection options={option} className={"f-9 text-center align-self-center col-sm-12 grey"} defaultValue="groupA"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>AALI</h5>
                                <p className="f-11-center mb-1 text-danger">12,650</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>ADHI</h5>
                                <p className="f-11-center mb-1 text-danger">1,529</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>ANTM</h5>
                                <p className="f-11-center mb-1 text-danger">27,400</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>ASII</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>TLKM</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>WSKT</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>INDF</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>BBCA</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>SMGR</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-sidebar my-sidebar click-pointer">
                                <h5>BBRI</h5>
                                <p className="f-11-center mb-1 text-danger">1,025</p>
                                <hr className="bg-white my-0"/>
                            </div>
                            <div className="align-self-center text-center px-1">
                                <buttom className="f-9 col-sm-12 px-0 mt-4 py-2 btn btn-sm btn-dark op-05">
                                    Load more
                                </buttom>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class SelectGroup extends React.Component {
    /*selectStyleNight = theme => ({
            ...theme,
            borderRadius: 0,
            colors: {
                ...theme.colors,
                neutral0: '#3D3E3F',
                neutral20 : '#333332',
                neutral30 : '#333332',
                neutral40 : '#1A1A1A',
                neutral80 : '#FFFFFF',
                primary75 : '#FFFFFF',
                primary50 : '#4D4D4E',
                primary25 : '#4D4D4E',
                primary : '#0071BC',
                /!*primary : '#808282',*!/
            },
        });

    selectStyleLight = theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            /!*neutral0: '#E7E8E8',*!/
            neutral0: '#CDCDCE',
            neutral20 : '#DDDDDD',
            neutral30 : '#DDDDDD',
            neutral40 : '#767676',
            neutral80 : '#999999',
            primary75 : '#999999',
            primary50 : '#F3F3F3',
            primary25 : '#F3F3F3',
            primary : '#0071BC',
            /!*primary : '#808282',*!/
        },
    });*/
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-sm-12 px-0 mx-0 text-white">
                <div className="col-md-12 bg-grey-mystic px-0 text-center">
                    <Select
                        className="f-9 col-sm-12 px-0 text-center"
                        defaultValue={option[0]}
                        label="Single select"
                        options={option}
                        theme={this.props.themestyle}
                    />
                </div>
            </div>
        );
    }
}

export default SideBar;