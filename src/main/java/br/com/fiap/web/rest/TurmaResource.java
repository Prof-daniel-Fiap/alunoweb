package br.com.fiap.web.rest;

import br.com.fiap.domain.Turma;
import br.com.fiap.repository.TurmaRepository;
import br.com.fiap.service.TurmaService;
import br.com.fiap.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.com.fiap.domain.Turma}.
 */
@RestController
@RequestMapping("/api")
public class TurmaResource {

    private final Logger log = LoggerFactory.getLogger(TurmaResource.class);

    private static final String ENTITY_NAME = "turma";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TurmaService turmaService;

    private final TurmaRepository turmaRepository;

    public TurmaResource(TurmaService turmaService, TurmaRepository turmaRepository) {
        this.turmaService = turmaService;
        this.turmaRepository = turmaRepository;
    }

    /**
     * {@code POST  /turmas} : Create a new turma.
     *
     * @param turma the turma to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new turma, or with status {@code 400 (Bad Request)} if the turma has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/turmas")
    public ResponseEntity<Turma> createTurma(@RequestBody Turma turma) throws URISyntaxException {
        log.debug("REST request to save Turma : {}", turma);
        if (turma.getId() != null) {
            throw new BadRequestAlertException("A new turma cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Turma result = turmaService.save(turma);
        return ResponseEntity
            .created(new URI("/api/turmas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /turmas/:id} : Updates an existing turma.
     *
     * @param id the id of the turma to save.
     * @param turma the turma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turma,
     * or with status {@code 400 (Bad Request)} if the turma is not valid,
     * or with status {@code 500 (Internal Server Error)} if the turma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/turmas/{id}")
    public ResponseEntity<Turma> updateTurma(@PathVariable(value = "id", required = false) final Long id, @RequestBody Turma turma)
        throws URISyntaxException {
        log.debug("REST request to update Turma : {}, {}", id, turma);
        if (turma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, turma.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!turmaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Turma result = turmaService.save(turma);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, turma.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /turmas/:id} : Partial updates given fields of an existing turma, field will ignore if it is null
     *
     * @param id the id of the turma to save.
     * @param turma the turma to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated turma,
     * or with status {@code 400 (Bad Request)} if the turma is not valid,
     * or with status {@code 404 (Not Found)} if the turma is not found,
     * or with status {@code 500 (Internal Server Error)} if the turma couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/turmas/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Turma> partialUpdateTurma(@PathVariable(value = "id", required = false) final Long id, @RequestBody Turma turma)
        throws URISyntaxException {
        log.debug("REST request to partial update Turma partially : {}, {}", id, turma);
        if (turma.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, turma.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!turmaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Turma> result = turmaService.partialUpdate(turma);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, turma.getId().toString())
        );
    }

    /**
     * {@code GET  /turmas} : get all the turmas.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of turmas in body.
     */
    @GetMapping("/turmas")
    public ResponseEntity<List<Turma>> getAllTurmas(Pageable pageable) {
        log.debug("REST request to get a page of Turmas");
        Page<Turma> page = turmaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /turmas/:id} : get the "id" turma.
     *
     * @param id the id of the turma to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the turma, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/turmas/{id}")
    public ResponseEntity<Turma> getTurma(@PathVariable Long id) {
        log.debug("REST request to get Turma : {}", id);
        Optional<Turma> turma = turmaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(turma);
    }

    /**
     * {@code DELETE  /turmas/:id} : delete the "id" turma.
     *
     * @param id the id of the turma to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/turmas/{id}")
    public ResponseEntity<Void> deleteTurma(@PathVariable Long id) {
        log.debug("REST request to delete Turma : {}", id);
        turmaService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
