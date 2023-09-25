import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecruitmentOfferDto } from 'src/app/models/offer_pro_model/RecruitmentOfferDto';
import { ContractType } from 'src/app/models/offer_pro_model/ContractType';
import { StudyLevel } from 'src/app/models/offer_pro_model/StudyLevel';
import { TypeOffer } from 'src/app/models/offer_pro_model/TypeOffer';
import { Service } from '../globalservice';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService extends Service {
  public recruitmentOfferDto : RecruitmentOfferDto = new RecruitmentOfferDto(); 
  public ListrecruitmentOfferDto:RecruitmentOfferDto[]=[];

  constructor (http:HttpClient,router: Router,activeRoute: ActivatedRoute ) {super(http,router,activeRoute);} 
   
  create(idCompany:number,recruitmentOfferDto:RecruitmentOfferDto) : Observable<HttpResponse<any>> {
    return this.http.put(`${this.url}/offer-pro-service/company/add-offer/`+idCompany,recruitmentOfferDto,
    {observe : 'response',
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
   }
   getAll() : Observable<HttpResponse<any>>{
    return this.http.get(`${this.url}/offer-pro-service/recruitment-offer`,{observe : 'response'});}
   getByIdAndTitle(id:number,title:string) : Observable<HttpResponse<any>>{
    return this.http.get(`${this.url}/offer-pro-service/recruitment-offer/${id}/title/${title}`,{observe : 'response'});}

    public readonly listContractType = [{label:'CIVP',value:ContractType.CIVP},{label:'CDD',value:ContractType.CDD},{label:'CDI',value:ContractType.CDI},{label:'KARAMA',value:ContractType.KARAMA},{label:'SEASONAL',value:ContractType.SEASONAL},{label:'ALTERNATIION',value:ContractType.ALTERNATIION},{label:'FREELANCER',value:ContractType.FREELANCER},   ];
    public readonly listTypeOffer = [{label:'INTERNSHIP',value:TypeOffer.INTERNSHIP },{label:'JOB',value:TypeOffer.JOB}];
    public readonly listStudyLevel = [{label:'Licence',value:StudyLevel.LICENCE },{label:'Master',value:StudyLevel.MASTER},{label:'Engineering',value:StudyLevel.ENGINEERING}];

}
