package com.br.unisales.microservicoproduto.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.unisales.microservicoproduto.table.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    List<Produto> findByNomeIgnoreCaseContainingOrderByNome(String nome);
}
