package com.forcat.app.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductCategory {
    @Field(name = "category_id")
    @JsonProperty("category_id")
    private ObjectId categoryId;

    @Field(name = "category_name")
    @JsonProperty("category_name")
    private String categoryName;

    public ProductCategory() {
    }
}
