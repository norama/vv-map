import { format } from 'date-fns';

export function dateString(date) {
    return format(date, 'yyyy-MM-dd');
}