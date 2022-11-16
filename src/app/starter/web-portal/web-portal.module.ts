import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebPortalRoutingModule } from './web-portal-routing.module';
import { WPArticlesComponent } from './wp-articles/wp-articles.component';
import { DxDateBoxModule, DxDataGridModule, DxSelectBoxModule, DxValidatorModule, DxTextAreaModule, DxHtmlEditorModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WpArticleDetailComponent } from './wp-articles/wp-article-detail/wp-article-detail.component';
import { TinyEditorModule } from '../../core/directives/tiny-editor/tiny-editor.module';
import { FileuploadModule } from '../../core/directives/fileupload/fileupload.module';

@NgModule({
  imports: [
    CommonModule,
    WebPortalRoutingModule,
    DxDateBoxModule,
    DxDataGridModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxTextAreaModule,
    TinyEditorModule,
    FormsModule,
    HttpModule,
    FileuploadModule
  ],
  declarations: [WPArticlesComponent, WpArticleDetailComponent]
})
export class WebPortalModule { }
