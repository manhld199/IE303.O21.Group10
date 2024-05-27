package com.nhom10.forcat.dto.Product;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ProductShortenPageDto {

    private List<ProductShortenDto> products;
    private int totalPages;

    public ProductShortenPageDto() {
        this.products = new ArrayList<>();
        this.totalPages = 0;
    }

    public ProductShortenPageDto(List<ProductShortenDto> products, int totalPages) {
        this.products = products;
        this.totalPages = totalPages;
    }
}
