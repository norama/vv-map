import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import theme from "@amcharts/amcharts4/themes/animated";

import { configDataChart, createCertain } from '../chart/configChart';
import { resetDataChart } from '../chart/manageChart';

import { dateMillis } from '../util/date';

import fetchWeather from '../api/fetchWeather';

import Loader from './Loader';

import './Chart.css';

import { TWO_HOURS, THREE_HOURS, SUMMER_TIME_START } from '../util/date';

//am4core.useTheme(theme);

let chart = null;
let certain = null;

window.onbeforeunload = function(event) {
    if (chart) {
        chart.dispose();
        chart = null;
    }
};

const DataChart = ({ location, dateRange, onDataLoaded }) => {

    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        if (!location || !dateRange) {
            return;
        }

        // console.log('location: [' + location.lat + ', ' + location.lng + '], dateRange: ' + dateRange.startDate + ' - ' + dateRange.endDate);

        if (chart === null) {
            // console.log('---> CREATING CHART')
            chart = am4core.create("dataChart", am4charts.XYChart);
            certain = createCertain(chart);

            configDataChart(chart);

            chart.events.on("datavalidated", function () {
                setLoading(false);
                certain.hide();
                setTimeout(() => {
                    onDataLoaded(chart.data);
                }, 1000);
            });
        }

        certain.show();
        setLoading(true);

        fetchWeather(location, dateRange).then((weather) => {
            if (chart === null) {
                return;
            }
            resetDataChart(chart, dateRange, true);
            chart.data = weatherData(weather);
        }).catch((error) => {
            if (chart === null) {
                return;
            }
            resetDataChart(chart, dateRange, true);
            chart.data = [];

            alert(JSON.stringify(error));
        }).finally(() => {
            chart.invalidateData();
        });

    }, [ location.lat, location.lng, dateRange.startDate, dateRange.endDate ]);

    const weatherData = (weather) => {

        let data = [];
        let millis = 0;

        weather.forEach((day, i) => {
            if (millis === 0) {
                millis = dateMillis(day.date);
            }

            day.hourly.forEach((hour) => {
                let item = {
                    date: millis,
                    DewPointC: parseFloat(hour.DewPointC),
                    Humidity: parseFloat(hour.humidity),
                    cloudcover: parseFloat(hour.cloudcover),
                    WeatherPictogram: 2,
                    WindPictogram: 1,
                    weatherDesc: hour.weatherDesc.length ? hour.weatherDesc[0].value : '',
                    weatherIconUrl: hour.weatherIconUrl.length ? hour.weatherIconUrl[0].value : null,
                    winddirDegree: parseFloat(hour.winddirDegree),
                    windspeedKmph: parseFloat(hour.windspeedKmph),
                    mintempC: parseFloat(day.mintempC),
                    maxtempC: parseFloat(day.maxtempC),
                    tempC: parseFloat(hour.tempC),
                    visibility: parseFloat(hour.visibility)
                };
                data.push(item);
                if (millis === SUMMER_TIME_START) {
                    millis += TWO_HOURS;
                } else {
                    millis += THREE_HOURS;
                }
            });
        });

        return data;
    };

    return (
        <div className="__Chart__">
            <Loader loading={loading} />
            <div id="dataChart" className="chart"></div>
        </div>
    );
};

export default DataChart;