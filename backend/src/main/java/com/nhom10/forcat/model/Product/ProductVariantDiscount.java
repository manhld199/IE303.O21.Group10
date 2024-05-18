package com.nhom10.forcat.model.Product;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ProductVariantDiscount {
    @Field(name = "discount_id")
    @JsonProperty("discount_id")
    private ObjectId discountId;

    // Lưu thêm để giảm độ phức tạp của câu truy vấn
    @Field(name = "discount_amount")
    @JsonProperty("discount_amount")
    private int discountAmount;

    public ProductVariantDiscount() {
    }
}
