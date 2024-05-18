package com.nhom10.forcat.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductVariant {
    @Field(name = "_id")
    @JsonProperty("variant_id")
    private String variantId;

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

    @Field(name = "variant_discount")
    @JsonProperty("variant_discount")
    private ProductVariantDiscount variantDiscount;

    @Field(name = "variant_in_stock")
    @JsonProperty("variant_in_stock")
    private int variantInStock;

    public ProductVariant() {
    }
}
