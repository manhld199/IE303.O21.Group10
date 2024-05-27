package com.nhom10.forcat.controller.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Product.ProductShortenPageDto;
import com.nhom10.forcat.service.customer.CustomerProductService;
import com.nhom10.forcat.service.customer.CustomerSearchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/search")
public class CustomerSearchController {

    @Autowired
    CustomerSearchService searchService;

    @Autowired
    CustomerProductService productService;

    @GetMapping("/products")
    public ResponseEntity<ProductShortenPageDto> getSearchProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String c,
            @RequestParam(required = false) String d,
            @RequestParam(required = false) String s,
            @RequestParam(required = false) String r,
            @RequestParam(required = false) String n,
            @RequestParam(required = true) Integer p) {

        if (n != null)
            return productService.getNNewestProducts(p, 20);

        if (r != null)
            return productService.getNRandomProducts(p, "", 20);

        if (q == null && c == null && d != null)
            return productService.getNDiscountedProducts(p, "", 20);

        if (q == null && c != null && d == null)
            return productService.getNProductsByCategoryName(c, p, "", 20);

        q = q == null ? "" : q;
        c = c == null ? "" : c;
        d = d == null ? "" : d;
        s = s == null ? "" : s;

        ResponseEntity<ProductShortenPageDto> products = searchService.getSearchProducts(q, c, d, s, p, 20);
        if (products.getBody().getProducts().size() == 0) {
            if (c == "" && d == "")
                products = productService.getNRandomProducts(p, s, 20);
            else if (c != "" && d == "")
                products = productService.getNProductsByCategoryName(c, p, s, 20);
            else if (c == "" && d != "")
                products = productService.getNDiscountedProducts(p, s, 20);
            else if (c != "" && d != "")
                products = productService.getNProductsByCategoryNameAndDiscounted(c, p, s, 20);
        }

        return products;
    }
}
