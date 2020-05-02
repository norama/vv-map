import { useLocation } from 'react-router-dom';

class Params extends URLSearchParams {
    constructor(init) {
        super(init);
    }

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

const LONDON_NAME = 'London';

export function defaultName(query) {
    return query.get("lat") || query.get("lng") ? "" : LONDON_NAME;
}