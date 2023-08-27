import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysBetween'
})
export class DaysBetweenPipe implements PipeTransform {
  transform(startDate: string, endDate: string): number {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMilliseconds = Math.abs(end.getTime() - start.getTime());
    return Math.round(diffInMilliseconds / millisecondsPerDay);
  }
}
