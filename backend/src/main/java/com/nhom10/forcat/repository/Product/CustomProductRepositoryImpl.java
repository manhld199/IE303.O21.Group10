package com.nhom10.forcat.repository.Product;

import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.LimitOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.aggregation.SkipOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.nhom10.forcat.model.Product.Product;

@Repository
public class CustomProductRepositoryImpl implements CustomProductRepository {

  @Autowired
  private MongoTemplate mongoTemplate;

  @Override
  public Page<Product> findRandomDiscountedProducts(Pageable pageable) {
    MatchOperation match = Aggregation.match(Criteria.where("product_variants.variant_discount.discount_amount").ne(0));

    long skipCount = pageable.getPageNumber() * pageable.getPageSize();
    SkipOperation skip = Aggregation.skip(skipCount);

    SampleOperation sample = Aggregation.sample(pageable.getPageSize());

    Aggregation aggregation = Aggregation.newAggregation(match, skip, sample);

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    List<Product> products = results.getMappedResults();

    long total = mongoTemplate.count(Query.query(Criteria.where(
        "product_variants.variant_discount.discount_amount").ne(0)), Product.class);

    return new PageImpl<>(products, pageable, total);
  }

  @Override
  public Page<Product> findRandomProducts(Pageable pageable) {
    long skipCount = pageable.getPageNumber() * pageable.getPageSize();
    SkipOperation skip = Aggregation.skip(skipCount);

    SampleOperation sample = Aggregation.sample(pageable.getPageSize());

    Aggregation aggregation = Aggregation.newAggregation(skip, sample);

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    List<Product> products = results.getMappedResults();

    long total = mongoTemplate.count(Query.query(new Criteria()), Product.class);

    return new PageImpl<>(products, pageable, total);
  }

  @Override
  public Page<Product> searchProducts(String query, String category, String discount, Pageable pageable) {

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

    long skipCount = pageable.getPageNumber() * pageable.getPageSize();
    SkipOperation skipOperation = Aggregation.skip(skipCount);

    LimitOperation limitOperation = Aggregation.limit(pageable.getPageSize());

    Aggregation aggregation = null;
    Aggregation countAggregation = null;
    if (categoryMatch == null) {
      if (discountMatch != null) {
        aggregation = Aggregation.newAggregation(searchOperation, discountMatch, skipOperation, limitOperation);
        countAggregation = Aggregation.newAggregation(searchOperation, discountMatch, Aggregation.count().as("count"));
      } else {
        aggregation = Aggregation.newAggregation(searchOperation, skipOperation, limitOperation);
        countAggregation = Aggregation.newAggregation(searchOperation, Aggregation.count().as("count"));
      }
    } else {
      if (discountMatch != null) {
        aggregation = Aggregation.newAggregation(searchOperation, categoryMatch,
            discountMatch, skipOperation, limitOperation);
        countAggregation = Aggregation.newAggregation(searchOperation, categoryMatch,
            discountMatch, Aggregation.count().as("count"));
      } else {
        aggregation = Aggregation.newAggregation(searchOperation, categoryMatch, skipOperation, limitOperation);
        countAggregation = Aggregation.newAggregation(searchOperation, categoryMatch, Aggregation.count().as("count"));
      }
    }

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    List<Product> products = results.getMappedResults();

    AggregationResults<Document> count = mongoTemplate.aggregate(countAggregation, "products", Document.class);
    int total = count.getUniqueMappedResult() != null ? count.getUniqueMappedResult().getInteger("count") : 0;

    return new PageImpl<>(products, pageable, total);
  }

  @Override
  public Page<Product> searchAdminProducts(String query, Pageable pageable) {

    List<String> path = Arrays.asList("product_name", "product_variants.variant_name",
        "product_supp_price", "categories");

    // create mongodb atlas search document
    Document searchDocument = new Document("$search",
        new Document("index", "admin-products")
            .append("text", new Document("query", query)
                .append("path", path)));
    AggregationOperation searchOperation = context -> searchDocument;

    long skipCount = pageable.getPageNumber() * pageable.getPageSize();
    SkipOperation skipOperation = Aggregation.skip(skipCount);

    LimitOperation limitOperation = Aggregation.limit(pageable.getPageSize());

    Aggregation aggregation = Aggregation.newAggregation(searchOperation, skipOperation, limitOperation);
    Aggregation countAggregation = Aggregation.newAggregation(searchOperation, Aggregation.count().as("count"));

    AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);

    List<Product> products = results.getMappedResults();

    AggregationResults<Document> count = mongoTemplate.aggregate(countAggregation, "products", Document.class);
    int total = count.getUniqueMappedResult() != null ? count.getUniqueMappedResult().getInteger("count") : 0;

    return new PageImpl<>(products, pageable, total);
  }

}
