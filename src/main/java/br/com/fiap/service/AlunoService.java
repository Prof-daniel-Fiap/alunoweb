package br.com.fiap.service;

import br.com.fiap.domain.Aluno;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Aluno}.
 */
public interface AlunoService {
    /**
     * Save a aluno.
     *
     * @param aluno the entity to save.
     * @return the persisted entity.
     */
    Aluno save(Aluno aluno);

    /**
     * Partially updates a aluno.
     *
     * @param aluno the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Aluno> partialUpdate(Aluno aluno);

    /**
     * Get all the alunos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Aluno> findAll(Pageable pageable);

    /**
     * Get all the alunos with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Aluno> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" aluno.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Aluno> findOne(Long id);

    /**
     * Delete the "id" aluno.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
