import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form } from '@angular/forms';
import { ApplyonofferService } from 'src/app/front-office/services/offer-pro/applyonoffer.service';
import { RecruitmentService } from 'src/app/front-office/services/offer-pro/recruitment.service';
import { AccountService } from 'src/app/front-office/services/user/account.service';
import { ApplyOnOfferDto } from 'src/app/models/offer_pro_model/ApplyOnOfferDto';
import { StatusApply } from 'src/app/models/offer_pro_model/StatusApply';
import { AccountDto } from 'src/app/models/user_model/AcountDto';
import { ReponseStatus } from 'src/app/models/user_model/ReponseStatus';

@Component({
  selector: 'app-list-apply-offer',
  templateUrl: './list-apply-offer.component.html',
  styleUrls: ['./list-apply-offer.component.css']
})
export class ListApplyOfferComponent implements OnInit  {

  @Input() state : boolean = false;
  @Input() public listApplyOnOffers :ApplyOnOfferDto[]=[];
  public listApplyOnOffersFilter :ApplyOnOfferDto[]=[];
  @Output() onClickCloseEvent=new EventEmitter<boolean>();  


  constructor(public accountService:AccountService,
    public applyonofferService :ApplyonofferService,
    public recruitmentService:RecruitmentService) { }

  ngOnInit(): void {
   

    const usernames: string[] = this.listApplyOnOffers.map((applyOnOfferDto) => applyOnOfferDto.username);
    this.accountService.getByListUsernames(usernames).subscribe(
      (response) => {
        const ListAccounts: AccountDto[] = response.body;


        this.listApplyOnOffers.forEach(applyOnOffer => {
          const matchingAccount = ListAccounts.find(account => account.userDto.username === applyOnOffer.username);
          if (matchingAccount) { applyOnOffer.accountDto = matchingAccount;   }
        });

        this.listApplyOnOffers = this.listApplyOnOffers.map((applyOnOffer) => ({
          ...applyOnOffer,
          applyAt: new Date(applyOnOffer.applyAt)
        }));
        this.listApplyOnOffers.sort((a, b) => {
          return b.applyAt.getTime() - a.applyAt.getTime();  // inverse a.startDateTime.getTime() - b.startDateTime.getTime(); 
        });
        this.listApplyOnOffersFilter = this.listApplyOnOffers ;

        }
       ,(error) => {
        this.stateMsgBoxAuth = true ; 
        this.applyonofferService.msgReponseStatusDto =  
        { title : "Error", datestamp: new Date() , timestamp: new Date(),status : ReponseStatus.ERROR , message : error.message};
       });
 
  } 

  onClickStatusApply(value:string):void{
    if ( value == "All"){this.listApplyOnOffersFilter = this.listApplyOnOffers ; return;}
    this.listApplyOnOffersFilter = this.listApplyOnOffers.filter((offer) => offer.statutApply === value);
  }
  onSearched(search:string):void{
    this.listApplyOnOffersFilter = this.listApplyOnOffers.filter((offer) => {
      return (
        ( offer.statutApply == null ?false:offer.statutApply.includes(search))||
        ( offer.username == null ?false: offer.username.includes(search))||
        ( offer.accountDto.lastname == null ?false:offer.accountDto.lastname.includes(search))||
        ( offer.accountDto.firstname == null ?false:offer.accountDto.firstname.includes(search))||
        ( offer.accountDto.email == null ?false: offer.accountDto.email.includes(search))||
       ( offer.accountDto.github == null ?false: offer.accountDto.github.includes(search)) ||
       ( offer.accountDto.github == null ?false:  offer.accountDto.gender.includes(search))
      );
    });
  }
  pageSizeStatusApply: number = 4; // Number of cards to display per page
  currentPageStatusApply: number = 1; // Current page      





  private username!:string;
  private seletstatusApply!:StatusApply;
  private idApplyOnOffer!:number;
  onStatusApplyChange(applyOnOffer:ApplyOnOfferDto,  selectedValue: any) {
    this.username = applyOnOffer.username;
    this.idApplyOnOffer = applyOnOffer.id;
    this.seletstatusApply = selectedValue.target.value; 
    this.stateMsgBoxConfimStatusApply = true;
  }



stateMsgBoxConfimStatusApply : boolean = false; 
onClickEventMsgConfimStatusApply($event:any):void {    
  this.stateMsgBoxConfimStatusApply = $event ; 
  if ( $event == true){
    this.stateMsgBoxConfimStatusApply = false;
    this.applyonofferService.updateStatusApply(this.username,this.idApplyOnOffer,this.seletstatusApply).subscribe(
      (response) => {
        this.applyonofferService.msgReponseStatusDto =   response.body;
        this.stateMsgBoxAuth = true; 
    
          const targetElement = this.listApplyOnOffers.find(offer =>  offer.username === this.username && offer.id === this.idApplyOnOffer );
          if (targetElement) {  
            this.listApplyOnOffers = this.listApplyOnOffers.map((element) => {
              if (element === targetElement) {  return { ...element, statutApply: this.seletstatusApply };  }
              return element;
          }); 
            }
            this.listApplyOnOffersFilter = this.listApplyOnOffers ;
       }
       ,(error) => {
        this.stateMsgBoxAuth = true ; 
        this.applyonofferService.msgReponseStatusDto =  
        { title : "Error", datestamp: new Date() , timestamp: new Date(),status : ReponseStatus.ERROR , message : error.message};
       });
  }
}


  //Msg box
  stateMsgBoxAuth : boolean = false;
  closeEventstateMsgBoxAuth($event:any):void {this.stateMsgBoxAuth = $event;}

  onClickNo():void { 
    this.state = false; 
    this.onClickCloseEvent.emit(this.state);
  }
}
