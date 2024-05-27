package com.nhom10.forcat.dto.Product;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.dto.Category.CategoryDto;
import com.nhom10.forcat.model.Category.Category;

import lombok.Data;

@Data
public class ProductCategoryDto {
    @JsonProperty("category")
    private CategoryDto category;

    @JsonProperty("products")
    private List<ProductShortenDto> products;

    public ProductCategoryDto(Category category, List<ProductShortenDto> products) {
        this.category = new CategoryDto(category);
        this.products = products;
    }
}
