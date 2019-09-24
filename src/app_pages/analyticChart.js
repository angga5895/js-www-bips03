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

class AnalyticChart extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            stockType: this.props.charVal,
            stockData: this.props.chartData,
            stockAlias: this.props.chartAlias,
            stockKey: this.props.key,
            tabView: this.props.tabView
        };
    }

    dismissModal = () => {
        const modalDialog = document.getElementById("indicatorSettingsModal" + this.state.stockType);
        if (modalDialog.style.display === "none") {
            modalDialog.style.display = "block";
        } else {
            modalDialog.style.display = "none";
            $('#chart-container' + this.state.stockType).show();
        }

        const chartView = document.getElementById("allwrap" + this.state.stockType);
        if (chartView.style.display === "none") {
            chartView.style.display = "block";
        } else {
            chartView.style.display = "none";
            $('#chart-container' + this.state.stockType).show();
        }
    }

    componentDidMount() {

        const stockName = this.state.stockType;
        const tabView = this.state.tabView;

        function setColClass($el) {
            // column count for row
            var ROW_COUNT = 12;
            var COLUMN_COUNT = 3;
            var index = $el.find('.col-sm-4').length;
            var lastIndex = $el.find('.col-sm-4').last().index();
            var colClass;

            if (index === COLUMN_COUNT) {
                return
            }

            if (index > COLUMN_COUNT) {
                while (index > COLUMN_COUNT) {
                    index -= COLUMN_COUNT;
                }
            }

            colClass = ROW_COUNT / index;

            while (index) {
                --index;
                $el.find($("[class*='col-sm-']"))
                    .eq(lastIndex - index)
                    .removeClass('col-sm-4')
                    .addClass('col-sm-' + colClass);
            }
        }

        function getInputLabelText(keyText) {
            var text = '';
            var result = [];

            keyText.split(/(?=[A-Z])/).filter(function (item) {
                if (item.length === 1) {
                    text += item;
                } else {
                    text += ' ';
                    text += item;
                }
            });
            text = text.trim();
            text = text[0].toUpperCase() + text.substr(1);

            text.split(' ').filter(function (item, index) {
                if (item.length === 1 && index !== text.split(' ').length - 1) {
                    result.push(item + '-');
                } else {
                    result.push(item);
                }
            });

            return result.join(' ').replace(/-\s/, '-');
        }

        function updateTextForIndicatorTypeSelect($select) {
            if ($select.val()) {
                if ($select.val().length > 1) {
                    $select.find('option:selected').each(function () {
                        $(this).text($(this).attr('data-abbr'))
                    });
                } else {
                    $select.find('option:selected').each(function () {
                        $(this).text($(this).attr('data-full-text'))
                    });
                }

                $select.selectpicker('refresh').closest('.bootstrap-select').find('.dropdown-menu.inner').find('span.text').each(function (index) {
                    $(this).text($select.find('option').eq(index).attr('data-full-text'));
                });
            }
        }

        var zoomLevel = 0.8;
        $('#indicatorSettingsModal' + stockName).css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });

        (function () {
            var $chartDataSelect = $('#chartDataSelect' + stockName);
            var $seriesTypeSelect = $('#seriesTypeSelect' + stockName);
            var $scaleTypeSelect = $('#scaleTypeSelect' + stockName);
            var $indicatorTypeSelect = $('#indicatorTypeSelect' + stockName);
            var $indicatorSettingsModal = $('#indicatorSettingsModal' + stockName);
            var $resetBtn = $('#resetButton' + stockName);
            var $addIndicatorBtn = $('#addIndicatorButton' + stockName);
            var $indicatorNavPanel = $('#indicatorNavPanel' + stockName);
            var $indicatorForm = $('#indicatorForm' + stockName);
            var $loader = $('#loader' + stockName);
            var $annotationType = $('#typeSelect' + stockName);

            var appSettingsCache = {};
            appSettingsCache['data'] = {};
            appSettingsCache['chartType'] = $seriesTypeSelect.val();
            appSettingsCache['scale'] = $scaleTypeSelect.val();
            appSettingsCache['indicators'] = {};
            appSettingsCache['annotations'] = $annotationType.val();

            var chartContainer = 'chart-container' + stockName;

            var indicatorsSettings = {
                name: '',
                plotIndex: 0,
                defaultSettings: {},
                seriesType: [
                    'area',
                    'column',
                    'jump-line',
                    'line',
                    'marker',
                    'spline',
                    'spline-area',
                    'step-area',
                    'step-line',
                    'stick'
                ]
            };

            var chart;
            var dataTable;

            var inputHtml =
                '<div class="col-sm-4">' +
                '<div class="form-group" id="indicatorFormGroup' + stockName + '">' +
                '<label for="" class="control-label"></label>' +
                '<input type="number" class="form-control" id="">' +
                '</div>' +
                '</div>';

            var selectHtml =
                '<div class="col-sm-4">' +
                '<div class="form-group" id="indicatorFormGroup' + stockName + '">' +
                '<label for="" class="control-label"></label>' +
                '<select class="form-control select show-tick" id=""></select>' +
                '</div>' +
                '</div>';

            var app = {
                createChart: createChart,
                removeChart: removeChart
            };

            // this Sample will properly work only if upload it to a server and access via http or https
            if (window.location.protocol === 'file:') {
                $loader.hide();
                $('.wrapper').hide();
                $('#warning' + stockName).modal({
                    backdrop: 'static',
                    keyboard: false
                });
            }

            // get indicators from file indicators.xml
            $.get("indicators.xml", function (data) {
                $(data).find('indicator').each(function (index, item) {
                    var indicatorName = $(this).attr('type');
                    var description;
                    var $option = $('<option></option>');

                    // create option and append to indicator type select
                    $option.attr({
                        'value': indicatorName,
                        'data-abbr': $(this).find('abbreviation').text(),
                        'data-full-text': $(this).find('title').text()
                    }).text($(this).find('title').text());

                    if ($(this).find('[name="plotIndex"]').length) {
                        $option.attr('data-plot-index', $(this).find('[name="plotIndex"]').attr('value'));
                    }

                    $indicatorTypeSelect.append($option);

                    indicatorsSettings['defaultSettings'][indicatorName] = {};

                    // set indicator settings to indicator object
                    $(item).find('defaults').children().each(function () {
                        var prop = $(this).attr('name');
                        var value = $(this).attr('value');

                        switch ($(this).attr('type')) {
                            case 'number':
                                value = +value;
                                break;
                            case 'array':
                                value = JSON.parse(value);
                                break;
                        }

                        indicatorsSettings['defaultSettings'][indicatorName][prop] = value;
                    });

                    // description from xml
                    description = $(item).find('description').text();

                    // save indicator overview
                    indicatorsSettings['defaultSettings'][indicatorName]['overview'] = {};
                    indicatorsSettings['defaultSettings'][indicatorName]['overview']['title'] = $(item).find('title').text();
                    indicatorsSettings['defaultSettings'][indicatorName]['overview']['description'] = description;
                });

                // sort option in select
                var options = $indicatorTypeSelect.find('option').sort(function (a, b) {
                    return a.value.toUpperCase().localeCompare(b.value.toUpperCase())
                });
                $indicatorTypeSelect.append(options);

                // init selectpicker
                $indicatorTypeSelect.selectpicker();
            });

            $(window).on('resize', initHeightChart);

            anychart.onDocumentReady(function () {
                // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
                // (https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js)
                // Load JSON data and create a chart by JSON data.
                // ===========disable tetsing fibonaci=======================
                // anychart.data.loadJsonFile($chartDataSelect.find('option:selected').data().json, function (data) {
                //     appSettingsCache['data'][$chartDataSelect.find('option:selected').text().toLowerCase().trim()] = data;
                //     // init, create chart
                //     app.createChart(chartContainer);
                // });
                // ==========================================================

                //perubahan menjadi single data (testing fibonaci)===========================
                anychart.data.loadJsonFile($chartDataSelect.data().json, function (data) {
                    appSettingsCache['data'][$chartDataSelect.val().toLowerCase().trim()] = data;
                    // init, create chart
                    app.createChart(chartContainer);
                });
                //testing fibonacci


                // event to set data to chart
                $annotationType.on('change', function () {

                    //==================disable fibonacci==================================
                    // var name = $(this).find('option:selected').text().toLowerCase().trim();

                    // if (!~Object.keys(appSettingsCache['data']).indexOf(name)) {
                    //     // To work with the data adapter you need to reference the data adapter script file from AnyChart CDN
                    //     // (https://cdn.anychart.com/releases/v8/js/anychart-data-adapter.min.js)
                    //     // Load JSON data and create a chart by JSON data.
                    //     anychart.data.loadJsonFile($(this).find('option:selected').data().json, function (data) {
                    //         appSettingsCache['data'][name] = data;
                    //         dataTable.addData(data);
                    //         chart.plot().getSeries(0).name(name.toUpperCase());
                    //     });
                    // } else {
                    //     dataTable.addData(appSettingsCache['data'][name]);
                    //     chart.plot().getSeries(0).name(name.toUpperCase());
                    // }
                    //======================================================================
                    let annotationsSelected = $(this).find('option:selected').val();
                    appSettingsCache['annotation'] = annotationsSelected;

                    chart.plot().annotations().startDrawing(annotationsSelected);

                    appSettingsCache['annotation'] = annotationsSelected;

                    chart.listen("annotationDrawingFinish", function () {
                        $('#typeSelect' + stockName).val('default').trigger('change');
                        chart.plot().annotations().cancelDrawing();
                    });
                });

                // event to set chart type
                $seriesTypeSelect.on('change', function () {
                    var type = $(this).val();

                    // set chart type
                    chart.plot().getSeries(0).seriesType(type);
                    // save chart type
                    appSettingsCache['chartType'] = type;
                });

                // event to show modal indicator settings
                $indicatorTypeSelect.on('change', function () {

                    if ($(this).val()) {
                        if ($(this).val().length === 1) {
                            updateTextForIndicatorTypeSelect($indicatorTypeSelect);
                        }
                    }

                    if ($(this).val() === null || $(this).val().length < Object.keys(appSettingsCache.indicators).length) {

                        app.removeChart();

                        if ($(this).val() !== null) {
                            for (var keyIndicator in appSettingsCache.indicators) {
                                if (!~$(this).val().indexOf(keyIndicator)) {
                                    delete appSettingsCache.indicators[keyIndicator]
                                }
                            }
                        } else {
                            appSettingsCache.indicators = {};
                        }

                        app.createChart(chartContainer, true);

                        return
                    }

                    for (var i = 0; i < $(this).val().length; i++) {
                        if (!~Object.keys(appSettingsCache.indicators).indexOf($(this).val()[i])) {
                            // set indicator name
                            indicatorsSettings.name = $(this).val()[i];
                            break;
                        }
                    }

                    // set plot index
                    indicatorsSettings.plotIndex = $(this).find('option[value="' + indicatorsSettings.name + '"]').data().plotIndex;

                    if (indicatorsSettings.plotIndex !== 0) {
                        indicatorsSettings.plotIndex = chart.getPlotsCount();
                    }

                    // create html if form (input/select)
                    createHtmlToIndicatorForm();
                    // set default indicator settings to input/select
                    setDefaultIndicatorSettings();

                    // show indicator settings modal
                    // $indicatorSettingsModal.modal('show');

                    $indicatorSettingsModal.show();

                    $('#allwrap' + stockName).hide();
                    $('#chart-container' + stockName).hide();
                    // hide dropdown menu, select
                    $indicatorNavPanel.find('.select.open').removeClass('open');
                });

                // event to change scale
                $scaleTypeSelect.on('change', function () {
                    app.removeChart();

                    // save scale type
                    appSettingsCache['scale'] = $(this).val();
                    app.createChart(chartContainer, true);
                });

                // remove selected class, if indicator not selected
                $indicatorSettingsModal.on('hidden.bs.modal-b', function () {
                    var lastAddedIndicator;

                    for (var i = 0; i < $indicatorTypeSelect.val().length; i++) {
                        if (!~Object.keys(appSettingsCache.indicators).indexOf($indicatorTypeSelect.val()[i])) {
                            // set indicator name
                            lastAddedIndicator = $indicatorTypeSelect.val()[i];
                            break;
                        }
                    }

                    if (!lastAddedIndicator) {
                        // update select text/title
                        updateTextForIndicatorTypeSelect($indicatorTypeSelect);
                        return false
                    }

                    var indexOption = $indicatorTypeSelect.find('[value="' + lastAddedIndicator + '"]').index();

                    // unselect option
                    $indicatorTypeSelect.find('[value="' + lastAddedIndicator + '"]').removeAttr('selected');
                    // remove selected class
                    $indicatorTypeSelect.prev('.dropdown-menu').find('li[data-original-index="' + indexOption + '"]').removeClass('selected');
                    // update select text/title
                    updateTextForIndicatorTypeSelect($indicatorTypeSelect);
                });

                // init selectpicker to all select in indicator settings modal
                $indicatorSettingsModal.on('show.bs.modal-b', function () {
                    $indicatorForm.find('.select').selectpicker();
                });

                // reset all settings
                $resetBtn.on('click', function (e) {
                    e.preventDefault();

                    app.removeChart();
                    // reset saved settings
                    appSettingsCache['indicators'] = {};
                    appSettingsCache['scale'] = 'linear';
                    appSettingsCache['chartType'] = 'line';
                    appSettingsCache['annotation'] = 'remove';

                    // select msft data
                    //--------------disable fibonaci===============
                    // $chartDataSelect.val(1).selectpicker('refresh');
                    //=============================================
                    $annotationType.val('default').selectpicker('refresh');

                    // select series type
                    $seriesTypeSelect.val('candlestick').selectpicker('refresh');
                    // reset indicators select
                    $indicatorTypeSelect.val('').selectpicker('refresh');
                    // select chart scale
                    $scaleTypeSelect.val('linear').selectpicker('refresh');

                    // init, create chart
                    app.createChart(chartContainer);

                    appSettingsCache['annotation'] = 'remove';
                });

                // event to add indicator
                $addIndicatorBtn.on('click', function () {
                    var mapping = dataTable.mapAs({ 'value': 1, 'volume': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });
                    // var keys = Object.keys(indicatorsSettings.defaultSettings[indicatorsSettings.name]);
                    var indicator = indicatorsSettings.defaultSettings[indicatorsSettings.name];
                    var settings = [mapping];
                    var indicatorName = indicatorsSettings.name;

                    // for slow/fast stochastic
                    if (~indicatorName.toLowerCase().indexOf('stochastic')) {
                        indicatorName = 'stochastic';
                    }

                    for (var key in indicator) {
                        if (key !== 'overview' && key !== 'plotIndex') {
                            var val = $('#' + key).val();
                            val = val == 'true' || val == 'false' ? val == 'true' : val;
                            settings.push(val);
                        }
                    }

                    // save settings for indicator
                    appSettingsCache['indicators'][indicatorsSettings.name] = {};
                    appSettingsCache['indicators'][indicatorsSettings.name]['settings'] = settings;
                    appSettingsCache['indicators'][indicatorsSettings.name]['plotIndex'] = indicatorsSettings.plotIndex;

                    var plot = chart.plot(indicatorsSettings.plotIndex);
                    plot[indicatorName].apply(plot, settings);
                    // adding extra Y axis to the right side
                    plot.yAxis(1).orientation('right');

                    // hide indicator settings modal
                    // $indicatorSettingsModal.modal('hide');
                    $indicatorSettingsModal.hide();

                    $('#allwrap' + stockName).show();
                    $('#chart-container' + stockName).show();
                });

            });

            function initHeightChart() {
                var creditsHeight = 10;
                var heightView = (tabView) ? 600 : 375;

                // ganti 440 dengan $(window).height() untuk tinggi otomatis
                $('#chart-container' + stockName).height(heightView - $indicatorNavPanel.outerHeight() - creditsHeight);
            }

            function createChart(container, updateChart) {
                var dataName = $chartDataSelect.val().trim();

                var seriesType = $seriesTypeSelect.val();

                // create data table on loaded data
                dataTable = anychart.data.table();

                anychart.theme(anychart.themes.darkEarth);

                var series;

                // map loaded data
                var mapping = dataTable.mapAs({ 'value': 1, 'volume': 1, 'open': 1, 'high': 2, 'low': 3, 'close': 4 });

                // create stock chart
                chart = anychart.stock();

                // create plot on the chart
                var plot = chart.plot(0);

                dataTable.addData(appSettingsCache['data'][dataName.toLowerCase()]);

                if (updateChart) {
                    var indicatorName;
                    var indicatorPlot;
                    var indicatorSettings = [];

                    if (appSettingsCache['annotation'] == 'remove') {
                        plot.annotations().removeAllAnnotations();
                    }

                    // create line series
                    series = plot[appSettingsCache['chartType']](mapping);
                    series.name(dataName.toUpperCase());

                    plot.yScale(appSettingsCache['scale']);

                    for (var keyIndicator in appSettingsCache['indicators']) {
                        indicatorName = keyIndicator;

                        if (appSettingsCache['indicators'].hasOwnProperty(keyIndicator)) {
                            indicatorSettings = appSettingsCache['indicators'][keyIndicator]['settings'];
                            indicatorSettings[0] = mapping;
                        }

                        // for slow/fast stochastic
                        if (~indicatorName.toLowerCase().indexOf('stochastic')) {
                            indicatorName = 'stochastic';
                        }

                        if (appSettingsCache['indicators'].hasOwnProperty(keyIndicator)) {
                            indicatorPlot = chart.plot(appSettingsCache['indicators'][keyIndicator]['plotIndex']);
                            indicatorPlot[indicatorName].apply(indicatorPlot, indicatorSettings);
                            // adding extra Y axis to the right side
                            indicatorPlot.yAxis(1).orientation('right');
                        }
                    }

                } else {
                    // create line series
                    series = plot[seriesType](mapping);
                    series.name(dataName.toUpperCase());
                }

                series.stroke('2px #64b5f6');

                // adding extra Y axis to the right side
                var yAxis = plot.yAxis(1);
                yAxis.orientation('right');
                // setting chart padding to fit both Y axes
                chart.padding(10, 50, 20, 50);

                // create scroller series with mapped data
                chart.scroller().line(mapping);

                // set chart selected date/time range
                chart.selectRange('2004-11-14', '2007-11-15');

                // chart background
                // chart.background().fill("#010101");

                // set container id for the chart
                chart.container(container);

                // initiate chart drawing
                chart.draw();

                // create range picker
                var rangePicker = anychart.ui.rangePicker();
                // init range picker
                rangePicker.render(chart);

                // create range selector
                var rangeSelector = anychart.ui.rangeSelector();
                // init range selector
                rangeSelector.render(chart);

                chart.listen('chartDraw', function () {
                    initHeightChart();
                    setTimeout(function () {
                        $loader.hide();
                    }, 100);
                });

            }

            function removeChart() {
                if (chart) {
                    chart.dispose();
                    chart = null;
                }
            }

            function createHtmlToIndicatorForm() {
                var $indicatorFormGroup;
                var indicatorSettings = indicatorsSettings.defaultSettings[indicatorsSettings.name];
                var $option;
                var i = 0;

                $('#indicatorSettingsModalTitle' + stockName).text(indicatorsSettings.defaultSettings[indicatorsSettings.name].overview.title);

                // empty form
                $indicatorForm.empty();
                // create row
                $indicatorForm.append('<div class="row"></div>');
                var $indicatorFormRow = $indicatorForm.find('.row');

                for (var key in indicatorSettings) {
                    if (indicatorSettings.hasOwnProperty(key) && key !== 'overview' && key !== 'plotIndex') {

                        if (typeof indicatorSettings[key] === 'string') {
                            $indicatorFormRow.append(selectHtml);
                            $indicatorFormGroup = $('#indicatorFormGroup' + stockName);
                            $indicatorFormGroup.find('select').attr('id', key);
                            $indicatorFormGroup.find('label').attr('for', key).text(getInputLabelText(key));

                            for (i = 0; i < indicatorsSettings.seriesType.length; i++) {
                                $option = $('<option></option>');
                                $option.val(indicatorsSettings.seriesType[i].toLowerCase());
                                $option.text(getInputLabelText(indicatorsSettings.seriesType[i]));
                                $indicatorFormGroup.find('select').append($option);
                            }

                            $indicatorFormGroup.removeAttr('id');

                        } else if (typeof indicatorSettings[key] === 'number') {
                            $indicatorFormRow.append(inputHtml);
                            $indicatorFormGroup = $('#indicatorFormGroup' + stockName);
                            $indicatorFormGroup.find('input').attr('id', key);

                            $indicatorFormGroup.removeAttr('id').find('label').attr('for', key).text(getInputLabelText(key));

                        } else if (typeof indicatorSettings[key] === 'object') {
                            $indicatorFormRow.append(selectHtml);
                            $indicatorFormGroup = $('#indicatorFormGroup' + stockName);
                            $indicatorFormGroup.find('select').attr('id', key);
                            $indicatorFormGroup.find('label').attr('for', key).text(getInputLabelText(key));

                            for (i = 0; i < indicatorSettings[key].length; i++) {
                                $option = $('<option></option>');
                                $option.val(indicatorSettings[key][i].toLowerCase());
                                $option.text(indicatorSettings[key][i]);
                                $indicatorFormGroup.find('select').append($option);
                            }

                            $indicatorFormGroup.removeAttr('id');
                        }
                    }
                }

                // col class to form el
                setColClass($indicatorForm);
                // indicator overview text
                $indicatorForm.find($("[class*='col-sm-']")).last().after('<div class="col-xs-12" id="overviewText"></div>');
                $indicatorForm.find('#overviewText').append(indicatorsSettings.defaultSettings[indicatorsSettings.name].overview.description);
            }

            function setDefaultIndicatorSettings() {

                var indicatorSettings = indicatorsSettings.defaultSettings[indicatorsSettings.name];

                for (var key in indicatorSettings) {
                    if (indicatorSettings.hasOwnProperty(key) && key !== 'overview' && key !== 'plotIndex') {
                        $('#' + key).val(indicatorSettings[key]);
                    }
                }
            }
        })();
    }

    render() {

        let styleses = {
            display: 'flex',
            padding: '5px 10px',
            marginTop: '5px'
        };

        let containerStyle = {
            padding: '0px 10px'
        }

        let marginSelection = {
            marginLeft: '2px'
        }

        let modalColor = {
            backgroundColor: '#383e44'
        }

        let buttonStyle = {
            padding: '0px 0px 3px 0px'
        }

        let boxScroll = {
            overflowX: 'hidden'
        }

        let elemWidthIndicator = (this.state.tabView) ? 350 : 135;
        let elemWidthanotation = (this.state.tabView) ? 250 : 140;
        let classChart = (this.state.tabView) ? 'tab-chart' : 'card-chart';

        return (
            <div className={this.props.chartGridClass} id={"chartContent" + this.state.stockType}>
                <div className={"d-border-inactive card " + classChart} style={boxScroll} id={"chartBox" + this.state.stockType}>
                    {/* <AppFrameAction ref="frameAction" /> */}
                    < div id={"loader" + this.state.stockType} className="anychart-loader" >
                        <div className="rotating-cover">
                            <div className="rotating-plane">
                                <div className="chart-row">
                                    <span className="chart-col green"></span>
                                    <span className="chart-col orange"></span>
                                    <span className="chart-col red"></span>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* <!-- modal alert --> */}
                    < div className="modal-b fade" id={"warning" + this.state.stockType} tabindex="-1" role="dialog" >
                        <div className="modal-dialog-b" role="document">
                            <div className="modal-content-b">
                                <div className="modal-header-b">
                                    <h4 className="modal-title-b">Attention</h4>
                                </div>
                                <div className="modal-body-b">
                                    <div className="alert alert-danger"><strong>XHR Fail: </strong>
                                        This Sample will properly work only if upload it to a server and access via http or https.
						Please see <a href="https://github.com/anychart-solutions/technical-indicators"
                                            target="_blank">https://github.com/anychart-solutions/technical-indicators</a> to learn
more.
					</div>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* <!-- modal indicator settings --> */}
                    < div className="modal-indicator-b" id={"indicatorSettingsModal" + this.state.stockType} tabindex="-1" role="dialog" hidden >
                        <div className="modal-dialog-b" role="document">
                            <div className="modal-content-b" style={modalColor} >
                                <div className="modal-header-b">
                                    <button type="button" className="close" onClick={this.dismissModal} data-dismiss="modal-b" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title-b" id={"indicatorSettingsModalTitle" + this.state.stockType}>Indicator Settings</h4>
                                </div>
                                <div className="modal-body-b">
                                    <form id={"indicatorForm" + this.state.stockType} className="form"></form>
                                </div>
                                <div className="modal-footer-b">
                                    <button type="button" className="btn btn-default" onClick={this.dismissModal} data-dismiss="modal-b">Close</button>
                                    <button type="button" className="btn btn-primary" id={"addIndicatorButton" + this.state.stockType}>Add Indicator</button>
                                </div>
                            </div>
                        </div>
                    </div >

                    <div id={"allwrap" + this.state.stockType}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-6 col-md-12">
                                <ul className="list list-unstyled list-nav" id={"indicatorNavPanel" + this.state.stockType} style={styleses}>
                                    <div className="form-inline">
                                        <div className="form-group" style={buttonStyle}>
                                            <li style={marginSelection}>
                                                <input type="hidden" id={"chartDataSelect" + this.state.stockType} value={this.state.stockAlias} data-json={"./" + this.state.stockData} />

                                                {/* <select defaultValue={'1'} name="" id="chartDataSelect" class="select selectpicker show-tick" title="Select Data Chart">
                                    <option value="1" data-json="./msft.json">MSFT</option>
                                    <option value="2" data-json="./orcl.json">ORCL</option>
                                    <option value="3" data-json="./csco.json">CSCO</option>
                                    <option value="4" data-json="./ibm.json">IBM</option>
                                </select> */}

                                                <select data-width={elemWidthanotation} defaultValue={'default'} id={"typeSelect" + this.state.stockType} onclick="create()" className="select selectpicker show-tick form-control" title="Select Annotation Type">
                                                    <option value="default" disabled="disabled">Annotation Type</option>
                                                    <option value="andrews-pitchfork">Andrews' Pitchfork</option>
                                                    <option value="ellipse">Ellipse</option>
                                                    <option value="fibonacci-arc">Fibonacci Arc</option>
                                                    <option value="fibonacci-fan">Fibonacci Fan</option>
                                                    <option value="fibonacci-retracement">Fibonacci Retracement</option>
                                                    <option value="fibonacci-timezones">Fibonacci Time Zones</option>
                                                    <option value="horizontal-line">Horizontal Line</option>
                                                    <option value="infinite-line">Infinite Line</option>
                                                    <option value="line">Line Segment</option>
                                                    <option value="marker">Marker</option>
                                                    <option value="ray">Ray</option>
                                                    <option value="rectangle">Rectangle</option>
                                                    <option value="trend-channel">Trend Channel</option>
                                                    <option value="triangle">Triangle</option>
                                                    <option value="vertical-line">Vertical Line</option>
                                                </select>
                                            </li>
                                        </div>

                                        <div className="form-group">
                                            <li style={marginSelection}>
                                                <select name="" id={"seriesTypeSelect" + this.state.stockType} className="select selectpicker show-tick form-control">
                                                    {/* <!--series constructors--> */}
                                                    <option value="area">Area Chart</option>
                                                    <option value="candlestick" selected>Candlestick Chart</option>
                                                    <option value="column">Column Chart</option>
                                                    <option value="jumpLine">Jump Line Chart</option>
                                                    <option value="line">Line Chart</option>
                                                    <option value="marker">Marker Chart</option>
                                                    <option value="ohlc">OHLC Chart</option>
                                                    <option value="rangeArea">Range Area Chart</option>
                                                    <option value="rangeColumn">Range Column Chart</option>
                                                    <option value="rangeSplineArea">Range Spline Area Chart</option>
                                                    <option value="rangeStepArea">Range Step Area Chart</option>
                                                    <option value="spline">Spline Chart</option>
                                                    <option value="splineArea">Spline Area Chart</option>
                                                    <option value="stepArea">Step Area Chart</option>
                                                    <option value="stepLine">Step Line Chart</option>
                                                    <option value="stick">Stick Chart</option>
                                                    {/* <!----> */}
                                                </select>
                                            </li>
                                        </div>

                                        <div className="form-group">
                                            <li style={marginSelection}>
                                                <select className="select show-tick form-control" multiple name="" data-width={elemWidthIndicator} id={"indicatorTypeSelect" + this.state.stockType}
                                                    title="Add Indicator">
                                                </select>
                                            </li>
                                        </div>

                                        <div className="form-group">
                                            <li style={marginSelection}>
                                                <select defaultValue={'linear'} name="" className="select selectpicker show-tick form-control" id={"scaleTypeSelect" + this.state.stockType} title="Scale">
                                                    <option value="linear">Linear</option>
                                                    <option value="log">Logarithmic</option>
                                                </select>
                                            </li>
                                        </div>

                                        <div className="form-group">
                                            <li style={marginSelection}><a className="btn btn-danger" href="" id={"resetButton" + this.state.stockType}>Reset</a></li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id={"chart-container" + this.state.stockType} style={containerStyle}></div>
                </div>
            </div >
        );
    }
}

export default AnalyticChart;
