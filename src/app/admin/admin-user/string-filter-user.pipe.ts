import { Pipe, PipeTransform } from '@angular/core';
import { User } from './User'
@Pipe({
  name: 'stringFilterUser'
})
export class StringFilterUserPipe implements PipeTransform {

  transform(value: User[], q: string){
    if(!q || q == ""){
      return value;
    }
    return value.filter(item => -1 < item.UsersName.toLowerCase().indexOf(q.toLowerCase().trim())
    || -1 < item.idUsers.toString().indexOf(q.toLowerCase().trim())
    );
  }

}
