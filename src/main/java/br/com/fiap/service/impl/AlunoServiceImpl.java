package br.com.fiap.service.impl;

import br.com.fiap.domain.Aluno;
import br.com.fiap.repository.AlunoRepository;
import br.com.fiap.service.AlunoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Aluno}.
 */
@Service
@Transactional
public class AlunoServiceImpl implements AlunoService {

    private final Logger log = LoggerFactory.getLogger(AlunoServiceImpl.class);

    private final AlunoRepository alunoRepository;

    public AlunoServiceImpl(AlunoRepository alunoRepository) {
        this.alunoRepository = alunoRepository;
    }

    @Override
    public Aluno save(Aluno aluno) {
        log.debug("Request to save Aluno : {}", aluno);
        return alunoRepository.save(aluno);
    }

    @Override
    public Optional<Aluno> partialUpdate(Aluno aluno) {
        log.debug("Request to partially update Aluno : {}", aluno);

        return alunoRepository
            .findById(aluno.getId())
            .map(
                existingAluno -> {
                    if (aluno.getNome() != null) {
                        existingAluno.setNome(aluno.getNome());
                    }
                    if (aluno.getEmail() != null) {
                        existingAluno.setEmail(aluno.getEmail());
                    }
                    if (aluno.getFoto() != null) {
                        existingAluno.setFoto(aluno.getFoto());
                    }
                    if (aluno.getFotoContentType() != null) {
                        existingAluno.setFotoContentType(aluno.getFotoContentType());
                    }
                    if (aluno.getDataNascimento() != null) {
                        existingAluno.setDataNascimento(aluno.getDataNascimento());
                    }
                    if (aluno.getTelefone() != null) {
                        existingAluno.setTelefone(aluno.getTelefone());
                    }
                    if (aluno.getStatus() != null) {
                        existingAluno.setStatus(aluno.getStatus());
                    }

                    return existingAluno;
                }
            )
            .map(alunoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Aluno> findAll(Pageable pageable) {
        log.debug("Request to get all Alunos");
        return alunoRepository.findAll(pageable);
    }

    public Page<Aluno> findAllWithEagerRelationships(Pageable pageable) {
        return alunoRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Aluno> findOne(Long id) {
        log.debug("Request to get Aluno : {}", id);
        return alunoRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Aluno : {}", id);
        alunoRepository.deleteById(id);
    }
}
