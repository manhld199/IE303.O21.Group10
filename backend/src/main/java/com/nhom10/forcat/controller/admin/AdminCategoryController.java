package com.nhom10.forcat.controller.admin;

import java.util.List;
import java.util.stream.Collectors;

// import java.util.List;
// import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Category.CategoryAdminAddDto;
import com.nhom10.forcat.dto.Category.CategoryAdminShortenPageDto;
import com.nhom10.forcat.dto.Category.CategoryAdminUpdateDto;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.service.admin.AdminCategoryService;
import com.nhom10.forcat.service.admin.AdminSearchService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    @Autowired
    AdminCategoryService categoryService;

    @Autowired
    AdminSearchService searchService;

    @GetMapping("/getCategory/{categoryId}")
    public ResponseEntity<Category> getCategory(@PathVariable String categoryId) {
        ObjectId categoryObjectId = new ObjectId(categoryId);

        return categoryService.getCategoryByCategoryId(categoryObjectId);
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<CategoryAdminShortenPageDto> getAllCategories(
            // @RequestParam(required = true) String q,
            @RequestParam(required = true) int p) {
        // if (!q.isEmpty())
        //     return searchService.getAdminSearchCategories(q, p, 10);

        return categoryService.getAllCategories(p, 10);
    }

    @PostMapping("/addCategory")
    public ResponseEntity<Object> addCategory(@RequestBody CategoryAdminAddDto category) {
        return categoryService.addCategory(category);
    }

    @PostMapping("/updateCategory")
    public ResponseEntity<Object> updateCategory(@RequestBody CategoryAdminUpdateDto category) {
        return categoryService.updateCategory(category);
    }

    @PostMapping("/deleteCategories")
    public ResponseEntity<Object> deleteCategories(@RequestParam(name = "pid", required = true) List<String> categoryIds) {
        List<ObjectId> categoryOjectIds = categoryIds.stream()
                .map(category -> new ObjectId(category))
                .collect(Collectors.toList());

        return categoryService.deleteCategories(categoryOjectIds);
    }
}
