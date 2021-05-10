import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITurma } from '../turma.model';
import { TurmaService } from '../service/turma.service';

@Component({
  templateUrl: './turma-delete-dialog.component.html',
})
export class TurmaDeleteDialogComponent {
  turma?: ITurma;

  constructor(protected turmaService: TurmaService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.turmaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
