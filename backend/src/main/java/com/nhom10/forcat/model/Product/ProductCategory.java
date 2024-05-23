package com.nhom10.forcat.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductCategory {
    @Id
    @Field(name = "_id")
    @JsonProperty("category_id")
    private ObjectId categoryId;

    @Field(name = "category_name")
    @JsonProperty("category_name")
    private String categoryName;

    public ProductCategory() {
    }

    public ProductCategory(ObjectId objectId, String categoryName) {
        this.categoryId = objectId;
        this.categoryName = categoryName;
    }
}
