package com.forcat.app.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.forcat.app.dto.Product.ProductShortenDto;
import com.forcat.app.model.Product.Product;
import com.forcat.app.model.Product.ProductCategory;
import com.forcat.app.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public ResponseEntity<Product> getProduct(ObjectId productId) {
        try {
            Optional<Product> productOptional = productRepository.findById(productId);

            if (productOptional.isPresent()) {
                return new ResponseEntity<>(productOptional.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Product>> getProductsByCategory(List<ObjectId> categories) {
        try {
            List<Product> products = productRepository.findProductsByCategories(categories);

            if (products.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(products, HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ProductShortenDto>> getRandom10Products() {
        try {
            List<Product> products = productRepository.findAll();

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<Product> randomProducts = null;
            if (products.size() > 10) {
                Random random = new Random();
                randomProducts = random.ints(0, products.size())
                        .distinct()
                        .limit(10)
                        .mapToObj(products::get)
                        .collect(Collectors.toList());
            }

            products = randomProducts;

            List<ProductShortenDto> shortenProducts = products.stream().map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(shortenProducts, HttpStatus.OK);

        } catch (

        Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
