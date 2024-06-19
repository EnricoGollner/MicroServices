package com.br.unisales.microservicoproduto.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.unisales.microservicoproduto.repository.ProdutoRepository;
import com.br.unisales.microservicoproduto.table.Produto;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository repo;

    public String listar(String nome) {
        try {
            List<Produto> lista = new ArrayList<Produto>();
            if((nome!=null) && ((nome.trim()).length()>0))
                lista = this.repo.findByNomeIgnoreCaseContainingOrderByNome(nome);
            else
                lista = this.repo.findAll();
            return new ObjectMapper().writeValueAsString(lista);
        } catch (Exception e) {
            System.err.println("Erro no método listar() da classe ProdutoService: "+e.getMessage());
            e.printStackTrace();
            JSONObject json = new JSONObject();
            json.put("erro", "Não foi possível listar os produtos");
            return json.toString();
        }
    }

    public String buscarPorId(Integer id) {
        List<Produto> lista = new ArrayList<Produto>();
        Optional<Produto> produto = this.repo.findById(id);
        if(produto.isPresent()) {
            lista.add(produto.get());
            try {
                return new ObjectMapper().writeValueAsString(lista);
            } catch (Exception e) {
                System.err.println("Erro no método buscarPorId() da classe ProdutoService: "+e.getMessage());
                e.printStackTrace();
                JSONObject json = new JSONObject();
                json.put("erro", "Não foi possível encontrar o produto");
                return json.toString();
            }
        }
        return null;
    }

    public String salvar(Integer id, String nome, String descricao, Double preco) {
        Produto produto = new Produto();
        if((id!=null) && (id!=0)) {
            Optional<Produto> optional = this.repo.findById(id);
            if(optional.isPresent())
                produto=optional.get();
        }
        produto.setDescricao(descricao);
        produto.setNome(nome);
        produto.setPreco(preco);
        produto = this.repo.save(produto);
        try {
            return new ObjectMapper().writeValueAsString(produto);
        } catch (Exception e) {
            System.err.println("Erro no método salvar() da classe ProdutoService: "+e.getMessage());
            e.printStackTrace();
            JSONObject json = new JSONObject();
            json.put("erro", "Não foi possível salvar o produto");
            return json.toString();
        }
    }

    public String excluirProduto(Integer id) {
        Optional<Produto> produto = this.repo.findById(id);
        if(produto.isPresent()) {
            this.repo.delete(produto.get());
            try {
                return new ObjectMapper().writeValueAsString(produto);
            } catch (Exception e) {
                System.err.println("Erro no método excluirProduto(id) da classe ProdutoService: "+e.getMessage());
                e.printStackTrace();
                JSONObject json = new JSONObject();
                json.put("erro", "Não foi possível encontrar o produto");
                return json.toString();
            }
        }
        return null;
    }
}
