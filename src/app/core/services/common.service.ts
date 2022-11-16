import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { WindowRef } from '../helpers/windowRef'
import { ApplicationHttpClient } from './_base/http-client';
import * as moment from 'moment';
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from '@angular/router';
import { StdCodeDTO } from '../models/common/stdcodeDTO';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CommonService {

    static StdCodeGetCombobox(): any {
        throw new Error("Method not implemented.");
    }

    urlAPI: string;
    urlAPICommonEnterprise: string;
    
    constructor(
        private http: ApplicationHttpClient,
        private window: WindowRef,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.urlAPI = http._urlAPI + "/api/ssocommonservice";
        this.urlAPICommonEnterprise = http._urlAPIEnterpriseCommon + "/common";
        
    }

    getCountries() {
        return this.http.Get(this.urlAPICommonEnterprise + '/getcountries').map((response: Response) => response);
    }

    getStdcodesByCode(id: string) {
        return this.http
        .Get(this.urlAPICommonEnterprise + '/getstdcodes/' + id)
        .map((response: Response) => response);
    }
    
    getSubsidiaries() {
        return this.http.Get(this.urlAPI + '/subsidiaries').map((response: Response) => response);
    }
    getApplications() {
        return this.http.Get(this.urlAPI + '/applications').map((response: Response) => response);
    }

    getDepartments() {
        return this.http.Get(this.urlAPI + '/departments').map((response: Response) => response);
    }

    getDivisions() {
        return this.http.Get(this.urlAPI + '/divisions').map((response: Response) => response);
    }
    getSubDepts(subSidiaryId: string) {
        return this.http.Get(this.urlAPI + '/SubDepts/' + subSidiaryId).map((response: Response) => response);
    }

    getResourceByEmpId(lan: string) {
        return this.http.Get(this.urlAPICommonEnterprise + '/languages/' + lan).map((response: Response) => response);
    }
    gallerys_save(model: any) {
        return this.http.Post(this.urlAPI + '/gallerys_save/', model).map((response: Response) => response);
    }
    gallerys_get(model: any) {
        return this.http.Post(this.urlAPI + '/gallerys_get', model).map((response: Response) => response);
    }


    getDepartmentsBydivisionCode(subsidiaryId: string, divisionCode: string) {
        return this.http.Get(this.urlAPI + '/departmentsbydivisioncode/subsidiaryid/' + subsidiaryId + "/divisioncode/" + divisionCode).map((response: Response) => response);
    }

    getFacilities(subsidiaryId: string) {
        return this.http.Get(this.urlAPI + '/facilities/subsidiaryid/' + subsidiaryId).map((response: Response) => response);
    }
    async getFacilitiesAsyncData(subsidiaryId: string) {
        return await this.searchFacilities(subsidiaryId).toPromise<{}>();
    }
    searchFacilities(subsidiaryId: string) {
        return this.http.Get(this.urlAPI + '/facilities/subsidiaryid/' + subsidiaryId);
    }
    getPendingRequest(subsidiaryId: string, userId: string) {
        return this.http.Get(this.urlAPI + '/requestservice/pendding/' + subsidiaryId + "/" + userId).map((response: Response) => response);
    }
    getOrgChart(subsidiaryId: any) {
        return this.http.Get(this.http._urlAPI + '/orgchartservice/orgchart/' + subsidiaryId).map((response: Response) => response);
    }
    getIPLocal() {
        return this.http.Get("https://api.ipify.org?format=json").map(
            (response: Response) => response);
    }

    getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
        //compatibility for firefox and chrome

        var window = this.window.nativeWindow;
        var ip = window.location.origin
        var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        var pc = new myPeerConnection({
            iceServers: []
        }),
            noop = function () { },
            localIPs = {},
            ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
            key;

        function iterateIP(ip) {
            if (!localIPs[ip]) onNewIP(ip);
            localIPs[ip] = true;
        }

        //create a bogus data channel
        pc.createDataChannel("");

        // create offer and set local description
        pc.createOffer(function (sdp) {
            sdp.sdp.split('\n').forEach(function (line) {
                if (line.indexOf('candidate') < 0) return;
                line.match(ipRegex).forEach(iterateIP);
            });

            pc.setLocalDescription(sdp, noop, noop);
        }, noop);

        //listen for candidate events
        pc.onicecandidate = function (ice) {
            if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
    }
    convertMilisecondToUTCDateTime(params: any, format = "DD/MM/YYYY hh:mm A") {
        if (params instanceof Date) {

             return moment(params).format(format);
        }
        else
        {
            if (params != "" && params != " " && params != undefined) {
                var tempDate = new Date(params);
                let dateTime = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate(), tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds());
                return moment(dateTime).format(format);
            }
            else {
                return "";
            }
        }
        
    }
    static convertDateTimeForModel(params: any) {
        if (params != "" && params != " " && params != undefined) {
            var rs = new Date(params);
            return rs
        }
        else {
            return null;
        }
    }
    convertMilisecondToUTCDate(params: any, format = "DD/MM/YYYY") {

        if (params.trim() != "") {
            var tempDate = new Date(params);
            let dateTime = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate() + 1);
            return moment(dateTime).format(format);
        }
        else {
            return params;
        }
    }
    convertMilisecondToUTCDate2(params: any, format = "DD/MM/YYYY") {

        if (params != null) {
            var tempDate = moment(Number.parseInt(params)).toDate();
            let dateTime = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
            return moment(dateTime).format(format);
        }
        else {
            return params;
        }
    }
    IsAdmin() {

        var currentuser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentuser.roleId == "5A6869E0-1C3D-11E8-ACCF-0ED5F89F718B") {
            return true;
        }
        else {
            return false;
        }

    }
    StdCode_CodeTypes() {
        return this.http.Get(this.http._urlAPIEnterpriseCommon + '/stdcodeservice/stdcode/stdcodegetcombobox').map((response: Response) => response);

    }

    urlback(url: string) {
        this.route.queryParams.subscribe(params => {
            this.router.navigate([url], { queryParams: params })
            params = [];
        });

    }
    urlnext(url: string, modelpara: any) {
        this.router.navigate([url], { queryParams: modelpara })
    }
    getDate(datestring: Date) {
        var date = datestring,
            year = date.getFullYear(),
            month = (date.getMonth() + 1).toString(),
            formatedMonth = (month.length === 1) ? ("0" + month) : month,
            day = date.getDate().toString(),
            formatedDay = (day.length === 1) ? ("0" + day) : day,
            hour = (date.getHours() - 7).toString(),
            formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
            minute = date.getMinutes().toString(),
            formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
            second = date.getSeconds().toString(),
            formatedSecond = (second.length === 1) ? ("0" + second) : second;
        return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':'+ formatedSecond;
    };

    getpendingapproval(userId: any) {
        return this.http.Get(this.urlAPI + '/pendingapproval/' + userId).map((response: Response) => response);
    }
    getcurrentdate(stringformat: string) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        var rs = "";
        if (stringformat == "YYYYMMDD") {
            rs = yyyy + '/' + mm + '/' + dd;
        }
        else if (stringformat == "DDMMYYYY") {
            rs = dd + '/' + mm + '/' + yyyy;
        }
        return rs;

    }
    resetPassword(model: any) {
        return this.http.Post(this.urlAPI + '/resetpass', model).map((response: Response) => response);
    }
    confirmResetPassword(model: any) {
        return this.http.Post(this.urlAPI + '/confirmresetpass', model).map((response: Response) => response);
    }
    GetGalleryByID(id: number) {
        return this.http.Get(this.urlAPI + '/getgallerybyid/' + id).map((response: Response) => response);
    }
    convertDateTime(localtime) {
        
        if (localtime == null) {
            return null;
        }
        return moment(localtime).format('DD/MM/YYYY HH:mm');
    }
    convertDate(localtime) {

        if (localtime == null) {
            return null;
        }

        return moment(localtime).format('DD/MM/YYYY');
    }
    convertTime(localtime) {

        if (localtime == null) {
            return null;
        }
        localtime = localtime - 7 * 3600 * 1000;
        return moment(localtime).format('HH:mm');
    }
    getDepartmentadmin() {
        return this.http.Get(this.urlAPI + '/getdepartmentadmin').map((response: Response) => response);
    }
    saveDepartmentadmin(model: any) {
        return this.http.Post(this.urlAPI + '/savedepartment', model).map((response: Response) => response);
    }
    getDivision() {
        return this.http.Get(this.urlAPI + '/getdivision').map((response: Response) => response);
    }
    saveDivision(model: any) {
        return this.http.Post(this.urlAPI + '/savedivision', model).map((response: Response) => response);
    }
    GetItemsPurchaseRequest() {
        return this.http.Get(this.http._urlAPI + '/svritems').map((response: Response) => response);
    }
    addObjectEmpty(listStdCode: StdCodeDTO[]) {
        let listStdcodeEmpty = {
            "codeGroup": "",
            "code": "",
            "codeDesc": "All",
            "isUse": true,
            "tid": null,
            "seqNo": null,
            "codeVariant": null
        }
        listStdCode.unshift(listStdcodeEmpty);
        return listStdCode;
    }
    searchAutoComplete(keyword)
    {
        const header = new HttpHeaders();
        header.set('content-type', 'application/json');
        header.set('Access-Control-Allow-Origin', '*');
       var url:string = "https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyATn6vlbVbT3M19fYi-UhXshg1ZLXUM6Uk&language=vi&region=VN&query="+ keyword;
       return this.http.Get(url).map((response :Response)=> response);
    }
    getFileName(name){
        return name + '_' + this.getDate(new Date());
    }
    groupbyArray(collection:  Array<any>, property: string): Array<any> {
        // prevents the application from breaking if the array of objects doesn't exist yet
        if(!collection ||!Object.keys(collection).length) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current)=> {
            if(!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }

            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }
    convertUTCtoLocalTime(params:any)
    {
        var localtime =  params -0;
        var date :any=  moment(localtime).format('DD/MM/YYYY hh:mm A');
        return date;
        // if (params != "" && params != " " && params != undefined) {
        //     var tempDate = new Date(params);
        //     let dateTime = new Date(tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate(), tempDate.getUTCHours(), tempDate.getUTCMinutes(), tempDate.getUTCSeconds());
        //     return moment(dateTime).format(format);
        // }
        // else {
        //     return "";
        // }
    }
}