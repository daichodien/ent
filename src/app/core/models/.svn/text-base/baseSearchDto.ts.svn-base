import * as moment from 'moment';
export class BaseSerchDto{
     SubsidiaryId:string;
     DivisionId:string;
     DepartmentId :string;
     DateF:string;
     DateT:string;
     dateFrom:Date;
     dateTo:Date;
     Group:string;
     Type :string;
     Code:string;
     CreatedBy :number;
     EmployeeId:number;
     IsCheckDate:boolean;
     SkipRecord:number;
     TakeRecord:number;
     SortColumn:string;
     SortOrder:string;
     constructor()
     {
         this.IsCheckDate = true;
         this.dateTo = new Date();
         this.dateFrom = moment().subtract(30, 'days')["_d"];
     }
}