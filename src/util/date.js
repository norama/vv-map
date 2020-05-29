import { format, isAfter, addDays } from 'date-fns';

const DAY = 86400000;

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
    for (let millis = start; millis <= end; millis += DAY) {
        dates.push(millis);
    }
    return dates;
}