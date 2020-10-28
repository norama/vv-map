import { configDateRange } from './configChart';

const DATE_FORMAT = "MM-dd:HH";

export const resetDataChart = (chart, dateRange) => {
    configDateRange(chart, dateRange, DATE_FORMAT);

    let dateAxis = chart.xAxes.getIndex(0);
    dateAxis.zoomToDates(new Date(dateRange.startDate), new Date(dateRange.endDate));
    dateAxis.zoomToDates(dateAxis.min, dateAxis.max);

    // workaround to display axis ranges properly
    const percentAxis = chart.yAxes.getIndex(0);
    percentAxis.zoomToValues(percentAxis.min + 1, percentAxis.max - 1);
    const speedAxis = chart.yAxes.getIndex(3);
    speedAxis.zoomToValues(speedAxis.min + 1, speedAxis.max - 1);

    for (const series of chart.series) {
        series.bulletsContainer.disposeChildren()
    }
};

export const resetCalcChart = (chart, dateRange, delta) => {
    configDateRange(chart, dateRange, DATE_FORMAT, delta);

    let dateAxis = chart.xAxes.getIndex(0);
    dateAxis.zoomToDates(new Date(dateRange.startDate), new Date(dateRange.endDate));
    dateAxis.zoomToDates(dateAxis.min, dateAxis.max);

    // workaround for percent axis
    const axis = chart.yAxes.getIndex(0);
    if (axis.title.text === "Percent (%)") {
        axis.zoomToValues(axis.min + 1, axis.max - 1);
    }

    for (const series of chart.series) {
        series.bulletsContainer.disposeChildren()
    }
};