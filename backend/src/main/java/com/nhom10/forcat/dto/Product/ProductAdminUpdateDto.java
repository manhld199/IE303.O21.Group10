package com.nhom10.forcat.dto.Product;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Product.ProductImg;
import com.nhom10.forcat.model.Product.ProductVariant;

import lombok.Data;

@Data
public class ProductAdminUpdateDto {

    @JsonProperty("product_id")
    private String productId;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("categories")
    private List<String> categories;

    @JsonProperty("product_imgs")
    private List<ProductImg> productImgs;

    @JsonProperty("product_short_description")
    private String productShortDescription;

    @JsonProperty("product_description")
    private String productDescription;

    @JsonProperty("product_details")
    private Object productDetails;

    @JsonProperty("product_variants")
    private List<ProductVariant> productVariants;

    @JsonProperty("product_supp_price")
    private double productSuppPrice;

    @JsonProperty("created_at")
    private Date createdAt;

    public ProductAdminUpdateDto() {
    }
}
