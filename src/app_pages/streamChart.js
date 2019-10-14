import React from 'react';
import { AppFrameAction } from '../appframe.js';
import anychart from 'anychart';
import '../../node_modules/anychart/dist/css/anychart-ui.min.css';
import '../../node_modules/anychart/dist/js/anychart-ui.min.js';
import '../../node_modules/anychart/dist/fonts/css/anychart-font.min.css';
import '../../node_modules/anychart/dist/js/anychart-data-adapter.min.js'
/*import '../../node_modules/anychart/dist/js/dark_earth.min.js';*/
import '../../node_modules/anychart/dist/js/anychart-annotations.min.js';

import '../../node_modules/bootstrap-select/dist/css/bootstrap-select.min.css';
import '../../node_modules/bootstrap-select/dist/js/bootstrap-select.min.js';
import $ from 'jquery';
window.$ = window.jQuery = $;
require('../../node_modules/bootstrap/dist/js/bootstrap.js');

class StreamChart extends React.PureComponent {

    componentDidMount() {
        let indexSetter = null;
        let dataSet = null;


        anychart.onDocumentReady(function () {

            // data
            dataSet = anychart.data.set([
                { x: "P1", value: 100 },
                { x: "P2", value: 200 },
                { x: "P3", value: 15 },
                { x: "P4", value: 130 },
                { x: "P5", value: 153 },
                { x: "P6", value: 120 },
                { x: "P7", value: 151 },
                { x: "P8", value: 58 },
                { x: "P9", value: 19 },
                { x: "P10", value: 135 },
                { x: "P11", value: 170 },
                { x: "P12", value: 195 },
                { x: "P13", value: 22 },
                { x: "P14", value: 175 },
                { x: "P15", value: 120 }
            ]);

            // set chart type
            let chart = anychart.line();

            chart.title().text("Click on Chart to Add a Point ");

            // set data
            chart.spline(dataSet).markers(null);

            // disable stagger mode. Only one line for x axis labels
            chart.xAxis().staggerMode(false);

            // set container and draw chart
            chart.container("container").draw();

            // first index for new point
            indexSetter = (dataSet.mapAs().getRowsCount()) + 1;
        });

        let streamButton = document.getElementById("streamButton");
        let streamState = 0;
        let dataInteval;

        function streamStart() {
            dataInteval = setInterval(
                // data streaming itself
                function () {
                    // append data
                    dataSet.append({

                        // x value
                        x: "P" + indexSetter,

                        // random value from 1 to 500
                        value: Math.floor((Math.random() * 500) + 1)
                    });

                    // removes first point
                    dataSet.remove(0);
                    indexSetter++;
                }, 200            // interval
            );
        }

        streamButton.onclick = function () {
            streamButton.innerHTML = "Stop" + "\nstream";
            streamState++;

            if (streamState > 1) {
                streamButton.innerHTML = "Start" + "\nstream";
                streamState = 0;
                clearInterval(dataInteval);
            } else {
                streamStart();
            }

        };
    }

    render() {
        let pddngBtn = {
            margin: '5px',
            background: '#333',
            color: 'white'
        }

        let marginCntr = {
            marginTop: '3px',
            padding: '5px'
        }

        return (
            <div>
                <button id="streamButton" className="btn btn-sm btn-grey py-3 px-3 d-border">Start Stream</button>
                <div id="container" className="mt-2 py-3 px-3 card-470"></div>
            </div>
        );

    }
}

export default StreamChart;
