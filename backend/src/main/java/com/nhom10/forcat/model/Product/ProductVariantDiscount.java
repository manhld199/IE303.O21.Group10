package com.nhom10.forcat.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductVariantDiscount {
    @Id
    @Field(name = "_id")
    @JsonProperty("discount_id")
    private ObjectId discountId;

    @Field(name = "discount_amount")
    @JsonProperty("discount_amount")
    private Integer discountAmount;

    ProductVariantDiscount() {
    };

    public ProductVariantDiscount(ObjectId discountId, int discountAmount) {
        this.discountId = discountId;
        this.discountAmount = discountAmount;
    };
}
