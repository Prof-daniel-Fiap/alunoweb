package br.com.fiap.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome_curso", nullable = false)
    private String nomeCurso;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "descricao_curso")
    private String descricaoCurso;

    @Column(name = "data_criacao")
    private LocalDate dataCriacao;

    @ManyToMany(mappedBy = "cursos")
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

    public Curso id(Long id) {
        this.id = id;
        return this;
    }

    public String getNomeCurso() {
        return this.nomeCurso;
    }

    public Curso nomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
        return this;
    }

    public void setNomeCurso(String nomeCurso) {
        this.nomeCurso = nomeCurso;
    }

    public String getDescricaoCurso() {
        return this.descricaoCurso;
    }

    public Curso descricaoCurso(String descricaoCurso) {
        this.descricaoCurso = descricaoCurso;
        return this;
    }

    public void setDescricaoCurso(String descricaoCurso) {
        this.descricaoCurso = descricaoCurso;
    }

    public LocalDate getDataCriacao() {
        return this.dataCriacao;
    }

    public Curso dataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
        return this;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Set<Aluno> getAlunos() {
        return this.alunos;
    }

    public Curso alunos(Set<Aluno> alunos) {
        this.setAlunos(alunos);
        return this;
    }

    public Curso addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.getCursos().add(this);
        return this;
    }

    public Curso removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.getCursos().remove(this);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        if (this.alunos != null) {
            this.alunos.forEach(i -> i.removeCurso(this));
        }
        if (alunos != null) {
            alunos.forEach(i -> i.addCurso(this));
        }
        this.alunos = alunos;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Curso)) {
            return false;
        }
        return id != null && id.equals(((Curso) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", nomeCurso='" + getNomeCurso() + "'" +
            ", descricaoCurso='" + getDescricaoCurso() + "'" +
            ", dataCriacao='" + getDataCriacao() + "'" +
            "}";
    }
}
