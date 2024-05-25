package com.nhom10.forcat.repository.Article;

import com.nhom10.forcat.model.Article.Article;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends MongoRepository<Article, ObjectId> {
}

