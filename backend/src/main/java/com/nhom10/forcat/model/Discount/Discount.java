package com.nhom10.forcat.model.Discount;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import lombok.Data;

@Data
@Document(collection = "discounts")
public class Discount {
    @Id
    @Field(name = "_id")
    @JsonProperty("discount_id")
    private ObjectId discountId;

    @Field(name = "discount_name")
    @JsonProperty("discount_name")
    private String discountName;

    @Field(name = "discount_amount")
    @JsonProperty("discount_amount")
    private int discountAmount;

    @Field(name = "discount_start_date")
    @JsonProperty("discount_start_date")
    private Date discountStartDate;

    @Field(name = "discount_end_date")
    @JsonProperty("discount_end_date")
    private Date discountEndDate;

    @Field(name = "discount_products")
    @JsonProperty("discount_products")
    private DiscountProducts discountProducts;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Discount() {
    }
}
