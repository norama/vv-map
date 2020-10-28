import { format } from 'date-fns';

export const HOUR = 3600000;
export const TWO_HOURS = 2 * HOUR;
export const THREE_HOURS = 3 * HOUR;

export const DAY = 24 * HOUR;

export const SUMMER_TIME_START = dateMillis('2020-03-29');

export function dateString(date) {
    return format(date, 'yyyy-MM-dd');
}

export function dateMillis(dateStr) {
    return new Date(dateStr+'T00:00:00').getTime();
}

export function datesInRange(dateRange) {
    let dates = [];
    const start = dateMillis(dateRange.startDate);
    const end = dateMillis(dateRange.endDate);
    for (let millis = start;
             millis <= end;
             millis += (millis === SUMMER_TIME_START) ? (DAY - HOUR) : DAY) {

        dates.push(millis);
    }
    return dates;
}