import { configDateRange } from './configChart';

const DATE_FORMAT = "MM-dd:HH";

export const resetDataChart = (chart, dateRange) => {
    configDateRange(chart, dateRange, DATE_FORMAT);

    // workaround to display axis ranges properly
    const percentAxis = chart.yAxes.getIndex(0);
    percentAxis.zoomToValues(percentAxis.min + 1, percentAxis.max - 1);
    const speedAxis = chart.yAxes.getIndex(3);
    speedAxis.zoomToValues(speedAxis.min + 1, speedAxis.max - 1);

    for (const series of chart.series) {
        series.bulletsContainer.disposeChildren()
    }
};

export const resetCalcChart = (chart, dateRange) => {
    configDateRange(chart, dateRange, DATE_FORMAT);

    for (const series of chart.series) {
        series.bulletsContainer.disposeChildren()
    }
};