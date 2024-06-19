package com.br.unisales.microservicoproduto.controller;

import java.nio.charset.Charset;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.br.unisales.microservicoproduto.service.ProdutoService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ProdutoController {
    @Autowired
    private ProdutoService servico;

    @CrossOrigin
    @PostMapping("/listarProduto")
    public ResponseEntity<String> listarProduto(@RequestParam("nome") String nome, @RequestParam("token") String token,
                                                HttpServletRequest request) {
        if(this.compararToken(UUID.fromString(token)))
            return ResponseEntity.status(HttpStatus.OK).body(this.servico.listar(nome));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @CrossOrigin
    @PostMapping("/buscarProdutoPorId")
    public ResponseEntity<String> buscarProdutoPorId(@RequestParam("id") Integer id, @RequestParam("token") String token,
                                                HttpServletRequest request) {
        if(this.compararToken(UUID.fromString(token)))
            return ResponseEntity.status(HttpStatus.OK).body(this.servico.buscarPorId(id));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @CrossOrigin
    @PostMapping("/salvarProduto")
    public ResponseEntity<String> salvarProduto(@RequestParam("id") Integer id, @RequestParam("nome") String nome,
                                                @RequestParam("descricao") String descricao, @RequestParam("preco") Double preco,
                                                @RequestParam("token") String token, HttpServletRequest request) {
        if(this.compararToken(UUID.fromString(token)))
            return ResponseEntity.status(HttpStatus.OK).body(this.servico.salvar(id, nome, descricao, preco));
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @CrossOrigin
    @PostMapping("/deletarProduto")
    public ResponseEntity<String> excluirProduto(@RequestParam("id") Integer id, @RequestParam("token") String token, HttpServletRequest request) {
        JSONObject json = new JSONObject();
        try {
            this.servico.excluirProduto(id);
            json.put("id", id);
            return ResponseEntity.status(HttpStatus.OK).body(json.toString());
        } catch (Exception e) {
            json.put("resposta", "erro");
            json.put("mensagem", "Os dados do produto NÃO foram excluídos!");
            return ResponseEntity.status(HttpStatus.OK).body(json.toString());
        }
    }

    /**
     * @apiNote Método responsável por realizar a comparação dos tokens
     * @param UUID token
     * @return boolean
     *
     * @author Vito Rodrigues Franzosi
     * @Data Criação 06.05.2024
     */
    private boolean compararToken(UUID token) {
        String chave = "Sistem de micro servico login";
        Charset charset = Charset.forName("ASCII");
        byte[] byteArrray = chave.getBytes(charset);
        UUID uuid = UUID.nameUUIDFromBytes(byteArrray);
        if(uuid.compareTo(token)==0)
            return true;
        return false;
    }
}
