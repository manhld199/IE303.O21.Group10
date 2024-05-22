package com.nhom10.forcat.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Product.ProductCartDto;
import com.nhom10.forcat.dto.Product.ProductShortenDto;
import com.nhom10.forcat.dto.Product.ProductShortenPageDto;
import com.nhom10.forcat.dto.Product.ProductSitemapDto;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.repository.Product.ProductRepository;

@Service
public class ProductService {

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

    public ResponseEntity<List<ProductCartDto>> getProductsByIds(List<ObjectId> productIds) {
        try {
            List<Product> products = productRepository.findProductsByIds(productIds);

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductCartDto> cartProducts = products.stream().map(product -> new ProductCartDto(product))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(cartProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ProductShortenDto>> getProductsByCategories(List<ObjectId> categories) {
        try {
            List<Product> products = productRepository.findProductsByCategories(categories);

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductShortenDto> shortenProducts = products.stream().map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(shortenProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ProductShortenPageDto> getNRandomProducts(int p, int n) {
        try {
            PageRequest pageable = PageRequest.of(p, n);
            Page<Product> page = productRepository.findRandomProducts(pageable);
            List<Product> products = page.getContent();
            int totalPages = page.getTotalPages();

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductShortenDto> shortenProducts = products.stream().map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            ProductShortenPageDto returnedProducts = new ProductShortenPageDto(shortenProducts, totalPages);

            return new ResponseEntity<>(returnedProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ProductShortenPageDto> getNDiscountedProducts(int p, int n) {
        try {
            PageRequest pageable = PageRequest.of(p, n);
            Page<Product> page = productRepository.findRandomDiscountedProducts(pageable);
            List<Product> products = page.getContent();
            int totalPages = page.getTotalPages();

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductShortenDto> shortenProducts = products.stream().map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            ProductShortenPageDto returnedProducts = new ProductShortenPageDto(shortenProducts, totalPages);

            return new ResponseEntity<>(returnedProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<ProductShortenPageDto> getNNewestProducts(int p, int n) {
        try {
            Pageable pageable = PageRequest.of(p, n);
            Page<Product> page = productRepository.findAllByOrderByCreatedAtDesc(pageable);
            List<Product> products = page.getContent();
            int totalPages = page.getTotalPages();

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductShortenDto> shortenProducts = products.stream().map(product -> new ProductShortenDto(product))
                    .collect(Collectors.toList());

            ProductShortenPageDto returnedProducts = new ProductShortenPageDto(shortenProducts, totalPages);

            return new ResponseEntity<>(returnedProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ProductSitemapDto>> getSitemapProducts() {
        try {
            List<Product> products = productRepository.findAll();

            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ProductSitemapDto> convertedProducts = products.stream().map(product -> new ProductSitemapDto(product))
                    .collect(Collectors.toList());

            return new ResponseEntity<>(convertedProducts, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
