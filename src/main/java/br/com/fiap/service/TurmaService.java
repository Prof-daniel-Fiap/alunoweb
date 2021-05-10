package br.com.fiap.service;

import br.com.fiap.domain.Turma;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Turma}.
 */
public interface TurmaService {
    /**
     * Save a turma.
     *
     * @param turma the entity to save.
     * @return the persisted entity.
     */
    Turma save(Turma turma);

    /**
     * Partially updates a turma.
     *
     * @param turma the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Turma> partialUpdate(Turma turma);

    /**
     * Get all the turmas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Turma> findAll(Pageable pageable);

    /**
     * Get the "id" turma.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Turma> findOne(Long id);

    /**
     * Delete the "id" turma.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
