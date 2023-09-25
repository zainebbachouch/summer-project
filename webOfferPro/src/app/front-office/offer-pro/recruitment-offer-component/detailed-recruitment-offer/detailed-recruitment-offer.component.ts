import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/front-office/services/user/account.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Gender } from 'src/app/models/user_model/Gender';
import { AuthenticationService } from 'src/app/front-office/services/user/authentication.service';
import { ReponseStatus } from 'src/app/models/user_model/ReponseStatus';
import { AttachementDto } from 'src/app/models/offer_pro_model/AttachementDto';
import { Category } from 'src/app/models/user_model/Category';
import { CompanyService } from 'src/app/front-office/services/offer-pro/company.service';
import { ActivatedRoute } from '@angular/router';
import { RecruitmentService } from 'src/app/front-office/services/offer-pro/recruitment.service';
import { RecruitmentOfferDto } from 'src/app/models/offer_pro_model/RecruitmentOfferDto';
import { CompanyDto } from 'src/app/models/offer_pro_model/CompanyDto';
import { ApplyOnOfferDto } from 'src/app/models/offer_pro_model/ApplyOnOfferDto';
import { MsgReponseStatusDto } from 'src/app/models/user_model/MsgReponseStatusDto';
import { ApplyonofferService } from 'src/app/front-office/services/offer-pro/applyonoffer.service';

@Component({
  selector: 'app-detailed-recruitment-offer',
  templateUrl: './detailed-recruitment-offer.component.html',
  styleUrls: ['./detailed-recruitment-offer.component.css']
})
export class DetailedRecruitmentOfferComponent  implements OnInit {
  private idRecuirement! : number;
  private titleRecuirement! : string | null;

  constructor(private route: ActivatedRoute ,
             public authService : AuthenticationService,
             public recruitmentService : RecruitmentService,
             public applyonofferService: ApplyonofferService) { }


 ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {
  this.idRecuirement = (params.get('id') !== null ? Number(params.get('id')) :0 );
  this.titleRecuirement = (params.get('title') !== null  ? params.get('title') : ""  );});
  if (  this.titleRecuirement != null ) {
   this.recruitmentService.getByIdAndTitle( this.idRecuirement,  this.titleRecuirement).subscribe(
    (response) => {
     const rectoffer : RecruitmentOfferDto = response.body
     this.recruitmentService.recruitmentOfferDto = rectoffer;
     this.recruitmentService.recruitmentOfferDto.description = this.recruitmentService.recruitmentOfferDto.description.replace(/\n/g, '<br>');
     //this.recruitmentService.recruitmentOfferDto.description = this.recruitmentService.recruitmentOfferDto.description.replace(/ /g, '&nbsp;');
     this.recruitmentService.recruitmentOfferDto.requirements = this.recruitmentService.recruitmentOfferDto.requirements.replace(/\n/g, '<br>');
     //this.recruitmentService.recruitmentOfferDto.requirements = this.recruitmentService.recruitmentOfferDto.requirements.replace(/ /g, '&nbsp;');
     this.recruitmentService.recruitmentOfferDto.startDateTime = new Date(this.recruitmentService.recruitmentOfferDto.startDateTime);
     this.recruitmentService.recruitmentOfferDto.endDateTime = new Date(this.recruitmentService.recruitmentOfferDto.endDateTime);

    
     }
    ,(error) => {
       this.recruitmentService.goToComponent('page-error');
    }) ;
    } 
  }




  stateBoxAddApplyOffer : boolean = false;
  onClickOpenCloseAddApplyOfferEvent($event:any):void {this.stateBoxAddApplyOffer = $event;}
  onClickApplyOnOffer():void{this.stateBoxAddApplyOffer = true;}
  onApplyOnOfferEvent($applyOnOfferDto:ApplyOnOfferDto):void{
    console.log($applyOnOfferDto);
     this.applyonofferService.addApplyOnOfferByRecruitmentOfferAndAccount(this.recruitmentService.recruitmentOfferDto.id,$applyOnOfferDto)
     .subscribe(
      (response) => {
       const MsgReponseStatus : MsgReponseStatusDto = response.body
       this.stateMsgBoxAuth = true ; 
       this.authService.msgReponseStatusDto =  MsgReponseStatus;
       }
      ,(error) => {
        this.stateMsgBoxAuth = true ; 
        this.authService.msgReponseStatusDto =  
        { title : "Error", datestamp: new Date() , timestamp: new Date(),status : ReponseStatus.ERROR , message : error.message};
      }) ;
  }
  // msg response
  stateMsgBoxAuth : boolean = false;
  closeEventstateMsgBoxAuth($event:any):void {   this.stateMsgBoxAuth = $event; }





  onClickGoToCompany( name:String):void{
    this.recruitmentService.goToComponent("company/details?Name="+ name.replace(/ /g, '%20'));
  }
 }
 




  
 
