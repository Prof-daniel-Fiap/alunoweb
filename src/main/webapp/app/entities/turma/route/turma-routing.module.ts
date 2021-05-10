import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TurmaComponent } from '../list/turma.component';
import { TurmaDetailComponent } from '../detail/turma-detail.component';
import { TurmaUpdateComponent } from '../update/turma-update.component';
import { TurmaRoutingResolveService } from './turma-routing-resolve.service';

const turmaRoute: Routes = [
  {
    path: '',
    component: TurmaComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TurmaDetailComponent,
    resolve: {
      turma: TurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TurmaUpdateComponent,
    resolve: {
      turma: TurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TurmaUpdateComponent,
    resolve: {
      turma: TurmaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(turmaRoute)],
  exports: [RouterModule],
})
export class TurmaRoutingModule {}
