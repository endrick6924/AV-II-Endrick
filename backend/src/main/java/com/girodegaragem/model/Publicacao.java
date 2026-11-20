package com.girodegaragem.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "girodegaragem_artigos")
public class Publicacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public Long id;

    @NotBlank
    @Size(max = 200)
    @Column(length = 200, nullable = false)
    public String titulo;

    @NotBlank
    @Size(max = 50)
    @Column(length = 50, nullable = false)
    public String categoria;

    @Size(max = 300)
    @Column(length = 300)
    public String descricao;

    @NotBlank
    @Column(columnDefinition = "text", nullable = false)
    public String conteudo;

    @Column(name = "data_publicacao")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    public LocalDate dataPublicacao;

    @PrePersist
    void definirData() {
        dataPublicacao = LocalDate.now();
    }
}
