import React, { useState, useEffect } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function formatTime(date, hour) {
    if (hour === "0") {
        return date;
    }
    return date + ' ' + hour.substring(0, hour.length-2) + ':00';
}

const Chart = () => {

    const [ chartData, setChartData ] = useState(null);

    const config = (chart) => {

        chart.paddingRight = 30;

        chart.colors.list = [
            am4core.color("red"),
            am4core.color("blue"),
            am4core.color("green"),
            am4core.color("#FF9671"),
            am4core.color("#FFC75F"),
            am4core.color("#F9F871")
        ];

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        //dateAxis.renderer.minGridDistance = 50;
        //dateAxis.renderer.grid.template.location = 0.5;
        //dateAxis.startLocation = 0.5;
        //dateAxis.endLocation = 0.5;
        dateAxis.renderer.grid.template.disabled = true;
        dateAxis.renderer.labels.template.disabled = true;

        dateAxis.tooltipDateFormat = "MM-dd:hh";
/*
        if (chart.data) {
            const dtf1 = new Intl.DateTimeFormat('cs', { month: 'short', day: '2-digit' });
            const dtf2 = new Intl.DateTimeFormat('cs', { hour: '2-digit' });

            chart.data.forEach((item) => {
                const date = item.date;
                let range = dateAxis.axisRanges.create();
                range.date = date;
                const dtf = date.getHours() === 0 ? dtf1 : dtf2;
                range.label.text = dtf.format(date);
            });
        }
*/
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
    
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "maxtempC";
        series.tooltipText = "maxTemp: {valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "mintempC";
        series.tooltipText = "minTemp: {valueY.value}";
        chart.cursor = new am4charts.XYCursor();

        series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "DewPointC";
        series.tooltipText = "DewPoint: {valueY.value}";
        chart.cursor = new am4charts.XYCursor();
    
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
    };

    useEffect(() => {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        if (chartData) {
            chart.data = chartData;
        }

        config(chart);

        return function cleanup() {
            chart.dispose();
        };
    }, [ chartData ]);

    const weatherData = (weather) => {

        let data = [];

        weather.forEach((day, i) => {
            let date = new Date(day.date);
            data.push({ date, maxtempC: day.maxtempC, mintempC: day.mintempC });

            day.hourly.forEach((hour) => {
                date = new Date(formatTime(day.date, hour.time));
                data.push({ date, DewPointC: hour.DewPointC });
            });
        });

        return data;
    };

    const fetchWeather = () => {
        fetch('https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3f2b6d0ba2734bc49b6173238202004&q=New+york,ny&format=json&date=2020-03-01&enddate=2020-03-15')
            .then((response) => (response.json())).then((response) => {
                console.log(response);

                setChartData(weatherData(response.data.weather));
            });
    };

    return (
        <div>
            <button onClick={fetchWeather}>Weather</button>
            <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
};

export default Chart;

