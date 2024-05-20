package com.nhom10.forcat.repository.Product;

import java.util.List;

import com.nhom10.forcat.model.Product.Product;

public interface CustomProductRepository {

    List<Product> findRandomDiscountedProducts(int limit);

    List<Product> findRandomProducts(int limit);

    List<Product> searchProducts(String query, String category, String discount);

}
