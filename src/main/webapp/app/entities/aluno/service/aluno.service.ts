import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAluno, getAlunoIdentifier } from '../aluno.model';

export type EntityResponseType = HttpResponse<IAluno>;
export type EntityArrayResponseType = HttpResponse<IAluno[]>;

@Injectable({ providedIn: 'root' })
export class AlunoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/alunos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(aluno: IAluno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aluno);
    return this.http
      .post<IAluno>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(aluno: IAluno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aluno);
    return this.http
      .put<IAluno>(`${this.resourceUrl}/${getAlunoIdentifier(aluno) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(aluno: IAluno): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(aluno);
    return this.http
      .patch<IAluno>(`${this.resourceUrl}/${getAlunoIdentifier(aluno) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAluno>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAluno[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addAlunoToCollectionIfMissing(alunoCollection: IAluno[], ...alunosToCheck: (IAluno | null | undefined)[]): IAluno[] {
    const alunos: IAluno[] = alunosToCheck.filter(isPresent);
    if (alunos.length > 0) {
      const alunoCollectionIdentifiers = alunoCollection.map(alunoItem => getAlunoIdentifier(alunoItem)!);
      const alunosToAdd = alunos.filter(alunoItem => {
        const alunoIdentifier = getAlunoIdentifier(alunoItem);
        if (alunoIdentifier == null || alunoCollectionIdentifiers.includes(alunoIdentifier)) {
          return false;
        }
        alunoCollectionIdentifiers.push(alunoIdentifier);
        return true;
      });
      return [...alunosToAdd, ...alunoCollection];
    }
    return alunoCollection;
  }

  protected convertDateFromClient(aluno: IAluno): IAluno {
    return Object.assign({}, aluno, {
      dataNascimento: aluno.dataNascimento?.isValid() ? aluno.dataNascimento.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataNascimento = res.body.dataNascimento ? dayjs(res.body.dataNascimento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((aluno: IAluno) => {
        aluno.dataNascimento = aluno.dataNascimento ? dayjs(aluno.dataNascimento) : undefined;
      });
    }
    return res;
  }
}
