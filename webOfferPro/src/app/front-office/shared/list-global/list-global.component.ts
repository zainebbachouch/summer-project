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
import { AccountDto } from 'src/app/models/user_model/AcountDto';

@Component({
  selector: 'app-list-global',
  templateUrl: './list-global.component.html',
  styleUrls: ['./list-global.component.css']
})
export class ListGlobalComponent implements OnInit {
  //private companyName! : string;
  private keySearch! : string | null;
  public recruitmentOffersDtoFilter : RecruitmentOfferDto [] =  new Array<RecruitmentOfferDto>();
  public companysDtoFilter : CompanyDto [] =  new Array<CompanyDto>();
  public accountsDtoFilter : AccountDto [] =  new Array<AccountDto>();
  constructor(
             private route: ActivatedRoute ,
             public recruitmentService : RecruitmentService,
             public companyService: CompanyService,
             public accountService: AccountService) {
  }
 ngOnInit(): void {
  this.route.queryParamMap.subscribe(params => {this.keySearch = params.get('key');});



  this.recruitmentService.getAll().subscribe(
    (response) => {
      const recruitmentOffersDto : RecruitmentOfferDto [] =  response.body; 
      this.recruitmentService.ListrecruitmentOfferDto = recruitmentOffersDto.map((offer) => ({
        ...offer,
        startDateTime: new Date(offer.startDateTime),  endDateTime: new Date(offer.endDateTime),
      }));
      this.recruitmentService.ListrecruitmentOfferDto.sort((a, b) => {
        return b.startDateTime.getTime() - a.startDateTime.getTime();  // inverse a.startDateTime.getTime() - b.startDateTime.getTime(); 
      });
      //this.recruitmentService.ListrecruitmentOfferDto = recruitmentOffersDto;
      //this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto;
      if (this.keySearch === 'All' ){this.onClickAll();}
      else {
        this.onSearched((this.keySearch===null ? '' : this.keySearch));
      }
     }
    ,(error) => {
     console.log('page-error : recruitmentService.getAll  ->   ' +error.message);
    }) ;;







    this.companyService.getAll().subscribe(
      (response) => {
        const companysDto : CompanyDto [] =  response.body; 
        this.companyService.ListcompanysDto = companysDto;
        this.companyService.ListcompanysDto.sort((a, b) => {
          return a.name.localeCompare(b.name);  // inverse people.sort((a, b) => b.name.localeCompare(a.name));
        });
        if (this.keySearch === 'All' ){this.onClickAll();}
        else {
          this.onSearched((this.keySearch===null ? '' : this.keySearch));
        }
       }
      ,(error) => {
       console.log('page-error : companyService.getAll ->   ' +error.message);
      }) ;;






      this.accountService.getAll().subscribe(
        (response) => {
          const accountdtos : AccountDto [] =  response.body; 
          this.accountService.ListAccounts = accountdtos;
          console.log(this.accountService.ListAccounts)
          this.accountService.ListAccounts.sort((a, b) => {
            return a.lastname.localeCompare(b.lastname);  // inverse people.sort((a, b) => b.name.localeCompare(a.name));
          });
          if (this.keySearch === 'All' ){this.onClickAll();}
          else {
            this.onSearched((this.keySearch===null ? '' : this.keySearch));
          }
         }
        ,(error) => {
         console.log('page-error : accountService.getAll - > ' +error.message);
        }) ;;








 }


 goToDetailedRecruitment(id:number,title:string):void{
  title = title.replace(/ /g, '%20');
  this.recruitmentService.goToComponent("recruitment-offer/detailed?id="+
  id+"&title="+title);
}

onSearched(search:string):void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto.filter((offer) => {
    return (
      offer.typeOffer.includes(search)||
      offer.title.includes(search)||
      offer.contractType.includes(search)||
      offer.statusOffer.includes(search)||
      offer.studyLevel.includes(search)||
      offer.campanyDto.name.includes(search) ||
      offer.campanyDto.state.includes(search) ||
      offer.campanyDto.city.includes(search) 
    );
  });
}
onClickAll():void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto;
  this.companysDtoFilter = this.companyService.ListcompanysDto;
  this.accountsDtoFilter = this.accountService.ListAccounts;
}
onClickTypeOffer(value:string):void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto.filter(
    (offer) => offer.typeOffer === value);
}
onClickContractType(value:string):void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto.filter(
    (offer) => offer.contractType === value);
}
onClickStudyLevel(value:string):void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto.filter(
    (offer) => offer.studyLevel === value);
}
onClickActivityArea(value:string):void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto.filter(
    (offer) => offer.campanyDto.activity === value);
  this.companysDtoFilter = this.companyService.ListcompanysDto.filter(
      (company) => company.activity === value);
}
onClickStateRegion(value:string):void{
  this.recruitmentOffersDtoFilter = this.recruitmentService.ListrecruitmentOfferDto.filter(
    (offer) => offer.campanyDto.state === value);
  this.companysDtoFilter = this.companyService.ListcompanysDto.filter(
      (company) => company.state === value);
  this.accountsDtoFilter = this.accountService.ListAccounts.filter(
        (account) => account.state === value);
}
pageSizeRecruitment: number = 4; // Number of cards to display per page
currentPageRecruitment: number = 1; // Current page             




goToDetailedCompany(name:string):void{
  name = name.replace(/ /g, '%20');
  this.recruitmentService.goToComponent("company/details?Name="+
  name);
}
pageSizeCompany: number = 4; // Number of cards to display per page
currentPageCompany: number = 1; // Current page










goToDetailedAccount(username:string):void{this.recruitmentService.goToComponent("user/profile/"+username);}
pageSizeAccount: number = 4; // Number of cards to display per page
currentPageAccount: number = 1; // Current page
}