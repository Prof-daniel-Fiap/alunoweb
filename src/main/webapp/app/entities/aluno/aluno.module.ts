import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { AlunoComponent } from './list/aluno.component';
import { AlunoDetailComponent } from './detail/aluno-detail.component';
import { AlunoUpdateComponent } from './update/aluno-update.component';
import { AlunoDeleteDialogComponent } from './delete/aluno-delete-dialog.component';
import { AlunoRoutingModule } from './route/aluno-routing.module';

@NgModule({
  imports: [SharedModule, AlunoRoutingModule],
  declarations: [AlunoComponent, AlunoDetailComponent, AlunoUpdateComponent, AlunoDeleteDialogComponent],
  entryComponents: [AlunoDeleteDialogComponent],
})
export class AlunoModule {}
