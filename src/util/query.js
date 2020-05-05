import { useLocation } from 'react-router-dom';

class Params extends URLSearchParams {

    get(name, defaultValue=null) {
        const value = super.get(name);
        return value !== null ? value : defaultValue;
    }
}

// A custom hook that builds on useLocation to parse
// the query string for you.
export function useQuery() {
    return new Params(useLocation().search);
}

export const LONDON_NAME = 'London';

export const START_DATE = '2020-03-01';
export const END_DATE = '2020-03-31';

export const LONDON_LATLNG = {
    lat: '51.533',
    lng: '-0.129'
};

export function defaultName(query) {
    return query.get("lat") || query.get("lng") ? "" : LONDON_NAME;
}


export function useQueryParams() {

    const query = useQuery();

    return {
        location: {
            lat: query.get("lat", LONDON_LATLNG.lat),
            lng: query.get("lng", LONDON_LATLNG.lng)
        },
        dateRange: {
            startDate: query.get("startDate", START_DATE),
            endDate: query.get("endDate", END_DATE)
        },
        name: query.get("name", defaultName(query))
    };
};