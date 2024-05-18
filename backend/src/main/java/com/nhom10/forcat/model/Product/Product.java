package com.nhom10.forcat.model.Product;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Document(collection = "products")
public class Product {
    @Id
    @Field(name = "product_id")
    @JsonProperty("product_id")
    private ObjectId productId;

    @Field(name = "product_name")
    @JsonProperty("product_name")
    private String productName;

    @Field(name = "product_slug")
    @JsonProperty("product_slug")
    private String productSlug;

    @Field(name = "categories")
    @JsonProperty("categories")
    private List<ProductCategory> categories;

    @Field(name = "product_imgs")
    @JsonProperty("product_imgs")
    private List<ProductImg> productImgs;

    @Field(name = "product_description")
    @JsonProperty("product_description")
    private String productDescription;

    @Field(name = "product_short_description")
    @JsonProperty("product_short_description")
    private String productShortDescription;

    @Field(name = "product_details")
    @JsonProperty("product_details")
    private Object productDetails;

    @Field(name = "product_variants")
    @JsonProperty("product_variants")
    private List<ProductVariant> productVariants;

    @Field(name = "product_supp_price")
    @JsonProperty("product_supp_price")
    private double productSuppPrice;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Product() {
    }
}
