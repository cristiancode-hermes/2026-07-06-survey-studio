import { Routes } from '@angular/router';
import { SurveyListComponent } from './pages/survey-list/survey-list.component';
import { SurveyCreateComponent } from './pages/survey-create/survey-create.component';

export const routes: Routes = [
  { path: '', component: SurveyListComponent, pathMatch: 'full' },
  { path: 'create', component: SurveyCreateComponent },
  { path: '**', redirectTo: '' },
];
