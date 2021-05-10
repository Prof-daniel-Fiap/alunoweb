import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ITurma, Turma } from '../turma.model';

import { TurmaService } from './turma.service';

describe('Service Tests', () => {
  describe('Turma Service', () => {
    let service: TurmaService;
    let httpMock: HttpTestingController;
    let elemDefault: ITurma;
    let expectedResult: ITurma | ITurma[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TurmaService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nomeTurma: 'AAAAAAA',
        dataCriaca: currentDate,
        observacoes: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataCriaca: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Turma', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataCriaca: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCriaca: currentDate,
          },
          returnedFromService
        );

        service.create(new Turma()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Turma', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomeTurma: 'BBBBBB',
            dataCriaca: currentDate.format(DATE_FORMAT),
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCriaca: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Turma', () => {
        const patchObject = Object.assign(
          {
            dataCriaca: currentDate.format(DATE_FORMAT),
          },
          new Turma()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dataCriaca: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Turma', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nomeTurma: 'BBBBBB',
            dataCriaca: currentDate.format(DATE_FORMAT),
            observacoes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCriaca: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Turma', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addTurmaToCollectionIfMissing', () => {
        it('should add a Turma to an empty array', () => {
          const turma: ITurma = { id: 123 };
          expectedResult = service.addTurmaToCollectionIfMissing([], turma);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(turma);
        });

        it('should not add a Turma to an array that contains it', () => {
          const turma: ITurma = { id: 123 };
          const turmaCollection: ITurma[] = [
            {
              ...turma,
            },
            { id: 456 },
          ];
          expectedResult = service.addTurmaToCollectionIfMissing(turmaCollection, turma);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Turma to an array that doesn't contain it", () => {
          const turma: ITurma = { id: 123 };
          const turmaCollection: ITurma[] = [{ id: 456 }];
          expectedResult = service.addTurmaToCollectionIfMissing(turmaCollection, turma);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(turma);
        });

        it('should add only unique Turma to an array', () => {
          const turmaArray: ITurma[] = [{ id: 123 }, { id: 456 }, { id: 82045 }];
          const turmaCollection: ITurma[] = [{ id: 123 }];
          expectedResult = service.addTurmaToCollectionIfMissing(turmaCollection, ...turmaArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const turma: ITurma = { id: 123 };
          const turma2: ITurma = { id: 456 };
          expectedResult = service.addTurmaToCollectionIfMissing([], turma, turma2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(turma);
          expect(expectedResult).toContain(turma2);
        });

        it('should accept null and undefined values', () => {
          const turma: ITurma = { id: 123 };
          expectedResult = service.addTurmaToCollectionIfMissing([], null, turma, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(turma);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
