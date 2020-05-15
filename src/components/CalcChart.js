import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import theme from "@amcharts/amcharts4/themes/animated";

import { configCalcChart, createCertain } from '../chart/configChart';
import { resetChart } from '../chart/manageChart';

import Loader from './Loader';

import './Chart.css';

//am4core.useTheme(theme);

let chart = null;
let certain = null;

window.onbeforeunload = function(event) {
    if (chart) {
        chart.dispose();
        chart = null;
    }
};

const CalcChart = ({ weatherData, dateRange }) => {
    const [ loading, setLoading ] = useState(false);


    useEffect(() => {
        if (!weatherData) {
            return;
        }

        // console.log('location: [' + location.lat + ', ' + location.lng + '], dateRange: ' + dateRange.startDate + ' - ' + dateRange.endDate);

        if (chart === null) {
            // console.log('---> CREATING CHART')
            chart = am4core.create("calcChart", am4charts.XYChart);
            certain = createCertain(chart);

            configCalcChart(chart);

            chart.events.on("datavalidated", function () {
                setLoading(false);
                certain.hide();
            });
        }

        certain.show();
        setLoading(true);

        resetChart(chart, dateRange);
        chart.data = calcData();
        chart.invalidateData();

    }, [ weatherData ]);

    const calcData = () => {

        let data = [];
        let millis = 0;

        weatherData.forEach((hour, i) => {
            let item = {
                date: hour.date,
                calc: 1
            }
            data.push(item)
        });

        return data;
    };

    return (
        <div className="__Chart__">
            <Loader loading={loading} />
            <div id="calcChart" className="chart"></div>
        </div>
    );
};

export default CalcChart;