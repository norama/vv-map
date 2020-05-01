
export function fetchWeather(location, dateRange) {
    return fetch(`${process.env.REACT_APP_WEATHER_URL}?key=${process.env.REACT_APP_WEATHER_KEY}` + '&' +
        `q=${location.lat+','+location.lng}` + '&' +
        `format=json` + '&' +
        `date=${dateRange.startDate}&enddate=${dateRange.endDate}`
    ).then((response) => (response.json()));
}