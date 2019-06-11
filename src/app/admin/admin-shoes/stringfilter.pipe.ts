import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../home-page/product/product';

@Pipe({
  name: 'stringfilter'
})
export class StringfilterPipe implements PipeTransform {

  transform(value: Product[], q: string){
    if(!q || q == ""){
      return value;
    }
    return value.filter(item => -1 < item.ShoesName.toLowerCase().indexOf(q.toLowerCase().trim()));
  }

}
