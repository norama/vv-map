import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import theme from "@amcharts/amcharts4/themes/animated";

import { configCalcChart, createCertain } from '../chart/configChart';
import { resetCalcChart } from '../chart/manageChart';

import Loader from './Loader';

import './Chart.css';

//am4core.useTheme(theme);

// https://www.medrxiv.org/content/10.1101/2020.03.16.20037168v1.full.pdf

const MILE = 1.60934;

let chart = null;
let certain = null;

window.onbeforeunload = function(event) {
    if (chart) {
        chart.dispose();
        chart = null;
    }
};

// case counts with visibility =
// - 0.1366*T^2 + 3.6046*T
// - 0.3883*SPD^2 + 20.2509*SPD
// + 5929.9403/(VSB+19.1774)
// - 505.8484*RH^3 + 316.6004*RH^2 + 189.1295*RH
// - 422.3774
// (SPD: wind speed in miles/h, VSB: visibility in miles, RH: rel humidity in %, T: temperature in Celsius)
const calc1 = ({ temp, wind, vis, rh }) => (
    - 0.1366 * temp * temp + 3.6046 * temp
    - 0.3883 * wind * wind + 20.2509 * wind
    + 5929.9403 / (vis + 19.1774)
    - 505.8484 * rh * rh * rh + 316.6004 * rh * rh + 189.1295 * rh
    - 422.3774
);

// case counts without visibility =
// - 0.18*T^2 + 3.1628*T
// - 0.4385*SPD^2 + 21.1420*SPD
// - 228.4231*RH^3 - 391.9561*RH^2 + 880.7190*RH
// - 401.8395
// (SPD: wind speed in miles/h, RH: rel humidity in %, T: temperature in Celsius)
const calc2 = ({ temp, wind, rh }) => (
    - 0.18 * temp * temp + 3.1628 * temp
    - 0.4385 * wind * wind + 21.1420 * wind
    - 228.4231 * rh * rh * rh - 391.9561 * rh * rh + 880.7190 * rh
    - 401.8395
);

const calcRH = (d, t) => {
    const b = t < 0 ? Math.E : 10;
    return Math.pow(b, (7.5 * d) / (237.3 + d) - (7.5 * t) / (237.3 + t));
};

const avg = (arr) => (arr.reduce((a, b) => (a + b), 0) / arr.length);

const fieldAvg = (arr, field) => (arr.reduce((a, b) => (a + b[field]), 0) / arr.length);

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

        resetCalcChart(chart, dateRange);
        chart.data = calcData();
        chart.invalidateData();

    }, [ weatherData ]);

    const calcData = () => {

        let data = [];

        for (let i=0; i < weatherData.length; i += 8) {
            const weatherDay = weatherData.slice(i, i + 8);
            const day = {
                temp: fieldAvg(weatherDay, 'tempC'),
                wind: fieldAvg(weatherDay, 'windspeedKmph') / MILE,
                vis: fieldAvg(weatherDay, 'visibility') / MILE,
                dewpoint: fieldAvg(weatherDay, 'DewPointC'),
                humidity: fieldAvg(weatherDay, 'Humidity') / 100
            };
            day.rh = calcRH(day.dewpoint, day.temp);
            console.log(day);
            let item = {
                date: weatherDay[0].date,
                calc1: calc1(day),
                calc2: calc2(day)
            }
            data.push(item)
        }

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