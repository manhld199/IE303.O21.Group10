package com.nhom10.forcat.repository.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import com.nhom10.forcat.model.Product.Product;

@Repository
public class CustomProductRepositoryImpl implements CustomProductRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Product> findRandomDiscountedProducts(int limit) {
        AggregationOperation match = Aggregation
                .match(Criteria.where("product_variants.variant_discount.discount_amount").gt(0));
        AggregationOperation sample = Aggregation.sample(limit);

        Aggregation aggregation = Aggregation.newAggregation(match, sample);

        AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);
        return results.getMappedResults();
    }

    @Override
    public List<Product> findRandomProducts(int limit) {
        AggregationOperation sample = Aggregation.sample(limit);

        Aggregation aggregation = Aggregation.newAggregation(sample);

        AggregationResults<Product> results = mongoTemplate.aggregate(aggregation, "products", Product.class);
        return results.getMappedResults();
    }

}
