import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAluno } from '../aluno.model';
import { AlunoService } from '../service/aluno.service';

@Component({
  templateUrl: './aluno-delete-dialog.component.html',
})
export class AlunoDeleteDialogComponent {
  aluno?: IAluno;

  constructor(protected alunoService: AlunoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.alunoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
