import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../customer/customer.component';


@Pipe({
  name: 'filterCus'
})
export class FilterCusPipe implements PipeTransform {

  transform(value: Customer[], ...args: string[]): Customer[] {
    const searchtext = args[0] || ''; // Fallback to empty string if searchtext is null/undefined

    if (!value || !searchtext) {
      return value; // If no data or no search text, return the original array
    }

    return value.filter(a => {
      const isIdMatch = !isNaN(+searchtext) && a.id === +searchtext; // Match ID
      const isOtherFieldMatch = 
        (a.userName?.toLowerCase().includes(searchtext.toLowerCase()) || false) ||
        (a.email?.toLowerCase().includes(searchtext.toLowerCase()) || false);

      return isIdMatch || isOtherFieldMatch;
    });
  }
}
