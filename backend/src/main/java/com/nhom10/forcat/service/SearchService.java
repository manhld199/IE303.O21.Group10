package com.nhom10.forcat.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Product.ProductShortenDto;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.repository.Product.ProductRepository;

@Service
public class SearchService {

    @Autowired
    ProductRepository productRepository;

    public ResponseEntity<List<ProductShortenDto>> getSearchProducts(String query, String category, String discount) {
        try {
            List<Product> products = productRepository.searchProducts(query, category, discount);

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<Product> returnedProducts = new ArrayList<Product>();
            returnedProducts.addAll(products);

            if (discount.isEmpty() && category.isEmpty() && products.size() < 20) {
                List<Product> randomProducts = productRepository
                        .findRandomProducts(20 - products.size());
                returnedProducts.addAll(randomProducts);
            }

            List<ProductShortenDto> shortenProducts = returnedProducts.stream()
                    .map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(shortenProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
