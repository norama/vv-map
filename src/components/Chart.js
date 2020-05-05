import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import theme from "@amcharts/amcharts4/themes/animated";

import configChart, { createCertain, configDateRange } from './chart/configChart';

import fetchWeather from '../api/fetchWeather';

import Loader from './Loader';

import './Chart.css';

am4core.useTheme(theme);

const THREE_HOURS = 3 * 3600000;

function formatTime(date, hour) {
    if (hour === "0") {
        hour = "000";
    }
    return new Date(date + ' ' + hour.substring(0, hour.length-2) + ':00');
}

let chart = null;
let certain = null;

const ChartDiv = () => (
    <div id="chartdiv" className="chart"></div>
);

const Chart = ({ location, dateRange }) => {

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        window.onbeforeunload = function(event) {
            if (chart) {
                chart.dispose();
            }
        };
    }, []);

    useEffect(() => {
        if (!location || !dateRange) {
            return;
        }

        if (chart === null) {
            chart = am4core.create("chartdiv", am4charts.XYChart);
            certain = createCertain(chart);
            certain.show();
            configChart(chart);
        } else {
            certain.show();
        }

        fetchWeather(location, dateRange).then((weather) => {

            configDateRange(chart, dateRange);

            chart.data = weatherData(weather);

            setTimeout(() => {
                certain.hide();
                setLoading(false);
            }, 1000);

        });

    }, [ location, dateRange ]);

    const weatherData = (weather) => {

        let data = [];
        let millis = 0;

        weather.forEach((day, i) => {
            if (millis === 0) {
                millis = new Date(day.date).getTime();
            }

            day.hourly.forEach((hour) => {
                let item = {
                    date: millis,
                    DewPointC: hour.DewPointC,
                    Humidity: hour.humidity,
                    cloudcover: hour.cloudcover,
                    WeatherPictogram: 2,
                    WindPictogram: 1,
                    weatherDesc: hour.weatherDesc.length ? hour.weatherDesc[0].value : '',
                    weatherIconUrl: hour.weatherIconUrl.length ? hour.weatherIconUrl[0].value : null,
                    winddirDegree: hour.winddirDegree,
                    windspeedKmph: hour.windspeedKmph,
                    mintempC: day.mintempC,
                    maxtempC: day.maxtempC,
                    tempC: hour.tempC
                };
                data.push(item);
                millis += THREE_HOURS;
            });
        });

        return data;
    };

    return (
        <div className="__Chart__">
            <Loader loading={loading} />
            <ChartDiv />
        </div>
    );
};

export default Chart;