package br.com.fiap.repository;

import br.com.fiap.domain.Aluno;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Aluno entity.
 */
@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    @Query(
        value = "select distinct aluno from Aluno aluno left join fetch aluno.cursos left join fetch aluno.turmas",
        countQuery = "select count(distinct aluno) from Aluno aluno"
    )
    Page<Aluno> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct aluno from Aluno aluno left join fetch aluno.cursos left join fetch aluno.turmas")
    List<Aluno> findAllWithEagerRelationships();

    @Query("select aluno from Aluno aluno left join fetch aluno.cursos left join fetch aluno.turmas where aluno.id =:id")
    Optional<Aluno> findOneWithEagerRelationships(@Param("id") Long id);
}
