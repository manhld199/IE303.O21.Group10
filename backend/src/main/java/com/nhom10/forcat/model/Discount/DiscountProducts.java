package com.nhom10.forcat.model.Discount;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class DiscountProducts {
    @Field(name = "is_all")
    @JsonProperty("is_all")
    private boolean isAll;

    @Field(name = "product_id")
    @JsonProperty("product_id")
    private String[] productId;

    public DiscountProducts() {
    }
}
