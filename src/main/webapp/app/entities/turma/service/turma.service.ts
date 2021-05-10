import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITurma, getTurmaIdentifier } from '../turma.model';

export type EntityResponseType = HttpResponse<ITurma>;
export type EntityArrayResponseType = HttpResponse<ITurma[]>;

@Injectable({ providedIn: 'root' })
export class TurmaService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/turmas');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .post<ITurma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .put<ITurma>(`${this.resourceUrl}/${getTurmaIdentifier(turma) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .patch<ITurma>(`${this.resourceUrl}/${getTurmaIdentifier(turma) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurma>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurma[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTurmaToCollectionIfMissing(turmaCollection: ITurma[], ...turmasToCheck: (ITurma | null | undefined)[]): ITurma[] {
    const turmas: ITurma[] = turmasToCheck.filter(isPresent);
    if (turmas.length > 0) {
      const turmaCollectionIdentifiers = turmaCollection.map(turmaItem => getTurmaIdentifier(turmaItem)!);
      const turmasToAdd = turmas.filter(turmaItem => {
        const turmaIdentifier = getTurmaIdentifier(turmaItem);
        if (turmaIdentifier == null || turmaCollectionIdentifiers.includes(turmaIdentifier)) {
          return false;
        }
        turmaCollectionIdentifiers.push(turmaIdentifier);
        return true;
      });
      return [...turmasToAdd, ...turmaCollection];
    }
    return turmaCollection;
  }

  protected convertDateFromClient(turma: ITurma): ITurma {
    return Object.assign({}, turma, {
      dataCriaca: turma.dataCriaca?.isValid() ? turma.dataCriaca.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataCriaca = res.body.dataCriaca ? dayjs(res.body.dataCriaca) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((turma: ITurma) => {
        turma.dataCriaca = turma.dataCriaca ? dayjs(turma.dataCriaca) : undefined;
      });
    }
    return res;
  }
}
