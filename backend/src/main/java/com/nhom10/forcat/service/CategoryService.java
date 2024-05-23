package com.nhom10.forcat.service;

import com.nhom10.forcat.dto.CategoryDto;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.repository.Category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(category -> new CategoryDto(
                        category.getCategoryName(),
                        category.getCategoryImg().getUrl(),
                        category.getCategoryImg().getAlt()))
                .collect(Collectors.toList());
    }
}

