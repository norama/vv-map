import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import theme from "@amcharts/amcharts4/themes/moonrisekingdom";

import configChart, { createCertain } from './chart/configChart';

import fetchWeather from '../api/fetchWeather';

import Loader from './Loader';

import './Chart.css';

am4core.useTheme(theme);


function formatTime(date, hour) {
    if (hour === "0") {
        hour = "000";
    }
    return date + ' ' + hour.substring(0, hour.length-2) + ':00';
}

const Chart = ({ location, dateRange }) => {

    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        const certain = createCertain(chart);

        certain.show();

        configChart(chart, dateRange);

        fetchWeather(location, dateRange).then((weather) => {
            console.log(weather);

            chart.data = weatherData(weather);

            setTimeout(() => {
                certain.hide();
                setLoading(false);
            }, 1000);
        });

        return function cleanup() {
            chart.dispose();
        };
    }, []);
/*
    useEffect(() => {
        
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        configChart(chart, dateRange);

        if (chartData) {
            chart.data = chartData;
        }

        setLoading(false);

        return function cleanup() {
            chart.dispose();
        };
    }, [ chartData ]);

    useEffect(() => {
        fetchWeather(location, dateRange).then((weather) => {
            console.log(weather);

            setChartData(weatherData(weather));
        });
    }, []);
*/
    const weatherData = (weather) => {

        let data = [];

        weather.forEach((day, i) => {
            let date = new Date(day.date);

            day.hourly.forEach((hour) => {
                date = new Date(formatTime(day.date, hour.time));
                let item = {
                    date,
                    DewPointC: hour.DewPointC,
                    Humidity: hour.humidity,
                    WeatherPictogram: 2,
                    WindPictogram: 1,
                    weatherDesc: hour.weatherDesc.length ? hour.weatherDesc[0].value : '',
                    weatherIconUrl: hour.weatherIconUrl.length ? hour.weatherIconUrl[0].value : null,
                    winddirDegree: hour.winddirDegree,
                    windspeedKmph: hour.windspeedKmph,
                    mintempC: day.mintempC,
                    maxtempC: day.maxtempC
                };
                /*
                if (hour.time === "0") {
                    item.mintempC = day.mintempC;
                    item.maxtempC = day.maxtempC;
                }
                */
                data.push(item);
            });
        });

        return data;
    };

    return (
        <div className="__Chart__">
            <Loader loading={loading} />
            <div id="chartdiv" className="chart"></div>
        </div>
    );
};

export default Chart;