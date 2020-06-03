import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import theme from "@amcharts/amcharts4/themes/animated";

import { createCertain, configCalcCharts } from '../chart/configChart';
import { resetCalcChart } from '../chart/manageChart';

import fetchVirusSpread from '../api/fetchVirusSpread';
import { DAY } from '../util/date';

import LocationVirusInfo from './LocationVirusInfo';
import References from './References';

import Loader from './Loader';

import './Chart.css';

//am4core.useTheme(theme);

// https://www.medrxiv.org/content/10.1101/2020.03.16.20037168v1.full.pdf

const MILE = 1.60934;

const START_CHARTS = {
    estimate: {
        chart: null,
        certain: null
    },
    virus: {
        chart: null,
        certain: null
    }
};

let charts = START_CHARTS;

function initCharts() {
    console.log('---> CREATING CHART');
    charts = {...START_CHARTS};
    charts.virus.chart = am4core.create("virusChart", am4charts.XYChart);
    charts.virus.certain = createCertain(charts.virus.chart);
    charts.estimate.chart = am4core.create("estimateChart", am4charts.XYChart);
    charts.estimate.certain = createCertain(charts.estimate.chart);

    configCalcCharts(charts.virus.chart, charts.estimate.chart);

}

function disposeChart(chart) {
    if (chart) {
        chart.dispose();
    }
}

window.onbeforeunload = function(event) {
    disposeChart(charts.estimate.chart);
    disposeChart(charts.virus.chart);
    charts = START_CHARTS;
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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const CalcChart = ({ weatherData, location, dateRange, reset }) => {
    const [ clicks, setClicks ] = useState(0);

    const [ locationVirusInfo, setLocationVirusInfo ] = useState(null);

    useEffect(() => {
        incClicks();
    }, [ reset ]);

    useEffect(() => {

        initCharts();

        charts.virus.chart.events.on("datavalidated", function () {
            if (charts === START_CHARTS) {
                return;
            }

            charts.virus.certain.hide();
            charts.estimate.certain.hide();
        });
    }, []);

    useEffect(() => {
        if (!weatherData) {
            setLocationVirusInfo(null);
            charts.virus.certain.show();
            charts.estimate.certain.show();
            return;
        }

        // console.log('location: [' + location.lat + ', ' + location.lng + '], dateRange: ' + dateRange.startDate + ' - ' + dateRange.endDate);

        setLocationVirusInfo(null);
        charts.virus.certain.show();
        charts.estimate.certain.show();

        fetchVirusDataWithEstimates().then(({ data, country, province, city, population }) => {
            if (charts === START_CHARTS) {
                return;
            }

            const delta = getRandomInt(12) + 1;
            resetCalcChart(charts.estimate.chart, dateRange, delta);
            resetCalcChart(charts.virus.chart, dateRange, delta);

            charts.virus.chart.data = data;
            charts.estimate.chart.data = data;
            setLocationVirusInfo({ country, province, city, population });
        }).catch((error) => {
            if (charts === START_CHARTS) {
                return;
            }

            resetCalcChart(charts.virus.chart, dateRange);
            resetCalcChart(charts.estimate.chart, dateRange);

            charts.virus.chart.data = [];
            charts.estimate.chart.data = [];

            console.error(error);
            const errorJson = JSON.stringify(error);
            if (errorJson !== '{}') {
                alert(errorJson);
            } else {
                alert('ERROR: see console for details.')
            }
        }).finally(() => {
            charts.virus.chart.invalidateData();
            charts.estimate.chart.invalidateData();
        });

    }, [ weatherData ]);

    const fetchVirusDataWithEstimates = () => {

        return fetchVirusSpread(location, dateRange).then((locationData) => {
            let data = [];
            let lastDayItem = null;

            weatherData.forEach((hour) => {
                const hourData = {
                    temp: hour.tempC,
                    wind: hour.windspeedKmph / MILE,
                    vis: hour.visibility / MILE,
                    dewpoint: hour.DewPointC,
                    humidity: hour.Humidity / 100
                };
                hourData.rh = hourData.humidity; //calcRH(hourData.dewpoint, hourData.temp);
                let item = {
                    date: hour.date,
                    calc1: calc1(hourData),
                    calc2: calc2(hourData),
                    measure: hourData.dewpoint - hourData.temp,
                    Humidity: hour.Humidity,
                    cloudcover: hour.cloudcover,
                }
                const virusDay = locationData.timelineMap[item.date];
                if (virusDay) {
                    item.confirmed = virusDay.confirmed;
                    item.new_confirmed = virusDay.new_confirmed;

                    lastDayItem = item;
                } else {
                    if (lastDayItem) {
                        item.confirmed = lastDayItem.confirmed;
                        item.new_confirmed = (item.date - lastDayItem.date < DAY) ?
                            lastDayItem.new_confirmed : 0;
                    } else {
                        item.confirmed = null;
                        item.new_confirmed = 0;
                    }
                }
                data.push(item);
            });

            return {
                country: locationData.country,
                province: locationData.province,
                city: locationData.city,
                population: locationData.population,
                data
            };
        });
    };

    const calcDataPerDay = () => {

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
            // console.log(day);
            let item = {
                date: weatherDay[0].date,
                calc1: calc1(day),
                calc2: calc2(day),
                measure: day.dewpoint - day.temp,
                Humidity: day.humidity * 100
            }
            data.push(item)
        }

        return data;
    };

    const incClicks = () => {
        setClicks((c) => (c + 1));
    };

    return (
        <div className="__Chart__" onClick={incClicks}>
            <Loader loading={!locationVirusInfo} />
            <div className="chart">
                <div className="calc-top-chart">
                    <div id="topLegend" className="top-legend"></div>
                    <div id="virusChart" className="top-chart"></div>
                </div>
                <div className="calc-bottom-chart">
                    <div id="estimateChart" className="bottom-chart"></div>
                    <div id="bottomLegend" className="bottom-legend"></div>
                </div>
            </div>
            {locationVirusInfo ? (
                <LocationVirusInfo {...locationVirusInfo} />
            ) : null}
            <References close={clicks} />
        </div>
    );
};

export default CalcChart;