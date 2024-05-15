package com.forcat.app.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductVariant {
    @Field(name = "variant_name")
    @JsonProperty("variant_name")
    private String variantName;

    @Field(name = "variant_slug")
    @JsonProperty("variant_slug")
    private String variantSlug;

    @Field(name = "variant_price")
    @JsonProperty("variant_price")
    private double variantPrice;

    @Field(name = "variant_img")
    @JsonProperty("variant_img")
    private ProductImg variantImg;

    @Field(name = "discount_id")
    @JsonProperty("discount_id")
    private String discountId;

    @Field(name = "in_stock")
    @JsonProperty("in_stock")
    private int inStock;

    public ProductVariant() {
    }
}
