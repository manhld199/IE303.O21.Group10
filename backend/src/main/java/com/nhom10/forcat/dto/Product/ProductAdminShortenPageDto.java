package com.nhom10.forcat.dto.Product;

import java.util.List;

import lombok.Data;

@Data
public class ProductAdminShortenPageDto {

    private List<ProductAdminShortenDto> products;
    private int totalPages;

    public ProductAdminShortenPageDto(List<ProductAdminShortenDto> products, int totalPages) {
        this.products = products;
        this.totalPages = totalPages;
    }
}
