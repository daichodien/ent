import { Injectable } from '@angular/core';
import { WindowRef } from '../helpers/windowRef'
import { Observable } from 'rxjs';
import { ApplicationHttpClient } from './_base/http-client';
import { environment } from '../../../environments/environment';
@Injectable()
export class FileService {
    urlAPI:string;
    constructor(private http: ApplicationHttpClient,
        private winRef: WindowRef) {
            this.urlAPI = http._urlAPIEnterpriseCommon+"/document";
         }

    getById(id: number) {
        return this.http.Get(this.urlAPI + '/downloaddocument/?DocNo=' + id);
    }

    getByRefNoValue(id: string) {
        return this.http.Get(this.urlAPI + '/documents/refnovalue/' + id).map((response: Response) => response);
    }
    getList(refNoType: string, refNoValue: string) {
        return this.http.Post(this.urlAPI + '/getdocuments',{refNoValue:refNoValue,docRefType:refNoType,fileName:''}).map((response: Response) => response);
    }

    
    getImage(documentInfoModel:any)
    {
        return this.http.Post(this.urlAPI + '/getImage/',documentInfoModel).map((response: Response) => response);
    }

    create(document: FormData) {
        return this.http.Post(this.urlAPI + '/savedocument', document).map((response: Response) => response);
    }
    createAvatar(document: FormData) {
        var urlAPI:string  = this.http._urlAuthenticationService+"api/userprofile"
        return this.http.Post(urlAPI + '/saveavatar', document).map((response: Response) => response);
    }
    createAvatarForStaff(document: FormData) {
        var urlAPI:string  = this.http._urlAPIEnterprise+"/staff"
        return this.http.Post(urlAPI + '/saveavatarfordriver', document).map((response: Response) => response);
    }

    saveImage(document: FormData) 
    {
        return this.http.Post(this.urlAPI + '/saveimage',document).map((res:Response)=> res);
    }

    getAvatar(documentInfoModel:any)
    {
        var urlAPI:string  = this.http._urlAuthenticationService+"api/userprofile";
        return this.http.Post(urlAPI + '/getavatar/',documentInfoModel).map((response: Response) => response);
    }
    creategallery(document: FormData)
    {
        return this.http.Post(this.urlAPI + '/document/gallery', document).map((response: Response) => response);
    }

    delete(model:any) 
    {
        return this.http.Post(this.urlAPI + '/deletedocument',model).map((response: Response) => response);
    }

    upload(url: string, file: File) {
        const formData: FormData = new FormData();
        if (file) {
            formData.append('files', file, file.name);
        }

        return this.http.Post(url, formData);
    }
    downloadFile(docNo) {
        var url= this.urlAPI + '/downloaddocument?DocNo=' + docNo.docNo+'&refNoValue='+docNo.refNoValue+'&docRefType='+docNo.docRefType;
        return url
    }
    downloadFile1(docNo) {
        return this.http.Get(this.urlAPI + '/downloaddocument?DocNo=' + docNo.docNo+'&refNoValue='+docNo.refNoValue+'&docRefType='+docNo.docRefType).map((response: Response) => response);
    }

    downloadExcel(binary: any, filename: string) {
        var a = document.createElement("a");
        document.body.appendChild(a);
        var blob = this.b64toBlob(binary, "application/vnd.open", 512)
        var url = (this.winRef.nativeWindow.URL || this.winRef.nativeWindow.nativeWindow.webkitURL).createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        //this.winRef.nativeWindow.revokeObjectURL(url);
    }
    public dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    public b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    GetGalleryByType(type:string)
    {
        return this.http.Get(this.urlAPI +  '/document/gallerys/' + type).map((response:Response)=>response);
    }
    GetDocumentWorkflow(model:any)
    {
        return this.http.Post(this.urlAPI +  '/document/getdocumentworkflow',model).map((response:Response)=> response);
    }
}