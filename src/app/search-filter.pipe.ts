import { Pipe, PipeTransform } from '@angular/core';

import { Task } from './Task';

@Pipe({
    name: 'bookfilter',
    pure: false
})
export class BookFilterPipe implements PipeTransform {
  transform(items: Task[], filter: Task): Task[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Task) => this.applyFilter(item, filter));
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(task: Task, filter: Task): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (String(task[field]).toLowerCase().indexOf(String(filter[field]).toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (task[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}