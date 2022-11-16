import { Component } from '@angular/core';
import { WebPortalService } from '../../../core/services/web-portal/web-portal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../core/directives/base.component';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../core/services/common.service';
import { TitleHeaderPageService } from '../../../core/services/title-header-page.service';
import { CacheService } from '../../../core/services/cache.service';

declare var AdminLTE: any;

@Component({
  selector: 'app-wp-articles',
  templateUrl: './wp-articles.component.html',
  styleUrls: ['./wp-articles.component.css']
})
export class WPArticlesComponent extends BaseComponent {
  dataSource: any = [];
  languageList: any = [];
  focusIndex: any;
  searchModel: any = {};
  type: any;
  titleHeader: string = '';

  constructor(private webportalSvc: WebPortalService,
    public toastr: ToastrService,
    private route: ActivatedRoute,
    private commonsv: CommonService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService,
    public router: Router) {
    super(router);
  }

  ngOnInit() {
    AdminLTE.init();
    this.searchModel.title = '';
    this.searchModel.language = '';
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("WebPortal");
    this.getStdCodesCache();
    this.route.params.subscribe(
      async params => {
        this.type = params.type;
        this.searchModel.type = params.type;
        this.search();
      }
    );
  }

  search() {
    this.webportalSvc.searchArticles(this.searchModel).subscribe(
      data => {
        this.dataSource = data['payload'];
      }
    );
  }

  deleteArticle(event) {
    const model: any  = {};
    model.id = event.data.id;
    this.webportalSvc.deleteArticle(model).subscribe(
      data => {
        if (data['payload'] > 0) {
          this.toastr.success('Delete Article Sucessfull', 'Delete');
        }
      }, errror => {
        this.toastr.error('Delete Article Failed', 'Delete');
      }
    );
  }

  goDetail(id) {
    this.router.navigate(['admin/webportal/' + this.type + '/' + id]);
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.languageList = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'LANGUAGE';
          });
        }
    });
  }
}
