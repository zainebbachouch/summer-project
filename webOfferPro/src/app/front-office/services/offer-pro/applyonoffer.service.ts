import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountDto } from 'src/app/models/user_model/AcountDto';
import { AttachementDto } from 'src/app/models/user_model/AttachementDto';
import { Gender } from 'src/app/models/user_model/Gender';
import { Category } from 'src/app/models/user_model/Category';
import { StateRegion } from 'src/app/models/user_model/StateRegion';
import { environment } from 'src/environments/environment';
import { CompanyDto } from 'src/app/models/offer_pro_model/CompanyDto';
import { MsgReponseStatusDto } from 'src/app/models/user_model/MsgReponseStatusDto';
import { RecruitmentOfferDto } from 'src/app/models/offer_pro_model/RecruitmentOfferDto';
import { ActivityArea } from 'src/app/models/offer_pro_model/ActivityArea';
import { AccountService } from '../user/account.service';
import { ContractType } from 'src/app/models/offer_pro_model/ContractType';
import { StudyLevel } from 'src/app/models/offer_pro_model/StudyLevel';
import { TypeOffer } from 'src/app/models/offer_pro_model/TypeOffer';
import { ApplyOnOfferDto } from 'src/app/models/offer_pro_model/ApplyOnOfferDto';
import { StatusApply } from 'src/app/models/offer_pro_model/StatusApply';
import { Service } from '../globalservice';

@Injectable({
  providedIn: 'root'
})
export class ApplyonofferService extends Service {
  
  public applyOnOfferDto : ApplyOnOfferDto = new ApplyOnOfferDto(); 
  public ListApplyOnOffersDto :ApplyOnOfferDto[]=[];

  constructor( http:HttpClient,
               router: Router,
               activeRoute: ActivatedRoute) {   super(http,router,activeRoute);}

  addApplyOnOfferByRecruitmentOfferAndAccount(idRecruitmentOffer:number,applyOnOfferDto:ApplyOnOfferDto) : Observable<HttpResponse<any>>{
    return this.http.put(`${this.url}/offer-pro-service/apply-on-offer/add-by-recruitment-offer-and-by-account/${idRecruitmentOffer}`
    ,applyOnOfferDto,
    {observe : 'response',
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
  getApplyOnOffersByUsername(username:string) : Observable<HttpResponse<any>>{
    return this.http.get(`${this.url}/offer-pro-service/apply-on-offer/username/${username}`,{observe : 'response'});}
  updateStatusApply(username:string,idApplyOnOffer:number,statusApply:StatusApply) : Observable<HttpResponse<any>>{
      return this.http.put(`${this.url}/offer-pro-service/apply-on-offer/update-atatus-apply/${username}/${idApplyOnOffer}/${statusApply}`
      ,{},
      {observe : 'response',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
    } 





    public readonly  ACCEPT : StatusApply = StatusApply.ACCEPT;
    public readonly  REFUSE : StatusApply = StatusApply.REFUSE;
    public readonly  ONHOLD : StatusApply = StatusApply.ONHOLD;
    public readonly listStatusApply = [{label:'accept',value:StatusApply.ACCEPT },{label:'refuse',value:StatusApply.REFUSE}, {label:'on hold',value:StatusApply.ONHOLD}]; 
}
