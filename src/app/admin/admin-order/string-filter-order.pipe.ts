import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../admin-user/User'
@Pipe({
  name: 'stringFilterOrder'
})
export class StringFilterOrderPipe implements PipeTransform {

  transform(value: Order[], q: string){
    if(!q || q == ""){
      return value;
    }
    return value.filter(item => -1 < item.UsersName.toLowerCase().indexOf(q.toLowerCase().trim())
    || -1 < item.idOrder.toString().indexOf(q.toLowerCase().trim())
    );
  }

}
