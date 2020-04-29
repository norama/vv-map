import React, { useState, useEffect } from 'react';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import DateRange from './DateRange';
import Location from './Location';

import './Chart.css';

const DEGREE = "\u00B0";
const FONT = "DejaVu Sans Mono";

am4core.useTheme(am4themes_animated);

function formatTime(date, hour) {
    if (hour === "0") {
        hour = "000";
    }
    return date + ' ' + hour.substring(0, hour.length-2) + ':00';
}

function configCircleBullet(bullet) {
    var circle = bullet.createChild(am4core.Circle);
    circle.width = 5;
    circle.height = 5;
    circle.horizontalCenter = "middle";
    circle.verticalCenter = "middle";

    var hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 2;
}

function configWeatherBullet(bullet) {
    var image = bullet.createChild(am4core.Image);
    image.propertyFields.href = "weatherIconUrl";
    // image.tooltipText = "{desc}";

    image.width = 15;
    image.height = 15;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";

    var hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 3;
}

function configWindBullet(bullet, showSize=true) {

    // Bind `rotation` property to `angle` field in data
    bullet.propertyFields.rotation = "winddirDegree";

    // Add a triangle to act as am arrow
    var arrow = bullet.createChild(am4core.Triangle);
    arrow.horizontalCenter = "middle";
    arrow.verticalCenter = "bottom";
    //arrow.stroke = am4core.color("#fff");
    arrow.strokeWidth = 1;
    arrow.strokeOpacity = 0.7;
    arrow.direction = "top";
    arrow.scale = 2;
    arrow.width = 5;
    if (showSize) {
        arrow.propertyFields.height = "windspeedKmph";
    } else {
        arrow.height = 10;
    }
    arrow.fillOpacity = 0.5;

    var hoverState = bullet.states.create("hover");
    hoverState.properties.scale = 2;
}

function configDateAxis(dateAxis) {
    dateAxis.renderer.grid.template.disabled = true;
    //dateAxis.renderer.labels.template.disabled = true;
    dateAxis.min = (new Date("2020-02-29 18:00")).getTime();
    dateAxis.max = (new Date("2020-03-16 06:00")).getTime();

    dateAxis.renderer.labels.template.location = 0.5;

    dateAxis.tooltipDateFormat = "MM-dd:HH";
}

function configPictogramAxis(pictogramAxis) {
    pictogramAxis.renderer.grid.template.disabled = true;
    pictogramAxis.renderer.labels.template.disabled = true;
    pictogramAxis.tooltip.disabled = true;
    pictogramAxis.renderer.baseGrid.disabled = true;
    pictogramAxis.renderer.maxHeight = 60;
    pictogramAxis.min = 0;
    pictogramAxis.max = 3;
    pictogramAxis.renderer.minGridDistance = 10;
}

function configSpeedAxis(speedAxis) {
    speedAxis.title.text = "Speed (km/h)";
    speedAxis.title.fontWeight = 700;
    speedAxis.title.fontFamily = FONT;
    speedAxis.min = 0;
    speedAxis.max = 120;
    speedAxis.renderer.minGridDistance = 30;
}

function configPercentAxis(percentAxis) {
    percentAxis.title.text = "Percent (%)";
    percentAxis.title.fontWeight = 700;
    percentAxis.title.fontFamily = FONT;
    percentAxis.min = 0;
    percentAxis.max = 100;
    percentAxis.renderer.minGridDistance = 30;
}

function configTemperatureAxis(temperatureAxis) {
    temperatureAxis.title.text = "Temperature (" + DEGREE + "C)";
    temperatureAxis.title.fontWeight = 700;
    temperatureAxis.title.fontFamily = FONT;
    //temperatureAxis.min = -30;
    //temperatureAxis.max = 40;
    temperatureAxis.renderer.minGridDistance = 30;
}

function configMinDayTemperatureSeries(series) {
    series.name = "Min. day temperature";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "mintempC";
    series.tooltipText = "Min.: {valueY.value} " + DEGREE + "C";
    series.startLocation = 0.5;
    //let bullet = series.bullets.push(new am4charts.Bullet());
    //configTemperatureBullet(bullet);
}

function configMaxDayTemperatureSeries(series) {
    series.name = "Max. day temperature";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "maxtempC";
    series.tooltipText = "Max.: {valueY.value} " + DEGREE + "C";
    series.startLocation = 0.5;
    //let bullet = series.bullets.push(new am4charts.Bullet());
    //configTemperatureBullet(bullet);
}

function configDewPointSeries(series) {
    series.name = "Dew point";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "DewPointC";
    series.tooltipText = "DewPoint: {valueY.value} " + DEGREE + "C";
    series.strokeWidth = 3;

    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configHumiditySeries(series) {
    series.name = "Relative humidity (%)";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "Humidity";
    series.tooltipText = "Humidity: {valueY.value} %";
    series.strokeWidth = 3;

    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configWeatherPictogramSeries(series) {
    series.name = "Weather";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "WeatherPictogram";
    series.dataFields.desc = "weatherDesc";
    series.strokeWidth = 0;
    series.minBulletDistance = 15;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configWeatherBullet(bullet);
}

function configWindPictogramSeries(series) {
    series.name = "Wind";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "WindPictogram";
    series.tooltipText = "Wind ({winddirDegree}" + DEGREE + "): {windspeedKmph} km/h";
    series.strokeWidth = 0;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configWindBullet(bullet, true);
}

function configWindSpeedSeries(series) {
    series.name = "Wind";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "windspeedKmph";
    series.tooltipText = "wind ({winddirDegree}" + DEGREE + "): {windspeedKmph} km/h";
    let bullet = series.bullets.push(new am4charts.Bullet());
    configWindBullet(bullet);
    series.strokeWidth = 1;
}

const Chart = () => {


    const [ parametersOpen, setParametersOpen ] = useState(false);
    const [ chartData, setChartData ] = useState(null);

    const config = (chart) => {

        chart.leftAxesContainer.layout = "vertical";
        chart.rightAxesContainer.layout = "vertical";

        chart.paddingRight = 30;

        chart.colors.list = [
            am4core.color("blue"),
            am4core.color("red"),
            am4core.color("green"),
            am4core.color("#0384fc"),
            am4core.color("magenta"),
            am4core.color("magenta"),
            am4core.color("white")
        ];

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        configDateAxis(dateAxis);
/*
        let pictogramAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configPictogramAxis(pictogramAxis);
        pictogramAxis.marginTop = 10;
        pictogramAxis.marginBottom = 10;
*/
        let percentAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configPercentAxis(percentAxis);
        percentAxis.marginTop = 10;
        percentAxis.marginBottom = 10;

        let temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configTemperatureAxis(temperatureAxis);
        temperatureAxis.marginTop = 40;
        temperatureAxis.marginBottom = 10;

        let temperatureAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        configTemperatureAxis(temperatureAxis2);
        temperatureAxis2.marginTop = 40;
        temperatureAxis2.marginBottom = 10;
        temperatureAxis2.renderer.opposite = true;

        let speedAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configSpeedAxis(speedAxis);
        speedAxis.marginTop = 10;
        speedAxis.marginBottom = 10;
        speedAxis.renderer.opposite = true;
/*
        let pictogramAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        configPictogramAxis(pictogramAxis2);
        pictogramAxis2.marginTop = 10;
        pictogramAxis2.marginBottom = 10;
        pictogramAxis2.renderer.opposite = true;
*/
        let scrollbarX = new am4charts.XYChartScrollbar();
        //let scrollbarY = new am4charts.XYChartScrollbar();

        // Min. day temperature
        let series = chart.series.push(new am4charts.StepLineSeries());
        configMinDayTemperatureSeries(series);
        series.yAxis = temperatureAxis;
        scrollbarX.series.push(series);
        //scrollbarY.series.push(series);

        // Max. day temperature
        series = chart.series.push(new am4charts.StepLineSeries());
        configMaxDayTemperatureSeries(series);
        series.yAxis = temperatureAxis;
        scrollbarX.series.push(series);
        //scrollbarY.series.push(series);

        // Dew point
        series = chart.series.push(new am4charts.LineSeries());
        configDewPointSeries(series);
        series.yAxis = temperatureAxis;
        scrollbarX.series.push(series);
        //scrollbarY.series.push(series);

        // Relative humidity
        series = chart.series.push(new am4charts.LineSeries());
        configHumiditySeries(series);
        series.yAxis = percentAxis;
        scrollbarX.series.push(series);
        percentAxis.renderer.line.stroke = series.stroke;
        percentAxis.renderer.labels.template.fill = series.stroke;
        percentAxis.title.fill = series.stroke;

/*
        // Weather pictogram
        series = chart.series.push(new am4charts.LineSeries());
        configWeatherPictogramSeries(series);
        series.yAxis = pictogramAxis;
*/

        // Wind
        series = chart.series.push(new am4charts.LineSeries());
        configWindSpeedSeries(series);
        series.yAxis = speedAxis;
        speedAxis.renderer.line.stroke = series.stroke;
        speedAxis.renderer.labels.template.fill = series.stroke;
        speedAxis.title.fill = series.stroke;
/*
        // Wind pictogram
        series = chart.series.push(new am4charts.LineSeries());
        configWindPictogramSeries(series);
        series.yAxis = pictogramAxis2;
*/
        chart.legend = new am4charts.Legend();
        var markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 40;
        markerTemplate.height = 40;
        chart.legend.labels.template.fontWeight = 500;
        chart.legend.labels.template.fontFamily = FONT;

        chart.cursor = new am4charts.XYCursor();

        chart.scrollbarX = scrollbarX;
        //chart.scrollbarY = scrollbarY;
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
        fetch('https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=3f2b6d0ba2734bc49b6173238202004&q=New+york,ny&format=json&date=2020-03-01&enddate=2020-03-15')
            .then((response) => (response.json())).then((response) => {
                console.log(response);

                setChartData(weatherData(response.data.weather));
            });
    };

    const toggle = () => {
        setParametersOpen((open) => {
            if (open) {
                fetchWeather();
            }
            return !open;
        })
    };

    return (
        <div>
            <Button color="primary" id="popover" type="button" style={{ width: "300px" }}>{parametersOpen ? "Show" : "Parameters"}</Button>
            <Popover placement="bottom" isOpen={parametersOpen} target="popover" toggle={toggle}>
                <PopoverHeader>Date Range and Location</PopoverHeader>
                <PopoverBody>
                    <DateRange />
                    <Location onLocationChange={(latlng) => { console.log('latlng', latlng); }} />
                </PopoverBody>
            </Popover>
            <div id="chartdiv" style={{ width: "100%", height: "90vh" }}></div>
        </div>
    );
};

export default Chart;

