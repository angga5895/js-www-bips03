import React from 'react';
import { ContextConnector } from './appcontext.js';
import { AppFrameContext } from './appframe.js';

const FillHeaderTab_Base = (props) => {
    // expected in props:
    // instances: array of pageInstance object
    // activeInstance: current pageInstance object
    // activateFrame: (instanceName) => {} hook to activate selected frame ID
    // linkTitles: object, mapping instanceName to link title
    return (
        /*<Menu pointing secondary>*/
        <div className="cssmenu">
            <ul>
                {
                    Object.keys(props.instances).map((k) => {
                        var e = props.instances[k];
                        return (
                            <li key={e.instanceName}
                                name={e.instanceName}
                                active={props.activeInstance === e}
                                className=
                                    {
                                        props.activeInstance === e ?
                                            e.instanceName.search('Invboard') >= 0 ?
                                                e.instanceName.search('mutualFund') >= 0?
                                                    'active col-sm-3 click-pointer text-center' :
                                                    'active col-sm-3 click-pointer d-border-right text-center' :
                                                e.instanceName.search('stock') >= 0 ?
                                                    e.instanceName.search('stockHistory') >= 0?
                                                        'active col-sm-4 active click-pointer text-center' :
                                                        'active col-sm-4 active click-pointer d-border-right text-center' :
                                                    e.instanceName.search('StatistikPage') >= 0 ?
                                                        e.instanceName.search('newResearch') >= 0?
                                                            'active col-mn-5 active click-pointer text-center' :
                                                            'active col-mn-5 active click-pointer d-border-right text-center' :
                                                        'active click-pointer d-border-right text-center'
                                            :
                                            e.instanceName.search('Invboard') >= 0 ?
                                                e.instanceName.search('mutualFund') >= 0?
                                                    'col-sm-3 click-pointer text-center' :
                                                    'col-sm-3 click-pointer d-border-right text-center' :
                                                e.instanceName.search('stock') >= 0 ?
                                                    e.instanceName.search('stockHistory') >= 0?
                                                        'col-sm-4 click-pointer text-center' :
                                                        'col-sm-4 click-pointer d-border-right text-center' :
                                                    e.instanceName.search('StatistikPage') >= 0 ?
                                                        e.instanceName.search('newResearch') >= 0?
                                                            'col-mn-5 click-pointer text-center' :
                                                            'col-mn-5 click-pointer d-border-right text-center' :
                                                        'click-pointer d-border-right text-center'

                                    }
                                onClick={
                                    () => props.activateFrame(e.instanceName)
                                }
                            >
                                <a>
                                    <span className="f-12">&nbsp;
                                        {
                                            props.linkTitles[e.instanceName] || e.title
                                        }
                                    </span>
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
};

const FillHeaderTab = ContextConnector(AppFrameContext,
    (v,act,props) => ({
        instances: v.pageInstances,
        activeInstance: v.activeInstance,
        activateFrame: (instanceName) => act.sendAction('switchPage', {instanceName})
    })
)(FillHeaderTab_Base);

export default FillHeaderTab;