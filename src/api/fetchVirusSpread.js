import { ISO_2_TO_3 } from '../util/countries';
import { distance2 } from '../util/geo';

let cache = {
    virusSpreadCountriesTimeline: null
};

const identity = (data) => (data);

const transformVirusSpreadCountriesTimeline = (response) => {
    let countries = response.data;
    countries.forEach((country) => {
        country.iso3 = ISO_2_TO_3[country.code];
        country.timelineMap = {};
        country.timeline.forEach((day) => {
            country.timelineMap[new Date(day.date).getTime()] = day;
        });
    });
    return countries;
};

function getFetched(url, key, transform = identity) {
    if (cache[key]) {
        return Promise.resolve(cache[key]);
    }
    return fetch(url).then((response) => (response.json())).then((data) => {
        cache[key] = transform(data);
        return cache[key];
    }).catch((error) => {
        console.error(error);
        throw error;
    });
}

function nearestCountry(location, countries) {
    let minDist = Number.POSITIVE_INFINITY;
    let res = null;

    countries.forEach((country) => {
        const dist = distance2(location.lat, location.lng, country.coordinates.latitude, country.coordinates.longitude);
        if (dist < minDist) {
            minDist = dist;
            res = country;
        }
    });

    return res;
}

function fetchVirusSpread(location, dateRange) {
    return getFetched(process.env.REACT_APP_VIRUS_MAIN_URL, 'virusSpreadCountriesTimeline', transformVirusSpreadCountriesTimeline).then((countries) => {
        const country = nearestCountry(location, countries);
        console.log("Nearest country", country);
        return country;
    });
}

export default fetchVirusSpread;