package com.nhom10.forcat.dto.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderDetailDto {
    @JsonProperty("product_id_hashed")
    private String productIdHashed;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("product_slug")
    private String productSlug;

    @JsonProperty("variant_id")
    private String variantId;

    @JsonProperty("variant_name")
    private String variantName;

    @JsonProperty("product_img")
    private String productImg;

    @JsonProperty("quantity")
    private int quantity;

    @JsonProperty("unit_price")
    private double unitPrice;

    public OrderDetailDto(String productIdHashed, String productName, String productSlug, String variantId, String variantName, String productImg, int quantity, double unitPrice) {
        this.productIdHashed = productIdHashed;
        this.productName = productName;
        this.productSlug = productSlug;
        this.variantId = variantId;
        this.variantName = variantName;
        this.productImg = productImg;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }
}
