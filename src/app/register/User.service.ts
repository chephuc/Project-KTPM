import { Injectable } from "@angular/core";
import {User} from './User';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

	@Injectable()
	export class UserService {
		constructor( private http: HttpClient) {
			this.redirectUrl="";
		}
		redirectUrl:string;					   
		insertUser(user:User): Observable<User> {
				return this.http.post<User>('http://nodeserver.hopto.org/api/user/insert/', user);
		}

		login(username:String, pass:String)
		{
			return this.http.post<any>('http://nodeserver.hopto.org/api/login/',{username:username, password:pass})
			.subscribe(user => {
				if(user&&user.token)
					localStorage.setItem('currentUser',JSON.stringify(user));
					return user;
			});
		}
		logout(){
			localStorage.removeItem('currentUser');
		}	
	}