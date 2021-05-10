import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'aluno',
        data: { pageTitle: 'alunowebApp.aluno.home.title' },
        loadChildren: () => import('./aluno/aluno.module').then(m => m.AlunoModule),
      },
      {
        path: 'curso',
        data: { pageTitle: 'alunowebApp.curso.home.title' },
        loadChildren: () => import('./curso/curso.module').then(m => m.CursoModule),
      },
      {
        path: 'turma',
        data: { pageTitle: 'alunowebApp.turma.home.title' },
        loadChildren: () => import('./turma/turma.module').then(m => m.TurmaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
