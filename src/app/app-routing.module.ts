import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdventureViewComponent } from './adventure-view/adventure-view.component';
import { SearchResultsComponent } from './search-results/search-results.component'
import { AdventureAddComponent } from './adventure-add/adventure-add.component';
import { AuthGuardService } from './utils/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: "full" },
  { path: 'adventure/:id', component: AdventureViewComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'add/:id', component: AdventureAddComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }