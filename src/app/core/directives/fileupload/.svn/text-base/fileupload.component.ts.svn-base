import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { WebcamUtil, WebcamInitError, WebcamImage } from 'ngx-webcam';
import { FileService } from '../../services/file.service';
import { Document } from '../../models/index'
import { Globalconst } from '../../helpers/globalvariable';
import * as Cropper from 'cropperjs/dist/cropper';
import { environment } from '../../../../environments/environment';
import { AngularCropperjsComponent } from 'angular-cropperjs';

import { confirm } from 'devextreme/ui/dialog';

@Component({
    selector: 'app-fileupload',
    templateUrl: './fileupload.component.html',
    styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
    errors: Array<string> = [];
    files: File[] = [];
    files2: any = [];
    url: any;
    config: any = {};
    @ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
    dragAreaClass: string = 'dragarea';
    @Input() projectId: number;
    @Input() sectionId: number;
    @Input() fileExt: string = "JPG, GIF, PNG, PDF, DOC, DOCX, XLSX, XLS,JPEG,PPTX,PPT,MSG,TIF,TXT";
    @Input() maxFiles: number = 5;
    @Input() maxSize: number = 10; // 2MB
    @Input() isVatar: boolean = false;
    @Input() showThumbnail: boolean = false;
    @Output() uploadStatus = new EventEmitter();
    @Input() refNoType: string;
    @Input() refNoValue: string;
    @Input() autoSave: boolean = false;
    _userId: string;
    constructor(private fileService: FileService, public globals: Globalconst) { }

    ngOnInit() {
        this.config = {
            checkCrossOrigin: false,
            viewMode: 0,
            modal: true,
            guides: true,
            maxWidth: 3072,
            maxHeight: 3072,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
            autoCropArea:1
        };
    
    }
    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = (event: any) => {
                this.url = event.target.result;
                if (this.isVatar && this.angularCropper) {
                    this.angularCropper.imageUrl = this.url;
                    this.angularCropper.cropper.destroy();
                    this.angularCropper.cropper = new Cropper(this.url, this.config);
                }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        let files = event.target.files;
        this.getListFiles(files);
        if (this.autoSave)
            this.autoSaveFile();
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        this.dragAreaClass = "droparea";
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
    }
    @HostListener('drop', ['$event']) onDrop(event) {
        this.dragAreaClass = "dragarea";
        event.preventDefault();
        event.stopPropagation();
        var files = event.dataTransfer.files;
        this.getListFiles(files);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            var reader = new FileReader();

            reader.onload = (event: any) => {
                this.url = event.target.result;
            }

            reader.readAsDataURL(event.dataTransfer.files[0]);
        }
        if (this.autoSave)
            this.autoSaveFile();
    }
    getListFiles(files) {
        if (this.isVatar) {
            this.files = [];
            this.files.push(files[0]);
        }
        else {
            for (var j = 0; j < files.length; j++) {
                this.files.push(files[j]);
            }
        }
    }

    // saveFiles(files){
    //   this.errors = []; // Clear error
    //   // Validate file size and allowed extensions
    //   if (files.length > 0 && (!this.isValidFiles(files))) {
    //       this.uploadStatus.emit(false);
    //       return;
    //   }  

    //   if (files.length > 0) {
    //         let formData: FormData = new FormData();
    //         for (var j = 0; j < files.length; j++) {
    //             formData.append("file[]", files[j], files[j].name);
    //         }
    //         var parameters = {
    //             projectId: this.projectId,
    //             sectionId: this.sectionId
    //         }
    //         this.fileService.upload(formData, parameters)
    //             .subscribe(
    //             success => {
    //               this.uploadStatus.emit(true);
    //               console.log(success)
    //             },
    //             error => {
    //                 this.uploadStatus.emit(true);
    //                 this.errors.push(error.ExceptionMessage);
    //             }) 
    //     } 
    // }


    public isValidFiles() {
        // Check Number of files
        this.errors = [];
        if (this.files.length > this.maxFiles) {
            this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
            return;
        }
        this.isValidFileExtension(this.files);
        return this.errors.length === 0;
    }

    private isValidFileExtension(files) {
        // Make array of file extensions

        var extensions = (this.fileExt.split(','))
            .map(function (x) { return x.toLocaleUpperCase().trim() });

        for (var i = 0; i < files.length; i++) {
            // Get file extension
            var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
            // Check the extension exists
            var exists = extensions.includes(ext);
            if (!exists) {
                this.errors.push("Error (Extension): " + files[i].name);
            }
            // Check file size
            this.isValidFileSize(files[i]);
        }
    }

    private isValidFileSize(file) {
        var fileSizeinMB = file.size / (1024 * 1000);
        var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
        if (size > this.maxSize)
            this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
    }
    SaveAvatar() {
        let formData: FormData = new FormData();
        formData.append('docRefType', this.refNoType);
        formData.append('refNoType', this.refNoType);
        formData.append('refNoValue', this.refNoValue);
        formData.append('createUser', this._userId);
        formData.append('userId', this._userId);

        var blob = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
        formData.append('files', this.fileService.dataURLtoFile(blob, "avatar.jpg"), "avatar.jpg");
       
        if (this.isVatar) {
            return this.fileService.createAvatar(formData).map((response: Response) => response)
        }
    }
    SaveAvatarForStaff(staffid) {
        let formData: FormData = new FormData();
        formData.append('docRefType', this.refNoType);
        formData.append('refNoType', this.refNoType);
        formData.append('refNoValue', this.refNoValue);
        formData.append('createUser', this._userId);
        formData.append('userId', staffid);

        var blob = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
        formData.append('files', this.fileService.dataURLtoFile(blob, "avatar.jpg"), "avatar.jpg");
       
        if (this.isVatar) {
            return this.fileService.createAvatarForStaff(formData).map((response: Response) => response)
        }
    }
    SaveImage(id, title)
    {
        var blob = this.angularCropper.cropper.getCroppedCanvas({
            maxWidth: 3072,
            maxHeight: 3072,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
          }).toDataURL();
        let formData: FormData = new FormData();
        formData.append('docRefType', "0");
        formData.append('refNoType', "0");
        formData.append('refNoValue',"0");
        formData.append('createUser', "1");
        formData.append('userId', id);
        formData.append('files', this.fileService.dataURLtoFile(blob, title + this.files[0].name), title + '.jpg');
        return this.fileService.saveImage(formData)
    }

    SaveFile() {
        let formData: FormData = new FormData();
        formData.append('docRefType', this.refNoType);
        formData.append('refNoType', this.refNoType);
        formData.append('refNoValue', this.refNoValue);
        formData.append('createUser', this._userId);
        formData.append('userId', this._userId);

        if (this.isVatar) {
            // var blob = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
            // formData.append('files',this.fileService.dataURLtoFile(blob,"avatar.jpg"),"avatar.jpg");
            // if (doc.IDR == "GAL") {
            //     return this.fileService.creategallery(formData).map((response: Response) => response);
            // }
            // else {
            //     return this.fileService.create(formData).map((response: Response) => response);
            // }

        }
        else {
            for (let file of this.files) {
                if (file) {
                    formData.append("files", file, file.name);
                };
            }
            if (this.refNoType == "GAL") {
                return this.fileService.creategallery(formData).map((response: Response) => response);
            }
            else {
                return this.fileService.create(formData).map((response: Response) => response).subscribe(
                    data => {
                        if (data["success"]) {
                            this.loadFiles();
                            this.files = [];
                        }
                    }
                );
            }
        }
    }
    autoSaveFile() {
        if (this.isValidFiles) {
            var reader = new FileReader();
            let formData: FormData = new FormData();
            for (let file of this.files) {
                if (file) {
                    formData.append("files", file, file.name);
                };
            }

            formData.append('docRefType', this.refNoType);
            formData.append('refNoType', this.refNoType);
            formData.append('refNoValue', this.refNoValue);
            formData.append('createUser', this._userId);
            return this.fileService.create(formData).map((response: Response) => response).subscribe(
                data => {
                    if (data["success"]) {

                        let filenew: any = {};
                        filenew.dFileName = this.files[0].name;
                        filenew.docNo = data["payload"][0].docNo;
                        filenew.refNoType = this.refNoType;
                        filenew.docRefType = this.refNoType;
                        filenew.refNoValue = this.refNoValue;
                        filenew.filePath = data["payload"][0].filePath;
                        this.files2.push(filenew);
                        this.files = [];
                    }
                }
            );
        }
    }
    ReturnNameFile() {
        let rs = [];
        var reader = new FileReader();
        let formData: FormData = new FormData();
        for (let file of this.files) {
            if (file) {
                rs.push(file.name)
            };
        }
        return rs;
    }
    private deleteFile(file) {
        const index: number = this.files.indexOf(file);
        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }
    private deleteFileOnserver(file) {
        
        var result = confirm("Are you sure delete this row?", 'Confirm delete');
        result.done((dialogResult:any)=>{
            if (dialogResult) {
                file.userId = this.globals._userinfo.employeeId;
                this.fileService.delete(file).subscribe(
                    data => {
                        if (data['payload'] > 0) {
                            const index: number = this.files2.indexOf(file);
                            if (index !== -1) {
                                this.files2.splice(index, 1);
                            }
                        }
                    },
                    error => {

                    }
                );
            }
        })
        
    }
    downloadFile(docNo) {
        
        return this.fileService.downloadFile(docNo);
    }
    downloadFile1(docNo)
    {
        this.fileService.downloadFile1(docNo).subscribe(
            data => {
                this.fileService.downloadExcel(data['payload'].filestream, data['payload'].dsGetDocumentResult.dFileName);
            }
        );
        
    }
    setFile(file) {
        this.files2 = file;
        this.files = [];
    }

    getFile(refNovalue: string, refNoType: string) {
        this.fileService.getList(refNoType, refNovalue).subscribe(
            data => {
                this.files2 = data['payload'];
            }
        );
    }

    loadFiles() {
        this.fileService.getList(this.refNoType, this.refNoValue).subscribe(
            data => {
                this.files2 = data['payload'];
            }
        );
    }
    canDelete(file) {
        if (file.createUser)
            return this.globals._userinfo.employeeId == file.createUser;
        else
            return true;
    }
    getImage(model)
    {
        this.fileService.getImage(model).subscribe(
            data=>{
                if (data["success"] == true) {
                    this.url =data["payload"];
                }
              
            }
        )
    }
    getFile2() {
        this.fileService.getList(this.refNoType, this.refNoValue).subscribe(
            data => {
                this.files2 = data['payload'];
            }
        );
    }
}