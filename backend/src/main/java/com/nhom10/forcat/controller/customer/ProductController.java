package com.nhom10.forcat.controller.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Product.ProductShortenDto;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        ObjectId productObjectId = new ObjectId(productId);

        return productService.getProduct(productObjectId);
    }

    @GetMapping("/getRelatedProducts/{productId}")
    public ResponseEntity<List<Product>> getRelatedProducts(@PathVariable String productId) {
        ObjectId productObjectId = new ObjectId(productId);

        Product product = productService.getProduct(productObjectId).getBody();

        List<ObjectId> categories = product.getCategories().stream()
                .map(category -> category.getCategoryId())
                .collect(Collectors.toList());

        return productService.getProductsByCategory(categories);
    }

    @GetMapping("/getRecommendProducts")
    public ResponseEntity<List<ProductShortenDto>> getRecommendProducts() {
        return productService.getRandom10Products();
    }
}
