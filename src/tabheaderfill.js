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
        <div className="cssmenu tabheaderfill">
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
                                                e.instanceName.search('tcAndSoe') >= 0?
                                                    'active col-sm-2 click-pointer text-center'
                                                :
                                                    'active col-sm-2 click-pointer d-border-right text-center'
                                            :

                                            e.instanceName.search('stock') >= 0 ?
                                                e.instanceName.search('stockHistory') >= 0?
                                                    'active col-sm-4 active click-pointer text-center'
                                                :
                                                    'active col-sm-4 active click-pointer d-border-right text-center'

                                            :

                                            e.instanceName.search('StatistikPage') >= 0 ?
                                                e.instanceName.search('newResearch') >= 0?
                                                    'active col-mn-5 click-pointer text-center'
                                                :
                                                    'active col-mn-5 click-pointer d-border-right text-center'

                                            :

                                            e.instanceName.search('tradePage') >= 0 ?
                                                e.instanceName.search('tradePageWatchList') >= 0?
                                                    'active col-sm-4 bg-navy-gradient-odd click-pointer text-center'
                                                :
                                                    'active col-sm-4 bg-navy-gradient-odd click-pointer text-center d-border-right'

                                            :
                                                e.instanceName.search('Aut') >= 0 ?
                                                    e.instanceName.search('AutSentOrder') >= 0?
                                                        'active col-sm-6 bg-navy-gradient-odd click-pointer text-center'
                                                        :
                                                        'active col-sm-6 bg-navy-gradient-odd click-pointer text-center d-border-right'

                                                    :

                                            e.instanceName.search('Chat') >= 0 ?
                                                e.instanceName.search('ChatCommentPage') >= 0?
                                                    'active col-sm-4 click-pointer text-center'
                                                    :
                                                    'active col-sm-4 click-pointer text-center d-border-right'

                                            :

                                            e.instanceName.search('automaticO') >= 0 ?
                                                e.instanceName.search('automaticODailyTrade') >= 0?
                                                    'active col-sm-4 click-pointer text-center'
                                                :
                                                    'active col-sm-4 click-pointer text-center d-border-right'

                                            :

                                            e.instanceName.search('AnalyticPage') >= 0 ?
                                                e.instanceName.search('RelativePerformanceAnalyticPage') >= 0 ?
                                                    'active col-sm-3 click-pointer text-center'
                                                    :
                                                    'active col-sm-3 click-pointer text-center d-border-right'

                                            :

                                            'active click-pointer d-border-right text-center'
                                        :

                                            e.instanceName.search('Invboard') >= 0 ?
                                                e.instanceName.search('tcAndSoe') >= 0?
                                                    'col-sm-2 click-pointer text-center'
                                                :
                                                    'col-sm-2 click-pointer d-border-right text-center'

                                            :

                                            e.instanceName.search('stock') >= 0 ?
                                                e.instanceName.search('stockHistory') >= 0?
                                                    'col-sm-4 click-pointer text-center'
                                                :
                                                    'col-sm-4 click-pointer d-border-right text-center'

                                            :

                                            e.instanceName.search('StatistikPage') >= 0 ?
                                                e.instanceName.search('newResearch') >= 0?
                                                    'col-mn-5 click-pointer text-center'
                                                :
                                                    'col-mn-5 click-pointer d-border-right text-center'

                                            :
                                                e.instanceName.search('tradePage') >= 0 ?
                                                    e.instanceName.search('tradePageWatchList') >= 0?
                                                        'col-sm-4 click-pointer text-center'
                                                        :
                                                        'col-sm-4 click-pointer text-center d-border-right'
                                                    :
                                            e.instanceName.search('Aut') >= 0 ?
                                                e.instanceName.search('AutSentOrder') >= 0?
                                                    'col-sm-6 click-pointer text-center'
                                                    :
                                                    'col-sm-6 click-pointer text-center d-border-right'

                                            :
                                                e.instanceName.search('orderSetting') >= 0 ?
                                                    e.instanceName.search('sentOrder') >= 0?
                                                        'active col-sm-6 bg-navy-gradient-odd click-pointer text-center'
                                                        :
                                                        'active col-sm-6 bg-navy-gradient-odd click-pointer text-center d-border-right'

                                                    :

                                            e.instanceName.search('Chat') >= 0 ?
                                                e.instanceName.search('ChatCommentPage') >= 0?
                                                    'col-sm-4 click-pointer text-center'
                                                    :
                                                    'col-sm-4 click-pointer text-center d-border-right'

                                            :

                                            e.instanceName.search('automaticO') >= 0 ?
                                                e.instanceName.search('automaticODailyTrade') >= 0?
                                                    'col-sm-4 click-pointer text-center'
                                                    :
                                                    'col-sm-4 click-pointer text-center d-border-right'

                                            :

                                            e.instanceName.search('AnalyticPage') >= 0 ?
                                                e.instanceName.search('RelativePerformanceAnalyticPage') >= 0 ?
                                                    'col-sm-3 click-pointer text-center'
                                                    :
                                                    'col-sm-3 click-pointer text-center d-border-right'

                                            :

                                            'click-pointer d-border-right text-center'

                                    }
                                onClick={
                                    () => props.activateFrame(e.instanceName)
                                }
                            >
                                <a>
                                    <span className="f-12">
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