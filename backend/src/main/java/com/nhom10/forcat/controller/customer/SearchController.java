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
import com.nhom10.forcat.service.ProductService;
import com.nhom10.forcat.service.SearchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/search")
public class SearchController {

    @Autowired
    SearchService searchService;

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductShortenDto>> getSearchProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String c,
            @RequestParam(required = false) String d,
            @RequestParam(required = false) String r,
            @RequestParam(required = false) String n) {

        if (n != null)
            return productService.getNNewestProducts(20);

        if (r != null)
            return productService.getNRandomProducts(20);

        if (q == null && c == null && d != null)
            return productService.getNDiscountedProducts(20);

        q = q == null ? "" : q;
        c = c == null ? "" : c;
        d = d == null ? "" : d;

        return searchService.getSearchProducts(q, c, d);
    }
}
