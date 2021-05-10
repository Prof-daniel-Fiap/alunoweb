import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AlunoComponent } from '../list/aluno.component';
import { AlunoDetailComponent } from '../detail/aluno-detail.component';
import { AlunoUpdateComponent } from '../update/aluno-update.component';
import { AlunoRoutingResolveService } from './aluno-routing-resolve.service';

const alunoRoute: Routes = [
  {
    path: '',
    component: AlunoComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AlunoDetailComponent,
    resolve: {
      aluno: AlunoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AlunoUpdateComponent,
    resolve: {
      aluno: AlunoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AlunoUpdateComponent,
    resolve: {
      aluno: AlunoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alunoRoute)],
  exports: [RouterModule],
})
export class AlunoRoutingModule {}
