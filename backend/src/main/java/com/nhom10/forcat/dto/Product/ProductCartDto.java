package com.nhom10.forcat.dto.Product;

import java.util.List;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.model.Product.ProductVariant;

import lombok.Data;

@Data
public class ProductCartDto {
    @JsonProperty("product_id")
    private ObjectId productId;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("product_slug")
    private String productSlug;

    @JsonProperty("product_variants")
    private List<ProductVariant> productVariants;

    public ProductCartDto(Product p) {
        this.productId = p.getProductId();
        this.productName = p.getProductName();
        this.productSlug = p.getProductSlug();
        this.productVariants = p.getProductVariants();
    }
}
