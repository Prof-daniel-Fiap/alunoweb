import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { StatusMatricula } from 'app/entities/enumerations/status-matricula.model';
import { IAluno, Aluno } from '../aluno.model';

import { AlunoService } from './aluno.service';

describe('Service Tests', () => {
  describe('Aluno Service', () => {
    let service: AlunoService;
    let httpMock: HttpTestingController;
    let elemDefault: IAluno;
    let expectedResult: IAluno | IAluno[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(AlunoService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 0,
        nome: 'AAAAAAA',
        email: 'AAAAAAA',
        fotoContentType: 'image/png',
        foto: 'AAAAAAA',
        dataNascimento: currentDate,
        telefone: 'AAAAAAA',
        status: StatusMatricula.ATIVO,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataNascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Aluno', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataNascimento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.create(new Aluno()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Aluno', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            email: 'BBBBBB',
            foto: 'BBBBBB',
            dataNascimento: currentDate.format(DATE_FORMAT),
            telefone: 'BBBBBB',
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Aluno', () => {
        const patchObject = Object.assign(
          {
            nome: 'BBBBBB',
            email: 'BBBBBB',
            dataNascimento: currentDate.format(DATE_FORMAT),
            telefone: 'BBBBBB',
            status: 'BBBBBB',
          },
          new Aluno()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Aluno', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nome: 'BBBBBB',
            email: 'BBBBBB',
            foto: 'BBBBBB',
            dataNascimento: currentDate.format(DATE_FORMAT),
            telefone: 'BBBBBB',
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataNascimento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Aluno', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addAlunoToCollectionIfMissing', () => {
        it('should add a Aluno to an empty array', () => {
          const aluno: IAluno = { id: 123 };
          expectedResult = service.addAlunoToCollectionIfMissing([], aluno);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(aluno);
        });

        it('should not add a Aluno to an array that contains it', () => {
          const aluno: IAluno = { id: 123 };
          const alunoCollection: IAluno[] = [
            {
              ...aluno,
            },
            { id: 456 },
          ];
          expectedResult = service.addAlunoToCollectionIfMissing(alunoCollection, aluno);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Aluno to an array that doesn't contain it", () => {
          const aluno: IAluno = { id: 123 };
          const alunoCollection: IAluno[] = [{ id: 456 }];
          expectedResult = service.addAlunoToCollectionIfMissing(alunoCollection, aluno);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(aluno);
        });

        it('should add only unique Aluno to an array', () => {
          const alunoArray: IAluno[] = [{ id: 123 }, { id: 456 }, { id: 90147 }];
          const alunoCollection: IAluno[] = [{ id: 123 }];
          expectedResult = service.addAlunoToCollectionIfMissing(alunoCollection, ...alunoArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const aluno: IAluno = { id: 123 };
          const aluno2: IAluno = { id: 456 };
          expectedResult = service.addAlunoToCollectionIfMissing([], aluno, aluno2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(aluno);
          expect(expectedResult).toContain(aluno2);
        });

        it('should accept null and undefined values', () => {
          const aluno: IAluno = { id: 123 };
          expectedResult = service.addAlunoToCollectionIfMissing([], null, aluno, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(aluno);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
