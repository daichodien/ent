import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WPArticlesComponent } from './wp-articles/wp-articles.component';
import { WpArticleDetailComponent } from './wp-articles/wp-article-detail/wp-article-detail.component';

const routes: Routes = [
  {
    path: ':type',
    component: WPArticlesComponent
  },
  {
    path: ':type/:id',
    component: WpArticleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebPortalRoutingModule { }
