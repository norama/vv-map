import { ISO_2_TO_3 } from '../util/countries';
import { distance2 } from '../util/geo';
import { datesInRange, dateString, dateMillis } from '../util/date';
import { chain } from '../util/promise';

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
            country.timelineMap[dateMillis(day.date)] = day;
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

function nearestProvince(location, provinces) {
    let minDist = Number.POSITIVE_INFINITY;
    let res = null;

    provinces.forEach((province) => {
        const dist = distance2(location.lat, location.lng, province.lat, province.lng);
        if (dist < minDist) {
            minDist = dist;
            res = province;
        }
    });

    return res;
}

function fetchCountryCode(location) {
    return fetch(`${process.env.REACT_APP_GEONAMES_COUNTRY_URL}?username=${process.env.REACT_APP_GEONAMES_USERNAME}` +
                 `&lat=${location.lat}&lng=${location.lng}`)
            .then((response) => (response.text()))
            .then((text) => (text.trim()));
}

function fetchProvinces(iso3) {
    return fetch(process.env.REACT_APP_VIRUS_PROVINCES_URL + '/' + iso3)
        .then((response) => (response.json()))
        .then((response) => (response.data))
        .then((provinces) => (provinces.filter((province) => (province.lat !== null && province.long !== null))))
        .then((provinces) => (provinces.map((province) => ({
            iso3: province.iso,
            name: province.province,
            lat: province.lat,
            lng: province.long
        }))));
}

const virusSpreadForCountry = (country, dateRange) => {
    const startMillis = dateMillis(dateRange.startDate);
    const endMillis = dateMillis(dateRange.endDate);
    return Object.keys(country.timelineMap).reduce((acc, millis) => {
        if (startMillis <= millis && millis <= endMillis) {
            const item = country.timelineMap[millis];
            acc[dateMillis] = {
                confirmed: item.confirmed,
                new_confirmed: item.new_confirmed
            };
        }
        return acc;
    }, {})
};

function fetchVirusSpreadForProvince(province, dateRange) {
    const dates = datesInRange(dateRange);

    const getVirusSpreadPromise = (index) => {
        const date = dates[index];

        return fetch(process.env.REACT_APP_VIRUS_BY_PROVINCE_BY_DATE + `?` +
                `date=${dateString(date)}` + `&` +
                `iso=${province.iso3}` + `&` +
                `region_province=${province.name}`)
            .then((response) => (response.json()))
            .then((response) => (response.data[0]))
            .then((data) => ({
                millis: date,
                confirmed: data ? data.confirmed : null,
                new_confirmed: data ? data.confirmed_diff : 0
            }));
    };

    return chain(getVirusSpreadPromise, dates.length, 5)
        .then((data) => {
            for (let i = 0; i < data.length; ++i) {
                if (data[i].confirmed === null) {
                    data[i].confirmed = (i > 0) ?
                        data[i - 1].confirmed : 0;
                }
            }
            return data;
        })
        .then((data) => (
            data.reduce((acc, item) => {
                acc[item.millis] = {
                    confirmed: item.confirmed,
                    new_confirmed: item.new_confirmed
                };
                return acc;
            }, {})
        ));
}

function fetchVirusSpread(location, dateRange) {

    return getFetched(process.env.REACT_APP_VIRUS_MAIN_URL, 'virusSpreadCountriesTimeline', transformVirusSpreadCountriesTimeline).then((countries) => {
        return fetchCountryCode(location).then((code) => {
            const country = countries.find((c) => (c.code === code));
            if (!country) {
                throw { error: "country with code: " + code + " not found" };
            }
            console.log('country data', country);

            return fetchProvinces(country.iso3).then((provinces) => {
                console.log('provinces', provinces);
                if (provinces.length <= 1) {
                    return {
                        country: country.name,
                        population: country.population,
                        timelineMap: virusSpreadForCountry(country, dateRange)
                    };
                } else {
                    const province = nearestProvince(location, provinces);
                    return fetchVirusSpreadForProvince(province, dateRange).then((timelineMap) => {
                        return {
                            country: country.name,
                            province: province.name,
                            timelineMap
                        };
                    });
                }
            });
        });
    });
}

export default fetchVirusSpread;