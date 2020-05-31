import { ISO_2_TO_3 } from '../util/countries';
import { distance } from '../util/geo';
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

function nearestCountry(location, countries) {
    let minDist = Number.POSITIVE_INFINITY;
    let res = null;

    countries.forEach((country) => {
        const dist = distance(location.lat, location.lng, country.coordinates.latitude, country.coordinates.longitude);
        if (dist < minDist) {
            minDist = dist;
            res = country;
        }
    });

    return res;
}

function nearestProvince(location, provinces) {
    let minDist = Number.POSITIVE_INFINITY;
    let res = null;

    provinces.forEach((province) => {
        const dist = distance(location.lat, location.lng, province.lat, province.lng);
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
    const timelineMap =  Object.keys(country.timelineMap).reduce((acc, millis) => {
        if (startMillis <= millis && millis <= endMillis) {
            const item = country.timelineMap[millis];
            acc[millis] = {
                confirmed: item.confirmed,
                new_confirmed: item.new_confirmed
            };
        }
        return acc;
    }, {});
    console.log('VIRUS SPREAD FOR COUNTRY: ' + country.name, timelineMap);

    return timelineMap;
};

function fetchVirusSpreadForProvince(province, dateRange, city) {
    const dates = datesInRange(dateRange);

    const getVirusSpreadPromise = (index) => {
        const date = dates[index];

        const provinceQueryParam = (province.iso3 === 'USA') ? 'q' : 'region_province';

        return fetch(process.env.REACT_APP_VIRUS_BY_PROVINCE_BY_DATE + `?` +
                `date=${dateString(date)}` + `&` +
                `iso=${province.iso3}` + `&` +
                `${provinceQueryParam}=${province.name}` +
                (city ? `&city_name=${city.name}` : ``))
            .then((response) => (response.json()))
            .then((response) => (response.data[0]))
            .then((data) => (city ? data.region.cities[0] : data))
            .then((data) => ({
                millis: date,
                confirmed: data ? data.confirmed : null,
                new_confirmed: data ? data.confirmed_diff : 0
            }));
    };

    return chain(getVirusSpreadPromise, dates.length, 5)
        .then((data) => {
            if (data.filter((item) => (item.confirmed === null)).length > process.env.REACT_APP_MAX_VIRUS_DATA_ERROR_COUNT) {
                return null;
            }
            for (let i = 0; i < data.length; ++i) {
                if (data[i].confirmed === null) {
                    data[i].confirmed = (i > 0) ?
                        data[i - 1].confirmed : 0;
                }
            }
            return data;
        })
        .then((data) => (
            data ? data.reduce((acc, item) => {
                acc[item.millis] = {
                    confirmed: item.confirmed,
                    new_confirmed: item.new_confirmed
                };
                return acc;
            }, {}) : null
        ));
}

function fetchCity(location, province, dateRange) {
    return fetch(process.env.REACT_APP_VIRUS_BY_PROVINCE_BY_DATE + `?` +
                `date=${dateRange.startDate}` + `&` +
                `iso=${province.iso3}` + `&` +
                `q=${province.name}`)
            .then((response) => (response.json()))
            .then((response) => (response.data))
            .then((data) => {
                console.log('fetchCity data', data);
                const cities = data.reduce((acc, region) => {
                    const regionCities = region.region.cities.map((city) => ({
                        name: city.name,
                        lat: city.lat,
                        lng: city.long
                    }));
                    return [...acc, ...regionCities];
                }, []);

                return nearestProvince(location, cities);
            });
}

function fetchVirusSpread(location, dateRange) {

    const result = (timelineMap, country, province, city) => ({
        country: country.name,
        population: (!timelineMap ? country.population : null),
        province: (timelineMap && province ? province.name : null),
        city: (timelineMap && city ? city.name : null),
        timelineMap: (timelineMap ? timelineMap : virusSpreadForCountry(country, dateRange))
    });

    const fetchVirusSpreadResult = (country, province, dateRange, city) => (
        fetchVirusSpreadForProvince(province, dateRange, city).then((timelineMap) => {
            return timelineMap || !city ? 
                result(timelineMap, country, province, city) :
                fetchVirusSpreadResult(country, province, dateRange) // only province without city
        })
    );

    return getFetched(process.env.REACT_APP_VIRUS_MAIN_URL, 'virusSpreadCountriesTimeline', transformVirusSpreadCountriesTimeline)
        .then((countries) => {
            return fetchCountryCode(location, countries)
                .then((code) => {
                    const country = countries.find((c) => (c.code === code));
                    if (!country) {
                        throw "country with code: " + code + " not found";
                    }
                    return country;
                })
                .catch((error) => {
                    console.log('country code error, taking closest country', error);
                    return nearestCountry(location, countries);
                })
                .then((country) => {

                    console.log('country data', country);

                    return fetchProvinces(country.iso3).then((provinces) => {
                        console.log('provinces', provinces);
                        if (provinces.length <= 1) {
                            return result(null, country);
                        } else {
                            const province = nearestProvince(location, provinces);
                            return (country.iso3 === 'USA') ?
                                fetchCity(location, province, dateRange).then((city) => (
                                    fetchVirusSpreadResult(country, province, dateRange, city)
                                ))
                            :
                                fetchVirusSpreadResult(country, province, dateRange);
                        }
                    });
                });
        });
}

export default fetchVirusSpread;