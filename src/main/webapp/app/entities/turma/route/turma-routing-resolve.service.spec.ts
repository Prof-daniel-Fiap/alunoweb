jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITurma, Turma } from '../turma.model';
import { TurmaService } from '../service/turma.service';

import { TurmaRoutingResolveService } from './turma-routing-resolve.service';

describe('Service Tests', () => {
  describe('Turma routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TurmaRoutingResolveService;
    let service: TurmaService;
    let resultTurma: ITurma | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TurmaRoutingResolveService);
      service = TestBed.inject(TurmaService);
      resultTurma = undefined;
    });

    describe('resolve', () => {
      it('should return ITurma returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTurma = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTurma).toEqual({ id: 123 });
      });

      it('should return new ITurma if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTurma = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTurma).toEqual(new Turma());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTurma = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTurma).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
