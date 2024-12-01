import { Pipe, PipeTransform } from '@angular/core';
import { DVD } from '../layout/admin/admin.component';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: DVD[], ...args: string[]) :DVD[]
  {
    const searchText=args[0];

    return value.filter(a=>a.title?.toLowerCase().includes(
      searchText.toLowerCase())||
      a.genre?.toLowerCase().includes(searchText.toLowerCase())
    );



  }

  
  
  


 

  }

