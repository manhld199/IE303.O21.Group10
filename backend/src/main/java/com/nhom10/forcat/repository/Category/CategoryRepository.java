package com.nhom10.forcat.repository.Category;

import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.model.Product.Product;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    Page<Category> findAllByOrderByCreatedAtDesc(Pageable pageable);

    void deleteByCategoryIdIn(List<ObjectId> ids);

    // Page<Category> searchAdminCategories(String query, Pageable pageable);

}

