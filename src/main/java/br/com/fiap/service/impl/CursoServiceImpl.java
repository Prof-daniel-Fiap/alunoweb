package br.com.fiap.service.impl;

import br.com.fiap.domain.Curso;
import br.com.fiap.repository.CursoRepository;
import br.com.fiap.service.CursoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Curso}.
 */
@Service
@Transactional
public class CursoServiceImpl implements CursoService {

    private final Logger log = LoggerFactory.getLogger(CursoServiceImpl.class);

    private final CursoRepository cursoRepository;

    public CursoServiceImpl(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    public Curso save(Curso curso) {
        log.debug("Request to save Curso : {}", curso);
        return cursoRepository.save(curso);
    }

    @Override
    public Optional<Curso> partialUpdate(Curso curso) {
        log.debug("Request to partially update Curso : {}", curso);

        return cursoRepository
            .findById(curso.getId())
            .map(
                existingCurso -> {
                    if (curso.getNomeCurso() != null) {
                        existingCurso.setNomeCurso(curso.getNomeCurso());
                    }
                    if (curso.getDescricaoCurso() != null) {
                        existingCurso.setDescricaoCurso(curso.getDescricaoCurso());
                    }
                    if (curso.getDataCriacao() != null) {
                        existingCurso.setDataCriacao(curso.getDataCriacao());
                    }

                    return existingCurso;
                }
            )
            .map(cursoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Curso> findAll(Pageable pageable) {
        log.debug("Request to get all Cursos");
        return cursoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Curso> findOne(Long id) {
        log.debug("Request to get Curso : {}", id);
        return cursoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Curso : {}", id);
        cursoRepository.deleteById(id);
    }
}
