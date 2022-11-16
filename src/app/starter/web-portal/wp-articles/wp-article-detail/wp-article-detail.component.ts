import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileuploadComponent } from '../../../../core/directives/fileupload/fileupload.component';
import { WebPortalService } from '../../../../core/services/web-portal/web-portal.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../../core/directives/base.component';
import { TinyEditorComponent } from '../../../../core/directives';
import { REFDOCTYPE } from '../../../../core/helpers';
import { CommonService } from '../../../../core/services/common.service';
import { CacheService } from '../../../../core/services/cache.service';

declare function escape(s: string): string;
declare function unescape(s: string): string;

declare var AdminLTE: any;

@Component({
  selector: 'app-wp-article-detail',
  templateUrl: './wp-article-detail.component.html',
  styleUrls: ['./wp-article-detail.component.css']
})
export class WpArticleDetailComponent extends BaseComponent {
  @ViewChild('uploadfile') public fileUpload: FileuploadComponent;
  @ViewChild(TinyEditorComponent)
  private myEditor: TinyEditorComponent;
  languages: any = [];
  article: any = {};
  categories: any = [ 
  {
    code: 'ENT-MOM',
    codeDesc: 'Enterprise moment'
  }];
  articleId: any;
  type: any={};

  constructor(public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    private webportalSvc: WebPortalService,
    private cacheService: CacheService,
    public _commonService:CommonService) {
    super(router);
    this.articleId = this.route.params["_value"].id;
    this.type = this.route.params["_value"].type;
    this.getCommontData();
  }

  ngOnInit() {
    AdminLTE.init();
    this.fileUpload.refNoType = REFDOCTYPE.Article;
    this.fileUpload._userId = this.currentuser.employeeId;

    this.route.params.subscribe(
      async params => {
        try {
          this.articleId = params['id'];
          if (this.articleId != 0) {
            this.fileUpload.autoSave = true;
            this.getArticleById(this.articleId);
            this.fileUpload.refNoValue = this.articleId;
            this.fileUpload.loadFiles();
          }
          else {
            this.fileUpload.autoSave = false;
          }
        } catch (e) {
        }
      }
    )
  }

  async getArticleById(id) {
    await this.webportalSvc.getArticle(id).subscribe(
      data => {
        this.article = data['payload'];
        //this.article.details = escape(this.article.details);
        this.myEditor.editor.setContent(this.article.details);
      }
    )
  }

  save() {
    if (this.articleId != 0)
      this.updateArticle();
    else
      this.insertArticle();
  }

  insertArticle() {
    let details2: string = this.article.details;
    this.article.details = escape(details2);
    this.article.type = this.type;

    this.webportalSvc.saveArticle(this.article).subscribe(
      data => {
        this.toastr.success("Insert Article Sucessfull", "Insert")
        this.router.navigate(['admin/webportal/' + this.type + '/' + data['payload']]);

      }
    );

  }
  updateArticle() {
    let details2: string = this.article.details;
    //this.article.details = escape(details2);
    //this.article.details = escape(details2);
    this.article.type = this.type;
    this.webportalSvc.updateArticle(this.article).subscribe(
      data => {
        this.toastr.success("Update Article Sucessfull", "Update")
      }
    );
  }

  back() {
    this.router.navigate(['admin/webportal/' + this.type]);
  }

  keyupHandlerFunction(event) {
    this.article.details = event;
  }
  getCommontData() {
    this.getStdCodesCache();
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.languages = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'LANGUAGE';
          });
        }
    });
  }
}
