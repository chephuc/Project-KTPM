import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
import { Token } from '@angular/compiler';

export interface UserDetails{
    idUsers: number
    UsersName: string
    UsersPassword: string
    UsersEmail: string
    UsersAddress: string
    UsersPhoneNum: number
    UsersPermission: string
    exp: number
    iat: number
}

interface TokenResponse{
    token: string
    permission: string
    UsersName: string
    UsersPassword: string
    UsersEmail: string
    UsersAddress: string
    UsersPhoneNum: number
    UsersPermission: string
}

export interface TokenPayload{
    idUsers: number
    UsersName: string
    UsersPassword: string
    UsersEmail: string
    UsersAddress: string
    UsersPhoneNum: number
    UsersPermission: string

}

@Injectable()
export class AuthenticationService {
    private token: string
    checkadmin: boolean

    constructor(private http:HttpClient, private router: Router){
       
    }
    private saveToken(token:string):void{
        localStorage.setItem('userToken', token)
        this.token = token;
    }
    private getToken():string{
        if(!this.token){
            this.token = localStorage.getItem('userToken')
        }
        return this.token
    }
    public getUserDetails(): UserDetails{
        const token = this.getToken()
        let payload
        if(token){
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        }else {
            return null
        }
    }
    public isLoggedIn():boolean{
        const user = this.getUserDetails();
        if(user){
            return user.exp > Date.now()/1000;
        }else{
            return false
        }
    }
    public register(user:TokenPayload):Observable<any>{

        return this.http.post(`http://nodeserver.hopto.org/user/register`,user);
        // const base = this.http.post(`http://nodeserver.hopto.org/user/register`,user)

        // const request = base.pipe(
        //     map((data: TokenResponse)=>{
        //         if(data.token){
        //             this.saveToken(data.token)
        //         }
        //         return data
        //     })
        // )
        // return request
    }

    public login(user:TokenPayload):Observable<any>{
        const base = this.http.post(`http://nodeserver.hopto.org/user/login`,user)

        const request = base.pipe(
            map((data: TokenResponse)=>{
                if(data.permission == "admin"){
                    this.checkadmin = true
                    this.router.navigateByUrl('/adminshoes')
                }else{
                    this.checkadmin = false
                    this.router.navigateByUrl('/homepage')
                }
                // data.permission == "admin" ? this.router.navigateByUrl('/adminshoes') : this.router.navigateByUrl('/homepage')
                if(data.token){
                    this.saveToken(data.token)
                }
                return data
            })
        )
        return request
    }

    public profile():Observable<any>{
        return this.http.get(`http://nodeserver.hopto.org/user/profile`, {
            headers: { Authorization:`${this.getToken()}`}
        })
    }

    public logOut():void{
        this.token = ''
        this.checkadmin = false 
        window.localStorage.removeItem('userToken')
        this.router.navigateByUrl('/')
    }
}