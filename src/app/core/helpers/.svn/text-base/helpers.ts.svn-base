/*********************************************************
 * File Name: Helpers
 * Created By: hau.le
 * Created Date: 07/01/2020
 * Description: All function helper in project
 *********************************************************/

import { ToastrService } from 'ngx-toastr';
import { Constants } from '../helpers/constants';
import { EnterpriseService } from '../helpers/enterprise-service';

export class Helpers {

  /**
   * Get data local storage by key
   * @param key key local storage
   * @param parseJson Check parse json object true || false
   * @returns {object}
   */
  public static getLocalStorage(key: string, parseJson: boolean = true): any {
    if (key && key != '')
      return parseJson ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
    else
      return null;
  }

  /**
   * Get multi data local storage by array key
   * @param {[string]} arrKey array key local storage
   * @param {Boolean} parseJson Check parse json object true || false
   * @returns {TODO}
   */
  public static getArrayLocalStorage(arrKey: [string], parseJson: boolean = true): any {

    let result = {};
    if (arrKey && arrKey.length > 0) {

      // TODO: getArrayLocalStorage
      // return parseJson ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
      return result;
    }
    else
      return null;
  }

  /**
   * Set data local storage
   * @param key key local storage
   * @param objData object data need save local storage
   * @returns {void}
   */
  public static setLocalStorage(key: string, objData: object): void {
    localStorage.setItem(key, JSON.stringify(objData));
  }

  /**
   * Set multi data local storage by array key
   * @param {[object]} arrData array key local storage
   * @returns {void}
   */
  public static setArrayLocalStorage(arrData: object[]): void {

    if (arrData && arrData.length > 0) {
      // TODO: setArrayLocalStorage
      arrData.forEach((item, index) => {
        if (item) {
          const _key = item[Constants.LOCAL_STORAGE.KEY];
          const _value = item[Constants.LOCAL_STORAGE.VALUE];

          if (_key && _value)
            localStorage.setItem(_key, JSON.stringify(_value));
        }
      })
    }
  }

  /**
   * Remove data local storage
   * @param {string} key key local storage
   * @returns {void}
   */
  public static removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Remove multi data local storage by array key
   * @param {[string]} arrKey array key local storage
   * @returns {void}
   */
  public static removeArrayLocalStorage(arrKey: string[]): void {

    if (arrKey && arrKey.length > 0) {

      arrKey.forEach(item => {
        // console.log('=====> ', item);
        if (item && item != '')
          localStorage.removeItem(item);
      });
    }
  }

  /**
   * Get full url api
   * @param {boolean} isAuthenAPI check authentication api
   * @param {string} endPoint url query
   * @returns {string}
   */
  public static getUrlEndPointApi(isAuthenAPI: Boolean, endPoint: string): string {
    const enterpriseSvc = new EnterpriseService();
    return enterpriseSvc.getUrlEndPointApi(isAuthenAPI, endPoint);
  }

  /**
  * Setup sample data
  var arrObj = [
    {FirstName: "Zach", LastName: "Emergency", Age: 35},
    {FirstName: "Nancy", LastName: "Nurse", Age: 27},
    {FirstName: "Ethel", LastName: "Emergency", Age: 42},
    {FirstName: "Nina", LastName: "Nurse", Age: 48},
    {FirstName: "Anthony", LastName: "Emergency", Age: 44},
    {FirstName: "Nina", LastName: "Nurse", Age: 32}
  ];

  //Unit Tests
  Helpers.sortBy(arrObj, "LastName");
  Helpers.sortBy(arrObj, "-LastName");
  Helpers.sortBy(arrObj, "LastName", "FirstName", "-Age");
  Helpers.sortBy(arrObj, "-FirstName", "Age");
  Helpers.sortBy(arrObj, "-Age");
  * @returns {Array}
  */
  public static sortBy(myArr: any, ...args: string[]): any {

    function sortComparer(a, b) {
      return a.localeCompare(b)
    };

    function _sortByAttr(attr) {

      let sortOrder = 1;

      if (attr[0] == "-") {
        sortOrder = -1;
        attr = attr.substr(1);
      }

      return function (a, b) {
        var result;

        if (typeof a[attr] == 'string' && typeof b[attr] == 'string')
          result = sortComparer(a[attr], b[attr]); // sort by alpha a - z

        else
          result = (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0;

        return result * sortOrder;
      }
    }

    function _getSortFunc() {

      if (args.length == 0)
        throw "Zero length arguments not allowed for Array.sortBy()";

      return function (a, b) {
        for (var result = 0, i = 0; result == 0 && i < args.length; i++) {
          result = _sortByAttr(args[i])(a, b);
        }

        return result;
      }
    }

    return myArr.sort(_getSortFunc.apply(null, args));
  }

  /**
   * Group array data by column
   * @param myArray array data source
   * @param field field group
   */
  public static groupBy(myArray: Array<any>, field: string) {
  
    var group_to_values = myArray.reduce(function (obj, item) {

        if(!obj[item[field]])
          obj[item[field]] = [item];
        else
          obj[item[field]].push(item);

        return obj;
    }, {});
    
    return Object.keys(group_to_values)
    .map(key => {
      return { key, value: group_to_values[key]}
    });
  }

  /**
   * Remove key in object
   * @param {object} thisIsObject my object
   * @param {string} key key remove
   * @returns {boolean}
   */
  public static checkLengthObject(thisIsObject: object): boolean {
    return thisIsObject && Object.keys(thisIsObject).length > 0;
  }

  /**
   * Function check value null or empty
   * @param {any} value Value check null or empty
   * * @returns {boolean}
   */
  public static isNullOrEmpty(value: any): boolean {
    return !value;
  }

  public static checkDataAPIsResult(dataResult: any): boolean {
    return dataResult && dataResult.success && dataResult.payload;
  }

  public static parseInt(value: string): number {
    return +value;
  }

  /**
   * Func convert value from string to boolean
   * @param value value need convert
   * @param valueCompare value compare
   * @returns {boolean}
   */
  public static convertStringToBool(value: any, valueCompare: any): boolean {
    return value == valueCompare;
  }

  /**
   * Function show message by value and action
   * @param toastr library show message
   * @param value value get from store return
   * @param action inert || update || delete
   */
  public static showMessage(toastr: ToastrService, value: number, action: string): void {
    let message: string, success: boolean = false;
    
    switch (value) {
      case 0:
      case -1:
        message = action === Constants.ACTIONS.UPDATE 
                            ? Constants.NOTIFICATIONS.UPDATE_FAIL 
                            : action === Constants.ACTIONS.INSERT 
                            ? Constants.NOTIFICATIONS.SAVE_FAIL
                            : Constants.NOTIFICATIONS.DELETE_FAIL;
        break;

      default:
        success = true;
        message = action === Constants.ACTIONS.UPDATE 
                            ? Constants.NOTIFICATIONS.UPDATE_SUCCESS
                            : action === Constants.ACTIONS.INSERT 
                            ? Constants.NOTIFICATIONS.SAVE_SUCCESS
                            : Constants.NOTIFICATIONS.DELETE_SUCCESS;
        break;
    }

    if (success)
      toastr.success(message, action);
    else
      toastr.error(message, action);
  }
}