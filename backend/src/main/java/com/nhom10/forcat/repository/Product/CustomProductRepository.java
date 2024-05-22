package com.nhom10.forcat.repository.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.nhom10.forcat.model.Product.Product;

public interface CustomProductRepository {

    Page<Product> findRandomDiscountedProducts(Pageable pageable);

    Page<Product> findRandomProducts(Pageable pageable);

    Page<Product> searchProducts(String query, String category, String discount, Pageable pageable);

    Page<Product> searchAdminProducts(String query, Pageable pageable);

}
