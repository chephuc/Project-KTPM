import { Pipe, PipeTransform } from '@angular/core';
import { Detail } from 'src/app/home-page/product/product';

@Pipe({
  name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {

  transform(value: Detail[],  q: string): any {
    if(q !== undefined){
      return value.filter(item => -1 < item.ShoesName.toLowerCase().indexOf(q.toLowerCase().trim())
      || -1 < item.idShoes.toString().indexOf(q.toLowerCase().trim())
      );
    }
  }
}
