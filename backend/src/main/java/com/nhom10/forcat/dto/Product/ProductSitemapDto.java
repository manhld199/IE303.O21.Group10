package com.nhom10.forcat.dto.Product;

import java.util.Date;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Product.Product;

import lombok.Data;

@Data
public class ProductSitemapDto {
    @JsonProperty("product_id")
    private ObjectId productId;

    @JsonProperty("product_slug")
    private String productSlug;

    @JsonProperty("updated_at")
    private Date updatedAt;

    public ProductSitemapDto(Product p) {
        this.productId = p.getProductId();
        this.productSlug = p.getProductSlug();
        this.updatedAt = p.getUpdatedAt();
    }
}
