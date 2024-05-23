package com.nhom10.forcat.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.util.Util;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductVariant {
    @Id
    @Field(name = "_id")
    @JsonProperty("variant_id")
    private ObjectId variantId;

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
    };

    public ProductVariant(String variantName, double variantPrice, ProductImg variantImg, int variantInStock) {
        this.variantId = new ObjectId();
        this.variantName = variantName;
        this.variantSlug = Util.createSlug(variantName);
        this.variantPrice = variantPrice;
        this.variantImg = variantImg;
        this.variantDiscount = new ProductVariantDiscount(null, 0);
        this.variantInStock = variantInStock;
    };
}
