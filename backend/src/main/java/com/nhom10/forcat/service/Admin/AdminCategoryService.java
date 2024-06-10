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

import com.nhom10.forcat.dto.Category.CategoryAdminAddDto;
import com.nhom10.forcat.dto.Category.CategoryAdminShortenDto;
import com.nhom10.forcat.dto.Category.CategoryAdminShortenPageDto;
import com.nhom10.forcat.dto.Category.CategoryAdminUpdateDto;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.repository.Category.CategoryRepository;

@Service
public class AdminCategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public ResponseEntity<Category> getCategoryByCategoryId(ObjectId categoryId) {
        try {
            Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

            if (!categoryOptional.isPresent())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(categoryOptional.get(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<CategoryAdminShortenPageDto> getAllCategories(int p, int n) {
        try {
            Pageable pageable = PageRequest.of(p, n);
            Page<Category> page = categoryRepository.findAllByOrderByCreatedAtDesc(pageable);
            List<Category> categories = page.getContent();
            int totalPages = page.getTotalPages();

            if (categories.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<CategoryAdminShortenDto> shortenCategories = categories.stream()
                    .map(category -> new CategoryAdminShortenDto(category))
                    .collect(Collectors.toList());

            CategoryAdminShortenPageDto returnedCategories = new CategoryAdminShortenPageDto(shortenCategories, totalPages);

            return new ResponseEntity<>(returnedCategories, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param category
     * @return
     */
    public ResponseEntity<Object> addCategory(CategoryAdminAddDto category) {
        try {
            Category addCategory = new Category(category);

            Category addedCategory = categoryRepository.insert(addCategory);

            if (addedCategory != null)
                return new ResponseEntity<>(HttpStatus.CREATED);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateCategory(CategoryAdminUpdateDto category) {
        try {
            Category updateCategory = new Category(category);

            Category updatedCategory = categoryRepository.save(updateCategory);

            if (updatedCategory != null)
                return new ResponseEntity<>(HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteCategories(List<ObjectId> categoryOjectIds) {
        try {
            if (categoryOjectIds.size() == 0)
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

            categoryRepository.deleteByCategoryIdIn(categoryOjectIds);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}