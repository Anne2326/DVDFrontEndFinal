import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../Services/customer.service';

@Pipe({
  name: 'filterCus'
})
export class FilterCusPipe implements PipeTransform {

  transform(value: Customer[], ...args: string[]): Customer[] {
    let searchtext = args[0]

    return value.filter(a=>{
      const isIdMatch = !isNaN(+searchtext) && a.id === +searchtext; // Check exact match for ID
      const isOtherFieldMatch =
      a.userName.toLowerCase().includes(searchtext.toLowerCase()) ||
      a.email.toLowerCase().includes(searchtext.toLowerCase()) 
      // a.nic.toLowerCase().includes(searchtext)

      return isIdMatch || isOtherFieldMatch;
    });
  }

}
