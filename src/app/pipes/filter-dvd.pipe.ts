import { Pipe, PipeTransform } from '@angular/core';
import { DVD } from '../layout/admin/admin.component';


@Pipe({
  name: 'filterDvd'
})
export class FilterDvdPipe implements PipeTransform {

  transform(value: DVD[], ...args: string[]): DVD[] {
   let searchtext=args[0];


   return value.filter(a=>a.title?.toLowerCase().includes(searchtext.toLowerCase()) || a.director?.toLowerCase().includes(searchtext.toLowerCase()) || a.genre?.toLowerCase().includes(searchtext.toLowerCase()));

}
}