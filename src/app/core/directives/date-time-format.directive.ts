import { Directive, Input, ElementRef, AfterContentInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Directive({
  selector: '[appDateTimeFormat]'
})
export class DateTimeFormatDirective {

  @Input() formatDateString: string;
  @Input() dateString: string;

  constructor(private Element: ElementRef, private commonService: CommonService) { 
  }
  
  ngAfterViewInit() {
    let date :any = this.Element.nativeElement.innerText;
    if (date.length > 14) {
       date = new Date(date);
    }
    else // is milisecon
    {
      date = Number(date);
    }
    this.Element.nativeElement.innerText = this.commonService.convertMilisecondToUTCDateTime(date, this.formatDateString);
    
  }
}
