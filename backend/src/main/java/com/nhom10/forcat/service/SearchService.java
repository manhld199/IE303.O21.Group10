package com.nhom10.forcat.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Product.ProductAdminShortenDto;
import com.nhom10.forcat.dto.Product.ProductAdminShortenPageDto;
import com.nhom10.forcat.dto.Product.ProductShortenDto;
import com.nhom10.forcat.dto.Product.ProductShortenPageDto;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.repository.Product.ProductRepository;

@Service
public class SearchService {

    @Autowired
    ProductRepository productRepository;

    public ResponseEntity<ProductShortenPageDto> getSearchProducts(String query, String category, String discount,
            int p, int n) {
        try {
            PageRequest pageable = PageRequest.of(p, n);
            Page<Product> page = productRepository.searchProducts(query, category, discount, pageable);
            List<Product> products = page.getContent();
            int totalPages = page.getTotalPages();

            if (products.isEmpty() && (!category.isEmpty() || !discount.isEmpty()))
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductShortenDto> shortenProducts = products.stream()
                    .map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            ProductShortenPageDto returnedProducts = new ProductShortenPageDto(shortenProducts, totalPages);

            return new ResponseEntity<>(returnedProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ProductAdminShortenPageDto> getAdminSearchProducts(String query, int p, int n) {
        try {
            PageRequest pageable = PageRequest.of(p, n);
            Page<Product> page = productRepository.searchAdminProducts(query, pageable);
            List<Product> products = page.getContent();
            int totalPages = page.getTotalPages();

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductAdminShortenDto> shortenProducts = products.stream()
                    .map(product -> new ProductAdminShortenDto(product))
                    .collect(Collectors.toList());

            ProductAdminShortenPageDto returnedProducts = new ProductAdminShortenPageDto(shortenProducts, totalPages);

            return new ResponseEntity<>(returnedProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
