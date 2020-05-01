import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import configChart from './chart/configChart';

import './Chart.css';

am4core.useTheme(am4themes_animated);


function formatTime(date, hour) {
    if (hour === "0") {
        hour = "000";
    }
    return date + ' ' + hour.substring(0, hour.length-2) + ':00';
}

const Chart = ({ location, dateRange }) => {

    const [ chartData, setChartData ] = useState(null);

    useEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        if (chartData) {
            chart.data = chartData;
        }

        configChart(chart, dateRange);

        return function cleanup() {
            chart.dispose();
        };
    }, [ chartData ]);

    useEffect(() => {
        fetchWeather();
    }, []);

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

    const fetchWeather = () => {
        //fetch('https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3f2b6d0ba2734bc49b6173238202004&q=New+york,ny&format=json&date=2020-02-01&enddate=2020-03-31')
        fetch(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3f2b6d0ba2734bc49b6173238202004&q=${location.lat+','+location.lng}&format=json&date=${dateRange.startDate}&enddate=${dateRange.endDate}`)
            .then((response) => (response.json())).then((response) => {
                console.log(response);

                setChartData(weatherData(response.data.weather));
            });
    };

    return (
        <div id="chartdiv" className="__Chart__"></div>
    );
};

export default Chart;