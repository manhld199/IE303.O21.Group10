package com.nhom10.forcat.dto.Product;

import java.util.stream.Collectors;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.model.Product.ProductImg;

public class ProductAdminShortenDto {
    @JsonProperty("product_id")
    private ObjectId productId;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("product_img")
    private ProductImg productImg;

    @JsonProperty("product_supp_price")
    private double productSuppPrice;

    @JsonProperty("product_categories")
    private String productCategories;

    @JsonProperty("product_variants_count")
    private String productVariantsCount;

    public ProductAdminShortenDto(Product p) {
        this.productId = p.getProductId();
        this.productName = p.getProductName();
        this.productImg = p.getProductImgs().get(0);
        this.productSuppPrice = p.getProductSuppPrice();

        this.productCategories = String.join(", ", p.getCategories().stream()
                .map(category -> category.getCategoryName()).collect(Collectors.toList()));

        this.productVariantsCount = String.join(", ", p.getProductVariants().stream()
                .map(variant -> variant.getVariantName()).collect(Collectors.toList()));
    }
}
