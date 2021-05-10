import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TurmaComponent } from './list/turma.component';
import { TurmaDetailComponent } from './detail/turma-detail.component';
import { TurmaUpdateComponent } from './update/turma-update.component';
import { TurmaDeleteDialogComponent } from './delete/turma-delete-dialog.component';
import { TurmaRoutingModule } from './route/turma-routing.module';

@NgModule({
  imports: [SharedModule, TurmaRoutingModule],
  declarations: [TurmaComponent, TurmaDetailComponent, TurmaUpdateComponent, TurmaDeleteDialogComponent],
  entryComponents: [TurmaDeleteDialogComponent],
})
export class TurmaModule {}
