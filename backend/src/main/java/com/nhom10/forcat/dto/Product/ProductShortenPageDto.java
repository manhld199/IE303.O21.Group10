package com.nhom10.forcat.dto.Product;

import java.util.List;

import lombok.Data;

@Data
public class ProductShortenPageDto {

    private List<ProductShortenDto> products;
    private int totalPages;

    public ProductShortenPageDto(List<ProductShortenDto> products, int totalPages) {
        this.products = products;
        this.totalPages = totalPages;
    }
}
