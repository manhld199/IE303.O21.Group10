package com.nhom10.forcat.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class OrderDetail {
    @Field(name = "product_id")
    @JsonProperty("product_id")
    private String productId;

    @Field(name = "product_name")
    @JsonProperty("product_name")
    private String productName;

    @Field(name = "product_slug")
    @JsonProperty("product_slug")
    private String productSlug;

    @Field(name = "variant_id")
    @JsonProperty("variant_id")
    private String variantId;

    @Field(name = "variant_name")
    @JsonProperty("variant_name")
    private String variantName;

    @Field(name = "product_img")
    @JsonProperty("product_img")
    private String productImg;

    @Field(name = "quantity")
    @JsonProperty("quantity")
    private int quantity;

    @Field(name = "unit_price")
    @JsonProperty("unit_price")
    private double unitPrice;

    public OrderDetail() {
    }
}
