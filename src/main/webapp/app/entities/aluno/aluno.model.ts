import * as dayjs from 'dayjs';
import { ICurso } from 'app/entities/curso/curso.model';
import { ITurma } from 'app/entities/turma/turma.model';
import { StatusMatricula } from 'app/entities/enumerations/status-matricula.model';

export interface IAluno {
  id?: number;
  nome?: string;
  email?: string;
  fotoContentType?: string | null;
  foto?: string | null;
  dataNascimento?: dayjs.Dayjs | null;
  telefone?: string | null;
  status?: StatusMatricula | null;
  cursos?: ICurso[] | null;
  turmas?: ITurma[] | null;
}

export class Aluno implements IAluno {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public fotoContentType?: string | null,
    public foto?: string | null,
    public dataNascimento?: dayjs.Dayjs | null,
    public telefone?: string | null,
    public status?: StatusMatricula | null,
    public cursos?: ICurso[] | null,
    public turmas?: ITurma[] | null
  ) {}
}

export function getAlunoIdentifier(aluno: IAluno): number | undefined {
  return aluno.id;
}
