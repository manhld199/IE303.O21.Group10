package com.nhom10.forcat.service.admin;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Category.CategoryAdminShortenDto;
import com.nhom10.forcat.dto.Category.CategoryAdminShortenPageDto;
import com.nhom10.forcat.dto.Product.ProductAdminShortenDto;
import com.nhom10.forcat.dto.Product.ProductAdminShortenPageDto;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.repository.Category.CategoryRepository;
import com.nhom10.forcat.repository.Product.ProductRepository;

@Service
public class AdminSearchService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

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

    // public ResponseEntity<CategoryAdminShortenPageDto> getAdminSearchCategories(String query, int p, int n) {
    //     try {
    //         PageRequest pageable = PageRequest.of(p, n);
    //         Page<Category> page = categoryRepository.searchAdminCategories(query, pageable);
    //         List<Category> categories = page.getContent();
    //         int totalPages = page.getTotalPages();
    //         if (categories.isEmpty())
    //             return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    //         List<CategoryAdminShortenDto> shortenCategories = categories.stream()
    //                 .map(category -> new CategoryAdminShortenDto(category))
    //                 .collect(Collectors.toList());

    //         CategoryAdminShortenPageDto returnedCategories = new CategoryAdminShortenPageDto(shortenCategories, totalPages);

    //         return new ResponseEntity<>(returnedCategories, HttpStatus.OK);
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}
