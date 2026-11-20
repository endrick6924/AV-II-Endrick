package com.girodegaragem.repository;

import com.girodegaragem.model.Publicacao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PublicacaoRepository extends JpaRepository<Publicacao, Long> {
    @Query("""
        select p from Publicacao p
        where (:categoria = '' or lower(p.categoria) = lower(:categoria))
          and (locate(lower(:q), lower(p.titulo)) > 0
            or locate(lower(:q), lower(p.conteudo)) > 0
            or locate(lower(:q), lower(p.categoria)) > 0 or :q = '')
        order by p.dataPublicacao desc, p.id desc
        """)
    List<Publicacao> pesquisar(@Param("q") String q, @Param("categoria") String categoria);
}
