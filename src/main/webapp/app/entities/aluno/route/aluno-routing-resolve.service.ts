import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAluno, Aluno } from '../aluno.model';
import { AlunoService } from '../service/aluno.service';

@Injectable({ providedIn: 'root' })
export class AlunoRoutingResolveService implements Resolve<IAluno> {
  constructor(protected service: AlunoService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAluno> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((aluno: HttpResponse<Aluno>) => {
          if (aluno.body) {
            return of(aluno.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Aluno());
  }
}
