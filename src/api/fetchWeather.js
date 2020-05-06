import { isSameMonth, endOfMonth, addDays } from 'date-fns';

import { dateString } from '../util/date';

function byMonths(dateRange) {
    let dateRanges = [];
    let start = new Date(dateRange.startDate);
    let end = new Date(dateRange.endDate);

    while (!isSameMonth(start, end)) {
        let x = endOfMonth(start);
        dateRanges.push({ startDate: dateString(start), endDate: dateString(x) });
        start = addDays(x, 1);
    }
    dateRanges.push({ startDate: dateString(start), endDate: dateString(end) });

    return dateRanges;
}

function fetchWeather(location, dateRange) {
    const dateRanges = byMonths(dateRange);

    return Promise.all(dateRanges.map((dateRange) => (
        fetch(`${process.env.REACT_APP_WEATHER_URL}?key=${process.env.REACT_APP_WEATHER_KEY}` + '&' +
            `q=${location.lat+','+location.lng}` + '&' +
            `format=json` + '&' +
            `date=${dateRange.startDate}&enddate=${dateRange.endDate}`
        ).then((response) => (response.json()))
    ))).then((responses) => (
        responses.reduce((acc, response) => {
            if (response.data.weather) {
                acc.push(...response.data.weather);
            } else if (response.data.error) {
                console.error(response.data.error);
            }
            return acc;
        }, [])
    )).catch((error) => {
        console.error(error);
        return [];
    });
}

export default fetchWeather;