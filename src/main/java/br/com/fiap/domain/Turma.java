package br.com.fiap.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A Turma.
 */
@Entity
@Table(name = "turma")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Turma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome_turma")
    private String nomeTurma;

    @Column(name = "data_criaca")
    private LocalDate dataCriaca;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "observacoes")
    private String observacoes;

    @ManyToOne
    @JsonIgnoreProperties(value = { "alunos" }, allowSetters = true)
    private Curso curso;

    @ManyToMany(mappedBy = "turmas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cursos", "turmas" }, allowSetters = true)
    private Set<Aluno> alunos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Turma id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomeTurma() {
        return this.nomeTurma;
    }

    public Turma nomeTurma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
        return this;
    }

    public void setNomeTurma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
    }

    public LocalDate getDataCriaca() {
        return this.dataCriaca;
    }

    public Turma dataCriaca(LocalDate dataCriaca) {
        this.dataCriaca = dataCriaca;
        return this;
    }

    public void setDataCriaca(LocalDate dataCriaca) {
        this.dataCriaca = dataCriaca;
    }

    public String getObservacoes() {
        return this.observacoes;
    }

    public Turma observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Curso getCurso() {
        return this.curso;
    }

    public Turma curso(Curso curso) {
        this.setCurso(curso);
        return this;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Set<Aluno> getAlunos() {
        return this.alunos;
    }

    public Turma alunos(Set<Aluno> alunos) {
        this.setAlunos(alunos);
        return this;
    }

    public Turma addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.getTurmas().add(this);
        return this;
    }

    public Turma removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.getTurmas().remove(this);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        if (this.alunos != null) {
            this.alunos.forEach(i -> i.removeTurma(this));
        }
        if (alunos != null) {
            alunos.forEach(i -> i.addTurma(this));
        }
        this.alunos = alunos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Turma)) {
            return false;
        }
        return id != null && id.equals(((Turma) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Turma{" +
            "id=" + getId() +
            ", nomeTurma='" + getNomeTurma() + "'" +
            ", dataCriaca='" + getDataCriaca() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
