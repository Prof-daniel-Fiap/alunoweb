import * as dayjs from 'dayjs';
import { ICurso } from 'app/entities/curso/curso.model';
import { IAluno } from 'app/entities/aluno/aluno.model';

export interface ITurma {
  id?: number;
  nomeTurma?: string | null;
  dataCriaca?: dayjs.Dayjs | null;
  observacoes?: string | null;
  curso?: ICurso | null;
  alunos?: IAluno[] | null;
}

export class Turma implements ITurma {
  constructor(
    public id?: number,
    public nomeTurma?: string | null,
    public dataCriaca?: dayjs.Dayjs | null,
    public observacoes?: string | null,
    public curso?: ICurso | null,
    public alunos?: IAluno[] | null
  ) {}
}

export function getTurmaIdentifier(turma: ITurma): number | undefined {
  return turma.id;
}
