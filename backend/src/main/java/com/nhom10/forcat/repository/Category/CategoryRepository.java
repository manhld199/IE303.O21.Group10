package com.nhom10.forcat.repository.Category;

import com.nhom10.forcat.model.Category.Category;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
}

