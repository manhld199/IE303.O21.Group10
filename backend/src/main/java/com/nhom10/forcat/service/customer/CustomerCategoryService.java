package com.nhom10.forcat.service.customer;

import com.nhom10.forcat.dto.Category.CategoryDto;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.repository.Category.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerCategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> new CategoryDto(
                        category.getCategoryId(),
                        category.getCategoryName(),
                        category.getCategoryImg().getUrl(),
                        category.getCategoryImg().getAlt()))
                .collect(Collectors.toList());
    }
}
