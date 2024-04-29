package dev.enrico.loginJwt.controllers;

import dev.enrico.loginJwt.domain.product.Product;
import dev.enrico.loginJwt.domain.product.ProductRequestDTO;
import dev.enrico.loginJwt.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("product")
public class ProductController {
    @Autowired
    ProductRepository productRepository;

    @PostMapping
    public ResponseEntity createProduct(@RequestBody ProductRequestDTO product){
        Product newProduct = new Product(product);
        productRepository.save(newProduct);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity getAllProducts() {
        List<Product> productList = productRepository.findAll();
        return ResponseEntity.ok(productList);
    }
}
