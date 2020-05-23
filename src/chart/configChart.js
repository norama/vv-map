
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { addDays, subDays } from 'date-fns';

const DEGREE = "\u00B0";
const FONT = "DejaVu Sans Mono";

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

function configDateAxis(dateAxis, startDate, endDate, dateFormat) {
    dateAxis.renderer.grid.template.disabled = true;
    //dateAxis.renderer.labels.template.disabled = true;

    let beforeStartDate = subDays(new Date(startDate), 1);
    beforeStartDate.setHours(18);

    let afterEndDate = addDays(new Date(endDate), 1);
    afterEndDate.setHours(6);

    dateAxis.min = beforeStartDate.getTime();
    dateAxis.max = afterEndDate.getTime();
    dateAxis.strictMinMax = true;

    dateAxis.renderer.labels.template.location = 0.5;

    dateAxis.tooltipDateFormat = dateFormat;

    dateAxis.groupData = true;
    dateAxis.groupCount = 300;
    dateAxis.groupIntervals.setAll([
        { timeUnit: "hour", count: 1 },
        { timeUnit: "hour", count: 3 },
        { timeUnit: "hour", count: 6 },
        { timeUnit: "hour", count: 12 },
        { timeUnit: "month", count: 1 },
        { timeUnit: "year", count: 1 },
        { timeUnit: "year", count: 10 }
    ]);

    dateAxis.zoomToDates(dateAxis.min, dateAxis.max);
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
    speedAxis.title.text = "Speed (km/h), Dist (km)";
    speedAxis.title.fontWeight = 700;
    speedAxis.title.fontFamily = FONT
    speedAxis.min = -20;
    speedAxis.max = 120;
    speedAxis.strictMinMax = true;
    speedAxis.renderer.minGridDistance = 30;
}

function configPercentAxis(percentAxis) {
    percentAxis.title.text = "Percent (%)";
    percentAxis.title.fontWeight = 700;
    percentAxis.title.fontFamily = FONT;
    percentAxis.min = -10;
    percentAxis.max = 110;
    percentAxis.strictMinMax = true;
    percentAxis.renderer.minGridDistance = 30;
}

function configTemperatureAxis(temperatureAxis) {
    temperatureAxis.title.text = "Temperature (" + DEGREE + "C)";
    temperatureAxis.title.fontWeight = 700;
    temperatureAxis.title.fontFamily = FONT;
    //temperatureAxis.min = -30;
    //temperatureAxis.max = 40;
    temperatureAxis.strictMinMax = true;
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

function configTemperatureSeries(series) {
    series.name = "Temperature";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "tempC";
    series.tooltipText = "Temperature: {valueY.value} " + DEGREE + "C";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configDewPointSeries(series) {
    series.name = "Dew point";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "DewPointC";
    series.tooltipText = "DewPoint: {valueY.value} " + DEGREE + "C";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configHumiditySeries(series) {
    series.name = "Relative humidity";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "Humidity";
    series.tooltipText = "Humidity: {valueY.value} %";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configCloudCoverSeries(series) {
    series.name = "Cloud cover";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "cloudcover";
    series.tooltipText = "Clouds: {valueY.value} %";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configWeatherPictogramSeries(series) {
    series.name = "Weather";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "WeatherPictogram";
    series.dataFields.desc = "weatherDesc";
    series.strokeWidth = 0;
    series.minBulletDistance = 10;
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
    series.tooltipText = "Wind ({winddirDegree}" + DEGREE + "): {windspeedKmph} km/h";
    let bullet = series.bullets.push(new am4charts.Bullet());
    configWindBullet(bullet);
    series.strokeWidth = 1;
}

function configVisibilitySeries(series) {
    series.name = "Visibility";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "visibility";
    series.tooltipText = "Visibility: {visibility} km";
    series.strokeWidth = 3;
    series.strokeOpacity = 0.8;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

export function createCertain(chart) {
    let certain = chart.tooltipContainer.createChild(am4core.Container);
    certain.background.fill = am4core.color("#fff");
    certain.background.fillOpacity = 1;
    certain.width = am4core.percent(100);
    certain.height = am4core.percent(100);
    return certain;
}

export function configDateRange(chart, dateRange, dateFormat) {
    configDateAxis(chart.xAxes.getIndex(0), dateRange.startDate, dateRange.endDate, dateFormat);
}

export const configDataChart = (chart) => {

    chart.leftAxesContainer.layout = "vertical";
    chart.rightAxesContainer.layout = "vertical";

    chart.preloader.disabled = true;

    chart.paddingRight = 30;

    chart.colors.list = [
        am4core.color("blue"),
        am4core.color("red"),
        am4core.color("#573fd1"),
        am4core.color("green"),
        am4core.color("#0384fc"),
        am4core.color("#6f9ec9"),
        am4core.color("magenta"),
        am4core.color("#6a086e")
    ];

    chart.xAxes.push(new am4charts.DateAxis());
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
    temperatureAxis.marginTop = 30;
    temperatureAxis.marginBottom = 10;

    let temperatureAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    configTemperatureAxis(temperatureAxis2);
    temperatureAxis2.marginTop = 30;
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

    // Temperature
    series = chart.series.push(new am4charts.LineSeries());
    configTemperatureSeries(series);
    series.yAxis = temperatureAxis;
    scrollbarX.series.push(series);

    // Dew point
    series = chart.series.push(new am4charts.LineSeries());
    configDewPointSeries(series);
    series.yAxis = temperatureAxis;
    //scrollbarX.series.push(series);
    //scrollbarY.series.push(series);

    // Relative humidity
    series = chart.series.push(new am4charts.LineSeries());
    configHumiditySeries(series);
    series.yAxis = percentAxis;
    //scrollbarX.series.push(series);
    percentAxis.renderer.line.stroke = series.stroke;
    percentAxis.renderer.labels.template.fill = series.stroke;

    // Cloud cover
    series = chart.series.push(new am4charts.LineSeries());
    configCloudCoverSeries(series);
    series.yAxis = percentAxis;
    //scrollbarX.series.push(series);
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
/*
    // Wind pictogram
    series = chart.series.push(new am4charts.LineSeries());
    configWindPictogramSeries(series);
    series.yAxis = pictogramAxis2;
*/

    // Visibility
    series = chart.series.push(new am4charts.LineSeries());
    configVisibilitySeries(series);
    series.yAxis = speedAxis;
    speedAxis.title.fill = series.stroke;

    chart.legend = new am4charts.Legend();
    chart.legend.reverseOrder = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 40;
    markerTemplate.height = 40;
    chart.legend.position = "right";
    chart.legend.labels.template.fontSize = 12;
    chart.legend.labels.template.fontWeight = 500;
    chart.legend.labels.template.fontFamily = FONT;

    chart.cursor = new am4charts.XYCursor();

    scrollbarX.minHeight = 30;
    chart.scrollbarX = scrollbarX;
    //chart.scrollbarY = scrollbarY;
};

function configCalcAxis(calcAxis) {
    calcAxis.title.fontWeight = 700;
    calcAxis.title.fontFamily = FONT;
    //calcAxis.min = -10;
    //calcAxis.max = 110;
    calcAxis.strictMinMax = false;
    calcAxis.renderer.minGridDistance = 30;
}

function configCalc1Series(series) {
    series.name = "with visibility";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "calc1";
    series.tooltipText = "calc vis: {calc1}";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configCalc2Series(series) {
    series.name = "without visibility";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "calc2";
    series.tooltipText = "calc: {calc2}";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configMeasureSeries(series) {
    series.name = "dewpoint - temp";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "measure";
    series.tooltipText = "dewpoint - temp: {measure}";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configVirusAllSeries(series) {
    series.name = "Virus All";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "confirmed";
    series.tooltipText = "all confirmed: {confirmed}";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

function configVirusNewSeries(series) {
    series.name = "Virus New";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "new_confirmed";
    series.tooltipText = "new confirmed: {new_confirmed}";
    series.strokeWidth = 3;

    series.minBulletDistance = 10;
    let bullet = series.bullets.push(new am4charts.Bullet());
    configCircleBullet(bullet);
}

const addVirusAxes = (chart) => {

    let virAllAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configCalcAxis(virAllAxis);
    virAllAxis.title.text = "Virus All";
    virAllAxis.strictMinMax = true;
    virAllAxis.marginTop = 0;
    virAllAxis.marginBottom = 0;
    //virAllAxis.renderer.opposite = true;
    virAllAxis.renderer.line.stroke = am4core.color("#848f94");
    virAllAxis.renderer.labels.template.fill = am4core.color("#848f94");
    virAllAxis.title.fill = am4core.color("#848f94");

    let virNewAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configCalcAxis(virNewAxis);
    virNewAxis.title.text = "Virus New";
    //virNewAxis.strictMinMax = true;
    virNewAxis.marginTop = 0;
    virNewAxis.marginBottom = 0;
    //virNewAxis.renderer.opposite = true;
    virNewAxis.renderer.line.stroke = am4core.color("#2e3033");
    virNewAxis.renderer.labels.template.fill = am4core.color("#2e3033");
    virNewAxis.title.fill = am4core.color("#2e3033");

    return { virAllAxis, virNewAxis };
};

const addEstimateAxes = (chart) => {

    let percentAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configPercentAxis(percentAxis);
    percentAxis.strictMinMax = true;
    percentAxis.marginTop = 0;
    percentAxis.marginBottom = 0;
    percentAxis.renderer.line.stroke = am4core.color("#0384fc");
    percentAxis.renderer.labels.template.fill = am4core.color("#0384fc");
    percentAxis.title.fill = am4core.color("#0384fc");
    percentAxis.renderer.opposite = true;

    let temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configTemperatureAxis(temperatureAxis);
    temperatureAxis.title.text = "Dewp - temp (" + DEGREE + "C)";
    temperatureAxis.strictMinMax = true;
    temperatureAxis.marginTop = 0;
    temperatureAxis.marginBottom = 0;
    temperatureAxis.renderer.line.stroke = am4core.color("#1dad91");
    temperatureAxis.renderer.labels.template.fill = am4core.color("#1dad91");
    temperatureAxis.title.fill = am4core.color("#1dad91");
    temperatureAxis.renderer.opposite = true;

    let calcAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configCalcAxis(calcAxis);
    calcAxis.title.text = "Calc (ref below)";
    calcAxis.marginTop = 0;
    calcAxis.strictMinMax = true;
    calcAxis.marginBottom = 0;
    calcAxis.renderer.line.stroke = am4core.color("#edac15");
    calcAxis.renderer.labels.template.fill = am4core.color("#edac15");
    calcAxis.title.fill = am4core.color("#e84900");
    calcAxis.renderer.opposite = true;

    return { percentAxis, temperatureAxis, calcAxis };
};

// top calc chart
export const configVirusChart = (chart) => {
    chart.preloader.disabled = true;

    chart.paddingRight = 30;

    chart.colors.list = [
        am4core.color("#edac15"),
        am4core.color("#e84900"),
        am4core.color("#1dad91"),
        am4core.color("#0384fc"),
        am4core.color("#848f94"),
        am4core.color("#2e3033")
    ];

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.opposite = true;

    const { percentAxis, temperatureAxis, calcAxis } = addEstimateAxes(chart);
    const { virAllAxis, virNewAxis } = addVirusAxes(chart);

    // Calc with visibility
    let series = chart.series.push(new am4charts.LineSeries());
    configCalc1Series(series);
    series.yAxis = calcAxis;
    series.hidden = true;

    // Calc without visibility
    series = chart.series.push(new am4charts.LineSeries());
    configCalc2Series(series);
    series.yAxis = calcAxis;
    series.hidden = true;


    // measure: temperature - dewpoint
    series = chart.series.push(new am4charts.LineSeries());
    configMeasureSeries(series);
    series.yAxis = temperatureAxis;

    // relative humidity
    series = chart.series.push(new am4charts.LineSeries());
    configHumiditySeries(series);
    series.yAxis = percentAxis;

    // Virus all
    series = chart.series.push(new am4charts.LineSeries());
    configVirusAllSeries(series);
    series.yAxis = virAllAxis;

    // Virus new
    series = chart.series.push(new am4charts.LineSeries());
    configVirusNewSeries(series);
    series.yAxis = virNewAxis;
 
    let legendContainer = am4core.create("topLegend", am4core.Container);
    legendContainer.width = am4core.percent(100);
    legendContainer.height = 30;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = legendContainer;
    //chart.legend.reverseOrder = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 40;
    markerTemplate.height = 40;
    chart.legend.position = "top";
    chart.legend.labels.template.fontSize = 12;
    chart.legend.labels.template.fontWeight = 500;
    chart.legend.labels.template.fontFamily = FONT;

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.minHeight = 20;
    chart.scrollbarX = scrollbarX;
    chart.scrollbarX.background.fill = am4core.color("#2e3033");
    chart.scrollbarX.background.fillOpacity = 0.2;
    chart.scrollbarX.thumb.background.fill = am4core.color("#848f94");
    chart.scrollbarX.thumb.background.fillOpacity = 0.2;
    chart.scrollbarX.parent = chart.topAxesContainer;

    chart.zoomOutButton.icon.disabled = true;
    chart.zoomOutButton.icon.width = 0;
    chart.zoomOutButton.icon.height = 0;
};

export const configEstimateChart = (chart) => {
    chart.preloader.disabled = true;

    chart.paddingRight = 30;

    chart.colors.list = [
        am4core.color("#edac15"),
        am4core.color("#e84900"),
        am4core.color("#1dad91"),
        am4core.color("#0384fc"),
        am4core.color("#848f94"),
        am4core.color("#2e3033")
    ];

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    const { percentAxis, temperatureAxis, calcAxis } = addEstimateAxes(chart);
    const { virAllAxis, virNewAxis } = addVirusAxes(chart);

    // Calc with visibility
    let series = chart.series.push(new am4charts.LineSeries());
    configCalc1Series(series);
    series.yAxis = calcAxis;
    series.hidden = true;

    // Calc without visibility
    series = chart.series.push(new am4charts.LineSeries());
    configCalc2Series(series);
    series.yAxis = calcAxis;
    series.hidden = true;

    // measure: temperature - dewpoint
    series = chart.series.push(new am4charts.LineSeries());
    configMeasureSeries(series);
    series.yAxis = temperatureAxis;

    // relative humidity
    series = chart.series.push(new am4charts.LineSeries());
    configHumiditySeries(series);
    series.yAxis = percentAxis;

    // Virus all
    series = chart.series.push(new am4charts.LineSeries());
    configVirusAllSeries(series);
    series.yAxis = virAllAxis;

    // Virus new
    series = chart.series.push(new am4charts.LineSeries());
    configVirusNewSeries(series);
    series.yAxis = virNewAxis;

    let legendContainer = am4core.create("bottomLegend", am4core.Container);
    legendContainer.width = am4core.percent(100);
    legendContainer.height = 30;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = legendContainer;
    //chart.legend.reverseOrder = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 40;
    markerTemplate.height = 40;
    chart.legend.position = "bottom";
    chart.legend.labels.template.fontSize = 12;
    chart.legend.labels.template.fontWeight = 500;
    chart.legend.labels.template.fontFamily = FONT;

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.minHeight = 20;
    chart.scrollbarX = scrollbarX;
    chart.scrollbarX.background.fill = am4core.color("#cc6e21");
    chart.scrollbarX.background.fillOpacity = 0.2;
    chart.scrollbarX.thumb.background.fill = am4core.color("#1d997a");
    chart.scrollbarX.thumb.background.fillOpacity = 0.2;
    chart.scrollbarX.parent = chart.bottomAxesContainer;
};

export const syncCalcCharts = (topChart, bottomChart) => {
    bottomChart.zoomOutButton.events.on("hit", zoomOut);

    function zoomOut(event) {
        let dateAxis = topChart.xAxes.getIndex(0);
        dateAxis.zoomToDates(dateAxis.min, dateAxis.max);
    }

    let dateAxis = bottomChart.xAxes.getIndex(0);
    dateAxis.events.on("selectionextremeschanged", syncZoom);

    function syncZoom(event) {
        let dateAxis = topChart.xAxes.getIndex(0);
        dateAxis.zoomToDates(event.target.minZoomed, event.target.maxZoomed);
    }

    for (const series of topChart.series) {
        series.parent = bottomChart.seriesContainer;
        series.tooltip.pointerOrientation = "left";
    }
    for (const series of bottomChart.series) {
        series.tooltip.pointerOrientation = "right";
    }
    bottomChart.cursor.events.on("cursorpositionchanged", function(ev) {
        topChart.cursor.triggerMove(ev.target.point, "none", true);
    });
};

export const configCalcCharts = (virusChart, estimateChart) => {

    const charts = [ virusChart, estimateChart ];

    charts.forEach((chart) => {
        chart.preloader.disabled = true;

        chart.paddingRight = 30;

        chart.colors.list = [
            am4core.color("#edac15"),
            am4core.color("#e84900"),
            am4core.color("#1dad91"),
            am4core.color("#0384fc"),
            am4core.color("#848f94"),
            am4core.color("#2e3033")
        ];

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.opposite = (chart === virusChart);

        const { percentAxis, temperatureAxis, calcAxis } = addEstimateAxes(chart);
        const { virAllAxis, virNewAxis } = addVirusAxes(chart);

        // Calc with visibility
        let series = chart.series.push(new am4charts.LineSeries());
        configCalc1Series(series);
        series.yAxis = calcAxis;
        series.hidden = true;

        // Calc without visibility
        series = chart.series.push(new am4charts.LineSeries());
        configCalc2Series(series);
        series.yAxis = calcAxis;
        series.hidden = true;

        // measure: temperature - dewpoint
        series = chart.series.push(new am4charts.LineSeries());
        configMeasureSeries(series);
        series.yAxis = temperatureAxis;

        // relative humidity
        series = chart.series.push(new am4charts.LineSeries());
        configHumiditySeries(series);
        series.yAxis = percentAxis;

        // Virus all
        series = chart.series.push(new am4charts.LineSeries());
        configVirusAllSeries(series);
        series.yAxis = virAllAxis;

        // Virus new
        series = chart.series.push(new am4charts.LineSeries());
        configVirusNewSeries(series);
        series.yAxis = virNewAxis;

        const legendDiv = (chart === virusChart) ? "topLegend" : "bottomLegend";
        let legendContainer = am4core.create(legendDiv, am4core.Container);
        legendContainer.width = am4core.percent(100);
        legendContainer.height = 30;

        chart.legend = new am4charts.Legend();
        chart.legend.parent = legendContainer;
        //chart.legend.reverseOrder = true;
        var markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 40;
        markerTemplate.height = 40;
        chart.legend.position = (chart === virusChart) ? "top" : "bottom";
        chart.legend.labels.template.fontSize = 12;
        chart.legend.labels.template.fontWeight = 500;
        chart.legend.labels.template.fontFamily = FONT;

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.minHeight = 20;
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.background.fill = (chart === virusChart) ? am4core.color("#2e3033") : am4core.color("#cc6e21");
        chart.scrollbarX.background.fillOpacity = 0.2;
        chart.scrollbarX.thumb.background.fill = (chart === virusChart) ? am4core.color("#848f94") : am4core.color("#1d997a");
        chart.scrollbarX.thumb.background.fillOpacity = 0.2;
        chart.scrollbarX.parent = (chart === virusChart) ? chart.topAxesContainer : chart.bottomAxesContainer;
    });

    virusChart.zoomOutButton.icon.disabled = true;
    virusChart.zoomOutButton.icon.width = 0;
    virusChart.zoomOutButton.icon.height = 0;

    syncCalcCharts(virusChart, estimateChart);
}

export const configCalcCharts1 = (topChart, bottomChart) => {

    //chart.leftAxesContainer.layout = "vertical";
    //chart.rightAxesContainer.layout = "vertical";

    const charts = [ topChart, bottomChart ];

    charts.forEach((chart) => {
        chart.preloader.disabled = true;

        chart.paddingRight = 30;

        chart.colors.list = [
            am4core.color("#edac15"),
            am4core.color("#e84900"),
            am4core.color("#1dad91"),
            am4core.color("#0384fc")
        ];

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        if (chart === topChart) {
            dateAxis.renderer.opposite = true;
        }

        let percentAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configPercentAxis(percentAxis);
        percentAxis.strictMinMax = true;
        percentAxis.marginTop = 0;
        percentAxis.marginBottom = 0;
    
        let calcAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configCalcAxis(calcAxis);
        calcAxis.title.text = "Calc (ref below)";
        calcAxis.marginTop = 0;
        calcAxis.strictMinMax = true;
        calcAxis.marginBottom = 0;
        calcAxis.renderer.opposite = true;

        let temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configTemperatureAxis(temperatureAxis);
        temperatureAxis.title.text = "Dewp - temp (" + DEGREE + "C)";
        temperatureAxis.strictMinMax = true;
        temperatureAxis.marginTop = 0;
        temperatureAxis.marginBottom = 0;

        let virAxis = chart.yAxes.push(new am4charts.ValueAxis());
        configCalcAxis(virAxis);
        virAxis.title.text = "Virus spread";
        virAxis.strictMinMax = true;
        virAxis.marginTop = 0;
        virAxis.marginBottom = 0;

        // Calc with visibility
        let series = chart.series.push(new am4charts.LineSeries());
        configCalc1Series(series);
        series.yAxis = calcAxis;
        series.hidden = (chart === bottomChart);
        calcAxis.renderer.line.stroke = series.stroke;
        calcAxis.renderer.labels.template.fill = series.stroke;

        // Calc without visibility
        series = chart.series.push(new am4charts.LineSeries());
        configCalc2Series(series);
        series.yAxis = calcAxis;
        series.hidden = (chart === bottomChart);
        calcAxis.title.fill = series.stroke;

        // measure: temperature - dewpoint
        series = chart.series.push(new am4charts.LineSeries());
        configMeasureSeries(series);
        series.yAxis = temperatureAxis;
        series.hidden = (chart === topChart);
        temperatureAxis.renderer.line.stroke = series.stroke;
        temperatureAxis.renderer.labels.template.fill = series.stroke;
        temperatureAxis.title.fill = series.stroke;

        // relative humidity
        series = chart.series.push(new am4charts.LineSeries());
        configHumiditySeries(series);
        series.yAxis = percentAxis;
        series.hidden = (chart === topChart);
        percentAxis.renderer.line.stroke = series.stroke;
        percentAxis.renderer.labels.template.fill = series.stroke;
        percentAxis.title.fill = series.stroke;

        const legenddiv = chart === topChart ? "topLegend" : "bottomLegend";
        let legendContainer = am4core.create(legenddiv, am4core.Container);
        legendContainer.width = am4core.percent(100);
        legendContainer.height = 30;

        chart.legend = new am4charts.Legend();
        chart.legend.parent = legendContainer;
        //chart.legend.reverseOrder = true;
        var markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 40;
        markerTemplate.height = 40;
        chart.legend.position = chart === topChart ? "top" : "bottom";
        chart.legend.labels.template.fontSize = 12;
        chart.legend.labels.template.fontWeight = 500;
        chart.legend.labels.template.fontFamily = FONT;

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.minHeight = 20;
        chart.scrollbarX = scrollbarX;
        chart.scrollbarX.background.fill = am4core.color("#dc67ab");
        chart.scrollbarX.background.fillOpacity = 0.2;
        chart.scrollbarX.thumb.background.fill = am4core.color("#67dcab");
        chart.scrollbarX.thumb.background.fillOpacity = 0.2;
        chart.scrollbarX.parent = (chart === topChart) ? chart.topAxesContainer : chart.bottomAxesContainer;
    });
/*
    bottomChart.zoomOutButton.valign = "bottom";
    bottomChart.zoomOutButton.parent = bottomChart.chartAndLegendContainer;
    bottomChart.zoomOutButton.marginRight = 30;
    bottomChart.zoomOutButton.marginTop = -30;
*/
    topChart.zoomOutButton.icon.disabled = true;
    topChart.zoomOutButton.icon.width = 0;
    topChart.zoomOutButton.icon.height = 0;
    bottomChart.zoomOutButton.events.on("hit", zoomOut);

    function zoomOut(event) {
        let dateAxis = topChart.xAxes.getIndex(0);
        dateAxis.zoomToDates(dateAxis.min, dateAxis.max);
    }
    /*
    topChart.zoomOutButton.valign = "top";
    topChart.zoomOutButton.zIndex = 1000;
    topChart.zoomOutButton.parent = topChart.chartAndLegendContainer;
    topChart.zoomOutButton.marginRight = -10;
    topChart.zoomOutButton.marginTop = 80;
    */

    let dateAxis = bottomChart.xAxes.getIndex(0);
    dateAxis.events.on("selectionextremeschanged", syncZoom);

    function syncZoom(event) {
        let dateAxis = topChart.xAxes.getIndex(0);
        dateAxis.zoomToDates(event.target.minZoomed, event.target.maxZoomed);
    }

    for (const series of topChart.series) {
        series.parent = bottomChart.seriesContainer;
        series.tooltip.pointerOrientation = "left";
    }
    for (const series of bottomChart.series) {
        series.tooltip.pointerOrientation = "right";
    }
    bottomChart.cursor.events.on("cursorpositionchanged", function(ev) {
        topChart.cursor.triggerMove(ev.target.point, "none", true);
    });
};

export const configCalcChart = (chart) => {

    chart.leftAxesContainer.layout = "vertical";
    chart.rightAxesContainer.layout = "vertical";

    chart.preloader.disabled = true;

    chart.paddingRight = 30;

    chart.colors.list = [
        am4core.color("#edac15"),
        am4core.color("#e84900"),
        am4core.color("#1dad91"),
        am4core.color("#0384fc")
    ];

    chart.xAxes.push(new am4charts.DateAxis());

    let scrollbarX = new am4charts.XYChartScrollbar();

    let percentAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configPercentAxis(percentAxis);
    percentAxis.marginTop = 30;
    percentAxis.marginBottom = 10;

    let calc1Axis = chart.yAxes.push(new am4charts.ValueAxis());
    configCalcAxis(calc1Axis);
    calc1Axis.title.text = "Calc (ref below)";
    calc1Axis.marginTop = 30;
    calc1Axis.marginBottom = 10;

    let calc2Axis = chart.yAxes.push(new am4charts.ValueAxis());
    configCalcAxis(calc2Axis);
    calc2Axis.title.text = "Calc (ref below)";
    calc2Axis.marginTop = 40;
    calc2Axis.marginBottom = 10;
    calc2Axis.renderer.opposite = true;

    let temperatureAxis = chart.yAxes.push(new am4charts.ValueAxis());
    configTemperatureAxis(temperatureAxis);
    temperatureAxis.title.text = "Dewp - temp (" + DEGREE + "C)";
    temperatureAxis.strictMinMax = false;
    temperatureAxis.marginTop = 10;
    temperatureAxis.marginBottom = 10;
    temperatureAxis.renderer.opposite = true;


    // Calc with visibility
    let series = chart.series.push(new am4charts.LineSeries());
    configCalc1Series(series);
    series.yAxis = calc1Axis;
    scrollbarX.series.push(series);
    calc1Axis.renderer.line.stroke = series.stroke;
    calc1Axis.renderer.labels.template.fill = series.stroke;
    calc1Axis.title.fill = series.stroke;

    // Calc without visibility
    series = chart.series.push(new am4charts.LineSeries());
    configCalc2Series(series);
    series.yAxis = calc1Axis;
    scrollbarX.series.push(series);
    calc1Axis.title.fill = series.stroke;

    // measure: temperature - dewpoint
    series = chart.series.push(new am4charts.LineSeries());
    configMeasureSeries(series);
    series.yAxis = temperatureAxis;
    scrollbarX.series.push(series);
    temperatureAxis.renderer.line.stroke = series.stroke;
    temperatureAxis.renderer.labels.template.fill = series.stroke;
    temperatureAxis.title.fill = series.stroke;

    // relative humidity
    series = chart.series.push(new am4charts.LineSeries());
    configHumiditySeries(series);
    series.yAxis = percentAxis;
    scrollbarX.series.push(series);
    percentAxis.renderer.line.stroke = series.stroke;
    percentAxis.renderer.labels.template.fill = series.stroke;
    percentAxis.title.fill = series.stroke;

    chart.legend = new am4charts.Legend();
    chart.legend.reverseOrder = true;
    var markerTemplate = chart.legend.markers.template;
    markerTemplate.width = 40;
    markerTemplate.height = 40;
    chart.legend.position = "right";
    chart.legend.labels.template.fontSize = 12;
    chart.legend.labels.template.fontWeight = 500;
    chart.legend.labels.template.fontFamily = FONT;

    chart.cursor = new am4charts.XYCursor();

    scrollbarX.minHeight = 30;
    chart.scrollbarX = scrollbarX;
};