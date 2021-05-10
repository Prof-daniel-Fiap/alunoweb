import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICurso, getCursoIdentifier } from '../curso.model';

export type EntityResponseType = HttpResponse<ICurso>;
export type EntityArrayResponseType = HttpResponse<ICurso[]>;

@Injectable({ providedIn: 'root' })
export class CursoService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/cursos');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(curso: ICurso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(curso);
    return this.http
      .post<ICurso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(curso: ICurso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(curso);
    return this.http
      .put<ICurso>(`${this.resourceUrl}/${getCursoIdentifier(curso) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(curso: ICurso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(curso);
    return this.http
      .patch<ICurso>(`${this.resourceUrl}/${getCursoIdentifier(curso) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICurso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICurso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCursoToCollectionIfMissing(cursoCollection: ICurso[], ...cursosToCheck: (ICurso | null | undefined)[]): ICurso[] {
    const cursos: ICurso[] = cursosToCheck.filter(isPresent);
    if (cursos.length > 0) {
      const cursoCollectionIdentifiers = cursoCollection.map(cursoItem => getCursoIdentifier(cursoItem)!);
      const cursosToAdd = cursos.filter(cursoItem => {
        const cursoIdentifier = getCursoIdentifier(cursoItem);
        if (cursoIdentifier == null || cursoCollectionIdentifiers.includes(cursoIdentifier)) {
          return false;
        }
        cursoCollectionIdentifiers.push(cursoIdentifier);
        return true;
      });
      return [...cursosToAdd, ...cursoCollection];
    }
    return cursoCollection;
  }

  protected convertDateFromClient(curso: ICurso): ICurso {
    return Object.assign({}, curso, {
      dataCriacao: curso.dataCriacao?.isValid() ? curso.dataCriacao.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataCriacao = res.body.dataCriacao ? dayjs(res.body.dataCriacao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((curso: ICurso) => {
        curso.dataCriacao = curso.dataCriacao ? dayjs(curso.dataCriacao) : undefined;
      });
    }
    return res;
  }
}
