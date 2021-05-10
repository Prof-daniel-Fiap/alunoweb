import * as dayjs from 'dayjs';
import { IAluno } from 'app/entities/aluno/aluno.model';

export interface ICurso {
  id?: number;
  nomeCurso?: string;
  descricaoCurso?: string | null;
  dataCriacao?: dayjs.Dayjs | null;
  alunos?: IAluno[] | null;
}

export class Curso implements ICurso {
  constructor(
    public id?: number,
    public nomeCurso?: string,
    public descricaoCurso?: string | null,
    public dataCriacao?: dayjs.Dayjs | null,
    public alunos?: IAluno[] | null
  ) {}
}

export function getCursoIdentifier(curso: ICurso): number | undefined {
  return curso.id;
}
