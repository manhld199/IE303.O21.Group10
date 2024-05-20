package com.nhom10.forcat.repository.Product;

import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.nhom10.forcat.model.Product.Product;

@Repository
public class CustomProductRepositoryImpl implements CustomProductRepository {

  @Autowired
  private MongoTemplate mongoTemplate;

  @Override
  public List<Product> findRandomDiscountedProducts(int limit) {
    MatchOperation match = Aggregation.match(Criteria.where("product_variants.variant_discount.discount_amount").ne(0));
    SampleOperation sample = Aggregation.sample(limit);

    Aggregation aggregation = Aggregation.newAggregation(match, sample);

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    return results.getMappedResults();
  }

  @Override
  public List<Product> findRandomProducts(int limit) {
    SampleOperation sample = Aggregation.sample(limit);

    Aggregation aggregation = Aggregation.newAggregation(sample);

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    return results.getMappedResults();
  }

  @Override
  public List<Product> searchProducts(String query, String category, String discount) {

    // if query is empty, search products by category
    String q = query.isEmpty() ? category : query;
    List<String> path = query.isEmpty() ? Arrays.asList("categories.category_name")
        : Arrays.asList("product_name", "product_variants.variant_name",
            "product_description", "categories");

    // create mongodb atlas search document
    Document searchDocument = new Document("$search",
        new Document("index", "products")
            .append("text", new Document("query", q)
                .append("path", path)));
    AggregationOperation searchOperation = context -> searchDocument;

    // if query and category is not empty, search products by query and category
    MatchOperation categoryMatch = null;
    if (!query.isEmpty() && !category.isEmpty())
      categoryMatch = Aggregation.match(Criteria.where("categories.category_name").is(category));

    // if discount is not empty, search products by query/category and dicount
    MatchOperation discountMatch = null;
    if (!discount.isEmpty())
      discountMatch = Aggregation.match(Criteria.where("product_variants.variant_discount.discount_amount").ne(0));

    Aggregation aggregation = null;
    if (categoryMatch == null) {
      if (discountMatch != null)
        aggregation = Aggregation.newAggregation(searchOperation, discountMatch);
      else
        aggregation = Aggregation.newAggregation(searchOperation);
    } else {
      if (discountMatch != null)
        aggregation = Aggregation.newAggregation(searchOperation, categoryMatch, discountMatch);
      else
        aggregation = Aggregation.newAggregation(searchOperation, categoryMatch);
    }

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    return results.getMappedResults();
  }

}
