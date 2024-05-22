package com.nhom10.forcat.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Product.ProductAdminShortenPageDto;
import com.nhom10.forcat.service.ProductService;
import com.nhom10.forcat.service.SearchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    @Autowired
    ProductService productService;

    @Autowired
    SearchService searchService;

    @GetMapping("/getProducts")
    public ResponseEntity<ProductAdminShortenPageDto> getAllProducts(
            @RequestParam(required = true) String q,
            @RequestParam(required = true) int p) {
        if (!q.isEmpty())
            return searchService.getAdminSearchProducts(q, p, 10);

        return productService.getAdminAllProducts(p, 10);
    }

}
