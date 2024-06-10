package com.nhom10.forcat.dto.Category;

import java.util.List;
import lombok.Data;

@Data
public class CategoryAdminShortenPageDto {
    private List<CategoryAdminShortenDto> categories;
    private int totalPages;

    public CategoryAdminShortenPageDto(List<CategoryAdminShortenDto> categories, int totalPages) {
        this.categories = categories;
        this.totalPages = totalPages;
    }
}
