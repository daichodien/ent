import {  Component, AfterViewInit,EventEmitter,OnDestroy, Input, Output } from '@angular/core';
import { FileService } from '../../services';
import { Globalconst } from '../../helpers/globalvariable';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styleUrls: ['./tiny-editor.component.css']
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  @Input() tmHeight: number = 150;
  @Output() onEditorKeyup = new EventEmitter<any>();
  @Input() tinymceModel:any;
  @Output() tinymceModelChange = new EventEmitter();
  @Input() resetTinymce:boolean=false;
  @Input() refNovalue:string;
  @Input() refNoType:string;
  
  editor;
  constructor(public fileSvr: FileService,public globals: Globalconst) { 
  }

  ngAfterViewInit() {
    let that = this;
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'media', 'image', 'code'],
      skin_url:location.origin+'/assets/skins/lightgray',
      height : this.tmHeight,
      toolbar_items_size : 'small',
      relative_urls : false,
      remove_script_host : false,
      convert_urls : true,
      //images_upload_url:environment.urlEnterpriseService + '/document/upload',
      images_upload_handler: function (blobInfo, success, failure) {
        let formData: FormData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            formData.append('docRefType', that.refNoType||'ART');
            formData.append('refNoType', that.refNoType||'ART');
            formData.append('refNoValue', that.refNovalue||'88');
            formData.append('createUser', that.globals._userinfo.employeeId);
            return that.fileSvr.create(formData).map((response: Response) => response).subscribe(
                data => {
                    if (data["success"]) {
                        success(data["payload"][0].filePath);
                    }
                }
            );
      },
      toolbar: ['bold, italic, paste, numlist bullist, link, table, image, media, alignleft, aligncenter, alignright, forecolor, backcolor,code'],
      //toolbar: "media",
      color_cols: "5",
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
          this.tinymceModelChange.emit(content);
        });
      },
    });

    if(this.tinymceModel){
      debugger;
      this.editor.setContent(this.tinymceModel || '');
    }
      
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  ngOnChanges(changes: any) {
    if(changes.resetTinymce && changes.resetTinymce.currentValue){
      if(this.resetTinymce ) this.editor.setContent('');
    }
  }

  resetContent(){
    this.editor.setContent('');
  }
}
