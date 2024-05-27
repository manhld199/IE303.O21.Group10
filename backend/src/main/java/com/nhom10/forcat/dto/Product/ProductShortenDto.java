package com.nhom10.forcat.dto.Product;

import java.util.Comparator;
import java.util.Optional;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.model.Product.ProductImg;
import com.nhom10.forcat.model.Product.ProductVariant;

import lombok.Data;

@Data
public class ProductShortenDto {
    @JsonProperty("product_id")
    private ObjectId productId;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("product_slug")
    private String productSlug;

    @JsonProperty("product_img")
    private ProductImg productImg;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("variant_slug")
    private String variantSlug;

    @JsonProperty("variant_price")
    private Double variantPrice;

    @JsonProperty("variant_discount_amount")
    private Integer variantDiscountAmount;

    public ProductShortenDto(Product p) {
        this.productId = p.getProductId();
        this.productName = p.getProductName();
        this.productSlug = p.getProductSlug();
        this.productImg = p.getProductImgs().get(0);
        this.categoryName = p.getCategories().get(0).getCategoryName();

        Optional<ProductVariant> minPriceVariant = p.getProductVariants().stream().min(
                Comparator.comparingDouble(
                        variant -> variant.getVariantPrice()
                                * (1 - variant.getVariantDiscount().getDiscountAmount() / 100)));

        if (!minPriceVariant.isPresent()) {
            this.productSlug = null;
            this.variantPrice = null;
            this.variantDiscountAmount = null;
        }

        ProductVariant variant = minPriceVariant.get();
        this.variantSlug = variant.getVariantSlug();
        this.variantPrice = variant.getVariantPrice();
        this.variantDiscountAmount = variant.getVariantDiscount().getDiscountAmount();
    }

    public double calcPriceAfterDiscount() {
        return this.variantPrice * (100 - this.variantDiscountAmount) / 100;
    }
}
