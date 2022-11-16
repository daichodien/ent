import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-template-input',
  templateUrl: './template-input.component.html',
  styleUrls: ['./template-input.component.css']
})
export class TemplateInputComponent implements OnInit {

  stringvalue = "name";
  data: any = [
    {
      "value": "JP",
      "data": "JAPAN",
    },
    {
      "value": "CN",
      "data": "CHINA",
    }
    , {
      "value": "VN",
      "data": "VIETNAM",
    },
    {
      "value": "VN",
      "data": "VIETNAM1",
    }
    , {
      "value": "RS",
      "data": "RUSSIA",
    }
  ]
  newArrayOfObj: any
  constructor() { }

  ngOnInit() {
    debugger
    // this.newArrayOfObj = this.data.map(({ data: stringvalue, ...rest }) => ({ stringvalue, ...rest }));
    this.newArrayOfObj = this.changeKey('data', 'name', this.data)


  }
  changeKey(originalKey, newKey, arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      var obj = arr[i];
      obj[newKey] = obj[originalKey];
      delete (obj[originalKey]);
      newArr.push(obj);
    }
    return newArr;
  }

  showtable() {
    debugger
    var index: number;
    $('.selectinput').closest('.dropdown-select').find('.option-list, .search-box').toggle();
    var value = $('.selectinput').val().toString();
    if (value != "") {
      index = (this.newArrayOfObj.findIndex(m => m.name === value)) + 1;
    }


    $(".dropdown-select > ul li:eq(" + index + ")").css('background-color', '#00A564');

    $('.option-list a').click(function () {
      var select = $(this).text();
      $(this).closest('.dropdown-select').children('.selectinput').val(select);

      $(".dropdown-select > ul li:eq(" + index + ")").css('background-color', '#fff');

      $('.option-list, .search-box').hide();
    });
  }
  searchControl() {

    var val = $('.seach-control').val().toString().toLowerCase();
    var list = $('.seach-control').closest('.dropdown-select').find('li')
    list.each(function () {
      var text = $(this).text().toLowerCase();
      if (text.indexOf(val) == -1) {
        $(this).hide();
      }
      else {
        $(this).show();
      }

    })
  }
}
