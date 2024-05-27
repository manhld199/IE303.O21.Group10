package com.nhom10.forcat.repository.Product;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.nhom10.forcat.model.Product.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId>, CustomProductRepository {

    @Query("{ 'categories._id' : { $in: ?0 } }")
    List<Product> findProductsByCategories(List<ObjectId> categories);

    @Query("{ 'categories.category_name' : ?0 }")
    Page<Product> findProductsByCategoryName(String categoryName, Pageable pageable);

    @Query("{ '_id' : { $in: ?0 } }")
    List<Product> findProductsByIds(List<ObjectId> productIds);

    Page<Product> findAllByOrderByCreatedAtDesc(Pageable pageable);

    void deleteByProductIdIn(List<ObjectId> ids);
}