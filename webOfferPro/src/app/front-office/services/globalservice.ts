import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MsgReponseStatusDto } from 'src/app/models/user_model/MsgReponseStatusDto';
export class Service {
    protected url = `${environment.apiBaseUrl}`;
    public msgReponseStatusDto  : MsgReponseStatusDto = new MsgReponseStatusDto(); 
    constructor(protected  http:HttpClient,
                private router: Router,
                private activeRoute: ActivatedRoute) {}
        
    goToComponent(component:string) : void {this.router.navigateByUrl(component);} // eq de routerLink="child1"
    public parseFormatDate (date:Date):string{
        return date.getFullYear() + "/" + (date.getMonth() + 1) +
        "/" + date.getDate() + " " + date.getHours() +
        ":" + date.getMinutes();
      }
      public toDate (str:string):Date{
        return new Date (str );
      }
      public formatDateAgo(date: Date): string {
        const now = new Date();
        const timeDifference = now.getTime() - date.getTime();
      
        // Calculate time units
        const minutes = Math.floor(timeDifference / 60000); // 1 minute = 60000 milliseconds
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
        // Construct the formatted string
        let formattedDate = "";
      
        if (days > 0) {
          formattedDate += `${days} day${days > 1 ? 's' : ''} `;
        }
        
        const remainingHours = hours % 24;
        if (remainingHours > 0) {
          formattedDate += `${remainingHours} hour${remainingHours > 1 ? 's' : ''} `;
        }
      
        const remainingMinutes = minutes % 60;
        if (remainingMinutes > 0) {
          formattedDate += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} `;
        }
      
        formattedDate += "ago";
      
        return formattedDate;
      }

}