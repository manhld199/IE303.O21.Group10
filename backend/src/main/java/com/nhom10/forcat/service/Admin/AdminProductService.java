package com.nhom10.forcat.service.admin;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Product.ProductAdminAddDto;
import com.nhom10.forcat.dto.Product.ProductAdminShortenDto;
import com.nhom10.forcat.dto.Product.ProductAdminShortenPageDto;
import com.nhom10.forcat.dto.Product.ProductAdminUpdateDto;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.repository.Product.ProductRepository;

@Service
public class AdminProductService {

    @Autowired
    ProductRepository productRepository;

    public ResponseEntity<Product> getProductByProductId(ObjectId productId) {
        try {
            Optional<Product> productOptional = productRepository.findById(productId);

            if (!productOptional.isPresent())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(productOptional.get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ProductAdminShortenPageDto> getAllProducts(int p, int n) {
        try {
            Pageable pageable = PageRequest.of(p, n);
            Page<Product> page = productRepository.findAllByOrderByCreatedAtDesc(pageable);
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

    public ResponseEntity<Object> addProduct(ProductAdminAddDto product) {
        try {
            Product addProduct = new Product(product);

            Product addedProduct = productRepository.insert(addProduct);

            if (addedProduct != null)
                return new ResponseEntity<>(HttpStatus.CREATED);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateProduct(ProductAdminUpdateDto product) {
        try {
            Product updateProduct = new Product(product);

            Product updatedProduct = productRepository.save(updateProduct);

            if (updatedProduct != null)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteProducts(List<ObjectId> productOjectIds) {
        try {
            if (productOjectIds.size() == 0)
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            productRepository.deleteByProductIdIn(productOjectIds);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
