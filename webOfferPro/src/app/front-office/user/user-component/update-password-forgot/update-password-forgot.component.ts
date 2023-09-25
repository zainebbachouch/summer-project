 
import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/front-office/services/user/authentication.service';
import { MsgReponseStatusDto } from 'src/app/models/user_model/MsgReponseStatusDto';
import { ActivatedRoute } from '@angular/router';
import { ReponseStatus } from 'src/app/models/user_model/ReponseStatus';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-update-password-forgot',
  templateUrl: './update-password-forgot.component.html',
  styleUrls: ['./update-password-forgot.component.css']
})
export class UpdatePasswordForgotComponent implements OnInit {

public newPassword! : string;
public valodatePassword! : string;
private code! : string;

  constructor( public authService : AuthenticationService , private route: ActivatedRoute ) {
    this.code = this.route.snapshot.params['code'];
     console.log( this.code );
     this.authService.msgReponseStatusDto =  
     { datestamp: new Date() , timestamp: new Date()
      , status : ReponseStatus.ERROR ,
      message : "Your mail is correct so you see your email for complete next step",
      title : "Error",} }

  ngOnInit(): void {}

  resetPassword(form: NgForm):void {  
    console.log( form.invalid );
    if (!form.invalid) { 
     /* this.authService.updateForgotPassword( this.code, this.newPassword ).subscribe(
        (response) => {
          this.stateMsgBoxAuth = true ; 
          this.authService.msgReponseStatusDto = response.body;
         }
      ,(error) => { 
        this.stateMsgBoxAuth = true ; 
        this.authService.msgReponseStatusDto =  
        { title : "Error", datestamp: new Date() , timestamp: new Date(),status : ReponseStatus.ERROR , message : error.message};
      });*/
     }
   }


  stateMsgBoxAuth : boolean = false;
  closeEventstateMsgBoxAuth($event:any):void {   this.stateMsgBoxAuth = $event; }



  signIn():void {this.authService.goToComponent('sign-in');  }
}
