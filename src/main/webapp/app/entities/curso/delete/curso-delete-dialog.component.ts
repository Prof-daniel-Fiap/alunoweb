import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICurso } from '../curso.model';
import { CursoService } from '../service/curso.service';

@Component({
  templateUrl: './curso-delete-dialog.component.html',
})
export class CursoDeleteDialogComponent {
  curso?: ICurso;

  constructor(protected cursoService: CursoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cursoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
