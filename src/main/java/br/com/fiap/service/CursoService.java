package br.com.fiap.service;

import br.com.fiap.domain.Curso;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Curso}.
 */
public interface CursoService {
    /**
     * Save a curso.
     *
     * @param curso the entity to save.
     * @return the persisted entity.
     */
    Curso save(Curso curso);

    /**
     * Partially updates a curso.
     *
     * @param curso the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Curso> partialUpdate(Curso curso);

    /**
     * Get all the cursos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Curso> findAll(Pageable pageable);

    /**
     * Get the "id" curso.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Curso> findOne(Long id);

    /**
     * Delete the "id" curso.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
