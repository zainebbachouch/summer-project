import { HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequestDto } from 'src/app/models/user_model/AuthenticationRequestDto';
import { AuthenticationResponseDto } from 'src/app/models/user_model/AuthenticationResponseDto';
import { ReponseStatus } from 'src/app/models/user_model/ReponseStatus';
import { AccountService } from './account.service';
import { CompanyService } from '../offer-pro/company.service';
import { Service } from '../globalservice';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends Service  {
  authRequestDto : AuthenticationRequestDto = new AuthenticationRequestDto();
  authResponseDto : AuthenticationResponseDto = new AuthenticationResponseDto();
  public readonly  SUCCESSFUL :ReponseStatus = ReponseStatus.SUCCESSFUL;
  public readonly  ERROR:ReponseStatus = ReponseStatus.ERROR;
  public readonly  UNSUCCESSFUL:ReponseStatus = ReponseStatus.UNSUCCESSFUL;


  
  constructor( http:HttpClient,
               router: Router,
               activeRoute: ActivatedRoute,
               private companyService: CompanyService,
               private accountService : AccountService  ) { super(http,router,activeRoute); }

    register(authRequestDto:AuthenticationRequestDto) : Observable<HttpResponse<any>> {
      return this.http.post(`${this.url}/user-service/user/register`,
      authRequestDto ,
      {observe : 'response',  headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
    }
    login(authRequest:AuthenticationRequestDto) : Observable<HttpResponse<any>> {
      return this.http.post(`${this.url}/user-service/authentication/authenticate`,authRequest , {observe : 'response'
      ,  headers: new HttpHeaders({ 'Content-Type': 'application/json' })})
    }  
    saveLogin(token:string,username:string):void{
      this.accountService.getByUsername (username).subscribe(
        (response) => { 
          this.accountService.accountDto =  response.body;
          this.setToken(token);
          this.accountService.setAccountDto( this.accountService.accountDto);


          this.companyService.getByUsername(this.accountService.accountDto.userDto.username ).subscribe((response) => { 
            this.accountService.accountDto.companyDto =  response.body;
            this.companyService. setCompanyDto(this.accountService.accountDto.companyDto);
            this.goToComponent("user/profile/"+this.accountService.accountDto.userDto.username);
          }
          ,(error) => {     console.log( "companyService   getByUsername "+ error.message ); 
          this.goToComponent("user/profile/"+this.accountService.accountDto.userDto.username);  }) ;


         

         }
      ,(error) => {   console.log("AuthenticationService saveLogin " +  error.message )  }) ;

    }
    logout() : Observable<HttpResponse<any>> { 
      return this.http.post(`${this.url}/user-service/authentication/logout` ,{}, {observe : 'response'
      ,  headers: new HttpHeaders({ 'Authorization': "Bearer " +this. getToken() })     }  )
    }
    sendMailCodeForgotPassword( username:string, email:string ):Observable<HttpResponse<any>> {
      return this.http.put(`${this.url}/user-service/user/mail-code-forgot-password/${username}/${email}` ,{}, 
      {observe : 'response'})
    }
    updateForgotPassword( code:string, newpassword:string ):Observable<HttpResponse<any>> {
      return this.http.put(`${this.url}/user-service/user/update-forgot-password/${code}/${newpassword}` ,{}, 
      {observe : 'response'})
    }
    updatePassword( username:string, currentPassword:string,newPassword:string ) : Observable<HttpResponse<any>> {
      return this.http.put(`${this.url}/user-service/user/update-password/${username}/${currentPassword}/${newPassword}` ,{}, 
      {observe : 'response'})
    }

  
   clearAll() :void{this. clearTokon();this.accountService.clearAccoutDto(); }
   setToken(token:string) :void{this.clearTokon();localStorage.setItem('Authorization',token);}
   getToken() : string{
    const content =   localStorage.getItem('Authorization'); 
    const token = (  content == null  ||  content == ""  ?  "" :  content  ) ; return token;}
   clearTokon() : void{localStorage.removeItem( 'Authorization');}
}
