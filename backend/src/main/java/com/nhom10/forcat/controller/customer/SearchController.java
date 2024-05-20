package com.nhom10.forcat.controller.customer;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Product.ProductShortenDto;
import com.nhom10.forcat.service.SearchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    SearchService searchService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductShortenDto>> getSearchProducts(
            @RequestParam String q,
            @RequestParam String c,
            @RequestParam String d) {
        return searchService.getSearchProducts(q, c, d);
    }
}
