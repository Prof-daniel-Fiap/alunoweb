jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAluno, Aluno } from '../aluno.model';
import { AlunoService } from '../service/aluno.service';

import { AlunoRoutingResolveService } from './aluno-routing-resolve.service';

describe('Service Tests', () => {
  describe('Aluno routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AlunoRoutingResolveService;
    let service: AlunoService;
    let resultAluno: IAluno | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AlunoRoutingResolveService);
      service = TestBed.inject(AlunoService);
      resultAluno = undefined;
    });

    describe('resolve', () => {
      it('should return IAluno returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAluno = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAluno).toEqual({ id: 123 });
      });

      it('should return new IAluno if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAluno = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAluno).toEqual(new Aluno());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAluno = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAluno).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
