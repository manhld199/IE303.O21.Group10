package com.forcat.app.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.forcat.app.model.Product.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, ObjectId> {

    @Query("{ 'categories' : { $in: ?0 } }")
    Optional<List<Product>> findProductsByCategories(List<ObjectId> categories);

}
