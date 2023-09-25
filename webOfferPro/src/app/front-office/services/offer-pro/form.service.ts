import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDto } from 'src/app/models/offer_pro_model/FormDto';
import { FieldType } from 'src/app/models/offer_pro_model/FieldType';
import { Service } from '../globalservice';

@Injectable({
  providedIn: 'root'
})
export class FormService extends Service  {
  public formDto : FormDto = new FormDto(); 
  public ListFormDto:FormDto[]=[];
  constructor( http:HttpClient,
               router: Router,
               activeRoute: ActivatedRoute,) {   super(http,router,activeRoute);}

public readonly listFieldType = [{label:'TEXT',value:FieldType.TEXT },{label:'NUMBER',value:FieldType.NUMBER},{label:'SELECT',value:FieldType.SELECT},{label:'DOCUMENT',value:FieldType.DOCUMENT},{label:'DATE',value:FieldType.DATE}];

public deleteFormById(idToDelete: number ,formList: FormDto[]): FormDto[] {
                // Use the filter method to create a new array without the element to be deleted
                const updatedFormList = formList.filter((form) => form.id !== idToDelete);
                // Replace the original array with the updated array
                formList.length = 0;
                Array.prototype.push.apply(formList, updatedFormList);
                return formList; }
              

              /*public uiDesignAlerteForm ( formDto: FormDto):string {
                return '<div class="alert text-white bg-primary" role="alert">'
              +'<div class="iq-alert-icon">'
              +'<i class="ri-alert-line"></i>'
              +'</div>'
              +'<div class="iq-alert-text">'+formDto.description+'<br><b>'+formDto.content+'</b> is type '+formDto.type+' and '+(formDto.required?"required":"not required")+'</div>'
              +'<button type="button" class="close" (click="onClickDeleteForm()") data-dismiss="alert" aria-label="Close">'
              +'<i class="ri-close-line"></i>'
              +'</button>'
              +'</div>';}*/
            
}
