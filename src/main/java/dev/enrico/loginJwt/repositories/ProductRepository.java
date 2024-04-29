package dev.enrico.loginJwt.repositories;

import dev.enrico.loginJwt.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<Product, Long> {
}
