package com.girodegaragem.controller;

import java.util.List;

import com.girodegaragem.exception.PublicacaoNaoEncontradaException;
import com.girodegaragem.model.Publicacao;
import com.girodegaragem.repository.PublicacaoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publicacoes")
public class PublicacaoController {
    private final PublicacaoRepository repository;

    public PublicacaoController(PublicacaoRepository repository) {
        this.repository = repository;
    }

    @Value("${blog.senha}")
    private String senha;

    @GetMapping
    public List<Publicacao> listar(@RequestParam(defaultValue = "") String q,
                                   @RequestParam(defaultValue = "") String categoria) {
        return repository.pesquisar(q.trim(), categoria.trim());
    }

    @GetMapping("/{id}")
    public Publicacao buscar(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(PublicacaoNaoEncontradaException::new);
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Publicacao criar(@RequestHeader(value = "X-Senha-Editor", defaultValue = "") String informada,
                            @Valid @RequestBody Publicacao publicacao) {
        if (senha.isBlank() || !senha.equals(informada)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Senha de edição incorreta.");
        }
        publicacao.titulo = publicacao.titulo.trim();
        publicacao.categoria = publicacao.categoria.trim();
        publicacao.conteudo = publicacao.conteudo.trim();
        return repository.save(publicacao);
    }
}
