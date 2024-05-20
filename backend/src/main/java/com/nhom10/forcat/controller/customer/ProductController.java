package com.nhom10.forcat.controller.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Product.ProductCartDto;
import com.nhom10.forcat.dto.Product.ProductShortenDto;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/getProduct/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        ObjectId productObjectId = new ObjectId(productId);

        return productService.getProductByProductId(productObjectId);
    }

    @GetMapping("/getCartProducts")
    public ResponseEntity<List<ProductCartDto>> getCartProducts(
            @RequestParam(name = "pid", required = true) List<String> productIds) {
        List<ObjectId> productOjectIds = productIds.stream()
                .map(product -> new ObjectId(product))
                .collect(Collectors.toList());

        return productService.getProductsByIds(productOjectIds);
    }

    @GetMapping("/getRelatedProducts/{productId}")
    public ResponseEntity<List<ProductShortenDto>> getRelatedProducts(@PathVariable String productId) {
        ObjectId productObjectId = new ObjectId(productId);

        Product product = productService.getProductByProductId(productObjectId).getBody();

        List<ObjectId> categories = product.getCategories().stream()
                .map(category -> category.getCategoryId())
                .collect(Collectors.toList());

        return productService.getProductsByCategories(categories);
    }

    @GetMapping("/getRecommendedProducts")
    public ResponseEntity<List<ProductShortenDto>> getRecommendedProducts() {
        return productService.getRandom10Products();
    }

    @GetMapping("/getDiscountedProducts")
    public ResponseEntity<List<ProductShortenDto>> getDiscountProducts() {
        return productService.get10DiscountedProducts();
    }

    @GetMapping("/getNewestProducts")
    public ResponseEntity<List<ProductShortenDto>> getNewestProducts() {
        return productService.get10NewestProducts();
    }
}
